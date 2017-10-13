// Because this file imports from  protractor, you'll need to have it as a
// project dependency. Please see the reference config: lib/config.ts for more
// information.
//
// Why you might want to create your config with typescript:
// Editors like Microsoft Visual Studio Code will have autocomplete and
// description hints.
//
// To run this example, first transpile it to javascript with `npm run tsc`,
// then run `protractor conf.js`.
import {Config} from 'protractor';

export let config: Config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  specs: ['./specs/**/*.js'],
  seleniumAddress: 'http://localhost:4444/wd/hub',
  useAllAngular2AppRoots: true,
  onPrepare: () => {
   let globals = require('protractor');
   let browser = globals.browser;
   //browser.manage().window().maximize();
   //browser.manage().timeouts().implicitlyWait(5000);
 }

  // You could set no globals to true to avoid jQuery '$' and protractor '$'
  // collisions on the global namespace.
  //noGlobals: true
};
