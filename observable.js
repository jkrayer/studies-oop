// From Async Programming in Javascript (with Rx.js Observables)
// Jafar Husain
// Front End Masters

const noop = () => {};


// While I'm experimenting with this in OOP the implementation looks
// Monadic to me.
class Observable {
  constructor(forEach) {
    this._forEach = forEach;
  }

  // this is making sure our Observable is getting an Observer Object...
  // begging the question, should there be an Observer like
  // new Observable(new Observer)
  forEach(onNext, onError, onComplete) {
    if (typeof onNext === 'function') {
      return this._forEach({
        onNext,
        onError: onError || noop,
        onComplete: onComplete || noop
      });
    }
    return this._forEach(onNext);
  }

  // fn = projectionFunction
  map(fn) {
    const self = this;
    return new Observable(function forEach(observer) {
      return self.forEach(
        function onNext (x) {
          return observer.onNext(fn(x))
        },
        function onError (e) {
          return observer.onError(e);
        },
        function onComplete() {
          observer.onComplete();
        }
      );
    });
  }

  filter(predicate) {
    const self = this;
    return new Observable(function forEach(observer) {
      return self.forEach(
        function onNext (x) {
          if (predicate(x)) {
            return observer.onNext(x);
          }
        },
        function onError (e) {
          return observer.onError(e);
        },
        function onComplete() {
          observer.onComplete();
        }
      );
    });
  }

  take(num) {
    var self = this;
    return new Observable(function forEach(observer) {
      let counter = 0;
      const subscription = self.foreach(function onNext(x) {
        if (num !== counter++) {
          return observer.onNext(x);
        }
        subscription.dispose();
        observer.dispose();
      },
      function onError (e) {
        return observer.onError(e);
      },
      function onComplete() {
        observer.onComplete();
      });

      return subscription;
    });
  }

  static fromEvent(domElement, eventName) {
    return new Observable(function forEach(observer) {
      function handler(event) { return observer.onNext(event); }

      domElement.addEventListener('eventName', handler);

      return {
        dispose () {
          domElement.removeEventListener(eventName, handler)
        }
      };
    });
  }
}

// const clicks = Observable.fromEvent(document.getElementById('#someButton'), 'click')
// clicks.forEach(console.log)

// two way data binding === push/pull
// Vuex must implement some version of Object.observe... since I know it uses
// getters and setters on the properties I would think (assumer) setters queue
// updates
