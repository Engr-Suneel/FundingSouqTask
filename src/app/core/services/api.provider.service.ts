import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ApiProvider {

  constructor(
    private http: HttpClient,
  ) {
  }

  _addHeader() {
    let headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };
    return new HttpHeaders(headers)
  }

  _addHeaderWithMultiPart() {
    let headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*"
    };
    return new HttpHeaders(headers)
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this._addHeader() });
  }

  getWithParams<T>(url: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(url, { headers: this._addHeader(), params });
  }

  post<T>(url: string, payload: any): Observable<T> {
    return this.http.post<T>(url, payload, { headers: this._addHeader() });
  }

  postWithFormData<T>(url: string, formData: FormData): Observable<T> {
    return this.http.post<T>(url, formData);
  }

  postWithFormDataDocument<T>(url: string, formData: FormData): Observable<HttpEvent<T>> {
    const uploadReq = new HttpRequest('POST', url, formData, {
      reportProgress: true,
    });
    return this.http.request(uploadReq);
  }

  put<T>(url: string, payload: any): Observable<T> {
    return this.http.put<T>(url, payload, { headers: this._addHeader() });
  }

  patch<T>(url: string, payload: any): Observable<T> {
    return this.http.patch<T>(url, payload, { headers: this._addHeader() });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, { headers: this._addHeader() });
  }

  postWithUrlEncoded<T>(url: string, params: HttpParams, httpOptions: any): Observable<T> {
    return this.http.post<T>(url, params, { headers: httpOptions });
  }

  getBlob(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }
}