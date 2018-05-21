import { environment } from "environments/environment";
import { NgModule } from '@angular/core';
import { CoreModule } from "app/core/core.module";
import { ToolsModule } from "app/tools/tools.module";
import { PaymentsComponent } from "./payments.component";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent
  }
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    CoreModule,
    ToolsModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  providers: [
    
  ]
})
export class PaymentsModule { }


