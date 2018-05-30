import { browser, by, element } from 'protractor';

export class AppPage {
  getAngularjsDataList() {
    return new DataList('route-4-data-list');
  }

  getAngularjsLogViewer() {
    return new LogViewer('route-3-log-viewer');
  }

  getAngularLogViewer() {
    return new LogViewer('app-log-viewer');
  }

  getHeadingText() {
    return element(by.css('app-root h1')).getText();
  }

  getMainContentText() {
    return element(by.css('main')).getText();
  }

  navigateTo(path = '/') {
    return browser.get(path);
  }
}

export class DataList {
  elem = element(by.css(this.selector));
  items = this.elem.all(by.css('li'));
  private refreshButton = this.elem.element(by.buttonText('Refresh'));

  constructor(private selector: string) { }

  getItemsText() {
    return this.items.map<string>(x => x.getText());
  }

  refresh() {
    this.refreshButton.click();
  }
}

export class LogViewer {
  elem = element(by.css(this.selector));
  logs = this.elem.all(by.css('li'));
  private logInput = this.elem.element(by.css('input'));
  private logButton = this.elem.element(by.buttonText('Log'));
  private clearButton = this.elem.element(by.buttonText('Clear'));
  private refreshButton = this.elem.element(by.buttonText('Refresh'));

  constructor(private selector: string) { }

  clear() {
    this.clearButton.click();
  }

  getLogsText() {
    return this.logs.map<string>(x => x.getText());
  }

  log(message: string) {
    this.logInput.clear();
    this.logInput.sendKeys(message);
    this.logButton.click();
  }

  refresh() {
    this.refreshButton.click();
  }
}
