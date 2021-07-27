import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasswordOtpPage } from './password-otp.page';

describe('PasswordOtpPage', () => {
  let component: PasswordOtpPage;
  let fixture: ComponentFixture<PasswordOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordOtpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
