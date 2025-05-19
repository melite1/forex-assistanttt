import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-trade-signals',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzIconModule],
  templateUrl: './trade-signals.component.html',
  styleUrls: ['./trade-signals.component.scss']
})
export class TradeSignalsComponent implements OnInit {
  signals: { type: 'Buy' | 'Sell', entry: number, exit: number, timestamp: Date }[] = [];

  ngOnInit(): void {
    this.generateMockSignals();
  }

  generateMockSignals(): void {
    this.signals = [
      {
        type: 'Buy',
        entry: 192.50,
        exit: 193.20,
        timestamp: new Date()
      },
      {
        type: 'Sell',
        entry: 193.10,
        exit: 192.40,
        timestamp: new Date()
      }
    ];
  }
}
