import { Component } from '@angular/core';
import {ProjectItemComponent} from "../project-item/project-item.component";
import {ExperienceItemComponent} from "../experience-item/experience-item.component";

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

}
