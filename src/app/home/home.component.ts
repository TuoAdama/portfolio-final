import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {ExperienceItemComponent} from "../experience-item/experience-item.component";
import {ExperienceSectionComponent} from "../experience-section/experience-section.component";
import {PresentationComponent} from "../presentation/presentation.component";
import {ContactComponent} from "../contact/contact.component";
import {Experience} from "../../models/Experience";
import {FormGroup} from "@angular/forms";
import {Formation} from "../../models/Formation";
import {FooterComponent} from "../footer/footer.component";
import {SilderComponent} from "../silder/silder.component";
import { SkillSectionComponent } from "../skill-section/skill-section.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavBarComponent,
    ExperienceItemComponent,
    ExperienceSectionComponent,
    PresentationComponent,
    ContactComponent,
    FooterComponent,
    SilderComponent,
    SkillSectionComponent,
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
      beginAt: "2023",
      endAt:"2024",
      iconUrl: "https://reseaux.orange-business.com/wp-content/uploads/2022/03/favicon.png",
    },
    {
      name: "Développeur Web",
      city: "Abidjan",
      country: this.IVORY_COAST,
      company:"OneMart Distributors",
      beginAt: "Juin 2021",
      endAt:"2022",
      iconUrl: "https://media.licdn.com/dms/image/v2/C4D0BAQFggP8cthzMsg/company-logo_200_200/company-logo_200_200/0/1672473629862/onemart_distributors_logo?e=1734566400&v=beta&t=v6TEQrupuoPgCehgzZLatFhS-vWvyoxpQNvgZsB1QfM"
    },
    {
      name: "Architecte et testeur logiciels",
      city: "Abidjan",
      country: this.IVORY_COAST,
      company:"Kip Services & Technologies",
      beginAt: "2023",
      endAt:"2024",
      iconUrl: "https://media.licdn.com/dms/image/v2/C4E0BAQF2N1S2LYm81Q/company-logo_200_200/company-logo_200_200/0/1677783941943?e=1734566400&v=beta&t=FrdEYLhhsPzk8VUAB64xTLz9INiJFe9EGk-9bR9HYXM",
    }
  ];

  formations: Formation[] = [
    {
      name: "Master MIAGE",
      city: "Rennes",
      country: this.FRANCE,
      schoolName:this.UNIV_RENNES,
      beginAt: "2022",
      endAt:"2024",
      iconUrl: "https://upload.wikimedia.org/wikipedia/fr/thumb/6/6c/Logo_Universit%C3%A9_Rennes_1_.svg/1200px-Logo_Universit%C3%A9_Rennes_1_.svg.png"
    },
    {
      name: "Master Génie Informatique (GI)",
      city: "Abidjan",
      country: this.IVORY_COAST,
      schoolName: this.UNIV_NANGUI,
      beginAt: "2019",
      endAt:"2021",
      iconUrl: "https://upload.wikimedia.org/wikipedia/fr/1/15/Logotype_Universit%C3%A9_Nangui_Abrogoua.png"
    },
    {
      name: "Licence informatique",
      city: "Abidjan",
      country: this.IVORY_COAST,
      schoolName:this.UNIV_NANGUI,
      beginAt: "2016",
      endAt:"2019",
      iconUrl: "https://upload.wikimedia.org/wikipedia/fr/1/15/Logotype_Universit%C3%A9_Nangui_Abrogoua.png"
    }
  ]
  protected readonly Date = Date;

}
