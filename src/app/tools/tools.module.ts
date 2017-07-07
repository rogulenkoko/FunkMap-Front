import { NgModule } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SideComponent } from './side/side.component';
import { CoreModule } from "app/core/core.module";
import { DateSelectProvider } from "./date/date-select-provider.service";
import { EntitySideComponent } from './entity-side/entity-side.component';
import { EntityTypeProvider } from "app/tools/entity-type-provider.service";


@NgModule({
  declarations: [
    ModalComponent,
    SideComponent,
    EntitySideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    ModalComponent, 
    BrowserModule,
    FormsModule,
    RouterModule,
    SideComponent,
    EntitySideComponent
    ],
  providers: [
    DateSelectProvider,
    EntityTypeProvider
  ]
})
export class ToolsModule { }
