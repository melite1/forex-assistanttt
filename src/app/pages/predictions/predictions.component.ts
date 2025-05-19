import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PredictionEngineServiceService, Trend, Candle } from '@app/services/services/prediction-engine-service.service';
import { DataService } from '@app/services/services/services/data.service';
import { interval } from 'rxjs';
import { NgxEchartsModule } from 'ngx-echarts';



@Component({
  selector: 'app-predictions',
  standalone: true,
  imports: [CommonModule, NzIconModule, NgxEchartsModule],
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  prediction: Trend = 'Sideways';
  lastUpdated: Date = new Date();
  errorMessage: string | null = null;
  candles: Candle[] = [];
  chartOptions: any = {};


  constructor(
    private engine: PredictionEngineServiceService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
  this.errorMessage = null;

  // Initial fetch
  this.fetchPrediction();

  // Refresh every 5 minutes (300000 ms)
  interval(300000).subscribe(() => {
    this.fetchPrediction();
  });
}

  fetchPrediction(): void {
  this.dataService.getGBPJPYCandles().subscribe({
    next: (candles) => {
      this.candles = candles; // <-- expose to UI
      this.engine.setCandles(candles);
      this.prediction = this.engine.getPrediction();
      this.lastUpdated = new Date();
      this.chartOptions = this.buildChartOptions(candles);

    },
    error: (err) => {
      console.error('Error fetching candle data:', err);
      this.errorMessage = 'Failed to load prediction data. Please try again later.';
    }
  });
  }

  buildChartOptions(candles: Candle[]): any {
  const data = candles.map(c => [c.time, c.open, c.close, c.low, c.high]);

  return {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: candles.map(c => new Date(c.time).toLocaleTimeString()),
      boundaryGap: false
    },
    yAxis: { type: 'value', scale: true },
    series: [
      {
        type: 'candlestick',
        data: data
      }
    ]
  };
}

}
