import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressUpsertComponent } from './address-upsert.component';

describe('AddressUpsertComponent', () => {
  let component: AddressUpsertComponent;
  let fixture: ComponentFixture<AddressUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
