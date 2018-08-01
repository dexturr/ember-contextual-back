import Mixin from '@ember/object/mixin';
import { schedule } from '@ember/runloop';
import { computed } from '@ember/object';
// TODO
import { A } from '@ember/array' 
export default Mixin.create({

  maxBuffer: 10,

  goingBack: false,

  transitions: computed(function() {
    return A();
  }),

  pushTransition(transition) {
    // replaceWith transitions are not pushed into the history stack
    // Need to ensure that the urlTransitions and transitions stacks
    // are consistent with window history
    if (transition.urlMethod !== 'replace') {
      if (this.transitions.length === this.maxBuffer) {
        this.transitions.shift();
      }
      this.transitions.pushObject(transition.targetName);
    }
  },

  actions: {

    willTransition(transition) {
      // willTransition is called before the transition urlMethod is set
      // HACK: wait until after routerTransitions have occured to ensure we know the urlMethod
      schedule('routerTransitions', () => {
        if (this.transitions.length > 1) {
          let previousTransition  = this.transitions[this.transitions.length - 2];

          // Native/Implemented back button has been used
          if (transition.targetName === previousTransition) {
            // Remove the previous transition
            this.transitions.popObject();
          } else {
            this.pushTransition(transition);
          }
        } else {
          this.pushTransition(transition);
        }
      });
      return true;
    },

    contextualBack() {
      if (this.transitions.length > 1) {
        window.history.back();
      } else {
        this.transitionTo('application');
      }
    },

  },

});
