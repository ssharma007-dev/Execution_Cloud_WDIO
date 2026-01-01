const { remote } = require('webdriverio');
const { Eyes } = require('@applitools/eyes-webdriverio'); 
// 👆 used ONLY to fetch Execution Cloud URL

describe('WDIO Execution Cloud WITHOUT Eyes', () => {
  let driver;

  beforeEach(async () => {
    const ecUrl = new URL(await Eyes.getExecutionCloudUrl());

    driver = await remote({
      protocol: ecUrl.protocol.replace(':', ''),
      hostname: ecUrl.hostname,
      port: Number(ecUrl.port),
      path: ecUrl.pathname,
      capabilities: {
        browserName: 'chrome'
      }
    });

    await driver.execute('applitools:startTest', {
      appName: 'Execution Cloud Demo',
      testName: 'WDIO without Eyes'
    });
  });

  it('runs on Execution Cloud', async () => {
    await driver.url('https://demo.applitools.com/');
    const title = await driver.getTitle();
    console.log('Page title:', title);
  });

  afterEach(async () => {
    await driver.execute('applitools:endTest', {
      status: 'Passed'
    });

    await driver.deleteSession();
  });
});
