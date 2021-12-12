import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IPolicy } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class InsuranceService {
  private _hostUrl = "http://localhost:3000";

  constructor(private _http: HttpClient) {}

  getAllPolicies() {
    return this._http.get(this._hostUrl);
  }

  getPolicyByRegion(region: string) {
    const url = `${this._hostUrl}/region/${region}`;
    return this._http.get(url);
  }

  updateRowInformation(data: IPolicy, currentPolicyId: string) {
    const url = `${this._hostUrl}/update/${currentPolicyId}`;
    return this._http.put(url, data);
  }
}
