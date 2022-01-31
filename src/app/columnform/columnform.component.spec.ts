import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnformComponent } from './columnform.component';

describe('ColumnformComponent', () => {
  let component: ColumnformComponent;
  let fixture: ComponentFixture<ColumnformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
