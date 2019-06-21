import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  let title = "產品管理";
  let name = "滷肉飯";
  let description = "滷肉飯是肉做的";

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it(`should has title: ${title}`, () => {
    browser.sleep(1000);
    expect(page.getTitleText()).toEqual(title); 
  });

  it(`set form`, async () => {
    browser.sleep(1000);
    page.nameEl.sendKeys(name);
    browser.sleep(1000);
    page.descriptionEl.sendKeys(description);
    browser.sleep(1000);

    expect(page.nameEl.getAttribute('value')).toEqual(name); 
    expect(page.descriptionEl.getAttribute('value')).toEqual(description); 
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
