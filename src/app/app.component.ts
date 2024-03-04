import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faDungeon } from '@fortawesome/free-solid-svg-icons';
import { faMountainSun } from '@fortawesome/free-solid-svg-icons';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { Observable, finalize } from 'rxjs';
import { DOCUMENT } from '@angular/common';

type House = {
  name: string;
  houseName: string;
  region: string;
  coatOfArms: string;
  words: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-game-of-thrones-houses';

  houses: Array<House> = [];
  loading: boolean = false;
  light: boolean = false;
  selected: boolean = false;
  fadeAway: boolean = false;

  selectedHouse: House | null = null;
  printedHouse: House | null = null;

  faDungeon = faDungeon;
  faMountainSun = faMountainSun;
  faShield = faShield;
  faQuoteRight = faQuoteRight;
  faQuoteLeft = faQuoteLeft;
  faSun = faSun;
  faMoon = faMoon;

  constructor(
    private _http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.fetchData()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((houses: Array<House>) => (this.houses = houses));
  }

  private fetchData(): Observable<Array<House>> {
    this.loading = true;
    return this._http.get<Array<House>>(
      'https://www.anapioficeandfire.com/api/houses'
    );
  }

  getHouse() {
    this.fadeAway = true;
    setTimeout(() => {
      this.selected = false;
    }, 900);
    setTimeout(() => {
      this.selected = true;
      this.fadeAway = false;
      this.printedHouse = this.selectedHouse;
    }, 1000);
  }

  toggleTheme() {
    this.light = !this.light;
    this.document.body.classList.toggle('light');
  }
}
