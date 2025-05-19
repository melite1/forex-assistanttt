import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/services/settings.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzButtonModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [NzMessageService]
})
export class SettingsComponent {
  refreshInterval: number; // in seconds
  notificationsEnabled: boolean = true;
  // settings: any; // Declare the settings property here
  settings = {
  refreshInterval: 30,
  notificationsEnabled: true,
  theme: 'light',
  defaultPair: 'GBP/JPY'
};

  constructor(private message: NzMessageService, private settingsService: SettingsService) {

    this.refreshInterval = 30;
    this.notificationsEnabled = true;
    // this.settings = {}; 
  }

  saveSettingsForm(): void { // Renamed to avoid conflict if you meant to call the service's saveSettings
    // You could store in localStorage or a service later
    this.message.success('Settings saved!');
  }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
    this.refreshInterval = this.settings.refreshInterval !== undefined ? this.settings.refreshInterval : 30;
    this.notificationsEnabled = this.settings.notificationsEnabled !== undefined ? this.settings.notificationsEnabled : true;

  }

  onSettingChange(): void {
    // This is called by the second set of controls (theme, defaultPair, checkbox)
    // [(ngModel)] has already updated the 'this.settings' object directly for these controls.
    this.settingsService.saveSettings(this.settings);
    this.message.success('App setting changed!');
     document.body.classList.toggle('dark-theme', this.settings.theme === 'dark');

  this.message.success('App setting changed!');
  }

  saveSettings(): void {
    // Update the global 'settings' object with the current values from the form
    this.settings.refreshInterval = this.refreshInterval;
    this.settings.notificationsEnabled = this.notificationsEnabled; // Update the global setting

    // Save the updated global settings object
    this.settingsService.saveSettings(this.settings);
    this.message.success('Refresh interval and notification settings saved!');
  }


}
