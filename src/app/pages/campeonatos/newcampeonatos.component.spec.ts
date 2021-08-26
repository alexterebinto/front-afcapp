import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampeonatosComponent } from './newcampeonatos.component';

describe('NewCampeonatosComponent', () => {
  let component: NewCampeonatosComponent;
  let fixture: ComponentFixture<NewCampeonatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampeonatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampeonatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
