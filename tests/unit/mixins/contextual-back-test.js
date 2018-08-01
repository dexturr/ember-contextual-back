import EmberObject from '@ember/object';
import ContextualBackMixin from 'ember-contextual-back/mixins/contextual-back';
import { module, test } from 'qunit';

module('Unit | Mixin | contextual-back', function() {
  test('it exists', function (assert) {
    let ContextualBackObject = EmberObject.extend(ContextualBackMixin);
    let subject = ContextualBackObject.create();
    assert.ok(subject);
  });

  test('it exists', function (assert) {
    let ContextualBackObject = EmberObject.extend(ContextualBackMixin);
    let subject = ContextualBackObject.create();
    assert.ok(subject);
  });

});
