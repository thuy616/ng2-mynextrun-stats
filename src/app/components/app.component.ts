import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {DashboardComponent} from '../../statistics/components/dashboard.component';

@Component({
  selector: 'sd-app',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})

@RouteConfig([
  { path: '/', name: 'Dashboard', component: DashboardComponent }
])

export class AppComponent {}
