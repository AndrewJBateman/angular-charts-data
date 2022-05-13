import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

const apiKey = 'YOUR API kEY HERE';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-My-Custom-Header': `${apiKey}`,
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://api.coinranking.com/v2/coins';
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  cryptoDataValues: any;

  constructor(private http: HttpClient) { }

  public async cryptoData() {
    const url = `${this.proxyUrl}${this.baseUrl}`;

    const cryptoData$ = this.http.get(url, httpOptions);
    this.cryptoDataValues = await lastValueFrom(cryptoData$);
    console.log('values: ', this.cryptoDataValues);
    return this.cryptoDataValues;
  }

}
