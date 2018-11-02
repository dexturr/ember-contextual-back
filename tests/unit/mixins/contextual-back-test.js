import EmberObject from '@ember/object';
import ContextualBackMixin from 'ember-contextual-back/mixins/contextual-back';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import sinon from 'sinon';
import { A } from '@ember/array';

module('Unit | Mixin | contextual-back', function() {
  test('it transitions to the application route if there is no history stack', function(assert) {
    assert.expect(1);
    let ContextualHistoryBackObject = EmberObject.extend(ContextualBackMixin);
    let subject = ContextualHistoryBackObject.create();
    const spy = sinon.spy();
    subject.transitionTo = spy;
    subject.actions.back.call(subject);
    assert.ok(spy.calledWith('application'))
  });

  test('it keeps a buffer of size 10', function(assert) {
    let ContextualHistoryBackObject = EmberObject.extend(ContextualBackMixin);
    let subject = ContextualHistoryBackObject.create();
    const spy = sinon.spy();
    subject.transitionTo = spy;
    const array = A([0,1,2,3,4,5,6,7,8,9]);
    set(subject, 'transitions', array);
    run(subject, subject.actions.willTransition, { targetName: 'foo' });
    const foundTransitions = subject.transitions.length;
    assert.equal(foundTransitions, subject.maxBuffer);
    assert.equal(subject.transitions.lastObject, 'foo');
  });
});
