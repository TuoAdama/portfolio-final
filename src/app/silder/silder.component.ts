import {Component, OnInit} from '@angular/core';
import Swiper from "swiper";

@Component({
  selector: 'app-silder',
  standalone: true,
  imports: [],
  templateUrl: './silder.component.html',
  styleUrl: './silder.component.css'
})
export class SilderComponent implements OnInit{
  ngOnInit(): void {
    let swiper = new Swiper(".default-carousel", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}
