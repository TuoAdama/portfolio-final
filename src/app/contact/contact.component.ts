import {Component, inject, Input, OnInit} from '@angular/core';
import {Contact} from "../../models/Contact";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContactService} from "../services/contact.service";
import {NgOptimizedImage, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    SlicePipe,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{

  contactService: ContactService = inject(ContactService);
  showCommentSendMessage: boolean = false;
  contacts!: any;
  demo: string = "Tuo";

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

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

  getSocialName(link: string): string {
    return link.substring(link.lastIndexOf("/")+1);
  }
}
