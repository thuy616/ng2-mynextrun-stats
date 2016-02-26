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
var mock_heroes_1 = require('./mock-heroes');
var HeroService = (function () {
    function HeroService() {
    }
    HeroService.prototype.getHeroes = function () {
        return Promise.resolve(mock_heroes_1.HEROES);
    };
    HeroService.prototype.getHero = function (id) {
        return Promise.resolve(mock_heroes_1.HEROES).then(function (heroes) { return heroes.filter(function (hero) { return hero.id === id; })[0]; });
    };
    HeroService.prototype.goBack = function () {
        window.history.back();
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9zZXJ2aWNlcy9oZXJvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUN6Qyw0QkFBcUIsZUFBZSxDQUFDLENBQUE7QUFHckM7SUFBQTtJQVdBLENBQUM7SUFWQywrQkFBUyxHQUFUO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsb0JBQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDRCw2QkFBTyxHQUFQLFVBQVEsRUFBVTtRQUNoQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxvQkFBTSxDQUFDLENBQUMsSUFBSSxDQUNqQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBZCxDQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCw0QkFBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBWEg7UUFBQyxpQkFBVSxFQUFFOzttQkFBQTtJQVliLGtCQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSxtQkFBVyxjQVd2QixDQUFBIiwiZmlsZSI6InNoYXJlZC9zZXJ2aWNlcy9oZXJvLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtIRVJPRVN9IGZyb20gJy4vbW9jay1oZXJvZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGVyb1NlcnZpY2Uge1xuICBnZXRIZXJvZXMoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShIRVJPRVMpO1xuICB9XG4gIGdldEhlcm8oaWQ6IG51bWJlcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoSEVST0VTKS50aGVuKFxuICAgICAgaGVyb2VzID0+IGhlcm9lcy5maWx0ZXIoaGVybyA9PiBoZXJvLmlkID09PSBpZClbMF0pO1xuICB9XG4gIGdvQmFjaygpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==