import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { AvatarService } from "app/main/avatar/avatar.service";
import { AvatarComponent } from "app/main/avatar/avatar.component";

@NgModule({
  declarations: [
      AvatarComponent
  ],
  imports: [
    CoreModule,
    ToolsModule
  ],
  exports:[AvatarComponent],
  providers: [
    AvatarService
  ]
})
export class AvatarModule { }


