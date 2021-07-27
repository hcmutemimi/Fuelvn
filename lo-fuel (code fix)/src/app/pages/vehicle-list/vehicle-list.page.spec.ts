import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehicleListPage } from './vehicle-list.page';

describe('VehicleListPage', () => {
  let component: VehicleListPage;
  let fixture: ComponentFixture<VehicleListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
