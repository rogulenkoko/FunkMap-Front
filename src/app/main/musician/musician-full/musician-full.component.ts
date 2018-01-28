import { Component, OnInit } from '@angular/core';
import { Musician } from "app/main/musician/models";
import { MusicianService } from "app/main/musician/musician.service";
import { ActivatedRoute } from "@angular/router";
import { EditService } from "app/tools/entity-full/edit.service";
import { BaseEditService } from 'app/tools/entity-full/base-edit.service';
import { EditableCardContainer } from 'app/tools/entity-full/editable-card';
import { UserService } from 'app/main/user/user.service';
import { UserDataService } from 'app/main/user/user-data.service';

@Component({
  selector: 'app-musician-full',
  templateUrl: './musician-full.component.html',
  styleUrls: ['./musician-full.component.scss'],
  providers: [EditService]
})
export class MusicianFullComponent extends EditableCardContainer implements OnInit {

  constructor(private musicianService: MusicianService,
    private route: ActivatedRoute,
    public editService: EditService,
    userService: UserService,
    userDataService: UserDataService) {
      super(userService, userDataService);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshMusician(login);
    })

  }

  private refreshMusician(login: string) {
    if(this.editService.baseModel && this.editService.baseModel.login == login){
      return;
    }
    this.checkIsUserEntity(login).subscribe(isUsers=>{
      this.editService.isUsers = isUsers;
      this.musicianService.getMusician(login).subscribe(musician => {
        this.editService.baseModel = musician;
      });
    });
    
    
  }

}
