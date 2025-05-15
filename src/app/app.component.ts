import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Add standalone: true
  
  imports: [RouterLink, RouterOutlet, CommonModule,NzIconModule, NzLayoutModule, NzMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedKey = 'live-market';

  isCollapsed = false;
  title = 'forex-assistanttt'; // Add the title property

  menu = [
    
    { label: 'Live Market', icon: 'area-chart', route: '/live-market' },
    { label: 'Predictions', icon: 'bulb', route: '/predictions' },
    { label: 'Trade Signals', icon: 'notification', route: '/trade-signals' },
    { label: 'Settings', icon: 'setting', route: '/settings' },
    // ... other menu items
  ];




}
