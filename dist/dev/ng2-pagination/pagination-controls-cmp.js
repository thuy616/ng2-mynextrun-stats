"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var lang_1 = require('angular2/src/facade/lang');
var pagination_service_1 = require('./pagination-service');
var template_1 = require('./template');
var PaginationControlsBase = (function () {
    function PaginationControlsBase(service) {
        var _this = this;
        this.service = service;
        this.pageChange = new core_1.EventEmitter();
        this.api = {
            pages: [],
            directionLinks: true,
            autoHide: false,
            maxSize: 7,
            getCurrent: function () { return _this.getCurrent(); },
            setCurrent: function (val) { return _this.setCurrent(val); },
            previous: function () { return _this.setCurrent(_this.getCurrent() - 1); },
            next: function () { return _this.setCurrent(_this.getCurrent() + 1); },
            isFirstPage: function () { return _this.getCurrent() === 1; },
            isLastPage: function () { return _this.getLastPage() === _this.getCurrent(); }
        };
        this.changeSub = this.service.change
            .subscribe(function (id) {
            if (_this.id === id) {
                _this.updatePages();
            }
        });
    }
    PaginationControlsBase.prototype.updatePages = function () {
        var inst = this.service.getInstance(this.id);
        this.api.pages = this.createPageArray(inst.currentPage, inst.itemsPerPage, inst.totalItems, this.api.maxSize);
        var correctedCurrentPage = this.outOfBoundCorrection(inst);
        if (correctedCurrentPage !== inst.currentPage) {
            this.setCurrent(correctedCurrentPage);
        }
    };
    PaginationControlsBase.prototype.ngOnInit = function () {
        if (this.id === undefined) {
            this.id = this.service.defaultId;
        }
    };
    PaginationControlsBase.prototype.ngOnChanges = function () {
        this.updatePages();
    };
    PaginationControlsBase.prototype.ngOnDestroy = function () {
        this.changeSub.unsubscribe();
    };
    PaginationControlsBase.prototype.setCurrent = function (page) {
        this.pageChange.emit(page);
    };
    PaginationControlsBase.prototype.getCurrent = function () {
        return this.service.getCurrentPage(this.id);
    };
    PaginationControlsBase.prototype.getLastPage = function () {
        var inst = this.service.getInstance(this.id);
        return Math.ceil(inst.totalItems / inst.itemsPerPage);
    };
    PaginationControlsBase.prototype.outOfBoundCorrection = function (instance) {
        var totalPages = Math.ceil(instance.totalItems / instance.itemsPerPage);
        if (totalPages < instance.currentPage) {
            return totalPages;
        }
        else if (instance.currentPage < 1) {
            return 1;
        }
        return instance.currentPage;
    };
    PaginationControlsBase.prototype.createPageArray = function (currentPage, itemsPerPage, totalItems, paginationRange) {
        paginationRange = +paginationRange;
        var pages = [];
        var totalPages = Math.ceil(totalItems / itemsPerPage);
        var halfWay = Math.ceil(paginationRange / 2);
        var isStart = currentPage <= halfWay;
        var isEnd = totalPages - halfWay < currentPage;
        var isMiddle = !isStart && !isEnd;
        var ellipsesNeeded = paginationRange < totalPages;
        var i = 1;
        while (i <= totalPages && i <= paginationRange) {
            var label = void 0;
            var pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
            var openingEllipsesNeeded = (i === 2 && (isMiddle || isEnd));
            var closingEllipsesNeeded = (i === paginationRange - 1 && (isMiddle || isStart));
            if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                label = '...';
            }
            else {
                label = pageNumber;
            }
            pages.push({
                label: label,
                value: pageNumber
            });
            i++;
        }
        return pages;
    };
    PaginationControlsBase.prototype.calculatePageNumber = function (i, currentPage, paginationRange, totalPages) {
        var halfWay = Math.ceil(paginationRange / 2);
        if (i === paginationRange) {
            return totalPages;
        }
        else if (i === 1) {
            return i;
        }
        else if (paginationRange < totalPages) {
            if (totalPages - halfWay < currentPage) {
                return totalPages - paginationRange + i;
            }
            else if (halfWay < currentPage) {
                return currentPage - halfWay + i;
            }
            else {
                return i;
            }
        }
        else {
            return i;
        }
    };
    return PaginationControlsBase;
}());
exports.PaginationControlsBase = PaginationControlsBase;
var PaginationControlsDirective = (function (_super) {
    __extends(PaginationControlsDirective, _super);
    function PaginationControlsDirective(service, viewContainer, cdr) {
        _super.call(this, service);
        this.viewContainer = viewContainer;
        this.cdr = cdr;
    }
    Object.defineProperty(PaginationControlsDirective.prototype, "maxSize", {
        set: function (value) {
            this.api.maxSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationControlsDirective.prototype, "directionLinks", {
        set: function (value) {
            this.api.directionLinks = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationControlsDirective.prototype, "autoHide", {
        set: function (value) {
            this.api.autoHide = value;
        },
        enumerable: true,
        configurable: true
    });
    PaginationControlsDirective.prototype.ngOnInit = function () {
        this.cdr.detach();
    };
    PaginationControlsDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.customTemplate !== null) {
            this.templateView = this.viewContainer.createEmbeddedView(this.customTemplate);
            this.templateView.setLocal('paginationApi', this.api);
        }
        setTimeout(function () { return _this.cdr.reattach(); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PaginationControlsDirective.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], PaginationControlsDirective.prototype, "maxSize", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], PaginationControlsDirective.prototype, "directionLinks", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], PaginationControlsDirective.prototype, "autoHide", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PaginationControlsDirective.prototype, "pageChange", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', Object)
    ], PaginationControlsDirective.prototype, "customTemplate", void 0);
    PaginationControlsDirective = __decorate([
        core_1.Directive({
            selector: '[paginationControls]'
        }), 
        __metadata('design:paramtypes', [pagination_service_1.PaginationService, core_1.ViewContainerRef, core_1.ChangeDetectorRef])
    ], PaginationControlsDirective);
    return PaginationControlsDirective;
}(PaginationControlsBase));
exports.PaginationControlsDirective = PaginationControlsDirective;
var PaginationControlsCmp = (function (_super) {
    __extends(PaginationControlsCmp, _super);
    function PaginationControlsCmp(service) {
        _super.call(this, service);
    }
    Object.defineProperty(PaginationControlsCmp.prototype, "maxSize", {
        set: function (value) {
            this.api.maxSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationControlsCmp.prototype, "directionLinks", {
        set: function (value) {
            this.api.directionLinks = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationControlsCmp.prototype, "autoHide", {
        set: function (value) {
            this.api.autoHide = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PaginationControlsCmp.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], PaginationControlsCmp.prototype, "maxSize", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], PaginationControlsCmp.prototype, "directionLinks", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], PaginationControlsCmp.prototype, "autoHide", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PaginationControlsCmp.prototype, "pageChange", void 0);
    PaginationControlsCmp = __decorate([
        core_1.Component({
            selector: 'pagination-controls',
            template: template_1.DEFAULT_TEMPLATE,
            styles: [template_1.DEFAULT_STYLES]
        }), 
        __metadata('design:paramtypes', [pagination_service_1.PaginationService])
    ], PaginationControlsCmp);
    return PaginationControlsCmp;
}(PaginationControlsBase));
exports.PaginationControlsCmp = PaginationControlsCmp;
exports.PAGINATION_DIRECTIVES = lang_1.CONST_EXPR([PaginationControlsDirective, PaginationControlsCmp]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5nMi1wYWdpbmF0aW9uL3BhZ2luYXRpb24tY29udHJvbHMtY21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUMwQixlQUFlLENBQUMsQ0FBQTtBQUMxQyxxQkFBeUIsMEJBQTBCLENBQUMsQ0FBQTtBQUVwRCxtQ0FBZ0Msc0JBQXNCLENBQUMsQ0FBQTtBQUV2RCx5QkFBK0MsWUFBWSxDQUFDLENBQUE7QUFLNUQ7SUFpQkksZ0NBQW9CLE9BQTBCO1FBakJsRCxpQkFpSkM7UUFoSXVCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBZjlDLGVBQVUsR0FBeUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDdEQsUUFBRyxHQUFHO1lBQ0YsS0FBSyxFQUFFLEVBQUU7WUFDVCxjQUFjLEVBQUUsSUFBSTtZQUNwQixRQUFRLEVBQUUsS0FBSztZQUNmLE9BQU8sRUFBRSxDQUFDO1lBQ1YsVUFBVSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCO1lBQ25DLFVBQVUsRUFBRSxVQUFDLEdBQUcsSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQXBCLENBQW9CO1lBQ3pDLFFBQVEsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQXRDLENBQXNDO1lBQ3RELElBQUksRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQXRDLENBQXNDO1lBQ2xELFdBQVcsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBdkIsQ0FBdUI7WUFDMUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUF4QyxDQUF3QztTQUM3RCxDQUFDO1FBSUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07YUFDL0IsU0FBUyxDQUFDLFVBQUEsRUFBRTtZQUNULEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCw0Q0FBVyxHQUFYO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5RyxJQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxFQUFFLENBQUMsQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBUSxHQUFSO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDckMsQ0FBQztJQUNMLENBQUM7SUFFRCw0Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw0Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBS0QsMkNBQVUsR0FBVixVQUFXLElBQVk7UUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUtELDJDQUFVLEdBQVY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFLRCw0Q0FBVyxHQUFYO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFNTyxxREFBb0IsR0FBNUIsVUFBNkIsUUFBNkI7UUFDdEQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxRSxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBQ2hDLENBQUM7SUFLTyxnREFBZSxHQUF2QixVQUF3QixXQUFtQixFQUFFLFlBQW9CLEVBQUUsVUFBa0IsRUFBRSxlQUF1QjtRQUUxRyxlQUFlLEdBQUcsQ0FBQyxlQUFlLENBQUM7UUFDbkMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFDeEQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFL0MsSUFBTSxPQUFPLEdBQUcsV0FBVyxJQUFJLE9BQU8sQ0FBQztRQUN2QyxJQUFNLEtBQUssR0FBRyxVQUFVLEdBQUcsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNqRCxJQUFNLFFBQVEsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVwQyxJQUFJLGNBQWMsR0FBRyxlQUFlLEdBQUcsVUFBVSxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVWLE9BQU8sQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDLElBQUksZUFBZSxFQUFFLENBQUM7WUFDN0MsSUFBSSxLQUFLLFNBQUEsQ0FBQztZQUNWLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2RixJQUFJLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUkscUJBQXFCLEdBQUcsQ0FBQyxDQUFDLEtBQUssZUFBZSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLEVBQUUsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLHFCQUFxQixJQUFJLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ2xCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixLQUFLLEdBQUcsVUFBVSxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNQLEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRSxVQUFVO2FBQ3BCLENBQUMsQ0FBQztZQUNILENBQUMsRUFBRyxDQUFDO1FBQ1QsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQU1PLG9EQUFtQixHQUEzQixVQUE0QixDQUFTLEVBQUUsV0FBbUIsRUFBRSxlQUF1QixFQUFFLFVBQWtCO1FBQ25HLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsZUFBZSxHQUFHLENBQUMsQ0FBQztZQUM1QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsV0FBVyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNiLENBQUM7SUFDTCxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQWpKQSxBQWlKQyxJQUFBO0FBakpZLDhCQUFzQix5QkFpSmxDLENBQUE7QUFLRDtJQUFpRCwrQ0FBc0I7SUFnQm5FLHFDQUFZLE9BQTBCLEVBQ2xCLGFBQStCLEVBQy9CLEdBQXNCO1FBQ3RDLGtCQUFNLE9BQU8sQ0FBQyxDQUFDO1FBRkMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLFFBQUcsR0FBSCxHQUFHLENBQW1CO0lBRTFDLENBQUM7SUFsQlEsc0JBQUksZ0RBQU87YUFBWCxVQUFZLEtBQWE7WUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBQ1Esc0JBQUksdURBQWM7YUFBbEIsVUFBbUIsS0FBYztZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFDUSxzQkFBSSxpREFBUTthQUFaLFVBQWEsS0FBYztZQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFZRCw4Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQscURBQWUsR0FBZjtRQUFBLGlCQU9DO1FBTkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBRUQsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQWhDRDtRQUFDLFlBQUssRUFBRTs7MkRBQUE7SUFDUjtRQUFDLFlBQUssRUFBRTs7OzhEQUFBO0lBR1I7UUFBQyxZQUFLLEVBQUU7OztxRUFBQTtJQUdSO1FBQUMsWUFBSyxFQUFFOzs7K0RBQUE7SUFHUjtRQUFDLGFBQU0sRUFBRTs7bUVBQUE7SUFFVDtRQUFDLG1CQUFZLENBQUMsa0JBQVcsQ0FBQzs7dUVBQUE7SUFoQjlCO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQkFBc0I7U0FDbkMsQ0FBQzs7bUNBQUE7SUFvQ0Ysa0NBQUM7QUFBRCxDQW5DQSxBQW1DQyxDQW5DZ0Qsc0JBQXNCLEdBbUN0RTtBQW5DWSxtQ0FBMkIsOEJBbUN2QyxDQUFBO0FBT0Q7SUFBMkMseUNBQXNCO0lBYTdELCtCQUFZLE9BQTBCO1FBQ2xDLGtCQUFNLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFiUSxzQkFBSSwwQ0FBTzthQUFYLFVBQVksS0FBYTtZQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFDUSxzQkFBSSxpREFBYzthQUFsQixVQUFtQixLQUFjO1lBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUNRLHNCQUFJLDJDQUFRO2FBQVosVUFBYSxLQUFjO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQVREO1FBQUMsWUFBSyxFQUFFOztxREFBQTtJQUNSO1FBQUMsWUFBSyxFQUFFOzs7d0RBQUE7SUFHUjtRQUFDLFlBQUssRUFBRTs7OytEQUFBO0lBR1I7UUFBQyxZQUFLLEVBQUU7Ozt5REFBQTtJQUdSO1FBQUMsYUFBTSxFQUFFOzs2REFBQTtJQWhCYjtRQUFDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSwyQkFBZ0I7WUFDMUIsTUFBTSxFQUFFLENBQUMseUJBQWMsQ0FBQztTQUMzQixDQUFDOzs2QkFBQTtJQWtCRiw0QkFBQztBQUFELENBakJBLEFBaUJDLENBakIwQyxzQkFBc0IsR0FpQmhFO0FBakJZLDZCQUFxQix3QkFpQmpDLENBQUE7QUFFWSw2QkFBcUIsR0FBRyxpQkFBVSxDQUFDLENBQUMsMkJBQTJCLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Im5nMi1wYWdpbmF0aW9uL3BhZ2luYXRpb24tY29udHJvbHMtY21wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmLCBFbWJlZGRlZFZpZXdSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7UGFnaW5hdGlvblNlcnZpY2V9IGZyb20gJy4vcGFnaW5hdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7SVBhZ2luYXRpb25JbnN0YW5jZX0gZnJvbSAnLi9wYWdpbmF0aW9uLXNlcnZpY2UnO1xuaW1wb3J0IHtERUZBVUxUX1RFTVBMQVRFLCBERUZBVUxUX1NUWUxFU30gZnJvbSAnLi90ZW1wbGF0ZSc7XG5leHBvcnQgaW50ZXJmYWNlIElQYWdlIHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHZhbHVlOiBhbnk7XG59XG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbkNvbnRyb2xzQmFzZSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBwYWdlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBhcGkgPSB7XG4gICAgICAgIHBhZ2VzOiBbXSxcbiAgICAgICAgZGlyZWN0aW9uTGlua3M6IHRydWUsXG4gICAgICAgIGF1dG9IaWRlOiBmYWxzZSxcbiAgICAgICAgbWF4U2l6ZTogNyxcbiAgICAgICAgZ2V0Q3VycmVudDogKCkgPT4gdGhpcy5nZXRDdXJyZW50KCksXG4gICAgICAgIHNldEN1cnJlbnQ6ICh2YWwpID0+IHRoaXMuc2V0Q3VycmVudCh2YWwpLFxuICAgICAgICBwcmV2aW91czogKCkgPT4gdGhpcy5zZXRDdXJyZW50KHRoaXMuZ2V0Q3VycmVudCgpIC0gMSksXG4gICAgICAgIG5leHQ6ICgpID0+IHRoaXMuc2V0Q3VycmVudCh0aGlzLmdldEN1cnJlbnQoKSArIDEpLFxuICAgICAgICBpc0ZpcnN0UGFnZTogKCkgPT4gdGhpcy5nZXRDdXJyZW50KCkgPT09IDEsXG4gICAgICAgIGlzTGFzdFBhZ2U6ICgpID0+IHRoaXMuZ2V0TGFzdFBhZ2UoKSA9PT0gdGhpcy5nZXRDdXJyZW50KClcbiAgICB9O1xuICAgIHByaXZhdGUgY2hhbmdlU3ViOiBTdWJzY3JpcHRpb248c3RyaW5nPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogUGFnaW5hdGlvblNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VTdWIgPSB0aGlzLnNlcnZpY2UuY2hhbmdlXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGlkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVBhZ2VzKCkge1xuICAgICAgICBsZXQgaW5zdCA9IHRoaXMuc2VydmljZS5nZXRJbnN0YW5jZSh0aGlzLmlkKTtcbiAgICAgICAgdGhpcy5hcGkucGFnZXMgPSB0aGlzLmNyZWF0ZVBhZ2VBcnJheShpbnN0LmN1cnJlbnRQYWdlLCBpbnN0Lml0ZW1zUGVyUGFnZSwgaW5zdC50b3RhbEl0ZW1zLCB0aGlzLmFwaS5tYXhTaXplKTtcblxuICAgICAgICBjb25zdCBjb3JyZWN0ZWRDdXJyZW50UGFnZSA9IHRoaXMub3V0T2ZCb3VuZENvcnJlY3Rpb24oaW5zdCk7XG4gICAgICAgIGlmIChjb3JyZWN0ZWRDdXJyZW50UGFnZSAhPT0gaW5zdC5jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50KGNvcnJlY3RlZEN1cnJlbnRQYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5zZXJ2aWNlLmRlZmF1bHRJZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50IHBhZ2UgbnVtYmVyLlxuICAgICAqL1xuICAgIHNldEN1cnJlbnQocGFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHBhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBwYWdlIG51bWJlci5cbiAgICAgKi9cbiAgICBnZXRDdXJyZW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0Q3VycmVudFBhZ2UodGhpcy5pZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGFzdCBwYWdlIG51bWJlclxuICAgICAqL1xuICAgIGdldExhc3RQYWdlKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBpbnN0ID0gdGhpcy5zZXJ2aWNlLmdldEluc3RhbmNlKHRoaXMuaWQpO1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGluc3QudG90YWxJdGVtcyAvIGluc3QuaXRlbXNQZXJQYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdGhhdCB0aGUgaW5zdGFuY2UuY3VycmVudFBhZ2UgcHJvcGVydHkgaXMgd2l0aGluIGJvdW5kcyBmb3IgdGhlIGN1cnJlbnQgcGFnZSByYW5nZS5cbiAgICAgKiBJZiBub3QsIHJldHVybiBhIGNvcnJlY3QgdmFsdWUgZm9yIGN1cnJlbnRQYWdlLCBvciB0aGUgY3VycmVudCB2YWx1ZSBpZiBPSy5cbiAgICAgKi9cbiAgICBwcml2YXRlIG91dE9mQm91bmRDb3JyZWN0aW9uKGluc3RhbmNlOiBJUGFnaW5hdGlvbkluc3RhbmNlKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbChpbnN0YW5jZS50b3RhbEl0ZW1zIC8gaW5zdGFuY2UuaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgaWYgKHRvdGFsUGFnZXMgPCBpbnN0YW5jZS5jdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRvdGFsUGFnZXM7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zdGFuY2UuY3VycmVudFBhZ2UgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbnN0YW5jZS5jdXJyZW50UGFnZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIElQYWdlIG9iamVjdHMgdG8gdXNlIGluIHRoZSBwYWdpbmF0aW9uIGNvbnRyb2xzLlxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlUGFnZUFycmF5KGN1cnJlbnRQYWdlOiBudW1iZXIsIGl0ZW1zUGVyUGFnZTogbnVtYmVyLCB0b3RhbEl0ZW1zOiBudW1iZXIsIHBhZ2luYXRpb25SYW5nZTogbnVtYmVyKTogSVBhZ2VbXSB7XG4gICAgICAgIC8vIHBhZ2luYXRpb25SYW5nZSBjb3VsZCBiZSBhIHN0cmluZyBpZiBwYXNzZWQgZnJvbSBhdHRyaWJ1dGUsIHNvIGNhc3QgdG8gbnVtYmVyLlxuICAgICAgICBwYWdpbmF0aW9uUmFuZ2UgPSArcGFnaW5hdGlvblJhbmdlO1xuICAgICAgICBsZXQgcGFnZXMgPSBbXTtcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0b3RhbEl0ZW1zIC8gaXRlbXNQZXJQYWdlKTtcbiAgICAgICAgY29uc3QgaGFsZldheSA9IE1hdGguY2VpbChwYWdpbmF0aW9uUmFuZ2UgLyAyKTtcblxuICAgICAgICBjb25zdCBpc1N0YXJ0ID0gY3VycmVudFBhZ2UgPD0gaGFsZldheTtcbiAgICAgICAgY29uc3QgaXNFbmQgPSB0b3RhbFBhZ2VzIC0gaGFsZldheSA8IGN1cnJlbnRQYWdlO1xuICAgICAgICBjb25zdCBpc01pZGRsZSA9ICFpc1N0YXJ0ICYmICFpc0VuZDtcblxuICAgICAgICBsZXQgZWxsaXBzZXNOZWVkZWQgPSBwYWdpbmF0aW9uUmFuZ2UgPCB0b3RhbFBhZ2VzO1xuICAgICAgICBsZXQgaSA9IDE7XG5cbiAgICAgICAgd2hpbGUgKGkgPD0gdG90YWxQYWdlcyAmJiBpIDw9IHBhZ2luYXRpb25SYW5nZSkge1xuICAgICAgICAgICAgbGV0IGxhYmVsO1xuICAgICAgICAgICAgbGV0IHBhZ2VOdW1iZXIgPSB0aGlzLmNhbGN1bGF0ZVBhZ2VOdW1iZXIoaSwgY3VycmVudFBhZ2UsIHBhZ2luYXRpb25SYW5nZSwgdG90YWxQYWdlcyk7XG4gICAgICAgICAgICBsZXQgb3BlbmluZ0VsbGlwc2VzTmVlZGVkID0gKGkgPT09IDIgJiYgKGlzTWlkZGxlIHx8IGlzRW5kKSk7XG4gICAgICAgICAgICBsZXQgY2xvc2luZ0VsbGlwc2VzTmVlZGVkID0gKGkgPT09IHBhZ2luYXRpb25SYW5nZSAtIDEgJiYgKGlzTWlkZGxlIHx8IGlzU3RhcnQpKTtcbiAgICAgICAgICAgIGlmIChlbGxpcHNlc05lZWRlZCAmJiAob3BlbmluZ0VsbGlwc2VzTmVlZGVkIHx8IGNsb3NpbmdFbGxpcHNlc05lZWRlZCkpIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9ICcuLi4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IHBhZ2VOdW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBsYWJlbDogbGFiZWwsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhZ2VOdW1iZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaSArKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFnZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIHBvc2l0aW9uIGluIHRoZSBzZXF1ZW5jZSBvZiBwYWdpbmF0aW9uIGxpbmtzIFtpXSxcbiAgICAgKiBmaWd1cmUgb3V0IHdoYXQgcGFnZSBudW1iZXIgY29ycmVzcG9uZHMgdG8gdGhhdCBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNhbGN1bGF0ZVBhZ2VOdW1iZXIoaTogbnVtYmVyLCBjdXJyZW50UGFnZTogbnVtYmVyLCBwYWdpbmF0aW9uUmFuZ2U6IG51bWJlciwgdG90YWxQYWdlczogbnVtYmVyKSB7XG4gICAgICAgIGxldCBoYWxmV2F5ID0gTWF0aC5jZWlsKHBhZ2luYXRpb25SYW5nZSAvIDIpO1xuICAgICAgICBpZiAoaSA9PT0gcGFnaW5hdGlvblJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gdG90YWxQYWdlcztcbiAgICAgICAgfSBlbHNlIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfSBlbHNlIGlmIChwYWdpbmF0aW9uUmFuZ2UgPCB0b3RhbFBhZ2VzKSB7XG4gICAgICAgICAgICBpZiAodG90YWxQYWdlcyAtIGhhbGZXYXkgPCBjdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbFBhZ2VzIC0gcGFnaW5hdGlvblJhbmdlICsgaTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFsZldheSA8IGN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQYWdlIC0gaGFsZldheSArIGk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BhZ2luYXRpb25Db250cm9sc10nXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25Db250cm9sc0RpcmVjdGl2ZSBleHRlbmRzIFBhZ2luYXRpb25Db250cm9sc0Jhc2Uge1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2V0IG1heFNpemUodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmFwaS5tYXhTaXplID0gdmFsdWU7XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCBkaXJlY3Rpb25MaW5rcyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmFwaS5kaXJlY3Rpb25MaW5rcyA9IHZhbHVlO1xuICAgIH1cbiAgICBASW5wdXQoKSBzZXQgYXV0b0hpZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5hcGkuYXV0b0hpZGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgQE91dHB1dCgpIHBhZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+O1xuXG4gICAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZikgY3VzdG9tVGVtcGxhdGU7XG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZVZpZXc6IEVtYmVkZGVkVmlld1JlZjtcblxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2U6IFBhZ2luYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoc2VydmljZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuY2RyLmRldGFjaCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tVGVtcGxhdGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVWaWV3ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmN1c3RvbVRlbXBsYXRlKTtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVWaWV3LnNldExvY2FsKCdwYWdpbmF0aW9uQXBpJywgdGhpcy5hcGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNkci5yZWF0dGFjaCgpKTtcbiAgICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwYWdpbmF0aW9uLWNvbnRyb2xzJyxcbiAgICB0ZW1wbGF0ZTogREVGQVVMVF9URU1QTEFURSxcbiAgICBzdHlsZXM6IFtERUZBVUxUX1NUWUxFU11cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbkNvbnRyb2xzQ21wIGV4dGVuZHMgUGFnaW5hdGlvbkNvbnRyb2xzQmFzZSB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBzZXQgbWF4U2l6ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuYXBpLm1heFNpemUgPSB2YWx1ZTtcbiAgICB9XG4gICAgQElucHV0KCkgc2V0IGRpcmVjdGlvbkxpbmtzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuYXBpLmRpcmVjdGlvbkxpbmtzID0gdmFsdWU7XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCBhdXRvSGlkZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmFwaS5hdXRvSGlkZSA9IHZhbHVlO1xuICAgIH1cbiAgICBAT3V0cHV0KCkgcGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj47XG5cbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlOiBQYWdpbmF0aW9uU2VydmljZSkge1xuICAgICAgICBzdXBlcihzZXJ2aWNlKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IFBBR0lOQVRJT05fRElSRUNUSVZFUyA9IENPTlNUX0VYUFIoW1BhZ2luYXRpb25Db250cm9sc0RpcmVjdGl2ZSwgUGFnaW5hdGlvbkNvbnRyb2xzQ21wXSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=