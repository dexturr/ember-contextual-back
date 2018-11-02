import sinon from 'sinon';
import { A } from '@ember/array';

export default function stubHistoryBack(hooks) {
  hooks.beforeEach(function() {
    const location = this.owner.lookup('location:none');
    const originalSetURL = location.setURL.bind(location);
    const originalReplaceURL = location.setURL.bind(location);
    const urls = A();

    // When we do replaceWith both hooks are called annoyingly
    // setURL first and replaceURL second
    let popFirst = true;
    location.replaceURL = function(...args) {
      urls.popObject();
      popFirst = false;
      originalReplaceURL(...args);
    };

    location.setURL = function(path) {
      urls.pushObject(path);
      // Need to pop off the first one as this is our current route
      popFirst = true;
      originalSetURL(...arguments);
    };

    sinon.stub(window.history, 'back').callsFake(function() {
      if (popFirst) {
        urls.popObject();
      }
      const previousURL = urls.lastObject;
      if (previousURL) {
        location.handleURL(previousURL);
      }
    });
  });

  hooks.afterEach(function() {
    window.history.back.restore();
  });
}