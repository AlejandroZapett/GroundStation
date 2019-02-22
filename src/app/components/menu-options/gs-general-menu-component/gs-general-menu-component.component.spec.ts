import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsGeneralMenuComponentComponent } from './gs-general-menu-component.component';

describe('GsGeneralMenuComponentComponent', () => {
  let component: GsGeneralMenuComponentComponent;
  let fixture: ComponentFixture<GsGeneralMenuComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsGeneralMenuComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsGeneralMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
