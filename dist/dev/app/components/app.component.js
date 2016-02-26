"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var navbar_component_1 = require('./navbar.component');
var toolbar_component_1 = require('./toolbar.component');
var dashboard_component_1 = require('../../statistics/components/dashboard.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'sd-app',
            viewProviders: [],
            moduleId: module.id,
            templateUrl: './app.component.html',
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [router_1.ROUTER_DIRECTIVES, navbar_component_1.NavbarComponent, toolbar_component_1.ToolbarComponent]
        }),
        router_1.RouteConfig([
            { path: '/', name: 'Dashboard', component: dashboard_component_1.DashboardComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL2FwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCx1QkFBNkMsaUJBQWlCLENBQUMsQ0FBQTtBQUMvRCxpQ0FBOEIsb0JBQW9CLENBQUMsQ0FBQTtBQUNuRCxrQ0FBK0IscUJBQXFCLENBQUMsQ0FBQTtBQUNyRCxvQ0FBaUMsaURBQWlELENBQUMsQ0FBQTtBQWVuRjtJQUFBO0lBQTJCLENBQUM7SUFiNUI7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFFBQVE7WUFDbEIsYUFBYSxFQUFFLEVBQUU7WUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7WUFDckMsVUFBVSxFQUFFLENBQUMsMEJBQWlCLEVBQUUsa0NBQWUsRUFBRSxvQ0FBZ0IsQ0FBQztTQUNuRSxDQUFDO1FBRUQsb0JBQVcsQ0FBQztZQUNYLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSx3Q0FBa0IsRUFBRTtTQUNoRSxDQUFDOztvQkFBQTtJQUV5QixtQkFBQztBQUFELENBQTNCLEFBQTRCLElBQUE7QUFBZixvQkFBWSxlQUFHLENBQUEiLCJmaWxlIjoiYXBwL2NvbXBvbmVudHMvYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1JPVVRFUl9ESVJFQ1RJVkVTLCBSb3V0ZUNvbmZpZ30gZnJvbSAnYW5ndWxhcjIvcm91dGVyJztcbmltcG9ydCB7TmF2YmFyQ29tcG9uZW50fSBmcm9tICcuL25hdmJhci5jb21wb25lbnQnO1xuaW1wb3J0IHtUb29sYmFyQ29tcG9uZW50fSBmcm9tICcuL3Rvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7RGFzaGJvYXJkQ29tcG9uZW50fSBmcm9tICcuLi8uLi9zdGF0aXN0aWNzL2NvbXBvbmVudHMvZGFzaGJvYXJkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NkLWFwcCcsXG4gIHZpZXdQcm92aWRlcnM6IFtdLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogJy4vYXBwLmNvbXBvbmVudC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZGlyZWN0aXZlczogW1JPVVRFUl9ESVJFQ1RJVkVTLCBOYXZiYXJDb21wb25lbnQsIFRvb2xiYXJDb21wb25lbnRdXG59KVxuXG5AUm91dGVDb25maWcoW1xuICB7IHBhdGg6ICcvJywgbmFtZTogJ0Rhc2hib2FyZCcsIGNvbXBvbmVudDogRGFzaGJvYXJkQ29tcG9uZW50IH1cbl0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge31cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==