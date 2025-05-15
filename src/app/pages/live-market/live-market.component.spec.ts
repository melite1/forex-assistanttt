import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMarketComponent } from './live-market.component';

describe('LiveMarketComponent', () => {
  let component: LiveMarketComponent;
  let fixture: ComponentFixture<LiveMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveMarketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
