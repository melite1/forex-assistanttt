import { Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../app/services/services/settings.service';


@Component({
  selector: 'app-root',
  standalone: true, // Add standalone: true
  
  imports: [RouterLink, RouterOutlet, CommonModule,NzIconModule, NzLayoutModule, NzMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  selectedKey = 'live-market';
  selectedKeyArray: string[] = [this.selectedKey]; 

  isCollapsed = false;
  title = 'forex-assistanttt'; // Add the title property

    constructor(private settingsService: SettingsService) {}


   ngOnInit(): void {
    this.selectedKeyArray = [this.selectedKey];
    if ('Notification' in window) {
    Notification.requestPermission();
     const theme = this.settingsService.getSettings().theme;
  document.body.classList.toggle('dark-theme', theme === 'dark');
  }
    // Ensure it's initialized
  }

  updateSelectedKey(key: string): void {
    this.selectedKey = key;
    this.selectedKeyArray = [key];
  }


  menu = [
    
    { label: 'Live Market', icon: 'area-chart', route: '/live-market' },
    { label: 'Predictions', icon: 'bulb', route: '/predictions' },
    { label: 'Trade Signals', icon: 'notification', route: '/trade-signals' },
    { label: 'Settings', icon: 'setting', route: '/settings' },
    // ... other menu items
  ];




}
