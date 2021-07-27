import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickDetailPage } from './pick-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PickDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickDetailPageRoutingModule {}
