import {inject, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  getContacts(): any{
    return  {
      email: "tuoadama17@gmail.com",
      number: "+33 7 51 09 71 77",
      linkedIn: "https://www.linkedin.com/in/adama-tuo-6a8132a1",
      github: "https://github.com/TuoAdama",
      twitter: "https://x.com/demci_tuo",
    }
  }

}
