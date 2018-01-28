import { Component, OnInit } from '@angular/core';
import { EditService } from "app/tools/entity-full/edit.service";
import { ActivatedRoute } from "@angular/router";
import { RehearsalService } from "app/main/rehearsal/rehearsal.service";
import { UserDataService } from 'app/main/user/user-data.service';
import { UserService } from 'app/main/user/user.service';
import { EditableCardContainer } from 'app/tools/entity-full/editable-card';

@Component({
  selector: 'app-rehearsal-full',
  templateUrl: './rehearsal-full.component.html',
  styleUrls: ['./rehearsal-full.component.scss'],
  providers: [EditService]
})
export class RehearsalFullComponent extends EditableCardContainer implements OnInit {

  constructor(public editService: EditService,
              private rehearsalService: RehearsalService,
              private route: ActivatedRoute,
              userService: UserService,
              userDataService: UserDataService) {
    super(userService, userDataService);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var login = params["id"];
      this.refreshRehearsal(login);
    })
  }

  private refreshRehearsal(login: string) {
    this.checkIsUserEntity(login).subscribe(isUsers=>{
      this.editService.isUsers = isUsers;
      this.rehearsalService.getRehearsal(login).subscribe(rehearsal => {
        this.editService.baseModel = rehearsal;
      });
    })
  }

}
