import { Component, OnInit } from '@angular/core';
import { EventTypeItem } from 'app/tools/select/select-item';
import { EventTypeProvider } from 'app/tools/event-type-provider';
import { TranslateService } from '@ngx-translate/core';
import { EventType } from '../../event/models/event';
import { MapCreationService } from 'app/main/map/map-creation.service';
import { Marker, ProfileMarker, EntityType } from 'app/main/map/models/marker';
import { UserService } from 'app/main/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsCreationService } from 'app/main/creation/events-creation/events-creation.service';

@Component({
  selector: 'app-events-creation',
  templateUrl: './events-creation.component.html',
  styleUrls: ['./events-creation.component.scss', '../creation.component.scss']
})
export class EventsCreationComponent implements OnInit {

  eventTypes: Array<EventTypeItem>;
  isNameValid: boolean = true;
  minDate: Date;
  canCreate: boolean = true;
  subscription: Subscription;

  constructor(private eventTypeProvider: EventTypeProvider,
              private translateService: TranslateService,
              private mapCreationService: MapCreationService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private eventCreationService: EventsCreationService) {
    this.eventTypes = eventTypeProvider.eventTypes.keys().map(x => new EventTypeItem(x, this.translateService.get(eventTypeProvider.eventTypes.getValue(x))));
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    this.eventCreationService.date = currentDate;
    this.minDate = currentDate;
   }

  ngOnInit() {

    this.subscription = this.mapCreationService.onComplete.subscribe(marker => this.setCoordinates(marker));
    this.route.params.subscribe(params => {
      if (params['isComplete']) {
        this.save();
      }
    });

  }

  save() {
    this.eventCreationService.save().subscribe(response => {
      if (response.success) {
        // var route = RouteBuilder.buildRoute(this.creationService.selectedEntity, this.creationService.baseModel.login);
        // this.router.navigate([route]);
      }
    }); 

  }

  private validate() {
    if (!this.eventCreationService.name) {
      this.isNameValid = false;
      setTimeout(() => this.isNameValid = true, 3000);
      return;
    }

    this.toMapCreation();
  }

  private setCoordinates(marker: ProfileMarker) {
    this.subscription.unsubscribe();
    this.eventCreationService.latitude = marker.lat;
    this.eventCreationService.longitude = marker.lng;

    this.router.navigate(['/create-event', { isComplete: true }]);
  }

  toMapCreation() {
    this.mapCreationService.marker = new ProfileMarker("", this.userService.latitude, this.userService.longitude, EntityType.Event);
    this.mapCreationService.backRoute = "/create-event";
    this.router.navigate(['/checkmap']);
  }

}
