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
var top_runners_component_1 = require('./top-runners.component');
var http_1 = require('angular2/http');
require('rxjs/add/operator/map');
var DashboardComponent = (function () {
    function DashboardComponent(_router, _http) {
        this._router = _router;
        this._http = _http;
        this.title = 'List of Countries';
        this.selectedCountry = '';
        this.countries = [];
    }
    DashboardComponent.prototype.onSelect = function (country) {
        this.selectedCountry = country;
        console.log('selected country: ' + this.selectedCountry);
    };
    DashboardComponent.prototype.getCountries = function () {
        var _this = this;
        this._http.get('https://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/')
            .map(function (res) { return res.json(); })
            .subscribe(function (response) {
            _this.countries = response;
        });
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.getCountries();
    };
    DashboardComponent.prototype.seeTopRunners = function () {
        this._router.navigate(['TopRunner', { country: this.selectedCountry }]);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            directives: [top_runners_component_1.TopRunnersComponent],
            selector: 'mnr-countries',
            providers: [
                http_1.HTTP_PROVIDERS
            ],
            moduleId: module.id,
            templateUrl: './dashboard.component.html',
            styleUrls: ['../css/materialize.min.css', './dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRpc3RpY3MvY29tcG9uZW50cy9kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFDbEQsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFDekMsc0NBQW9DLHlCQUF5QixDQUFDLENBQUE7QUFDOUQscUJBQXFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3JELFFBQU8sdUJBQXVCLENBQUMsQ0FBQTtBQWEvQjtJQVVFLDRCQUNVLE9BQWUsRUFDZixLQUFXO1FBRFgsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQU07UUFYckIsVUFBSyxHQUFHLG1CQUFtQixDQUFDO1FBQzVCLG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBQzdCLGNBQVMsR0FBYSxFQUFFLENBQUM7SUFTQSxDQUFDO0lBUDFCLHFDQUFRLEdBQVIsVUFBUyxPQUFlO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFNRCx5Q0FBWSxHQUFaO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyx3RkFBd0YsQ0FBQzthQUNyRyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQVYsQ0FBVSxDQUFDO2FBQ3RCLFNBQVMsQ0FBQyxVQUFBLFFBQVE7WUFDakIsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsMENBQWEsR0FBYjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQXZDSDtRQUFDLGdCQUFTLENBQUM7WUFDVCxVQUFVLEVBQUUsQ0FBQywyQ0FBbUIsQ0FBQztZQUNqQyxRQUFRLEVBQUUsZUFBZTtZQUN6QixTQUFTLEVBQUU7Z0JBQ1QscUJBQWM7YUFDZjtZQUNELFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixFQUFDLDJCQUEyQixDQUFDO1NBQ3RFLENBQUM7OzBCQUFBO0lBK0JGLHlCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsSUFBQTtBQTdCWSwwQkFBa0IscUJBNkI5QixDQUFBIiwiZmlsZSI6InN0YXRpc3RpY3MvY29tcG9uZW50cy9kYXNoYm9hcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2FuZ3VsYXIyL3JvdXRlcic7XG5pbXBvcnQgeyBUb3BSdW5uZXJzQ29tcG9uZW50IH0gZnJvbSAnLi90b3AtcnVubmVycy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cCwgSFRUUF9QUk9WSURFUlMgfSBmcm9tICdhbmd1bGFyMi9odHRwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcblxuQENvbXBvbmVudCh7XG4gIGRpcmVjdGl2ZXM6IFtUb3BSdW5uZXJzQ29tcG9uZW50XSxcbiAgc2VsZWN0b3I6ICdtbnItY291bnRyaWVzJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgSFRUUF9QUk9WSURFUlNcbiAgXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6ICcuL2Rhc2hib2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuLi9jc3MvbWF0ZXJpYWxpemUubWluLmNzcycsJy4vZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIERhc2hib2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHRpdGxlID0gJ0xpc3Qgb2YgQ291bnRyaWVzJztcbiAgc2VsZWN0ZWRDb3VudHJ5OiBzdHJpbmcgPSAnJztcbiAgY291bnRyaWVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIG9uU2VsZWN0KGNvdW50cnk6IHN0cmluZykge1xuICAgIHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gY291bnRyeTtcbiAgICBjb25zb2xlLmxvZygnc2VsZWN0ZWQgY291bnRyeTogJyArIHRoaXMuc2VsZWN0ZWRDb3VudHJ5KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yIChcbiAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwKSB7IH1cblxuICBnZXRDb3VudHJpZXMoKSB7XG4gICAgdGhpcy5faHR0cC5nZXQoJ2h0dHBzOi8vY3Jvc3NvcmlnaW4ubWUvaHR0cHM6Ly9hcGktdGVzdC5teW5leHRydW4uY29tL3NpdGUvdjEvcHJvZmlsZS1zdGF0cy9jb3VudHJpZXMvJylcbiAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgICAgdGhpcy5jb3VudHJpZXMgPSByZXNwb25zZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRDb3VudHJpZXMoKTtcbiAgfVxuXG4gIHNlZVRvcFJ1bm5lcnMoKSB7XG4gICAgdGhpcy5fcm91dGVyLm5hdmlnYXRlKFsnVG9wUnVubmVyJywgeyBjb3VudHJ5OiB0aGlzLnNlbGVjdGVkQ291bnRyeSB9XSk7XG4gIH1cbn1cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==