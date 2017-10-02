import { Component, OnInit, Input } from '@angular/core';
import { BaseModel } from 'app/core';
import { BaseEditService } from 'app/tools/entity-full/base-edit.service';

@Component({
  selector: 'entity-active',
  templateUrl: './entity-active.component.html',
  styleUrls: ['./entity-active.component.scss']
})
export class EntityActiveComponent implements OnInit {

  private isNotActive: boolean;

  @Input() entity: BaseModel;

  constructor(private baseEditService: BaseEditService) { }

  ngOnInit() {
    this.isNotActive = !this.entity.isActive;
  }

  changeActivity(activity: boolean){
    var base = new BaseModel();
    base.isActive = activity;
    base.entityType = this.entity.entityType;
    base.login = this.entity.login;
    this.baseEditService.update(base).subscribe(response=>{

    });
  }

}
