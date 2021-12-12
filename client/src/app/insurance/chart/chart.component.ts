import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { InsuranceService } from "../insurance.service";

import { menuOptions } from "../../constants";
import { labels } from "../../language.labels";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit, OnDestroy {
  barChartOptions: ChartOptions;
  barChartLabels: Label[];
  barChartType: ChartType;
  barChartLegend: boolean;
  barChartPlugin: Array<any>;
  barChartData: ChartDataSets[];
  chartReady: boolean;

  formOptions: any;
  result: any;

  region = new FormControl("", Validators.required);
  searchedRegion: string;

  constructor(private _insuranceService: InsuranceService) {
    this.formOptions = menuOptions;
    this.barChartOptions = {
      responsive: true,
    };
    this.barChartLabels = menuOptions.months;
    this.barChartLegend = true;
    this.barChartType = "bar";
    this.barChartPlugin = [];
  }

  ngOnInit() {
    this.chartReady = false;
  }

  onSubmit() {
    const region = this.region.value;
    this._insuranceService.getPolicyByRegion(region).subscribe((data) => {
      this.result = data;
      this.searchedRegion = region;
      this.barChartData = [
        {
          data: this._barChartDataMap(data),
          label: labels.policy_purchase_count,
        },
      ];
      this.chartReady = true;
    });
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

  ngOnDestroy(): void {
    this.chartReady = false;
  }
}
