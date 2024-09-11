import {Component, inject} from '@angular/core';
import {Contact} from "../../models/Contact";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContactService} from "../services/contact.service";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactService: ContactService = inject(ContactService);

   form: FormGroup = new FormGroup({
     email: new FormControl("", [Validators.required, Validators.email]),
     title: new FormControl("", [Validators.required, Validators.minLength(3)]),
     message: new FormControl("", [Validators.required, Validators.minLength(3)]),
   })

  onSubmit(){
    if (this.form.valid) {
      this.contactService.postContact(this.form.value as Contact)
    }
  }
}
