import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSettingComponent } from './wallet-setting.component';

describe('WalletSettingComponent', () => {
  let component: WalletSettingComponent;
  let fixture: ComponentFixture<WalletSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
