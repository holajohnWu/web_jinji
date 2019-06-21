import { browser, by, element } from 'protractor';

export class AppPage {
  nameEl = element(by.id('name'));
  descriptionEl = element(by.id('description'));

  navigateTo() {
    browser.ignoreSynchronization = true;
    browser.get(browser.baseUrl + "product");
  }

  getTitleText() {
    return element(by.id('page-title')).getText();
  }
}
