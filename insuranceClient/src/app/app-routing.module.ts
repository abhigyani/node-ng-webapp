import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyComponent } from './insurance/policy/policy.component';
import { ChartComponent } from './insurance/chart/chart.component';
import { InsuranceComponent } from './insurance/insurance.component';

const routes: Routes = [
  { path: '', component: InsuranceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
