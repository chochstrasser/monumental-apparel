import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBagTableComponent } from './account-bag-table.component';

describe('AccountBagTableComponent', () => {
  let component: AccountBagTableComponent;
  let fixture: ComponentFixture<AccountBagTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountBagTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBagTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
