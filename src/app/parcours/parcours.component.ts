import {Component, inject, OnInit} from '@angular/core';
import {ProjectItemComponent} from "../project-item/project-item.component";
import {ExperienceItemComponent} from "../experience-item/experience-item.component";
import {ExperienceService} from "../services/experience.service";
import {Experience} from "../../models/Experience";
import {Formation} from "../../models/Formation";

@Component({
  selector: 'app-parcours',
  standalone: true,
  imports: [
    ProjectItemComponent,
    ExperienceItemComponent
  ],
  templateUrl: './parcours.component.html',
  styleUrl: './parcours.component.css'
})
export class ParcoursComponent implements OnInit{

  experienceService: ExperienceService = inject(ExperienceService);
  experiences: Experience[] = [];
  formations: Formation[] = [];
  ngOnInit(): void {
      this.experiences = this.experienceService.getExperiences();
      this.formations = this.experienceService.getFormations();
  }
}
