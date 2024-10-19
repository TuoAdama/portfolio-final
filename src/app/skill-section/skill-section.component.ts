import { Component } from '@angular/core';
import { SkillItemComponent } from "../skill-item/skill-item.component";
import { Skill } from '../../models/Skill';

@Component({
  selector: 'app-skill-section',
  standalone: true,
  imports: [SkillItemComponent],
  templateUrl: './skill-section.component.html',
  styleUrl: './skill-section.component.css'
})
export class SkillSectionComponent {

  readonly skills: Skill[] = [
    {
      name: "Langages",
      imageUrl: "../../assets/images/icons/programming-icon.png",
      tools: "Java, PHP, TypeScript, Dart, HTML/CSS"
    },
    {
      name: "Frameworks/Librairies",
      imageUrl: "../../assets/images/icons/framework-icon.png",
      tools: "Java, PHP, TypeScript, Dart, HTML/CSS"
    },
    {
      name: "Bases de données",
      imageUrl: "../../assets/images/icons/database-icon.png",
      tools: "Java, PHP, TypeScript, Dart, HTML/CSS"
    },
    {
      name: "Cloud",
      imageUrl: "../../assets/images/icons/cloud-icon.png",
      tools: "Java, PHP, TypeScript, Dart, HTML/CSS"
    },
    {
      name: "CI/CD",
      imageUrl: "../../assets/images/icons/ci-cd.png",
      tools: "Java, PHP, TypeScript, Dart, HTML/CSS"
    },
    {
      name: "Gestion de projets",
      imageUrl: "../../assets/images/icons/gestion-projet-icon.png",
      tools: "Java, PHP, TypeScript, Dart, HTML/CSS"
    },
    {
      name: "Mobile",
      imageUrl: "../../assets/images/icons/mobile-icon.png",
      tools: "Java, PHP, TypeScript, Dart, HTML/CSS"
    },
    {
      name: "Autres",
      imageUrl: "../../assets/images/icons/other-icon.png",
      tools: "Java, PHP, TypeScript, Dart, HTML/CSS"
    },

  ]

}
