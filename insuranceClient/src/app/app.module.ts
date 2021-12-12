import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InsuranceComponent } from "./insurance/insurance.component";
import { PolicyComponent } from "./insurance/policy/policy.component";
import { ChartComponent } from "./insurance/chart/chart.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatTabsModule } from "@angular/material/tabs";
import { AgGridModule } from "ag-grid-angular";
import { HttpClientModule } from "@angular/common/http";
import { EditPolicyComponent } from './insurance/policy/edit-policy/edit-policy.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    InsuranceComponent,
    PolicyComponent,
    ChartComponent,
    EditPolicyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
