import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
   readonly networks = {
     github: "https://github.com/TuoAdama",
     twitter: "https://x.com/demci_tuo",
     linkedin: "https://www.linkedin.com/in/adama-tuo-6a8132a1",
  }
}
