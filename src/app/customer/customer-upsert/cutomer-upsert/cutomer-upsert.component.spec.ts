import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerUpsertComponent } from './cutomer-upsert.component';

describe('CutomerUpsertComponent', () => {
  let component: CutomerUpsertComponent;
  let fixture: ComponentFixture<CutomerUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutomerUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutomerUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
