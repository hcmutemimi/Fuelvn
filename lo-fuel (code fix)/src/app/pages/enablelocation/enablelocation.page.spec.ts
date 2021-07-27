import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnablelocationPage } from './enablelocation.page';

describe('EnablelocationPage', () => {
  let component: EnablelocationPage;
  let fixture: ComponentFixture<EnablelocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnablelocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnablelocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
