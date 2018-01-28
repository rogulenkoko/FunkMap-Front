import { Component, OnInit } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { StudioService } from "app/main/studio/studio.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from 'app/main/user/user.service';
import { UserDataService } from 'app/main/user/user-data.service';
import { EditableCardContainer } from 'app/tools/entity-full/editable-card';

@Component({
  selector: 'app-studio-full',
  templateUrl: './studio-full.component.html',
  styleUrls: ['./studio-full.component.scss'],
  providers: [EditService]
})
export class StudioFullComponent extends EditableCardContainer implements OnInit {

  constructor(public editService: EditService,
              private studioService: StudioService,
              private route: ActivatedRoute,
              userService: UserService,
              userDataService: UserDataService) {
    super(userService, userDataService); 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshBand(login);
    })
  }

  private refreshBand(login: string) {
    this.checkIsUserEntity(login).subscribe(isUsers=>{
      this.editService.isUsers = isUsers;
      this.studioService.getStudio(login).subscribe(studio => {
        this.editService.baseModel = studio;
      });
    })
    
  }

}
