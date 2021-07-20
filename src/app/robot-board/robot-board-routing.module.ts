import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RobotBoardPage } from './robot-board.page';

const routes: Routes = [
  {
    path: '',
    component: RobotBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotBoardPageRoutingModule {}
