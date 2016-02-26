import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { TopRunnersComponent } from './top-runners.component';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/add/operator/map';

@Component({
  directives: [TopRunnersComponent],
  selector: 'mnr-countries',
  providers: [
    HTTP_PROVIDERS
  ],
  moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['../css/materialize.min.css','./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  title = 'List of Countries';
  selectedCountry: string = '';
  countries: string[] = [];

  onSelect(country: string) {
    this.selectedCountry = country;
    console.log('selected country: ' + this.selectedCountry);
  }

  constructor (
    private _router: Router,
    private _http: Http) { }

  getCountries() {
    this._http.get('https://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/')
      .map(res => res.json())
      .subscribe(response => {
        this.countries = response;
      });
  }

  ngOnInit() {
    this.getCountries();
  }

  seeTopRunners() {
    this._router.navigate(['TopRunner', { country: this.selectedCountry }]);
  }
}



