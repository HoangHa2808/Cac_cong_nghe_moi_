import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InforPage } from './infor.page';
import { IonicModule } from '@ionic/angular';

describe('InforPage', () => {
  let component: InforPage;
  let fixture: ComponentFixture<InforPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InforPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InforPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
