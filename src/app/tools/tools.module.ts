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
import { EntityFullComponent } from './entity-full/entity-full.component';
import { EntityBaseComponent } from './entity-full/entity-base/entity-base.component';
import { EntityMapComponent } from './entity-full/entity-map/entity-map.component';
import { EntityInfoComponent } from './entity-full/entity-info/entity-info.component';
import { EntityVideoComponent } from './entity-full/entity-video/entity-video.component';
import { DatexPipe } from './datex.pipe';
import { SocialComponent } from './social/social.component';
import { SignalrService } from "app/tools/signalr/signalr.service";
import { environment } from "environments/environment";
import { CropperDirective } from './cropper/cropper.directive';
import { BaseEditService, BaseEditServiceHttp } from "app/tools/entity-full/base-edit.service";
import { BaseEditServiceStub } from "app/tools/entity-full/base-edit.service.stub";
import { VimeoPlayerComponent } from './vimeo-player/vimeo-player.component';
import { AvatarCircleComponent } from './avatar-circle/avatar-circle.component';
import { DateNotificationPipe } from './date-notification.pipe';
import { EntityActiveComponent } from './entity-full/entity-active/entity-active.component';
import { VideoEditComponent } from 'app/tools/video-edit/video-edit.component';
import { VideoModule } from 'app/tools/video-edit/video.module';
import { AvatarComponent } from 'app/tools/avatar/avatar.component';
import { BaseServiceHttp, BaseService } from 'app/tools/base.service';
import { BaseServiceStub } from 'app/tools/base.service.stub';
import { CanActivateSearch } from 'app/tools/can-activate-search';
import { EntitySoundComponent } from './entity-full/entity-sound/entity-sound.component';
import { SoundcloudSearchComponent } from './soundcloud/soundcloud-search/soundcloud-search.component';
import { SoundcloudModule } from 'app/tools/soundcloud/soundcloud.module';
import { UploadComponent } from './upload/upload.component';
import { SizePipe } from './size.pipe';
import { ImageFullComponent } from './image-full/image-full.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CanActivateAdaptive } from 'app/tools/can-activate-adaptive';



@NgModule({
  declarations: [
    ModalComponent,
    SideComponent,
    EntitySideComponent,
    EntityFullComponent,
    EntityBaseComponent,
    EntityMapComponent,
    EntityInfoComponent,
    EntityVideoComponent,
    DatexPipe,
    SocialComponent,
    CropperDirective,
    VimeoPlayerComponent,
    AvatarCircleComponent,
    DateNotificationPipe,
    EntityActiveComponent,
    AvatarComponent,
    EntitySoundComponent,
    UploadComponent,
    SizePipe,
    ImageFullComponent,
    SpinnerComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    CoreModule,
    VideoModule,
    SoundcloudModule
  ],
  exports: [
    ModalComponent, 
    BrowserModule,
    FormsModule,
    RouterModule,
    VideoModule,
    SoundcloudModule,
    SideComponent,
    EntitySideComponent,
    EntityBaseComponent,
    EntityInfoComponent,
    EntityMapComponent,
    EntityVideoComponent,
    DatexPipe,
    SocialComponent,
    CropperDirective,
    VimeoPlayerComponent,
    AvatarCircleComponent,
    DateNotificationPipe,
    EntityActiveComponent,
    AvatarComponent,
    EntitySoundComponent,
    SoundcloudSearchComponent,
    UploadComponent,
    SizePipe,
    ImageFullComponent,
    SpinnerComponent
    ],
  providers: [
    DateSelectProvider,
    EntityTypeProvider,
    {
      provide: BaseEditService,
      useClass: environment.useServer ? BaseEditServiceHttp : BaseEditServiceStub
    },
    {
      provide: BaseService,
      useClass: environment.useServer ? BaseServiceHttp : BaseServiceStub
    },
    CanActivateSearch,
    CanActivateAdaptive
    
  ]
})
export class ToolsModule { }
