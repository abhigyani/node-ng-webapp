import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  ColDef,
  GridOptions,
  GridApi,
  RowNode,
  GridReadyEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import { Subscription } from 'rxjs';

import { InsuranceService } from '../insurance.service';
import { labels } from '../../common/language.labels';
import { ECommon, EBoolean } from '../../enums/insurance.enum';
import { ILanguage, IPolicy } from '../../interfaces/interfaces';
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit, OnDestroy {
  private _gridApi: GridApi;
  private _subscriptions: Subscription[];

  columnDefs: ColDef[];
  gridOptions: GridOptions;
  languageLabels: ILanguage;
  openEditForm: boolean;
  rowSelection: string;
  selectedRow: Array<IPolicy>;

  constructor(private _insuranceService: InsuranceService) {
    this.languageLabels = labels;
    this._setGridColumns();
    this._setGridOptions();
  }

  ngOnInit() {
    this._subscriptions = [];
    this.selectedRow = null;
    this.openEditForm = false;
  }

  private _setGridOptions = (): void => {
    this.gridOptions = {
      context: this,
      columnDefs: this.columnDefs,
      rowSelection: ECommon.SINGLE,
      rowStyle: { cursor: 'pointer' },
      deltaRowDataMode: true,
      onSelectionChanged: () => this.onSelectionChanged(),
      getRowNodeId() {
        return Math.round(Math.random() * 10000000).toString();
      },
    };
  };

  private _setGridColumns(): void {
    this.columnDefs = [
      { field: 'policy_id', headerName: this.languageLabels.policy_id },
      {
        field: 'date_of_purchase',
        headerName: this.languageLabels.date_of_purchase,
        valueFormatter: this._isoDateFormatter,
      },
      {
        field: 'customer_id',
        headerName: this.languageLabels.date_of_purchase,
      },
      { field: 'fuel', headerName: this.languageLabels.fuel },
      {
        field: 'vehicle_segment',
        headerName: this.languageLabels.vehicle_segment,
      },
      {
        field: 'premium',
        headerName: this.languageLabels.premium,
        valueFormatter: this._currencyFormatter,
      },
      {
        field: 'bodily_injury_liability',
        headerName: this.languageLabels.bodily_injury_liability,
        valueFormatter: this._booleanFormatter,
      },
      {
        field: 'personal_injury_protection',
        headerName: this.languageLabels.personal_injury_protection,
        valueFormatter: this._booleanFormatter,
      },
      {
        field: 'property_damage_liability',
        headerName: this.languageLabels.property_damage_liability,
        valueFormatter: this._booleanFormatter,
      },
      {
        field: 'collision',
        headerName: this.languageLabels.collision,
        valueFormatter: this._booleanFormatter,
      },
      {
        field: 'comprehensive',
        headerName: this.languageLabels.comprehensive,
        valueFormatter: this._booleanFormatter,
      },
      {
        field: 'customer_gender',
        headerName: this.languageLabels.customer_gender,
      },
      {
        field: 'customer_income_group',
        headerName: this.languageLabels.customer_income_group,
      },
      {
        field: 'customer_region',
        headerName: this.languageLabels.customer_region,
      },
      {
        field: 'customer_marital_status',
        headerName: this.languageLabels.customer_marital_status,
        valueFormatter: this._maritalStatusFormatter,
      },
    ];
  }

  private _currencyFormatter = (params: ValueFormatterParams): string => {
    return '$ ' + params.value;
  };

  private _maritalStatusFormatter = (params: ValueFormatterParams): string => {
    const status =
      params.value === EBoolean.FALSE
        ? this.languageLabels.unmarried
        : this.languageLabels.married;
    return status;
  };

  private _isoDateFormatter = (params: ValueFormatterParams): string => {
    const isoDate = new Date(params.value);
    const year = isoDate.getFullYear().toString();
    let month = (1 + isoDate.getMonth()).toString();
    let day = isoDate.getDate().toString();

    month = month.length > 1 ? month : '0' + month;
    day = day.length > 1 ? day : '0' + day;

    return (month + '/' + day + '/' + year).toString();
  };

  private _booleanFormatter = (params: ValueFormatterParams): string => {
    const value = params.value;
    return value === EBoolean.FALSE
      ? this.languageLabels.no
      : this.languageLabels.yes;
  };

  onSelectionChanged(): void {
    if (!this.openEditForm) {
      this.selectedRow = this._gridApi.getSelectedRows();
      this.openEditForm = true;
    }
  }

  onGridReady(params: GridReadyEvent): void {
    this._gridApi = params.api;
    this.rowSelection = ECommon.SINGLE;
    this._subscriptions.push(
      this._insuranceService.getAllPolicies().subscribe((data: IPolicy[]) => {
        this._gridApi.setRowData(data);
      })
    );
  }

  getPopUpState(state: boolean): void {
    this.openEditForm = state;
    // this._gridApi.deselectAll();
  }

  getUpdatedData(data: IPolicy): void {
    this._gridApi.getSelectedNodes().forEach((rowNode: RowNode) => {
      rowNode.setData({ ...rowNode.data, ...data });
    });
    this.openEditForm = false;
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
