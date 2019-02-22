import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsMainWrapperComponentComponent } from './gs-main-wrapper-component.component';

describe('GsMainWrapperComponentComponent', () => {
  let component: GsMainWrapperComponentComponent;
  let fixture: ComponentFixture<GsMainWrapperComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsMainWrapperComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsMainWrapperComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
