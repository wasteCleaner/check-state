# Test redux state easily
The CLI tool for testing selectors in your application.

## Get starting
To installing this package just run:

`npm i check-state -g`

## Configuration
For running test you need 2 configuration files:
* checkState.config.js - in this file you need to export all your selectors. All selectors which exported there will be tested;
* app.checkState.json - this file contain test cases and other helpful data. For preparing it you need our Chrome extension: https://chrome.google.com/webstore/detail/redux-checkstate-selector/lhhbnkkjefhgnlfjhjdbnijiikiofgbc

> **Important!** You need to put configs to /src folder of your project.

### Example checkState.config.js
```$js
import {
  selectSomething,
  selectIsSomethingExist,
} from "./store/something/selectors";
import {
  selectSomethingElse,
  selectFirstSomethingElse,
} from "./store/somethingElse/selectors";

export {
  selectSomething,
  selectIsSomethingExist,
  selectSomethingElse,
  selectFirstSomethingElse,
};
```

This file you also need for using our Chrome extension, because we will run all selectors in extension for preparing *app.checkState.json* file.

## Running
When all configs are prepared you can jus run:
`check-state start`

## Read more
You can read more about this idea on my website: http://wastecleaner.im/check-state