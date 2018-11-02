import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import stubHistoryBack from '../helpers/stub-history-back';

module('Acceptance | navigation', function(hooks) {
  setupApplicationTest(hooks);
  stubHistoryBack(hooks);

  test('visiting /navigation', async function(assert) {
    await visit('/');
    await visit('/step-3');
    await visit('/step-3/step-3-1');
    await click('.back');

    assert.equal(currentURL(), '/step-3');
  });

  test('visiting /navigation', async function(assert) {
    await visit('/');
    await visit('/step-1');
    await visit('/step-3');
    await click('.replace');
    await click('.back');

    assert.equal(currentURL(), '/step-1');
  });
});
