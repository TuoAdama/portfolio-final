import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from "rxjs";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {FooterComponent} from "./footer/footer.component";
import {environment} from "../environments/environment";
import {isPlatformBrowser} from "@angular/common";


declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Accueil';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {


    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          gtag('config', environment.googleAnalyticsId, {
            'page_path': event.urlAfterRedirects
          });
        });
    }
  }
}
