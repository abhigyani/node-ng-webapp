import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPolicy } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  private _hostUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) {}

  getAllPolicies(): Observable<IPolicy[]> {
    return this._http.get<IPolicy[]>(this._hostUrl);
  }

  getPolicyByRegion(region: string): Observable<IPolicy[]> {
    const url = `${this._hostUrl}/region/${region}`;
    return this._http.get<IPolicy[]>(url);
  }

  updateRowInformation(data: IPolicy, currentPolicyId: string): Observable<IPolicy[]> {
    const url = `${this._hostUrl}/update/${currentPolicyId}`;
    return this._http.put<IPolicy[]>(url, data);
  }

  isoDateFormatter(date: string): string {
    const isoDate = new Date(date);
    const year = isoDate.getFullYear().toString();
    let month = (1 + isoDate.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = isoDate.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return (month + '/' + day + '/' + year).toString();
  }
}
