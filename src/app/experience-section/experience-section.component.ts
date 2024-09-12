import {Component, Input} from '@angular/core';
import {ExperienceItemComponent} from "../experience-item/experience-item.component";
import {BaseExperience} from "../../models/BaseExperience";

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [
    ExperienceItemComponent
  ],
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.css'
})
export class ExperienceSectionComponent {
  @Input({required: true}) name: string = "";
  @Input({required: true}) items: BaseExperience[] | undefined;
}
