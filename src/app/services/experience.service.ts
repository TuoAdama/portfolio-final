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
      iconUrl: "assets/images/obs.webp",
    },
    {
      id: 2,
      name: "Développeur Web",
      city: "Abidjan",
      country: this.IVORY_COAST,
      structureName:"OneMart",
      beginAt: "Juin 2021",
      endAt:"2022",
      iconUrl: "assets/images/onemart.jpg",
    },
    {
      id: 3,
      name: "Architecte logiciel",
      city: "Abidjan",
      country: this.IVORY_COAST,
      structureName:"EKip Services",
      beginAt: "2023",
      endAt:"2024",
      iconUrl: "assets/images/ekip.png",
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
      iconUrl: "assets/images/rennes1.png"
    },
    {
      id: 2,
      name: "Master Génie Informatique (GI)",
      city: "Abidjan",
      country: this.IVORY_COAST,
      structureName: this.UNIV_NANGUI,
      beginAt: "2019",
      endAt:"2021",
      iconUrl: "assets/images/una.png"
    },
    {
      id: 3,
      name: "Licence informatique",
      city: "Abidjan",
      country: this.IVORY_COAST,
      structureName:this.UNIV_NANGUI,
      beginAt: "2016",
      endAt:"2019",
      iconUrl: "assets/images/una.png"
    }
  ]

  getFormations(): Formation[]{
    return this.formations;
  }

  getExperiences(): Experience[] {
    return this.experiences;
  }
}
