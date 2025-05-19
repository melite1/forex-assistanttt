import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly STORAGE_KEY = 'forex-assistant-settings';

  private defaultSettings = {
    theme: 'light',
    defaultPair: 'GBP/JPY',
    notificationsEnabled: true,
  };

  getSettings(): any {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : this.defaultSettings;
  }

  saveSettings(settings: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
  }

  updateSetting(key: string, value: any): void {
    const settings = this.getSettings();
    settings[key] = value;
    this.saveSettings(settings);
  }
}
