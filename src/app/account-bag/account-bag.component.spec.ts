import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBagComponent } from './account-bag.component';

describe('AccountBagComponent', () => {
  let component: AccountBagComponent;
  let fixture: ComponentFixture<AccountBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountBagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
