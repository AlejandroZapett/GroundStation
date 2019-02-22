import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsGraphDataComponentComponent } from './gs-graph-data-component.component';

describe('GsGraphDataComponentComponent', () => {
  let component: GsGraphDataComponentComponent;
  let fixture: ComponentFixture<GsGraphDataComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsGraphDataComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsGraphDataComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
