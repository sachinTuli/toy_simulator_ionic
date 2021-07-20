import { RobotService } from './../services/robot.service';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../global';
import { Command, CommandExecutionStatus, Direction, Message, Movable } from '../models/models';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-command',
  templateUrl: './command.page.html',
  styleUrls: ['./command.page.scss'],
})
export class CommandPage implements OnInit {

  heading: string = "Command Pallete";
  command: string = '';

  rowPos: number = -1;
  colPos: number = -1;
  robotFace: Direction = Direction.NO_DIRECTION;
  isRobotOnBoard: boolean = false;
  output:Message[] = [];

  constructor(private _robotService: RobotService) {
    this._robotService.setMove(new Movable());
  }

  ngOnInit() {
    this._robotService.getMove().pipe(map((move:Movable) => {
      this.output = move.output;
      this.rowPos = move.rowPos;
      this.colPos = move.colPos;
      this.isRobotOnBoard = move.isRobotOnBoard;
      this.robotFace = move.robotFace;
      return move;
    }),catchError((e) => {
      this.output = [];
      return EMPTY;
    })).subscribe();
  }

  submitCommand() {
    if (this.command && this.command !== '') {
      const cmdList = this.command.split(' ');
      if (this.isRobotOnBoard || cmdList[0].toUpperCase() == Command.PLACE) {
        this.executeCommand(cmdList);
        this.command = '';
      } else {
        this.output.unshift({ message: GlobalConstants.errorMessages.START_WITH_PLACE, type: CommandExecutionStatus.ERROR });
      }
    } else {
      this.output.unshift({ message: GlobalConstants.errorMessages.ENTER_COMMAND, type: CommandExecutionStatus.ERROR });
    }
    this.updateMovable();
  }

  clearCommand() {
    this.command = '';
    this.output = [];
    this._robotService.setMove(this.updateMovable());
  }

  executeCommand(cmdList) {
    switch (cmdList[0].toUpperCase()) {
      case Command.PLACE:
        if (this.isValidPlaceCommand(cmdList[1], cmdList[2], cmdList[3])) {
          this.runPlaceCommand(cmdList[1], cmdList[2], cmdList[3])
        } else {
          this.output.unshift({ message: GlobalConstants.errorMessages.INVALID_PLACE_CMD, type: CommandExecutionStatus.ERROR })
        }
        break;

      case Command.MOVE:
        this.runMoveCommand();
        break;

      case Command.LEFT:
        this.runRotateCommand(Command.LEFT);
        break;

      case Command.RIGHT:
        this.runRotateCommand(Command.RIGHT);
        break;

      case Command.REPORT:
        this.runReportCommand();
        break;

      default:
        this.output.unshift({ message: GlobalConstants.errorMessages.INVALID_CMD, type: CommandExecutionStatus.ERROR })
        break;
    }
  };

  runPlaceCommand(x, y, facing) {
    this.isRobotOnBoard = true;
    this.rowPos = parseInt(x);
    this.colPos = parseInt(y);
    this.robotFace = facing.toUpperCase();
    this.output.unshift({ message: GlobalConstants.successMessages.PLACE_EXECUTED, type: CommandExecutionStatus.SUCCESS })
  }

  runMoveCommand() {
    switch (this.robotFace.toUpperCase()) {
      case Direction.NORTH:
        var newColPos = this.colPos + 1;
        if (this.isValidPosition(this.rowPos, newColPos)) {
          this.colPos = newColPos;
          break;
        } else {
          return;
        }
      case Direction.SOUTH:
        var newColPos = this.colPos - 1;
        if (this.isValidPosition(this.rowPos, newColPos)) {
          this.colPos = newColPos;
          break;
        } else {
          return;
        }
      case Direction.EAST:
        var newRowPos = this.rowPos + 1;
        if (this.isValidPosition(newRowPos, this.colPos)) {
          this.rowPos = newRowPos;
          break;
        } else {
          return;
        }
      case Direction.WEST:
        var newRowPos = this.rowPos - 1;
        if (this.isValidPosition(newRowPos, this.colPos)) {
          this.rowPos = newRowPos;
          break;
        } else {
          return;
        }
      default:
        this.output.unshift({ message: GlobalConstants.errorMessages.INVALID_CMD, type: CommandExecutionStatus.ERROR })
        break;
    }
    this.output.unshift({ message: GlobalConstants.successMessages.MOVE_EXECUTED, type: CommandExecutionStatus.SUCCESS })
  };

  isValidPosition(x, y) {
    if (x >= 0 && x < GlobalConstants.constantValue.ROWS_LENGTH && y >= 0 && y < GlobalConstants.constantValue.COLUMNS_LENGTH) {
      return true;
    } else {
      this.output.unshift({ message: GlobalConstants.errorMessages.ROBOT_OUT_OF_RANGE, type: CommandExecutionStatus.ERROR })
      return false;
    }
  };

  runRotateCommand(direction) {
    if (direction === Command.LEFT) {
      switch (this.robotFace.toUpperCase()) {
        case Direction.NORTH:
          this.robotFace = Direction.WEST;
          break;
        case Direction.SOUTH:
          this.robotFace = Direction.EAST;
          break;
        case Direction.EAST:
          this.robotFace = Direction.NORTH;
          break;
        case Direction.WEST:
          this.robotFace = Direction.SOUTH;
          break;
        default:
          this.output.unshift({ message: GlobalConstants.errorMessages.INVALID_CMD, type: CommandExecutionStatus.ERROR })
          break;
      }
    } else if (direction === Command.RIGHT) {
      switch (this.robotFace.toUpperCase()) {
        case Direction.NORTH:
          this.robotFace = Direction.EAST;
          break;
        case Direction.SOUTH:
          this.robotFace = Direction.WEST;
          break;
        case Direction.EAST:
          this.robotFace = Direction.SOUTH;
          break;
        case Direction.WEST:
          this.robotFace = Direction.NORTH;
          break;
        default:
          this.output.unshift({ message: GlobalConstants.errorMessages.INVALID_CMD, type: CommandExecutionStatus.ERROR })
          break;
      }
    }
    this.output.unshift({ message: 'The ' + direction + ' command is executed successfully.', type: CommandExecutionStatus.SUCCESS })
  };

  runReportCommand() {
    this.output.unshift({ message: 'Output: ' + this.rowPos + ', ' + this.colPos + ', ' + this.robotFace + ' ', type: CommandExecutionStatus.SUCCESS })
  }

  isValidPlaceCommand(x: number, y: number, facing: string) {
    if (x >= 0 && x <= 4 && y >= 0 && y <= 4) {
      let face = facing.toUpperCase();
      if (face == 'NORTH' || face == 'SOUTH' || face == 'EAST' || face == 'WEST') {
        return true;
      }
    }
    return false;
  }

  private updateMovable(): Movable {
    let move = new Movable();
    move.colPos = this.colPos;
    move.isRobotOnBoard = this.isRobotOnBoard;
    move.output = this.output;
    move.robotFace = this.robotFace;
    move.rowPos = this.rowPos;
    this._robotService.setMove(move);
    return move;
  }

  private clearMovable() {
    this._robotService.setMove(new Movable());
  }

}


