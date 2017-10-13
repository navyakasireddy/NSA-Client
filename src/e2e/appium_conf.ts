import {Config} from 'protractor';

export let config: Config = {
  framework: 'jasmine',
  capabilities: {
      browserName: "",
      platformName: "android",
      platformVersion: '6.0',
      deviceName: 'Nexus_5_API_23_x86',
      autoWebview: true,
      app:'C:/Users/ruxana.tabassum/Documents/GitHub/saperion-webapp-template/platforms/android/build/outputs/apk/android-debug.apk'
  },
  baseUrl: 'http://10.0.2.2:8000',
  specs: ['./specs/**/*.js'],
  seleniumAddress: 'http://localhost:4723/wd/hub',
  useAllAngular2AppRoots: true,
  onPrepare: () => {
      var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
      wdBridge.initFromProtractor(exports.config);
 }

};
