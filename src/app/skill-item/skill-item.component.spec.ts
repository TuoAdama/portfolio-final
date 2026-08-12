import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillItemComponent } from './skill-item.component';

describe('SkillItemComponent', () => {
  let component: SkillItemComponent;
  let fixture: ComponentFixture<SkillItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('skill', {
      name: 'Angular',
      imageUrl: '/assets/images/icons/framework-icon.png',
      tools: 'TypeScript',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
