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
var http_1 = require('angular2/http');
var StatsService = (function () {
    function StatsService(http) {
        this.PATH = 'https://api-test.mynextrun.com/site/v1/profile-stats/countries/';
        this.countries = [];
        this.http = http;
    }
    StatsService.prototype.getCountries = function () {
        return this.http.get(this.PATH).toPromise()
            .then(function (response) { return response.json(); });
    };
    StatsService.prototype.logError = function (err) {
        console.error('There was an error: ' + err);
    };
    StatsService.prototype.getTopRunners = function (country) {
        var runner_path;
        runner_path = this.PATH + country;
        return this.http.get(runner_path).toPromise().then(function (res) { return res.json(); });
    };
    StatsService.prototype.goBack = function () {
        window.history.back();
    };
    StatsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], StatsService);
    return StatsService;
}());
exports.StatsService = StatsService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9zZXJ2aWNlcy9zdGF0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMscUJBQW1CLGVBQWUsQ0FBQyxDQUFBO0FBR25DO0lBR0Usc0JBQVksSUFBUztRQURkLFNBQUksR0FBVSxpRUFBaUUsQ0FBQztRQUt2RixjQUFTLEdBQWEsRUFBRSxDQUFDO1FBSHZCLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO0lBQ2pCLENBQUM7SUFJRCxtQ0FBWSxHQUFaO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7YUFDeEMsSUFBSSxDQUFDLFVBQUMsUUFBUSxJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCwrQkFBUSxHQUFSLFVBQVMsR0FBRztRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELG9DQUFhLEdBQWIsVUFBYyxPQUFlO1FBQzNCLElBQUksV0FBbUIsQ0FBQztRQUN4QixXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsNkJBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQTNCSDtRQUFDLGlCQUFVLEVBQUU7O29CQUFBO0lBNEJiLG1CQUFDO0FBQUQsQ0EzQkEsQUEyQkMsSUFBQTtBQTNCWSxvQkFBWSxlQTJCeEIsQ0FBQSIsImZpbGUiOiJzaGFyZWQvc2VydmljZXMvc3RhdHMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0h0dHB9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3RhdHNTZXJ2aWNlIHtcbiAgcHVibGljIGh0dHA6SHR0cDtcbiAgcHVibGljIFBBVEg6c3RyaW5nID0gJ2h0dHBzOi8vYXBpLXRlc3QubXluZXh0cnVuLmNvbS9zaXRlL3YxL3Byb2ZpbGUtc3RhdHMvY291bnRyaWVzLyc7XG4gIGNvbnN0cnVjdG9yKGh0dHA6SHR0cCkge1xuICAgIHRoaXMuaHR0cD1odHRwO1xuICB9XG5cbiAgY291bnRyaWVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGdldENvdW50cmllcygpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLlBBVEgpLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gIH1cblxuICBsb2dFcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdUaGVyZSB3YXMgYW4gZXJyb3I6ICcgKyBlcnIpO1xuICB9XG5cbiAgZ2V0VG9wUnVubmVycyhjb3VudHJ5OiBzdHJpbmcpIHtcbiAgICB2YXIgcnVubmVyX3BhdGg6IHN0cmluZztcbiAgICBydW5uZXJfcGF0aCA9IHRoaXMuUEFUSCArIGNvdW50cnk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQocnVubmVyX3BhdGgpLnRvUHJvbWlzZSgpLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpO1xuICB9XG5cbiAgZ29CYWNrKCkge1xuICAgIHdpbmRvdy5oaXN0b3J5LmJhY2soKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9