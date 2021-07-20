import { Movable } from './../models/models';
import { RobotService } from './../services/robot.service';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommandPage } from './command.page';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { CommandExecutionStatus, Direction } from '../models/models';
import { GlobalConstants } from '../global';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('CommandPage', () => {
  let component: CommandPage;
  let fixture: ComponentFixture<CommandPage>;
  let robotServiceSpy: SpyObj<RobotService>;

  beforeEach(waitForAsync(() => {
    robotServiceSpy = createSpyObj<RobotService>('RobotService', ['getMove', 'setMove']);
    robotServiceSpy.getMove.and.returnValues(of(new Movable()));
    TestBed.configureTestingModule({
      declarations: [ CommandPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule ],
      providers: [{provide: RobotService, useValue: robotServiceSpy},]
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  function setupComponent() {
    fixture = TestBed.createComponent(CommandPage);
    component = fixture.componentInstance;
    component.command = '';
    component.output = [];
    component.rowPos = -1;
    component.colPos = -1;
    component.isRobotOnBoard = false;
    robotServiceSpy.getMove.and.returnValues(of(new Movable()));
    component.robotFace = Direction.NO_DIRECTION;
    fixture.detectChanges();
  }

  it('should create', () => {
    setupComponent();
    expect(component).toBeTruthy();
  });

  it('clear command', () => {
    setupComponent();
    component.clearCommand();
    expect(component.command).toEqual('');
    expect(component.output).toEqual([]);
  });

  it('Enter empty command', function() {
    setupComponent();
    component.command = '';
    component.submitCommand();
    expect(component.output[0]).toEqual({ message: GlobalConstants.errorMessages.ENTER_COMMAND, type: CommandExecutionStatus.ERROR });
  });

  it('Enter invalid command', function () {
    setupComponent();
    component.command = 'false';
    component.submitCommand();
    expect(component.output[0]).toEqual({ message: GlobalConstants.errorMessages.START_WITH_PLACE, type: CommandExecutionStatus.ERROR });
  });

  it('Enter with no PLACE command as first command', function () {
    setupComponent();
    component.isRobotOnBoard = false;
    component.command = 'RIGHT';
    component.submitCommand();
    expect(component.output[0]).toEqual({ message: GlobalConstants.errorMessages.START_WITH_PLACE, type: CommandExecutionStatus.ERROR })
  });

  it('Enter valid PLACE command', function () {
    setupComponent();
    component.isRobotOnBoard = false;
    component.command = 'PLACE 1 2 NORTH';
    component.submitCommand();

    expect(component.output[0]).toEqual({ message: GlobalConstants.successMessages.PLACE_EXECUTED, type: CommandExecutionStatus.SUCCESS })
    expect(component.rowPos).toEqual(1);
    expect(component.colPos).toEqual(2);
    expect(component.robotFace).toEqual('NORTH');
  });

  it('Enter valid MOVE command', function () {
    setupComponent();
    component.isRobotOnBoard = true;
    component.command = 'PLACE 1 2 NORTH';
    component.submitCommand();
    component.command = 'MOVE';
    component.submitCommand();
    expect(component.output[0]).toEqual({ message: GlobalConstants.successMessages.MOVE_EXECUTED, type: CommandExecutionStatus.SUCCESS })
    expect(component.rowPos).toEqual(1);
    expect(component.colPos).toEqual(3);
    expect(component.robotFace).toEqual('NORTH');
  });


  it('Enter LEFT command', function() {

    setupComponent();
    component.isRobotOnBoard = true;
    component.command = 'PLACE 1 2 NORTH';
    component.submitCommand();
    component.command = 'LEFT';
    component.submitCommand();
    expect(component.output[0]).toEqual({ message: 'The LEFT command is executed successfully.', type: CommandExecutionStatus.SUCCESS })
    expect(component.rowPos).toEqual(1);
    expect(component.colPos).toEqual(2);
    expect(component.robotFace).toEqual('WEST');
  });

  it('Enter RIGHT command', function() {
    setupComponent();
    component.isRobotOnBoard = true;
    component.command = 'PLACE 1 2 NORTH';
    component.submitCommand();
    component.command = 'RIGHT';
    component.submitCommand();
    expect(component.output[0]).toEqual({ message: 'The RIGHT command is executed successfully.', type: CommandExecutionStatus.SUCCESS })
    expect(component.rowPos).toEqual(1);
    expect(component.colPos).toEqual(2);
    expect(component.robotFace).toEqual('EAST');
  });

  it('Enter PLACE, REPORT command', function() {
    setupComponent();
    component.isRobotOnBoard = true;
    component.command = 'PLACE 1 2 NORTH';
    component.submitCommand();
    component.command = 'REPORT';
    component.submitCommand();
    expect(component.output[0]).toEqual({ message: 'Output: 1, 2, NORTH ', type: CommandExecutionStatus.SUCCESS });
    expect(component.rowPos).toEqual(1);
    expect(component.colPos).toEqual(2);
    expect(component.robotFace).toEqual('NORTH');
  });

  it('Enter PLACE, LEFT, RIGHT, MOVE, REPORT command', function() {
    setupComponent();
    component.isRobotOnBoard = true;
    component.command = 'PLACE 1 2 NORTH';
    component.submitCommand();
    component.command = 'LEFT';
    component.submitCommand();
    component.command = 'RIGHT';
    component.submitCommand();
    component.command = 'MOVE';
    component.submitCommand();
    component.command = 'REPORT';
    component.submitCommand();
    expect(component.output[0]).toEqual({ message: 'Output: 1, 3, NORTH ', type: CommandExecutionStatus.SUCCESS });
    expect(component.rowPos).toEqual(1);
    expect(component.colPos).toEqual(3);
    expect(component.robotFace).toEqual('NORTH');
  });

  it('Enter PLACE command that will make robot fall from table', function() {
    setupComponent();
    component.isRobotOnBoard = false;
    component.command = 'PLACE 4 5 NORTH';
    component.submitCommand();
    expect(component.output[0]).toEqual({ message: GlobalConstants.errorMessages.INVALID_PLACE_CMD, type: CommandExecutionStatus.ERROR });
  });

  it('Enter PLACE MOVE command that will make robot fall from table', function() {
    setupComponent();
    component.isRobotOnBoard = false;
    component.command = 'PLACE 4 4 NORTH';
    component.submitCommand();
    component.command = 'MOVE';
    component.submitCommand();
    expect(component.output[0]).toEqual({ message: GlobalConstants.errorMessages.ROBOT_OUT_OF_RANGE, type: CommandExecutionStatus.ERROR });
  });

});
