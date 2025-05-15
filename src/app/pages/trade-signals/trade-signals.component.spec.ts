import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeSignalsComponent } from './trade-signals.component';

describe('TradeSignalsComponent', () => {
  let component: TradeSignalsComponent;
  let fixture: ComponentFixture<TradeSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeSignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
