import {Component, Input, OnInit} from '@angular/core';
import {BaseExperience} from "../../models/BaseExperience";

@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [],
  templateUrl: './experience-item.component.html',
  styleUrl: './experience-item.component.css'
})
export class ExperienceItemComponent implements OnInit {
  @Input({required:true}) item: BaseExperience|undefined;
  structureName: string = "";
  ngOnInit() {
    this.structureName = this.getName(this.item);
  }

  getName(data: any){
    if("company" in data){
      return data.company;
    }
    return data.schoolName;
  }
}
