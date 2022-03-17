import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJogosComponent } from './newjogos.component';

describe('NewJogosComponent', () => {
  let component: NewJogosComponent;
  let fixture: ComponentFixture<NewJogosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewJogosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
