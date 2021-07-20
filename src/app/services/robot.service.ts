import { CommandExecutionStatus, Direction, Movable } from './../models/models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RobotService {

  private _move: BehaviorSubject<Movable>  = new BehaviorSubject(new Movable());

  constructor() { }

  setMove(move: Movable) {
    this._move.next(move);
  }

  getMove(): Observable<Movable> {
    return this._move.asObservable();
  }

}
