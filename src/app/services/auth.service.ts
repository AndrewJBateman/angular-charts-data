import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiKey = 'coinranking3157b7e141b549e4367c4ed4d9210c1c6f128bb9bd33c84a';

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

  constructor(private http: HttpClient) { }

  cryptoData() {
    const url = `${this.proxyUrl}${this.baseUrl}`;

    const cryptoData = this.http
      .get(url, httpOptions)
      .toPromise()
      .then((data) => {
        return data;
      });
    console.log('data: ', cryptoData);
    return cryptoData;
  }

}
