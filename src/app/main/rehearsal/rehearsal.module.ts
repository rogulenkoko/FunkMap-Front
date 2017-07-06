import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RehearsalComponent } from './rehearsal.component';
import { RehearsalService, RehearsalServiceHttp } from "app/main/rehearsal/rehearsal.service";
import { RehearsalServiceStub } from "app/main/rehearsal/rehearsal.service.stub";
import { environment } from "environments/environment";
import { ToolsModule } from "app/tools/tools.module";
import { CoreModule } from "app/core/core.module";

@NgModule({
  imports: [
    CoreModule,
    ToolsModule
  ],
  declarations: [RehearsalComponent],
  exports: [RehearsalComponent],
  providers: [
    {
      provide: RehearsalService,
      useClass: environment.production ? RehearsalServiceHttp : RehearsalServiceStub
    }
  ]
})
export class RehearsalModule { }
