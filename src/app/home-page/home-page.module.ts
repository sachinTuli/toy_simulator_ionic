import { MessagesPageModule } from './../messages/messages.module';
import { CommandPageModule } from './../command/command.module';
import { RobotBoardPageModule } from './../robot-board/robot-board.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePagePageRoutingModule } from './home-page-routing.module';

import { HomePagePage } from './home-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePagePageRoutingModule,
    RobotBoardPageModule,
    CommandPageModule,
    MessagesPageModule
  ],
  declarations: [HomePagePage]
})
export class HomePagePageModule {}
