import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

@Injectable()
export class StatsService {
  public http:Http;
  public PATH:string = 'https://api-test.mynextrun.com/site/v1/profile-stats/countries/';
  constructor(http:Http) {
    this.http=http;
  }

  countries: string[] = [];

  getCountries() {
    return this.http.get(this.PATH).toPromise()
      .then((response) => response.json());
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

  getTopRunners(country: string) {
    var runner_path: string;
    runner_path = this.PATH + country;
    return this.http.get(runner_path).toPromise().then(res => res.json());
  }

  goBack() {
    window.history.back();
  }
}
