import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { labels } from '../../../common/language.labels';
import { menuOptions } from '../../../common/constants';
import {
  IPolicy,
  ILanguage,
  IFormOptions,
} from '../../../interfaces/interfaces';
import { InsuranceService } from '../../insurance.service';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css'],
})
export class EditPolicyComponent implements OnInit, OnDestroy {
  @Input() selectedRow: Array<IPolicy>;
  @Output() popUpClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updatedData: EventEmitter<IPolicy> = new EventEmitter<IPolicy>();

  private _subscriptions: Subscription[];

  policyForm: FormGroup;
  languageLabels: ILanguage;
  formOptions: IFormOptions;

  constructor(
    private fb: FormBuilder,
    private _insuranceService: InsuranceService
  ) {
    this.languageLabels = labels;
    this.formOptions = menuOptions;
  }

  ngOnInit() {
    this._subscriptions = [];
    this.buildForm();
    this.selectedRow[0].customer_income_group =
      this.selectedRow[0].customer_income_group.replace(/ /g, '');
    this.selectedRow[0].date_of_purchase =
      this._insuranceService.isoDateFormatter(
        this.selectedRow[0].date_of_purchase
      );
    this.policyForm.patchValue(this.selectedRow[0]);
  }

  buildForm(): void {
    this.policyForm = this.fb.group({
      policy_id: ['', Validators.required],
      customer_id: ['', Validators.required],
      fuel: ['', Validators.required],
      vehicle_segment: ['', Validators.required],
      premium: [
        '',
        [Validators.required, Validators.min(0), Validators.max(1000000)],
      ],
      bodily_injury_liability: ['', Validators.required],
      personal_injury_protection: ['', Validators.required],
      property_damage_liability: ['', Validators.required],
      collision: ['', Validators.required],
      comprehensive: ['', Validators.required],
      customer_gender: ['', Validators.required],
      customer_income_group: ['', Validators.required],
      customer_region: ['', Validators.required],
      customer_marital_status: ['', Validators.required],
      date_of_purchase: [{ value: '', disabled: true }, Validators.required],
    });
  }

  updatePolicy(): void {
    if (this.policyForm.invalid) {
      return;
    }
    const data = this.policyForm.value;
    this._subscriptions.push(
      this._insuranceService
        .updateRowInformation(data, this.selectedRow[0].policy_id)
        .subscribe(() => console.log('PUT DONE'))
    );
    this.updatedData.emit(data);
  }

  closePopUp(): void {
    this.popUpClose.emit(false);
  }

  getEditFormHeading() {
    return this.languageLabels.edit_form_heading.replace('{0}', this.selectedRow[0].policy_id);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
