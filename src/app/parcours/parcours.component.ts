import {Component, inject, OnInit} from '@angular/core';
import {ExperienceService} from "../services/experience.service";

interface TimelineItem {
  id: number;
  name: string;
  city: string;
  country: string;
  iconUrl?: string;
  beginAt: string;
  endAt: string;
  description?: string;
  structureName?: string;
  type: 'experience' | 'formation';
}

@Component({
  selector: 'app-parcours',
  standalone: true,
  imports: [],
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.css']
})
export class ParcoursComponent implements OnInit{

  experienceService: ExperienceService = inject(ExperienceService);
  experiences: TimelineItem[] = [];
  formations: TimelineItem[] = [];

  // Fonction pour extraire l'année d'une date
  private getYear(dateStr: string): number {
    const yearMatch = dateStr.match(/\d{4}/);
    return yearMatch ? parseInt(yearMatch[0], 10) : 0;
  }

  // Fonction pour trier par date
  private sortByDate(items: TimelineItem[]): TimelineItem[] {
    return items.sort((a, b) => {
      const yearA = this.getYear(a.endAt);
      const yearB = this.getYear(b.endAt);
      
      if (yearB !== yearA) {
        return yearB - yearA; // Plus récent en premier
      }
      
      const beginYearA = this.getYear(a.beginAt);
      const beginYearB = this.getYear(b.beginAt);
      return beginYearB - beginYearA;
    });
  }

  ngOnInit(): void {
    const experiencesData = this.experienceService.getExperiences();
    const formationsData = this.experienceService.getFormations();

    // Mapper et trier les expériences
    this.experiences = this.sortByDate(
      experiencesData.map(exp => ({
        id: exp.id,
        name: String(exp.name),
        city: String(exp.city),
        country: exp.country,
        iconUrl: exp.iconUrl ? String(exp.iconUrl) : undefined,
        beginAt: String(exp.beginAt),
        endAt: String(exp.endAt),
        description: exp.description ? String(exp.description) : undefined,
        structureName: exp.structureName ? String(exp.structureName) : undefined,
        type: 'experience' as const
      }))
    );

    // Mapper et trier les formations
    this.formations = this.sortByDate(
      formationsData.map(formation => ({
        id: formation.id,
        name: String(formation.name),
        city: String(formation.city),
        country: formation.country,
        iconUrl: formation.iconUrl ? String(formation.iconUrl) : undefined,
        beginAt: String(formation.beginAt),
        endAt: String(formation.endAt),
        description: formation.description ? String(formation.description) : undefined,
        structureName: formation.structureName ? String(formation.structureName) : undefined,
        type: 'formation' as const
      }))
    );
  }
}
