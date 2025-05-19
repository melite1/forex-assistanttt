import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Candle } from '../prediction-engine-service.service';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly API_KEY = 'fd9a0a0d270a4f5b8e606cb1e3ed8eb3';  // <-- replace with your key
  private readonly BASE_URL = 'https://api.twelvedata.com/time_series';

  constructor(private http: HttpClient) {}

  getGBPJPYCandles(): Observable<Candle[]> {
    const params = {
      symbol: 'GBP/JPY',
      interval: '15min',
      outputsize: '10', // latest 10 candles
      apikey: this.API_KEY,
    };

    return this.http.get<any>(this.BASE_URL, { params }).pipe(
      map(response =>
        response?.values?.map((d: any) => ({
          time: new Date(d.datetime).getTime(),
          open: parseFloat(d.open),
          high: parseFloat(d.high),
          low: parseFloat(d.low),
          close: parseFloat(d.close),
        })) || []
      )
    );
  }

  




}
