import { NgModule } from "@angular/core";
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { VideoEditComponent } from "app/tools/video-edit/video-edit.component";
import { VideoApiService } from "app/tools/video-edit/video-api.service";

@NgModule({
  declarations: [
      VideoEditComponent
  ],
  imports: [
    CoreModule
  ],
  exports:[VideoEditComponent],
  providers: [
    VideoApiService
  ]
})
export class VideoModule { }