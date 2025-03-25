import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountItemComponent } from './bank-account-item.component';

describe('CardComponent', () => {
  let component: BankAccountItemComponent;
  let fixture: ComponentFixture<BankAccountItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
