import {Component, inject, OnInit} from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {ContactService} from "../services/contact.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    LogoComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  copyright: number = (new Date()).getFullYear();
  contactService = inject(ContactService);
  contacts: any;

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

}
