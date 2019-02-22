import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsPresentationComponentComponent } from './gs-presentation-component.component';

describe('GsPresentationComponentComponent', () => {
  let component: GsPresentationComponentComponent;
  let fixture: ComponentFixture<GsPresentationComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsPresentationComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsPresentationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
