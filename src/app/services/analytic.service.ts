import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {
  httpClient: HttpClient = inject(HttpClient);

  analytics(): Observable<any> {
    return this.httpClient.post(environment.apiUrl+"/analytics", null)
  }
}
