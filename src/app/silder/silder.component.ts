import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  QueryList,
  OnDestroy,
  ViewChild, ViewChildren
} from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-silder',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './silder.component.html',
  styleUrl: './silder.component.css'
})
export class SilderComponent implements OnInit, AfterViewInit, OnDestroy{
  @ViewChildren('slideItem') slidesItems!: QueryList<ElementRef>;
  index: number = 0;
  indexActive = 1;
  intervalId: any;

  ngAfterViewInit(): void {
    this.intervalId = setInterval(() => {
      console.log(this.index++);
    }, 2000);
  }

  ngOnInit(): void {
    console.log("Coucou la planete")
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }


}
