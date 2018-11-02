import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('step-1');
  this.route('step-2');
  this.route('step-3', function() {
    this.route('step-3-1');
  });
});

export default Router;
