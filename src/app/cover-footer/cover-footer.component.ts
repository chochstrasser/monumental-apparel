import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover-footer',
  templateUrl: './cover-footer.component.html',
  styleUrls: ['./cover-footer.component.scss'],
})
export class CoverFooterComponent implements OnInit {
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
