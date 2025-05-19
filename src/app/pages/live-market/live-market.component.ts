import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ForexService } from '../../services/forex.service'; // Corrected relative path
import { interval, Subscription } from 'rxjs';
import { SettingsService } from '../../services/services/settings.service'; // Corrected relative path


declare var TradingView: any;

@Component({
  selector: 'app-live-market',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-market.component.html',
  styleUrls: ['./live-market.component.scss'],
  providers: [DecimalPipe],
})
export class LiveMarketComponent implements OnInit, OnDestroy {
  // exchangeRate: number | null = null; // Seems unused, consider removing if not needed
  errorMessage: string | null = null;
  gbpJpyRate: number | null = null;
  refreshSub!: Subscription;

  constructor(
    private forexService: ForexService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.loadTradingViewWidget();
    this.fetchRateAndSetupRefresh();
  }

  fetchRateAndSetupRefresh(): void {
    this.forexService.getGBPJPYRate().subscribe({
      next: (data: any) => {
        this.gbpJpyRate = data.rates?.JPY ?? null;
        this.setupAutoRefresh(); // Setup auto-refresh after the first successful fetch
      },
      error: (err) => {
        console.error('Error fetching initial GBP/JPY rate:', err);
        this.errorMessage = 'Failed to load initial exchange rate.';
      }
    });
  }
loadTradingViewWidget(): void {
  const container = document.getElementById('tradingview_gbpjpy');
  if (container) {
    container.innerHTML = ''; // Clear previous chart if re-rendering
  }

  const existingScript = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
  if (existingScript) {
    existingScript.remove(); // Prevent multiple scripts if navigating away/back
  }

  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/tv.js';
  script.async = true;
  script.onload = () => {
    new (window as any).TradingView.widget({
      width: '100%',
      height: 500,
      symbol: 'OANDA:GBPJPY',
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: false,
      container_id: 'tradingview_gbpjpy',
    });
  };
  document.body.appendChild(script);
}


  fetchRate(): void {
    this.forexService.getGBPJPYRate().subscribe(
  (data: any) => {
    this.gbpJpyRate = data.rates?.JPY ?? null;
  },
  (err: any) => {
    console.error('Error fetching GBP/JPY rate during refresh:', err);
  }
);
  }

  setupAutoRefresh(): void {
    // Clear any existing subscription to avoid multiple intervals
    this.refreshSub?.unsubscribe();

    const settings = this.settingsService.getSettings();
    const refreshIntervalSeconds = settings.refreshInterval !== undefined ? settings.refreshInterval : 30;

    this.refreshSub = interval(refreshIntervalSeconds * 1000).subscribe(() => this.fetchRate());
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }
}
