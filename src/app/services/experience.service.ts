import { Injectable } from '@angular/core';
import {Experience} from "../../models/Experience";
import {Formation} from "../../models/Formation";

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  readonly FRANCE: string = "France";
  readonly IVORY_COAST: string = "Côte d'Ivoire";
  readonly UNIV_RENNES: string = "Université de Rennes";
  readonly UNIV_NANGUI: string = "Université Nangui Abrogoua";


  experiences: Experience[] = [
    {
      id: 1,
      name: "Dev. Fullstack",
      city: "Nantes",
      country: this.FRANCE,
      structureName:"Orange Business",
      beginAt: "2023",
      endAt:"2024",
      iconUrl: "https://reseaux.orange-business.com/wp-content/uploads/2022/03/favicon.png",
    },
    {
      id: 2,
      name: "Développeur Web",
      city: "Abidjan",
      country: this.IVORY_COAST,
      structureName:"OneMart",
      beginAt: "Juin 2021",
      endAt:"2022",
      iconUrl: "https://media.licdn.com/dms/image/v2/C4D0BAQFggP8cthzMsg/company-logo_200_200/company-logo_200_200/0/1672473629862/onemart_distributors_logo?e=1734566400&v=beta&t=v6TEQrupuoPgCehgzZLatFhS-vWvyoxpQNvgZsB1QfM"
    },
    {
      id: 3,
      name: "Architecte logiciel",
      city: "Abidjan",
      country: this.IVORY_COAST,
      structureName:"EKip Services",
      beginAt: "2023",
      endAt:"2024",
      iconUrl: "https://media.licdn.com/dms/image/v2/C4E0BAQF2N1S2LYm81Q/company-logo_200_200/company-logo_200_200/0/1677783941943?e=1734566400&v=beta&t=FrdEYLhhsPzk8VUAB64xTLz9INiJFe9EGk-9bR9HYXM",
    }
  ];

  formations: Formation[] = [
    {
      id: 1,
      name: "Master MIAGE",
      city: "Rennes",
      country: this.FRANCE,
      structureName:this.UNIV_RENNES,
      beginAt: "2022",
      endAt:"2024",
      iconUrl: "https://upload.wikimedia.org/wikipedia/fr/thumb/6/6c/Logo_Universit%C3%A9_Rennes_1_.svg/1200px-Logo_Universit%C3%A9_Rennes_1_.svg.png"
    },
    {
      id: 2,
      name: "Master Génie Informatique (GI)",
      city: "Abidjan",
      country: this.IVORY_COAST,
      structureName: this.UNIV_NANGUI,
      beginAt: "2019",
      endAt:"2021",
      iconUrl: "https://upload.wikimedia.org/wikipedia/fr/1/15/Logotype_Universit%C3%A9_Nangui_Abrogoua.png"
    },
    {
      id: 3,
      name: "Licence informatique",
      city: "Abidjan",
      country: this.IVORY_COAST,
      structureName:this.UNIV_NANGUI,
      beginAt: "2016",
      endAt:"2019",
      iconUrl: "https://upload.wikimedia.org/wikipedia/fr/1/15/Logotype_Universit%C3%A9_Nangui_Abrogoua.png"
    }
  ]

  getFormations(): Formation[]{
    return this.formations;
  }

  getExperiences(): Experience[] {
    return this.experiences;
  }
}
