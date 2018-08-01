ember-contextual-back
==============================================================================

Provides a contextual back button that can be used to implement native-like navigation stacks.

When trying to implement a navigation stack in Ember it can be tricky to get it right, this addon abstracts all of the implementation details away giving you:

* replaceWith support
* testability
* consistency with browsers' native back button
* does not leave the app if there is no history stack
* support for one to one, many to one and one to many navigation frames (is that the right word? many r)

Seriously though, as a team we went through about 10 implementations before arriving at this one. If you need a contextual back button I would *HIGHLY* recommend using this.

Installation
------------------------------------------------------------------------------

Install the app:
```
ember install contextual-back
```

Usage
------------------------------------------------------------------------------

In the Application route of your ember app add the Mixin:

```js
import Route from '@ember/routing/route';
import ContextualBack from 'ember-contextual-back/mixins/contextual-back';

export default Route.extend(ContextualBack, {

    // Your route code....

});
```

Then when you want to go back just send the action:

```html
<a {{action 'contextualBack'}}>Back</a>
```

By default the contextual back button keeps a stack of 10 transtions max, to prevent this array becoming overly large for long lived applications. This can be changed by setting `maxBuffer` to be the desired array size on the `application` route.

Known Issues
------------------------------------------------------------------------------

Currently on Google Chorme for iOS this back button does not work, this is due to iOS Chrome not respecting `replaceWith` and pushing all transitions into the history stack. Once this issue is resolved in Ember this will be fully functional.


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd contextual-back`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
