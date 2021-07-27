import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageVehiclePage } from './manage-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: ManageVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageVehiclePageRoutingModule {}
