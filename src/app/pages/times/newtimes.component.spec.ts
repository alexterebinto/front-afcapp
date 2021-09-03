import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimesComponent } from './newtimes.component';

describe('NewTimesComponent', () => {
  let component: NewTimesComponent;
  let fixture: ComponentFixture<NewTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
