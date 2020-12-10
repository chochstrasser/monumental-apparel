import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export class CoverComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollTo(id: string) {
    const yOffset = -160;
    const element = document.getElementById(id);
    const top = element?.getBoundingClientRect().top || 0;
    const y = top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
