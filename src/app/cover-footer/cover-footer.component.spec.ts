import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverFooterComponent } from './cover-footer.component';

describe('CoverFooterComponent', () => {
  let component: CoverFooterComponent;
  let fixture: ComponentFixture<CoverFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
