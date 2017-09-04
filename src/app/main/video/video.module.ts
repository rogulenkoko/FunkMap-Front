import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsModule } from "app/tools/tools.module";
import { CoreModule } from "app/core/core.module";
import { VideoComponent } from "app/main/video/video.component";

@NgModule({
  imports: [
    CoreModule,
    ToolsModule
  ],
  declarations: [VideoComponent],
  exports: [VideoComponent]
})
export class VideoModule { }
