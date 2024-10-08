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
  showCommentSendMessage: boolean = false;

   form: FormGroup = new FormGroup({
     email: new FormControl("", [Validators.required, Validators.email]),
     subject: new FormControl("", [Validators.required, Validators.minLength(3)]),
     body: new FormControl("", [Validators.required, Validators.minLength(3)]),
   })

  onSubmit(){
    if (this.form.valid) {
      this.contactService.postContact(this.form.value as Contact)
        .pipe()
        .subscribe((value: any) => {
          this.form.reset();
          this.showCommentSendMessage = true
        }, error => {
          alert(error.toString())
        })
    }
  }
}
