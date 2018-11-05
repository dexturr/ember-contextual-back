import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import stubHistoryBack from '../helpers/stub-history-back';

module('Acceptance | navigation', function(hooks) {
  setupApplicationTest(hooks);
  stubHistoryBack(hooks);


  test('winds and unwinds basic history stack correctly', async function(assert) {
    await visit('/');
    await visit('/step-1');
    await visit('/step-2');
    await visit('/step-3');
    await visit('/step-3/step-3-1');
    await click('.back');
    assert.equal(currentURL(), '/step-3');
    await click('.back');
    assert.equal(currentURL(), '/step-2');
    await click('.back');
    assert.equal(currentURL(), '/step-1');
    await click('.back');
    assert.equal(currentURL(), '/');
  });

  test('changing URL manually pushes into history stack', async function(assert) {
    await visit('/');
    await visit('/step-3');
    await visit('/step-3/step-3-1');
    await click('.back');

    assert.equal(currentURL(), '/step-3');
  });

  test('replaceWith does not push into the history stack', async function(assert) {
    await visit('/');
    await visit('/step-1');
    await visit('/step-3');
    await click('.replace');
    await click('.back');

    assert.equal(currentURL(), '/step-1');
  });
});
