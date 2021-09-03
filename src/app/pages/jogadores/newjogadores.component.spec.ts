import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJogadoresComponent } from './newjogadores.component';

describe('NewJogadoresComponent', () => {
  let component: NewJogadoresComponent;
  let fixture: ComponentFixture<NewJogadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewJogadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJogadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
