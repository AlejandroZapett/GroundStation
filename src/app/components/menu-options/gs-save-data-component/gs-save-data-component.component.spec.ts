import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsSaveDataComponentComponent } from './gs-save-data-component.component';

describe('GsSaveDataComponentComponent', () => {
  let component: GsSaveDataComponentComponent;
  let fixture: ComponentFixture<GsSaveDataComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsSaveDataComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsSaveDataComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
