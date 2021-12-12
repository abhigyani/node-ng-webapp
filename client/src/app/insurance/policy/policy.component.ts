import { Component, OnInit } from "@angular/core";
import { ColDef, GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";

import { InsuranceService } from "../insurance.service";
import { labels } from "../../language.labels";
@Component({
  selector: "app-policy",
  templateUrl: "./policy.component.html",
  styleUrls: ["./policy.component.css"],
})
export class PolicyComponent implements OnInit {
  public _gridApi;
  policyData: Observable<any>;
  rowSelection: string;
  rowData = [];
  openEditForm: boolean;
  selectedRow = null;
  languageLabels: any;

  constructor(private _insuranceService: InsuranceService) {
    this.languageLabels = labels
  }

  ngOnInit() {
    this.openEditForm = false;
  }

  columnDefs: ColDef[] = [
    { field: "policy_id", headerName: "Policy Id" },
    {
      field: "date_of_purchase",
      headerName: "Date of Purchase",
      valueFormatter: this._isoDateFormatter,
    },
    { field: "customer_id", headerName: "Customer Id" },
    { field: "fuel", headerName: "Fuel" },
    {
      field: "vehicle_segment",
      headerName: "Vehicle Segment",
    },
    {
      field: "premium",
      headerName: "Premium",
      valueFormatter: this._currencyFormatter,
    },
    { field: "bodily_injury_liability", headerName: "Body Injury Liability" },
    {
      field: "personal_injury_protection",
      headerName: "Personal Injury Protection",
    },
    {
      field: "property_damage_liability",
      headerName: "Property Damage Liability",
    },
    { field: "collision", headerName: "Collision" },
    { field: "comprehensive", headerName: "Comprehensive" },
    { field: "customer_gender", headerName: "Gender" },
    { field: "customer_income_group", headerName: "Income Group" },
    { field: "customer_region", headerName: "Region" },
    {
      field: "customer_marital_status",
      headerName: "Marital Status",
      valueFormatter: this._maritalStatusFormatter,
    },
  ];

  gridOptions: GridOptions = {
    context: this,
    columnDefs: this.columnDefs,
    rowSelection: "single",
    rowStyle: { cursor: "pointer" },
    deltaRowDataMode: true,
    onSelectionChanged: (event) => this.onSelectionChanged(),
    getRowNodeId: function (params) {
      return Math.round(Math.random() * 10000000).toString();
    },
  };

  private _currencyFormatter(params) {
    return "$ " + params.value;
  }

  private _maritalStatusFormatter(params) {
    const status = params.value === "0" ? "Un-married" : "Married";
    return status;
  }

  private _isoDateFormatter(params) {
    const isoDate = new Date(params.value);
    const year = isoDate.getFullYear().toString();
    let month = (1 + isoDate.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = isoDate.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return (month + "/" + day + "/" + year).toString();
  }

  onSelectionChanged() {
    if (!this.openEditForm) {
      this.selectedRow = this._gridApi.getSelectedRows();
      this.openEditForm = true;
    }
  }

  onGridReady(params) {
    this._gridApi = params.api;
    this.rowSelection = "Single";
    this._insuranceService.getAllPolicies().subscribe((data) => {
      this._gridApi.setRowData(data);
    });
  }

  getPopUpState(state: boolean) {
    this.openEditForm = state;
    // this._gridApi.deselectAll();
  }

  getUpdatedData(data: any) {
    this._gridApi.getSelectedNodes().forEach((rowNode) => {
      rowNode.setData({ ...rowNode.data, ...data });
    });
    this.openEditForm = false;
  }
}
