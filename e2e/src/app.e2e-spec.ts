import { browser } from 'protractor';
import { AppPage, DataList, LogViewer } from './app.po';
import { Item } from '../../src/app/route-4/route-4-angularjs.module';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => page = new AppPage());

  describe('/', () => {
    beforeEach(() => page.navigateTo());

    it('should display welcome message', () => {
      expect(page.getHeadingText()).toBe('Welcome to PANTHEON UPGRADE DEMO!');
    });

    it('should redirect `/` to `/route-1`', () => {
      const baseUrl = browser.baseUrl.replace(/\/$/, '');
      expect(browser.getCurrentUrl()).toBe(`${baseUrl}/route-1`);
    });

    it('should show 404 error when navigating to unknown path', () => {
      page.navigateTo('/unknown/path');
      expect(page.getMainContentText()).toBe('404 - Page not found');
    });

    describe('LogViewer (Angular)', () => {
      let logViewer: LogViewer;

      beforeEach(() => logViewer = page.getAngularLogViewer());

      it('should show a placeholder message if no logs', () => {
        expect(logViewer.getLogsText()).toEqual([]);
        expect(logViewer.elem.getText()).toContain('No logs yet.');
      });

      it('should immediately show added logs', () => {
        expect(logViewer.getLogsText()).not.toContain('foo');
        expect(logViewer.getLogsText()).not.toContain('bar');

        logViewer.log('foo');
        expect(logViewer.getLogsText()).toContain('foo');

        logViewer.log('bar');
        expect(logViewer.getLogsText()).toContain('bar');
      });

      it('should clear all logs with the "Clear" button', () => {
        logViewer.log('foo');
        logViewer.log('bar');
        expect(logViewer.getLogsText()).toEqual(['foo', 'bar']);

        logViewer.clear();
        expect(logViewer.getLogsText()).toEqual([]);
      });
    });
  });

  describe('/route-1', () => {
    beforeEach(() => page.navigateTo('/route-1'));

    it('should display route-1 specific content', () => {
      expect(page.getMainContentText()).toBe('Route 1');
    });
  });

  describe('/route-2', () => {
    beforeEach(() => page.navigateTo('/route-2'));

    it('should display route-2 specific content', () => {
      expect(page.getMainContentText()).toBe('Route 2');
    });
  });

  describe('/route-3', () => {
    beforeEach(() => page.navigateTo('/route-3'));

    it('should display route-3 specific content (including AngularJS content)', () => {
      expect(page.getMainContentText()).toContain('Route 3');
      expect(page.getMainContentText()).toContain('POWERED BY ANGULARJS');
    });

    describe('LogViewer (AngularJS)', () => {
      let logViewer: LogViewer;

      beforeEach(() => logViewer = page.getAngularjsLogViewer());

      it('should show a placeholder message if no logs', () => {
        expect(logViewer.getLogsText()).toEqual([]);
        expect(logViewer.elem.getText()).toContain('No logs yet.');
      });

      it('should immediately show added logs', () => {
        expect(logViewer.getLogsText()).not.toContain('foo');
        expect(logViewer.getLogsText()).not.toContain('bar');

        logViewer.log('foo');
        expect(logViewer.getLogsText()).toContain('foo');

        logViewer.log('bar');
        expect(logViewer.getLogsText()).toContain('bar');
      });

      it('should clear all logs with the "Clear" button', () => {
        logViewer.log('foo');
        logViewer.log('bar');
        expect(logViewer.getLogsText()).toEqual(['foo', 'bar']);

        logViewer.clear();
        expect(logViewer.getLogsText()).toEqual([]);
      });

      describe('interacting with Angular LogViewer', () => {
        let logViewer2: LogViewer;

        beforeEach(() => logViewer2 = page.getAngularLogViewer());

        it('should not show logged messages in the other viewer if no CD', () => {
          logViewer.log('AngularJS rocks');
          expect(logViewer.getLogsText()).toContain('AngularJS rocks');
          expect(logViewer2.getLogsText()).not.toContain('AngularJS rocks');

          logViewer.refresh();
          logViewer.refresh();
          expect(logViewer2.getLogsText()).not.toContain('AngularJS rocks');

          logViewer2.log('Angular rocks 2');
          expect(logViewer.getLogsText()).not.toContain('Angular rocks 2');
          expect(logViewer2.getLogsText()).toContain('Angular rocks 2');

          logViewer.refresh();
          logViewer2.refresh();
          expect(logViewer2.getLogsText()).toContain('Angular rocks 2');
        });

        it('should show logged messages in the other viewer with the "Refresh" button', () => {
          logViewer.log('AngularJS rocks');
          logViewer2.refresh();
          expect(logViewer2.getLogsText()).toContain('AngularJS rocks');

          logViewer2.log('Angular rocks 2');
          logViewer.refresh();
          expect(logViewer.getLogsText()).toContain('Angular rocks 2');
        });

        it('should not clear logged messages in the other viewer if no CD', () => {
          logViewer.log('AngularJS');
          logViewer.log('rocks');
          logViewer2.refresh();

          expect(logViewer.getLogsText()).toEqual(['AngularJS', 'rocks']);
          expect(logViewer2.getLogsText()).toEqual(['AngularJS', 'rocks']);

          logViewer.clear();
          expect(logViewer.getLogsText()).toEqual([]);
          expect(logViewer2.getLogsText()).toEqual(['AngularJS', 'rocks']);

          logViewer2.refresh();
          expect(logViewer2.getLogsText()).toEqual([]);
        });
      });
    });
  });

  describe('/route-4', () => {
    beforeEach(() => page.navigateTo('/route-4'));

    it('should display route-4 specific content (including AngularJS content)', () => {
      expect(page.getMainContentText()).toContain('Route 4');
      expect(page.getMainContentText()).toContain('powered by angularjs');
    });

    describe('DataList', () => {
      const allData: Item[] = require('../../src/assets/mock-data.json');
      const allItems = allData.map(d => `[${d.id}] ${d.value}`);
      let dataList: DataList;
      let logViewer2: LogViewer;

      beforeEach(() => {
        dataList = page.getAngularjsDataList();
        logViewer2 = page.getAngularLogViewer();
      });

      it('should list items', () => {
        expect(dataList.getItemsText()).toEqual(allItems);
      });

      it('should log its actions', () => {
        logViewer2.refresh();
        expect(logViewer2.getLogsText()).toEqual([
          'Loading data from server...',
          'Done loading data.',
        ]);
      });

      it('should refresh the list with the "Refresh" button', () => {
        logViewer2.clear();

        dataList.refresh();
        dataList.refresh();
        expect(dataList.getItemsText()).toEqual(allItems);

        logViewer2.refresh();
        expect(logViewer2.getLogsText()).toEqual([
          'Loading data from server...',
          'Done loading data.',
          'Loading data from server...',
          'Done loading data.',
        ]);
      });

      it('should show a placeholder message while loading items', () => {
        browser.waitForAngularEnabled(false);

        dataList.refresh();
        expect(dataList.elem.getText()).toContain('Loading...');

        browser.wait(() => dataList.items.isPresent());
        expect(dataList.elem.getText()).not.toContain('Loading...');

        browser.waitForAngularEnabled(true);
      });

      describe('interacting with Angular LogViewer', () => {
        it('should not show logged messages in the viewer if no CD', () => {
          expect(logViewer2.getLogsText()).toEqual([]);

          dataList.refresh();
          expect(logViewer2.getLogsText()).toEqual([]);
        });

        it('should show logged messages in the viewer with the "Refresh" button', () => {
          const loggedMessages = [
            'Loading data from server...',
            'Done loading data.',
          ];

          logViewer2.refresh();
          expect(logViewer2.getLogsText()).toEqual(loggedMessages);

          dataList.refresh();
          expect(logViewer2.getLogsText()).toEqual(loggedMessages);

          logViewer2.refresh();
          expect(logViewer2.getLogsText()).toEqual([
            ...loggedMessages,
            ...loggedMessages,
          ]);
        });
      });
    });
  });
});
