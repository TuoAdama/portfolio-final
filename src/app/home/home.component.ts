import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {ExperienceItemComponent} from "../experience-item/experience-item.component";
import {ExperienceSectionComponent} from "../experience-section/experience-section.component";
import {PresentationComponent} from "../presentation/presentation.component";
import {FooterComponent} from "../footer/footer.component";
import {SilderComponent} from "../silder/silder.component";
import { SkillSectionComponent } from "../skill-section/skill-section.component";
import {ProjectComponent} from "../project/project.component";
import {TechnoComponent} from "../techno/techno.component";
import {ProjectItemComponent} from "../project-item/project-item.component";
import {ParcoursComponent} from "../parcours/parcours.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NavBarComponent,
    ExperienceItemComponent,
    ExperienceSectionComponent,
    PresentationComponent,
    FooterComponent,
    SilderComponent,
    SkillSectionComponent,
    ProjectComponent,
    TechnoComponent,
    ProjectItemComponent,
    ParcoursComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
