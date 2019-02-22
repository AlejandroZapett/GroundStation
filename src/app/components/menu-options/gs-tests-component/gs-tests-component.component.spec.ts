import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsTestsComponentComponent } from './gs-tests-component.component';

describe('GsTestsComponentComponent', () => {
  let component: GsTestsComponentComponent;
  let fixture: ComponentFixture<GsTestsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsTestsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsTestsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
