import { Injectable } from '@angular/core';


export type Trend = 'Uptrend' | 'Downtrend' | 'Sideways';

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

// A very simple mock data set (15M candles, last 10)
const MOCK_CANDLES: Candle[] = [
  { time: 0, open: 150, high: 152, low: 149, close: 151 },
  { time: 1, open: 151, high: 153, low: 151, close: 152 },
  { time: 2, open: 152, high: 155, low: 152, close: 154 },  // BOS bullish
  { time: 3, open: 154, high: 156, low: 153, close: 155 },
  { time: 4, open: 155, high: 156.5, low: 154.5, close: 156 },
  { time: 5, open: 156, high: 156.2, low: 155, close: 155.5 }, // retrace
  { time: 6, open: 155.5, high: 157, low: 155.2, close: 156.8 },// impulse
  { time: 7, open: 156.8, high: 158, low: 156.5, close: 157.5 },
  { time: 8, open: 157.5, high: 158.2, low: 157, close: 157.8 },
  { time: 9, open: 157.8, high: 158.5, low: 157.6, close: 158.2 } // last close
];




@Injectable({
  providedIn: 'root'
})
export class PredictionEngineServiceService {

  constructor() { }


    private candles = MOCK_CANDLES;

  /** 1. Market Structure: simple HH/LL count */
  private detectStructure(): Trend {
    const highs = this.candles.map(c => c.high);
    const lows  = this.candles.map(c => c.low);
    const isBull = highs[highs.length - 1] > highs[highs.length - 2]
                && lows[lows.length - 1]    > lows[lows.length - 2];
    const isBear = highs[highs.length - 1] < highs[highs.length - 2]
                && lows[lows.length - 1]    < lows[lows.length - 2];
    return isBull ? 'Uptrend' : isBear ? 'Downtrend' : 'Sideways';
  }

  /** 2. Break of Structure: last candle closes beyond prior high/low */
  private detectBOS(): boolean {
    const prev = this.candles[this.candles.length - 2];
    const last = this.candles[this.candles.length - 1];
    const struct = this.detectStructure();
    if (struct === 'Uptrend')   return last.close > prev.high;
    if (struct === 'Downtrend') return last.close < prev.low;
    return false;
  }

  /** 3. Origin (Order Block): the candle before the BOS-inducing impulse */
  private findOrigin(): Candle | null {
    if (!this.detectBOS()) return null;
    // look back two candles for simplicity
    return this.candles[this.candles.length - 3] ?? null;
  }

  /** 4. Liquidity: check for a wick sweep just before origin */
  private hasLiquidity(): boolean {
    const origin = this.findOrigin();
    if (!origin) return false;
    // simple heuristic: was there a wick beyond origin.high/low?
    const before = this.candles.slice(-5, -3);
    return before.some(c =>
      Math.max(c.high, c.close) > origin.high ||
      Math.min(c.low,  c.close) < origin.low
    );
  }

  /** 5. Imbalance: was there a fair value gap at origin? */
  private hasImbalance(): boolean {
    const origin = this.findOrigin();
    if (!origin) return false;
    // gap if origin.open > prev.close or vice versa
    const prev = this.candles[this.candles.length - 4];
    return origin.open > prev.close || origin.open < prev.close;
  }

  /** Public API: What’s the overall prediction? */
  getPrediction(): Trend {
    const struct = this.detectStructure();
    if (struct === 'Sideways') return 'Sideways';

    if (!this.detectBOS())   return 'Sideways';
    if (!this.findOrigin())  return 'Sideways';
    if (!this.hasLiquidity()) return 'Sideways';
    if (!this.hasImbalance()) return 'Sideways';

    return struct; // All checks passed → Uptrend or Downtrend
  }



  setCandles(candles: Candle[]): void {
  this.candles = candles;
}



}
