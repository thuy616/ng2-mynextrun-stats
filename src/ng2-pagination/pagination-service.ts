import {EventEmitter} from 'angular2/core';

export interface IPaginationInstance {
  /**
   * An optional ID for the pagination instance. Only useful if you wish to
   * have more than once instance at a time in a given component.
   */
  id?: string;
  /**
   * The number of items per paginated page.
   */
  itemsPerPage: number;
  /**
   * The current (active) page.
   */
  currentPage: number;
  /**
   * The total number of items in the collection. Only useful when
   * doing server-side paging, where the collection size is limited
   * to a single page returned by the server API.
   *
   * For in-memory paging, this property should not be set, as it
   * will be automatically set to the value of  collection.length.
   */
  totalItems?: number;
}

export class PaginationService {

  change:EventEmitter<string> = new EventEmitter();

  instances:{ [id: string]: IPaginationInstance } = {};
  DEFAULT_ID = 'DEFAULT_PAGINATION_ID';

  /**
   * Check each property of the instance and update any that have changed. Return
   * true if any changes were made, else return false.
   */
  updateInstance(instance:IPaginationInstance):boolean {
    let changed = false;
    for (let prop in this.instances[instance.id]) {
      if (instance[prop] !== this.instances[instance.id][prop]) {
        this.instances[instance.id][prop] = instance[prop];
        changed = true;
      }
    }
    return changed;
  }

  /**
   * Perform a shallow clone of an object.
   */
  clone(obj:any):any {
    var target = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        target[i] = obj[i];
      }
    }
    return target;
  }

  public get defaultId() {
    return this.DEFAULT_ID;
  }

  public register(instance:IPaginationInstance) {
    if (!instance.id) {
      instance.id = this.DEFAULT_ID;
    }

    if (!this.instances[instance.id]) {
      this.instances[instance.id] = instance;
      this.change.emit(instance.id);
    } else {
      let changed = this.updateInstance(instance);
      if (changed) {
        this.change.emit(instance.id);
      }
    }
  }


  /**
   * Returns the current page number.
   */
  public getCurrentPage(id:string):number {
    if (this.instances[id]) {
      return this.instances[id].currentPage;
    }
  }

  /**
   * Sets the current page number.
   */
  public setCurrentPage(id:string, page:number) {
    if (this.instances[id]) {
      let instance = this.instances[id];
      let maxPage = Math.ceil(instance.totalItems / instance.itemsPerPage);
      if (page <= maxPage && 1 <= page) {
        this.instances[id].currentPage = page;
        this.change.emit(id);
      }
    }
  }

  /**
   * Sets the value of instance.totalItems
   */
  public setTotalItems(id:string, totalItems:number) {
    if (this.instances[id] && 0 <= totalItems) {
      this.instances[id].totalItems = totalItems;
      this.change.emit(id);
    }
  }

  /**
   * Sets the value of instance.itemsPerPage.
   */
  public setItemsPerPage(id:string, itemsPerPage:number) {
    if (this.instances[id]) {
      this.instances[id].itemsPerPage = itemsPerPage;
      this.change.emit(id);
    }
  }

  /**
   * Returns a clone of the pagination instance object matching the id. If no
   * id specified, returns the instance corresponding to the default id.
   */
  public getInstance(id:string = this.DEFAULT_ID):IPaginationInstance {
    if (this.instances[id]) {
      return this.clone(this.instances[id]);
    }
    return <IPaginationInstance>{};
  }

}
