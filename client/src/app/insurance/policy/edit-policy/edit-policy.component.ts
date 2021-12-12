import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

import { labels } from "../../../language.labels";
import { menuOptions } from "../../../constants";
import { IPolicy } from "../../../interfaces";
import { InsuranceService } from "../../insurance.service";

@Component({
  selector: "app-edit-policy",
  templateUrl: "./edit-policy.component.html",
  styleUrls: ["./edit-policy.component.css"],
})
export class EditPolicyComponent implements OnInit {
  @Input() selectedRow = null;
  @Output() popUpClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updatedData: EventEmitter<IPolicy> = new EventEmitter<IPolicy>();
  policyForm: FormGroup;
  languageLabels: any;
  formOptions: any;

  constructor(
    private fb: FormBuilder,
    private _insuranceService: InsuranceService
  ) {
    this.languageLabels = labels;
    this.formOptions = menuOptions;
  }

  ngOnInit() {
    this.buildForm();
    this.selectedRow[0].customer_income_group =
      this.selectedRow[0].customer_income_group.replace(/ /g, "");
    this.selectedRow[0].date_of_purchase =
      this._insuranceService.isoDateFormatter(
        this.selectedRow[0].date_of_purchase
      );
    this.policyForm.patchValue(this.selectedRow[0]);
  }

  buildForm() {
    this.policyForm = this.fb.group({
      policy_id: ["", Validators.required],
      customer_id: ["", Validators.required],
      fuel: ["", Validators.required],
      vehicle_segment: ["", Validators.required],
      premium: [
        "",
        [Validators.required, Validators.min(0), Validators.max(1000000)],
      ],
      bodily_injury_liability: ["", Validators.required],
      personal_injury_protection: ["", Validators.required],
      property_damage_liability: ["", Validators.required],
      collision: ["", Validators.required],
      comprehensive: ["", Validators.required],
      customer_gender: ["", Validators.required],
      customer_income_group: ["", Validators.required],
      customer_region: ["", Validators.required],
      customer_marital_status: ["", Validators.required],
      date_of_purchase: [{ value: "", disabled: true }, Validators.required],
    });
  }

  updatePolicy() {
    if (this.policyForm.invalid) {
      return;
    }
    const data = this.policyForm.value;
    this._insuranceService
      .updateRowInformation(data, this.selectedRow[0].policy_id)
      .subscribe((data) => console.log("PUT DONE"));
    this.updatedData.emit(data);
  }

  closePopUp() {
    this.popUpClose.emit(false);
  }
}
