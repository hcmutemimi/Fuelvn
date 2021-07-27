import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickDetailPage } from './pick-detail.page';

describe('PickDetailPage', () => {
  let component: PickDetailPage;
  let fixture: ComponentFixture<PickDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
