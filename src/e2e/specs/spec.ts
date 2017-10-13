// Because this file references protractor, you'll need to have it as a project
// dependency to use 'protractor/globals'. Here is the full list of imports:
//
// import {browser, element, by, By, $, $$, ExpectedConditions}
//   from 'protractor/globals';
//
// The jasmine typings are brought in via DefinitelyTyped ambient typings.
import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

describe('protractor with typescript typings', () => {
  beforeEach(() => {
    browser.get('http://localhost:8100');
  });

  it('should have a title', () => {
	expect(browser.getTitle()).toEqual('Ionic Blank');    
	});
	
	it('should navigate to ionic docs page', () => {
	element(by.css('a[href*="http://ionicframework.com/docs/v2"]')).click();
	console.log("docs page");			
	});
  
});
