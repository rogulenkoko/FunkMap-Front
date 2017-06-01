import { NgModule } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SideComponent } from './side/side.component';
import { CoreModule } from "app/core/core.module";

@NgModule({
  declarations: [
    ModalComponent,
    SideComponent
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
    SideComponent],
  providers: [
    
  ]
})
export class ToolsModule { }
