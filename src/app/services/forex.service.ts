import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  private API_URL = 'https://api.exchangerate.host/latest?base=GBP&symbols=JPY';

  constructor(private http: HttpClient) {}

  getGBPJPYRate(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
