import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchItem } from 'app/main/search/search-item';
import { SearchService } from 'app/main/search/search.service';
import { BaseFilter } from 'app/main/search/search-filter/base-filter';
import { EntityType } from 'app/main/map/models/marker';
import { ConfigurationProvider } from 'app/core';
import { UserService } from 'app/main/user/user.service';
import { BaseService } from 'app/tools/base.service'
import { MusicianService } from 'app/main/musician/musician.service';
import { BandInviteMusicianRequest, BandInviteMusiciansRequest } from 'app/main/musician/models/band-invite-musician-request';
import { Band } from 'app/main/band/models/band';

@Component({
  selector: 'band-participants-search',
  templateUrl: './band-participants-search.component.html',
  styleUrls: ['./band-participants-search.component.scss']
})
export class BandParticipantsSearchComponent implements OnInit {

  @Input() band: Band;

  @Output() onCanceled: EventEmitter<boolean>;

  @Output() ownAdded: EventEmitter<Array<string>>;

  private search: string;

  private ownProfiles: Array<InviteSearchItem>;

  private favoriteProfiles: Array<InviteSearchItem>;
  private allFavoriteProfiles: Array<InviteSearchItem>;

  private searchedProfiles: Array<InviteSearchItem>;

  private invited: Array<InviteSearchItem>;

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };

  public step: number = 1;

  constructor(private searchService: SearchService,
    private userService: UserService,
    private baseService: BaseService,
    private musicianService: MusicianService) {
    this.onCanceled = new EventEmitter<boolean>();
    this.ownAdded = new EventEmitter<Array<string>>();
  }

  ngOnInit() {
    this.ownProfiles = [];
    this.favoriteProfiles = [];
    this.searchedProfiles = [];
    this.invited = [];
    this.refresh();
  }



  refresh() {
    this.getOwn();
    this.getSearched();

    this.baseService.getFavourites().subscribe(items => {
      this.allFavoriteProfiles = items.filter(x => x.type == EntityType.Musician).map(x => x as InviteSearchItem);
      this.favoriteProfiles = this.allFavoriteProfiles;
    });
  }

  onSearchChanged(search: string) {
    this.getOwn();
    this.getSearched();

    if (this.search) {
      this.favoriteProfiles = this.allFavoriteProfiles.filter(x => x.title.toLowerCase().includes(this.search.toLowerCase()));
    } else {
      this.favoriteProfiles = this.allFavoriteProfiles;
    }
  }

  private getOwn() {
    var filter = new BaseFilter(this.search, EntityType.Musician, 0, ConfigurationProvider.maxProfilesCount);
    if (this.userService.user) filter.userLogin = this.userService.user.login;
    this.searchService.getFiltered(0, ConfigurationProvider.maxProfilesCount, filter).subscribe(result => {
      var ownProfiles = result.items.map(x => x as InviteSearchItem);
      this.ownProfiles = this.band.musicians ? ownProfiles.filter(x => !this.band.musicians.find(y => y == x.login)) : ownProfiles;
    });
  }

  private getSearched() {
    if (this.search) {
      var filter = new BaseFilter(this.search, EntityType.Musician, 0, 10);
      this.searchService.getFiltered(0, 10, filter).subscribe(response => {
        var searchedProfiles = response.items.filter(x => !this.favoriteProfiles.find(y => y.login == x.login) && !this.ownProfiles.find(y => y.login == x.login)).map(x => x as InviteSearchItem);
        this.searchedProfiles = this.band.musicians ? searchedProfiles.filter(x => !this.band.musicians.find(y => y == x.login)) : searchedProfiles;
      });
    }
  }

  finish() {
    if (!this.invited || this.invited.length == 0) return;
    let request = new BandInviteMusiciansRequest(this.band.login, this.invited.map(x => x.login));
    this.musicianService.inviteManyToBand(request).subscribe(responses => {
      //todo
      var own = responses.filter(x=>x.isOwner && x.success).map(x=>x.musicianLogin);
      this.ownAdded.emit(own);
      this.onCanceled.emit(true);
    });
  }

  invite(item: InviteSearchItem) {
    item.isInvited = true;
    this.invited.push(item);
  }

  remove(item: InviteSearchItem) {
    item.isInvited = false;
    this.invited = this.invited.filter(x => x != item);
  }

  cancel() {
    this.onCanceled.emit(true);
  }

  next() {
    if (!this.invited || this.invited.length == 0) return;
    this.step += 1;
  }

  previous() {
    this.step -= 1;
  }



}


export class InviteSearchItem extends SearchItem {
  public isInvited: boolean;
}
