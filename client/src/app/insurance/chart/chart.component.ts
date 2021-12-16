import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InsuranceService } from '../insurance.service';

import { menuOptions } from '../../constants';
import { labels } from '../../language.labels';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { EChartTypes } from '../../enums/common.enum';
import { IFormOptions, ILanguage } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[];

  barChartOptions: ChartOptions;
  barChartLabels: Label[];
  barChartType: ChartType;
  barChartLegend: boolean;
  barChartData: ChartDataSets[];
  chartReady: boolean;

  formOptions: IFormOptions;
  result: any;
  searchedRegion: string;
  region: FormControl;
  languageLabels: ILanguage;

  constructor(private _insuranceService: InsuranceService) {
    this.languageLabels = labels;
    this.formOptions = menuOptions;
    this.barChartOptions = {
      responsive: true,
    };
    this.barChartLabels = menuOptions.months;
    this.barChartLegend = true;
    this.barChartType = EChartTypes.BAR;
  }

  ngOnInit() {
    this._subscriptions = [];
    this.chartReady = false;
    this.region = new FormControl('', Validators.required);
  }

  onSubmit(): void {
    const region = this.region.value;
    this._subscriptions.push(
      this._insuranceService.getPolicyByRegion(region).subscribe((data) => {
        this.result = data;
        this.searchedRegion = region;
        this.barChartData = [
          {
            data: this._barChartDataMap(data),
            label: this.languageLabels.policy_purchase_count,
          },
        ];
        this.chartReady = true;
      })
    );
  }

  private _barChartDataMap(data) {
    const len = data.length;
    const result = [];
    for (let i = 1; i <= 12; i++) {
      if (data[i]) {
        result.push(data[i]);
      } else {
        result.push(0);
      }
    }
    return result;
  }

  // getChartSectionBanner() {
  //   return this.languageLabels.policies_chart_header.replace('{0}', )
  // }

  ngOnDestroy(): void {
    this.chartReady = false;
    this._subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
