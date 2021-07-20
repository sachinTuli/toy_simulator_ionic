import { RobotService } from './../services/robot.service';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../global';
import { Direction, Movable } from '../models/models';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-robot-board',
  templateUrl: './robot-board.page.html',
  styleUrls: ['./robot-board.page.scss'],
})
export class RobotBoardPage implements OnInit {

  rowPos: number = -1;
  colPos: number = -1;
  robotFace: Direction = Direction.NO_DIRECTION;

  rowsLen: number = GlobalConstants.constantValue.ROWS_LENGTH;
  colLen: number = GlobalConstants.constantValue.COLUMNS_LENGTH
  rows: number[] = Array.from({ length: this.rowsLen }).map((x, i) => (this.rowsLen - i - 1));
  columns: number[] = Array.from({ length: this.colLen }).map((x, i) => i);

  constructor(public _robotService: RobotService) { }

  ngOnInit() {
    this._robotService.getMove().pipe(map((move:Movable) => {
      this.rowPos = move.rowPos;
      this.colPos = move.colPos;
      this.robotFace = move.robotFace;
      return move;
    }),catchError((e) => {
      return EMPTY;
    })).subscribe();
  }

  getClass(row: number, col: number) {
    if (row == this.colPos && col == this.rowPos)
      return this.robotFace +  ' with-robot';
    return "without-robot";
  }

  hasRobot(row: number, col: number) {
    if (row == this.colPos && col == this.rowPos)
      return true;
    return false;
  }

}
