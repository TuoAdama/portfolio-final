import {inject, Injectable} from '@angular/core';
import {Contact} from "../../models/Contact";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  httpClient: HttpClient = inject(HttpClient);

  postContact(contact: Contact){
    console.log({contact, client: this.httpClient})
  }

}
