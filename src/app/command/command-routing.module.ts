import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandPage } from './command.page';

const routes: Routes = [
  {
    path: '',
    component: CommandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandPageRoutingModule {}
