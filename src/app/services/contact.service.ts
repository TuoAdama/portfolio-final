import {inject, Injectable} from '@angular/core';
import {Contact} from "../../models/Contact";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  httpClient: HttpClient = inject(HttpClient);

  postContact(contact: Contact): Observable<any> {
    return this.httpClient.post(environment.apiUrl+"/comments", contact, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }

}
