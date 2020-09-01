/**
 * A Publish/Subscribe implementation
 *
 * The Good:
 * This pattern allows any part of an application (the publisher) to let one
 * or more (the subscriber(s)) other parts of the application know when
 * some state has changed.
 *
 * The Bad:
 * Subscribers may subscribe to an event that is never published. Publishers
 * may fire events that nothing subscribes to. It may be difficult to know
 * when either of these conditions is true in your application.
 */
export default class PubSub {
  constructor () {
    this._events = Object.create(null);
    this._uid = -1;
  }

  /**
   * Create an event if it does not exist
   * @param  {String} eventName
   * @return {undefined}
   */
  _createEvent(eventName) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
  }

  /**
   * Remove a callback from an event queue
   * @param  {String} eventName
   * @param  {Number} uid
   * @return {undefined}
   */
  _unSubscribe(eventName, uid) {
    this._events[eventName] = this._events[eventName].filter(event, event.uid !== uid);
  }

  /**
   * Subscribe to a published event. The given callback will be invoked when the
   * provided eventName is published. If subscribe is called with once = true
   * the callback will only be invoked on the next publish of the given event.
   *
   * @param  {String}   eventName    event to subscribe to
   * @param  {Function} callback     function to call when the event is published
   * @param  {Boolean}  once         call the subscriber function only one time
   * @return {Function}              a bound unSubscribe method
   */
  subscribe(eventName, callback, once = false) {
    this._createEvent(eventName);

    this._events[eventName].push({
      callback,
      once,
      uid: ++this._uid;
    });

    return this._unSubscribe.bind(this, eventName, this._uid);
  }

  /**
   * Publish an event. Invokes all subscribed callbacks in order of subscription
   * with the supplied data.
   * @param  {String} eventName event to publish
   * @param  {Any} data         data to pass to subscriber functions
   * @return {undefined]}
   */
  publish(eventName, data) {
    this._createEvent(eventName);

    this._events[eventName] = this._events[eventName]
      .filter(subscriber => {
        subscriber.callback(d);
        return subscriber.once === false;
      });
  }
}
