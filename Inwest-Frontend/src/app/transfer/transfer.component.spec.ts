import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppModule } from '../app.module';
import { TransferState } from '../shared/Store/Reducers/movie.reducers';
import { TransferComponent } from './transfer.component';
import { TransferModule } from './transfer.module';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
  let mockStore: MockStore<TransferState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        TransferModule
      ],
      declarations: [ TransferComponent ],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferComponent);

    mockStore = TestBed.get(Store);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply filter', () => {
    component.applyFilter('kelum');
    expect(component.dataSource.filter).toBe('kelum');
  });

});
