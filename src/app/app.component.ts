import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faDungeon } from '@fortawesome/free-solid-svg-icons';
import { faMountainSun } from '@fortawesome/free-solid-svg-icons';
import { faShield } from '@fortawesome/free-solid-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { Observable, finalize, tap } from 'rxjs';

type houseName = { 
  name: string
  houseName:string;
  region:string;
  coatOfArms:string;
  words:string; 
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-game-of-thrones-houses';

  houseNames: Array<houseName> = [];
  loading: boolean = false;
  light: boolean = false;
  selected: boolean = false;
  fadeAway: boolean = false;

  selectedHouse: any;
  houseName:string = '';
  region:string = '';
  coatOfArms:string = '';
  words:string = '';

  faDungeon = faDungeon;
  faMountainSun = faMountainSun;
  faShield = faShield;
  faQuoteRight = faQuoteRight;
  faQuoteLeft = faQuoteLeft;
  faSun = faSun;
  faMoon = faMoon;

  constructor(
    private _http: HttpClient,
    private render: Renderer2,
    private element: ElementRef
  ) {}

  ngOnInit() {
    this.fetchData()
      .pipe(
        tap((data: any) => console.log(data)),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (houseNames: Array<houseName>) => (this.houseNames = houseNames)
      );
  }

  fetchData(): Observable<Array<houseName>> {
    this.loading = true;
    return this._http.get<Array<houseName>>(
      'https://www.anapioficeandfire.com/api/houses/'
    );
  }

  onChosenHouse() {
    this.selectedHouse = this.houseNames
  }

  getHouse() {
    this.fadeAway = true;
    setTimeout(() => {
      this.houseName = '';
      this.region = '';
      this.coatOfArms = '';
      this.words = '';
    }, 900);
    setTimeout(() => {
      this.selected = false;
      this.fadeAway = false;
      this.selected = true;
      this.houseName = this.selectedHouse.name;
      this.region = this.selectedHouse.region;
      this.coatOfArms = this.selectedHouse.coatOfArms;
      this.words = this.selectedHouse.words;
    }, 1000);
  }

  toggleTheme() {
    this.light = !this.light;
    this.render.addClass(
      this.element.nativeElement.ownerDocument.body,
      'light'
    );
  }
}
