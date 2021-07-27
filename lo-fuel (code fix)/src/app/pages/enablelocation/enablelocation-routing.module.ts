import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnablelocationPage } from './enablelocation.page';

const routes: Routes = [
  {
    path: '',
    component: EnablelocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnablelocationPageRoutingModule {}
