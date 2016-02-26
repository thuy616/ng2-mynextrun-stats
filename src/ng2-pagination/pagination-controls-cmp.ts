import {Component, Directive, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewContainerRef, EmbeddedViewRef,
  ChangeDetectorRef} from 'angular2/core';
import {CONST_EXPR} from 'angular2/src/facade/lang';
import {Subscription} from 'rxjs';
import {PaginationService} from './pagination-service';
import {IPaginationInstance} from './pagination-service';
import {DEFAULT_TEMPLATE, DEFAULT_STYLES} from './template';
export interface IPage {
    label: string;
    value: any;
}
export class PaginationControlsBase {
    id: string;
    pageChange: EventEmitter<number> = new EventEmitter();
    api = {
        pages: [],
        directionLinks: true,
        autoHide: false,
        maxSize: 7,
        getCurrent: () => this.getCurrent(),
        setCurrent: (val) => this.setCurrent(val),
        previous: () => this.setCurrent(this.getCurrent() - 1),
        next: () => this.setCurrent(this.getCurrent() + 1),
        isFirstPage: () => this.getCurrent() === 1,
        isLastPage: () => this.getLastPage() === this.getCurrent()
    };
    private changeSub: Subscription<string>;

    constructor(private service: PaginationService) {
        this.changeSub = this.service.change
            .subscribe(id => {
                if (this.id === id) {
                    this.updatePages();
                }
            });
    }

    updatePages() {
        let inst = this.service.getInstance(this.id);
        this.api.pages = this.createPageArray(inst.currentPage, inst.itemsPerPage, inst.totalItems, this.api.maxSize);

        const correctedCurrentPage = this.outOfBoundCorrection(inst);
        if (correctedCurrentPage !== inst.currentPage) {
            this.setCurrent(correctedCurrentPage);
        }
    }

    ngOnInit() {
        if (this.id === undefined) {
            this.id = this.service.defaultId;
        }
    }

    ngOnChanges() {
        this.updatePages();
    }

    ngOnDestroy() {
        this.changeSub.unsubscribe();
    }

    /**
     * Set the current page number.
     */
    setCurrent(page: number) {
        this.pageChange.emit(page);
    }

    /**
     * Get the current page number.
     */
    getCurrent(): number {
        return this.service.getCurrentPage(this.id);
    }

    /**
     * Returns the last page number
     */
    getLastPage(): number {
        let inst = this.service.getInstance(this.id);
        return Math.ceil(inst.totalItems / inst.itemsPerPage);
    }

    /**
     * Checks that the instance.currentPage property is within bounds for the current page range.
     * If not, return a correct value for currentPage, or the current value if OK.
     */
    private outOfBoundCorrection(instance: IPaginationInstance): number {
        const totalPages = Math.ceil(instance.totalItems / instance.itemsPerPage);
        if (totalPages < instance.currentPage) {
            return totalPages;
        } else if (instance.currentPage < 1) {
            return 1;
        }

        return instance.currentPage;
    }

    /**
     * Returns an array of IPage objects to use in the pagination controls.
     */
    private createPageArray(currentPage: number, itemsPerPage: number, totalItems: number, paginationRange: number): IPage[] {
        // paginationRange could be a string if passed from attribute, so cast to number.
        paginationRange = +paginationRange;
        let pages = [];
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const halfWay = Math.ceil(paginationRange / 2);

        const isStart = currentPage <= halfWay;
        const isEnd = totalPages - halfWay < currentPage;
        const isMiddle = !isStart && !isEnd;

        let ellipsesNeeded = paginationRange < totalPages;
        let i = 1;

        while (i <= totalPages && i <= paginationRange) {
            let label;
            let pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
            let openingEllipsesNeeded = (i === 2 && (isMiddle || isEnd));
            let closingEllipsesNeeded = (i === paginationRange - 1 && (isMiddle || isStart));
            if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                label = '...';
            } else {
                label = pageNumber;
            }
            pages.push({
                label: label,
                value: pageNumber
            });
            i ++;
        }
        return pages;
    }

    /**
     * Given the position in the sequence of pagination links [i],
     * figure out what page number corresponds to that position.
     */
    private calculatePageNumber(i: number, currentPage: number, paginationRange: number, totalPages: number) {
        let halfWay = Math.ceil(paginationRange / 2);
        if (i === paginationRange) {
            return totalPages;
        } else if (i === 1) {
            return i;
        } else if (paginationRange < totalPages) {
            if (totalPages - halfWay < currentPage) {
                return totalPages - paginationRange + i;
            } else if (halfWay < currentPage) {
                return currentPage - halfWay + i;
            } else {
                return i;
            }
        } else {
            return i;
        }
    }
}

@Directive({
    selector: '[paginationControls]'
})
export class PaginationControlsDirective extends PaginationControlsBase {
    @Input() id: string;
    @Input() set maxSize(value: number) {
        this.api.maxSize = value;
    }
    @Input() set directionLinks(value: boolean) {
        this.api.directionLinks = value;
    }
    @Input() set autoHide(value: boolean) {
        this.api.autoHide = value;
    }
    @Output() pageChange: EventEmitter<number>;

    @ContentChild(TemplateRef) customTemplate;
    private templateView: EmbeddedViewRef;

    constructor(service: PaginationService,
                private viewContainer: ViewContainerRef,
                private cdr: ChangeDetectorRef) {
        super(service);
    }

    ngOnInit() {
        this.cdr.detach();
    }

    ngAfterViewInit() {
        if (this.customTemplate !== null) {
            this.templateView = this.viewContainer.createEmbeddedView(this.customTemplate);
            this.templateView.setLocal('paginationApi', this.api);
        }

        setTimeout(() => this.cdr.reattach());
    }

}

@Component({
    selector: 'pagination-controls',
    template: DEFAULT_TEMPLATE,
    styles: [DEFAULT_STYLES]
})
export class PaginationControlsCmp extends PaginationControlsBase {
    @Input() id: string;
    @Input() set maxSize(value: number) {
        this.api.maxSize = value;
    }
    @Input() set directionLinks(value: boolean) {
        this.api.directionLinks = value;
    }
    @Input() set autoHide(value: boolean) {
        this.api.autoHide = value;
    }
    @Output() pageChange: EventEmitter<number>;

    constructor(service: PaginationService) {
        super(service);
    }

}

export const PAGINATION_DIRECTIVES = CONST_EXPR([PaginationControlsDirective, PaginationControlsCmp]);
