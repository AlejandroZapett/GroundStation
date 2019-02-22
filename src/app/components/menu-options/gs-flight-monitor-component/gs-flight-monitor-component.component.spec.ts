import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsFlightMonitorComponentComponent } from './gs-flight-monitor-component.component';

describe('GsFlightMonitorComponentComponent', () => {
  let component: GsFlightMonitorComponentComponent;
  let fixture: ComponentFixture<GsFlightMonitorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsFlightMonitorComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsFlightMonitorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
