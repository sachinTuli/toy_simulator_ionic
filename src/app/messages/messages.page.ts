import { RobotService } from './../services/robot.service';
import { Component, OnInit } from '@angular/core';
import { Message, Movable } from '../models/models';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  output:Message[] = [];
  constructor(private _robotService: RobotService) { }

  ngOnInit() {
    this._robotService.getMove().pipe(map((move:Movable) => {
      this.output = move.output;
      return move;
    }),catchError((e) => {
      this.output = [];
      return EMPTY;
    })).subscribe();
  }

}
