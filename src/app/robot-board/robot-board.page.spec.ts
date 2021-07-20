import { RobotService } from './../services/robot.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import SpyObj = jasmine.SpyObj;
import { RobotBoardPage } from './robot-board.page';
import createSpyObj = jasmine.createSpyObj;
import { Direction, Movable } from '../models/models';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RobotBoardPage', () => {
  let component: RobotBoardPage;
  let fixture: ComponentFixture<RobotBoardPage>;
  let robotServiceSpy: SpyObj<RobotService>;

  beforeEach(waitForAsync(() => {
    robotServiceSpy = createSpyObj<RobotService>('RobotService', ['getMove', 'setMove']);
    robotServiceSpy.getMove.and.returnValues(of(new Movable()));
    TestBed.configureTestingModule({
      declarations: [ RobotBoardPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule ],
      providers: [{provide: RobotService, useValue: robotServiceSpy},]
    }).compileComponents();

    fixture = TestBed.createComponent(RobotBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  function setupComponent() {
    fixture = TestBed.createComponent(RobotBoardPage);
    component = fixture.componentInstance;
    robotServiceSpy.getMove.and.returnValues(of(new Movable()));
    fixture.detectChanges();
}

  it('should create', () => {
    setupComponent();
    expect(component).toBeTruthy();
  });

  it('has robot', () => {
    setupComponent();
    const row = 1, col = 1;
    component.colPos = 1;
    component.rowPos = 1;
    const value = (row == component.colPos && col == component.rowPos);
    if (row == component.colPos && col == component.rowPos) {
      expect(value).toBeTruthy();
    } else {
      expect(value).toBeFalsy();
    }
  });

  it('get class', () => {
    setupComponent();
    const row = 1, col = 1;
    component.colPos = 1;
    component.rowPos = 1;
    component.robotFace = Direction.EAST;
    let value;
    if (row == component.colPos && col == component.rowPos)
      value = component.robotFace +  ' with-robot';
    else value ="without-robot"
    if (row == component.colPos && col == component.rowPos)
      expect(value).toEqual('EAST with-robot')
    else
      expect(value).toEqual('without-robot')
  });

});
