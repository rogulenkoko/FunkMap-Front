import { environment } from "environments/environment";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { SettingsComponent } from "./settings.component";
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    ToolsModule
  ],
  exports:[SettingsComponent],
  providers: [
      
  ]
})
export class SettingsModule { }


