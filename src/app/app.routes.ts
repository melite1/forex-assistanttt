import { Routes } from '@angular/router';

import { LiveMarketComponent } from './pages/live-market/live-market.component';
import { PredictionsComponent } from './pages/predictions/predictions.component';
import { TradeSignalsComponent } from './pages/trade-signals/trade-signals.component';
import { SettingsComponent } from './pages/settings/settings.component';

// export const routes: Routes = [
//   import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'live-market',
    loadComponent: () =>
      import('./pages/live-market/live-market.component').then(m => m.LiveMarketComponent)
  },
  {
    path: 'predictions',
    loadComponent: () =>
      import('./pages/predictions/predictions.component').then(m => m.PredictionsComponent)
  },
  {
    path: 'trade-signals',
    loadComponent: () =>
      import('./pages/trade-signals/trade-signals.component').then(m => m.TradeSignalsComponent)
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: '',
    redirectTo: 'live-market',
    pathMatch: 'full'
  }
];


