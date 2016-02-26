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
var ng2_pagination_1 = require('../../ng2-pagination/ng2-pagination');
var TopRunnersComponent = (function () {
    function TopRunnersComponent(_http) {
        this._http = _http;
        this.runners = [];
    }
    TopRunnersComponent.prototype.getTopRunners = function () {
        var _this = this;
        var path;
        path = 'http://crossorigin.me/https://api-test.mynextrun.com/site/v1/profile-stats/countries/' + this.country;
        this._http.get(path)
            .map(function (res) { return res.json(); })
            .subscribe(function (response) {
            _this.runners = response;
        });
    };
    TopRunnersComponent.prototype.ngOnInit = function () {
        this.getTopRunners();
    };
    TopRunnersComponent.prototype.ngOnChanges = function () {
        this.runners = [];
        this.getTopRunners();
    };
    TopRunnersComponent.prototype.goBack = function () {
        window.history.back();
    };
    TopRunnersComponent = __decorate([
        core_1.Component({
            directives: [ng2_pagination_1.PAGINATION_DIRECTIVES],
            pipes: [ng2_pagination_1.PaginatePipe],
            selector: 'top-runners',
            providers: [
                http_1.HTTP_PROVIDERS,
                ng2_pagination_1.PaginationService
            ],
            moduleId: module.id,
            templateUrl: './top-runners.component.html',
            inputs: ['country'],
            styleUrls: ['../css/materialize.min.css', './top-runners.component.css', '../css/loader.min.css']
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TopRunnersComponent);
    return TopRunnersComponent;
}());
exports.TopRunnersComponent = TopRunnersComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRpc3RpY3MvY29tcG9uZW50cy90b3AtcnVubmVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUUzRCxxQkFBbUMsZUFBZSxDQUFDLENBQUE7QUFDbkQsK0JBQXFFLHFDQUFxQyxDQUFDLENBQUE7QUFnQjNHO0lBSUUsNkJBQ1UsS0FBVztRQUFYLFVBQUssR0FBTCxLQUFLLENBQU07UUFIZCxZQUFPLEdBQWEsRUFBRSxDQUFDO0lBR0wsQ0FBQztJQUUxQiwyQ0FBYSxHQUFiO1FBQUEsaUJBVUM7UUFUQyxJQUFJLElBQVksQ0FBQztRQUNqQixJQUFJLEdBQUUsdUZBQXVGLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU3RyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7YUFDakIsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUN0QixTQUFTLENBQUMsVUFBQSxRQUFRO1lBQ2pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELG9DQUFNLEdBQU47UUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUE1Q0g7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsVUFBVSxFQUFFLENBQUMsc0NBQXFCLENBQUM7WUFDbkMsS0FBSyxFQUFFLENBQUMsNkJBQVksQ0FBQztZQUNyQixRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1QscUJBQWM7Z0JBQ2Qsa0NBQWlCO2FBQ2xCO1lBQ0QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLDZCQUE2QixFQUFFLHVCQUF1QixDQUFDO1NBQ2xHLENBQUM7OzJCQUFBO0lBa0NGLDBCQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtBQWhDWSwyQkFBbUIsc0JBZ0MvQixDQUFBIiwiZmlsZSI6InN0YXRpc3RpY3MvY29tcG9uZW50cy90b3AtcnVubmVycy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXN9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtSdW5uZXJ9IGZyb20gJy4vcnVubmVyJztcbmltcG9ydCB7SHR0cCwgSFRUUF9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuaW1wb3J0IHtQYWdpbmF0ZVBpcGUsIFBhZ2luYXRpb25TZXJ2aWNlLCBQQUdJTkFUSU9OX0RJUkVDVElWRVN9IGZyb20gJy4uLy4uL25nMi1wYWdpbmF0aW9uL25nMi1wYWdpbmF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIGRpcmVjdGl2ZXM6IFtQQUdJTkFUSU9OX0RJUkVDVElWRVNdLFxuICBwaXBlczogW1BhZ2luYXRlUGlwZV0sXG4gIHNlbGVjdG9yOiAndG9wLXJ1bm5lcnMnLFxuICBwcm92aWRlcnM6IFtcbiAgICBIVFRQX1BST1ZJREVSUyxcbiAgICBQYWdpbmF0aW9uU2VydmljZVxuICBdLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogJy4vdG9wLXJ1bm5lcnMuY29tcG9uZW50Lmh0bWwnLFxuICBpbnB1dHM6IFsnY291bnRyeSddLFxuICBzdHlsZVVybHM6IFsnLi4vY3NzL21hdGVyaWFsaXplLm1pbi5jc3MnLCAnLi90b3AtcnVubmVycy5jb21wb25lbnQuY3NzJywgJy4uL2Nzcy9sb2FkZXIubWluLmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgVG9wUnVubmVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgY291bnRyeTogc3RyaW5nO1xuICBwdWJsaWMgcnVubmVyczogUnVubmVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwKSB7IH1cblxuICBnZXRUb3BSdW5uZXJzKCkge1xuICAgIHZhciBwYXRoOiBzdHJpbmc7XG4gICAgcGF0aCA9J2h0dHA6Ly9jcm9zc29yaWdpbi5tZS9odHRwczovL2FwaS10ZXN0Lm15bmV4dHJ1bi5jb20vc2l0ZS92MS9wcm9maWxlLXN0YXRzL2NvdW50cmllcy8nICsgdGhpcy5jb3VudHJ5O1xuXG4gICAgdGhpcy5faHR0cC5nZXQocGF0aClcbiAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgICAgdGhpcy5ydW5uZXJzID0gcmVzcG9uc2U7XG4gICAgICB9KTtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRUb3BSdW5uZXJzKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnJ1bm5lcnMgPSBbXTtcbiAgICB0aGlzLmdldFRvcFJ1bm5lcnMoKTtcbiAgfVxuXG4gIGdvQmFjaygpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9