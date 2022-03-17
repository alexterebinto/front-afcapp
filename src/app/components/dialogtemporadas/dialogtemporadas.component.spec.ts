import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTemporadasComponent } from './dialogtemporadas.component';

describe('DialogTemporadasComponent', () => {
  let component: DialogTemporadasComponent;
  let fixture: ComponentFixture<DialogTemporadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTemporadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTemporadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
