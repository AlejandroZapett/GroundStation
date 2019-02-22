import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsPadComponentComponent } from './gs-pad-component.component';

describe('GsPadComponentComponent', () => {
  let component: GsPadComponentComponent;
  let fixture: ComponentFixture<GsPadComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsPadComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsPadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
