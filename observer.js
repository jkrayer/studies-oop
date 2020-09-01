// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
// http://gameprogrammingpatterns.com/observer.html
// https://webdevstudios.com/2019/02/19/observable-pattern-in-javascript/

export class Subject {
  constructor() {
    this.observerList = []; // List of objects that implement an update method
  }

  /**
   * Add Observer to list
   * @param {Observer} observer
   * @return {undefined}
   */
  addObserver(observer) {
    this.observerList.push(observer);
  }

  /**
   * Remove Observer from list
   * @param  {Observer} observer
   * @return {undefined}
   */
  remove(observer) {
    this.observerList = this.observerList.filter(o => o !== observer);
  }

  /**
   * Call the update method on each observer in the list
   * @param  {Any} data
   * @return {undefined}
   */
  notify(data) {
    this.observerList.forEach(observer => observer.update(data));
  }
}


export class Observer {
  /**
   * This method needs to be defined by any object that implements Observer
   * @return {undefined}
   */
  update() {}
}
