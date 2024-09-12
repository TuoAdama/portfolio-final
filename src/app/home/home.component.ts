import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {ExperienceItemComponent} from "../experience-item/experience-item.component";
import {ExperienceSectionComponent} from "../experience-section/experience-section.component";
import {PresentationComponent} from "../presentation/presentation.component";
import {ContactComponent} from "../contact/contact.component";
import {Experience} from "../../models/Experience";
import {FormGroup} from "@angular/forms";
import {Formation} from "../../models/Formation";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavBarComponent,
    ExperienceItemComponent,
    ExperienceSectionComponent,
    PresentationComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  readonly FRANCE: string = "France";
  readonly IVORY_COAST: string = "Côte d'Ivoire";
  readonly UNIV_RENNES: string = "Université de Rennes";
  readonly UNIV_NANGUI: string = "Université Nangui Abrogoua";

  experiences: Experience[] = [
    {
      name: "Développeur Full-Stack",
      city: "Nantes",
      country: this.FRANCE,
      company:"Orange Business Services",
      beginAt: "Mai 2023",
      endAt:"Août 2024",
    },
    {
      name: "Développeur Web",
      city: "Abidjan",
      country: this.IVORY_COAST,
      company:"Orange Business Services",
      beginAt: "Juin 2021",
      endAt:"Sept 2022",
    },
    {
      name: "Architecte et testeur logiciels",
      city: "Nantes",
      country: this.IVORY_COAST,
      company:"Kip Services & Technologies · Stage",
      beginAt: "Sept. 2023",
      endAt:"Août 2024",
    }
  ];

  formations: Formation[] = [
    {
      name: "Master MIAGE",
      city: "Rennes",
      country: this.FRANCE,
      schoolName:this.UNIV_RENNES,
      beginAt: "Sept. 2022",
      endAt:"Août 2024",
    },
    {
      name: "Master Génie Informatique (GI)",
      city: "Abidjan",
      country: this.IVORY_COAST,
      schoolName: this.UNIV_NANGUI,
      beginAt: "Sept. 2019",
      endAt:"Août 2021",
    },
    {
      name: "Architecte et testeur logiciels",
      city: "Nantes",
      country: this.IVORY_COAST,
      schoolName:this.UNIV_NANGUI,
      beginAt: "Sept. 2016",
      endAt:"Août 2019",
    }
  ]
}
