import {Component, Input} from '@angular/core';
import {BaseExperience} from "../../models/BaseExperience";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './experience-item.component.html',
  styleUrl: './experience-item.component.css'
})
export class ExperienceItemComponent {

  @Input({required: true})
  experience!: BaseExperience[];

  @Input({required: true})
  name!: string;

}
