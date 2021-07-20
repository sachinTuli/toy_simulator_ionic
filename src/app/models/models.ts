export enum Direction {
  NORTH = 'NORTH',
  EAST = 'EAST',
  WEST = 'WEST',
  SOUTH = 'SOUTH',
  NO_DIRECTION = 'NO_DIRECTION'
}

export enum Command {
  PLACE = 'PLACE',
	MOVE = 'MOVE',
	LEFT = 'LEFT',
	RIGHT = 'RIGHT',
	REPORT = 'REPORT'
}

export enum CommandExecutionStatus {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface Message {
  message: string,
  type: CommandExecutionStatus
}

export class Movable {
  rowPos: number;
  colPos: number;
  robotFace: Direction
  isRobotOnBoard: boolean;
  output: Message[]

  constructor() {
    this.rowPos = -1;
    this.colPos = -1;
    this.robotFace = Direction.NO_DIRECTION;
    this.isRobotOnBoard = false;
    this.output = [] as Message[];
  }


}
