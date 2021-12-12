import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InsuranceService } from '../insurance.service';
import { IPolicy } from '../../interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  regions: Array<string> = ['North', 'South', 'East', 'West'];
  result: any;

  region = new FormControl('', Validators.required);

  constructor(private _insuranceService: InsuranceService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.region.value);
    const region = this.region.value;
    this._insuranceService.getPolicyByRegion(region).subscribe((data) => {
      this.result = data;
    })
  }


}
