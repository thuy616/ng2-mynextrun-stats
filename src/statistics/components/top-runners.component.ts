import {Component, OnInit, OnChanges} from 'angular2/core';
import {Runner} from './runner';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {PaginatePipe, PaginationService, PAGINATION_DIRECTIVES} from '../../ng2-pagination/ng2-pagination';

@Component({
  directives: [PAGINATION_DIRECTIVES],
  pipes: [PaginatePipe],
  selector: 'top-runners',
  providers: [
    HTTP_PROVIDERS,
    PaginationService
  ],
  moduleId: module.id,
  templateUrl: './top-runners.component.html',
  inputs: ['country'],
  styleUrls: ['../css/materialize.min.css', './top-runners.component.css', '../css/loader.min.css']
})

export class TopRunnersComponent implements OnInit, OnChanges {
  country: string;
  public runners: Runner[] = [];

  constructor(
    private _http: Http) { }

  getTopRunners() {
    var path: string;
    path ='http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/' + this.country;

    this._http.get(path)
      .map(res => res.json())
      .subscribe(response => {
        this.runners = response;
      });

  }

  ngOnInit() {
    this.getTopRunners();
  }

  ngOnChanges() {
    this.runners = [];
    this.getTopRunners();
  }

  goBack() {
    window.history.back();
  }

}
