import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTemporadasComponent } from './newtemporadas.component';

describe('NewTemporadasComponent', () => {
  let component: NewTemporadasComponent;
  let fixture: ComponentFixture<NewTemporadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTemporadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTemporadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
