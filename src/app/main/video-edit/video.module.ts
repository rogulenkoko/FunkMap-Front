import { NgModule } from "@angular/core";
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { VideoEditComponent } from "app/main/video-edit/video-edit.component";
import { VideoApiService } from "app/main/video-edit/video-api.service";
import { VideoEditService } from "app/main/video-edit/video-edit.service";

@NgModule({
  declarations: [
      VideoEditComponent
  ],
  imports: [
    CoreModule,
    ToolsModule
  ],
  exports:[VideoEditComponent],
  providers: [
    VideoApiService,
    VideoEditService
  ]
})
export class VideoModule { }