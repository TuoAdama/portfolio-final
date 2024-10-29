import {Component, inject} from '@angular/core';
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
export class ParcoursComponent {
  experienceService: ExperienceService = inject(ExperienceService);
  experiences: Experience[] = [];
  formations: Formation[] = [];
}
