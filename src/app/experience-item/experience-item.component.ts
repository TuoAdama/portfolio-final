import {Component, Input, OnInit} from '@angular/core';
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
export class ExperienceItemComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.experience.length)
  }
  @Input({required: true})
  experience!: BaseExperience[];


}
