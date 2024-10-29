import { Component, Input } from '@angular/core';
import { Skill } from '../../models/Skill';

@Component({
  selector: 'app-skill-item',
  standalone: true,
  imports: [],
  templateUrl: './skill-item.component.html',
  styleUrl: './skill-item.component.css'
})
export class SkillItemComponent {
  @Input({required: true})
  skill!: Skill;
}
