import { Component, OnInit } from '@angular/core';

// import Chart and all chart types (tree-shakeable)
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-charts-data';
  result: any;
  coinPrice: any;
  coinName: any;
  chart1: any = [];
  chart2: any = [];

  constructor(private authService: AuthService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.authService.cryptoData().then((res: any) => {
      this.result = res;
      this.coinPrice = this.result.data.coins.map((coins: any) => coins.price);
      this.coinName = this.result.data.coins.map((coins: any) => coins.name);

      this.chart1 = new Chart('canvas1', {
        type: 'line',
        data: {
          labels: this.coinName,
          datasets: [
            {
              data: this.coinPrice,
              borderColor: '#0d47a1',
              fill: false,
              label: 'Line Chart: Crypto Prices',
              backgroundColor: 'rgba(93, 175, 89, 0.1)',
              borderWidth: 1
            },
          ]
        },

        options: {
          aspectRatio: 3,
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true
                },
                mode: 'xy',
              }
            }
          }
        }
      });

      this.chart2 = new Chart('canvas2', {
        type: 'bar',
        data: {
          labels: this.coinName,
          datasets: [
            {
              data: this.coinPrice,
              borderColor: '#0d47a1',
              label: 'Bar Chart: Crypto Prices',
              backgroundColor: 'rgba(93, 175, 89, 0.1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          aspectRatio: 3,
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true
                },
                mode: 'xy',
              }
            }
          }
        }
      });
    });
  }
}
