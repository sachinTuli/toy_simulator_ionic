import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RobotBoardPageRoutingModule } from './robot-board-routing.module';

import { RobotBoardPage } from './robot-board.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RobotBoardPageRoutingModule
  ],
  declarations: [RobotBoardPage],
  exports: [RobotBoardPage]
})
export class RobotBoardPageModule {}
