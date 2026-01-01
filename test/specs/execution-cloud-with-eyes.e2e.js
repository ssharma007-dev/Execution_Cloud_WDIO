const { remote } = require('webdriverio');
const {
  Eyes,
  ClassicRunner,
  Target,
  Configuration
} = require('@applitools/eyes-webdriverio');

describe('WDIO Execution Cloud with Eyes', () => {
  let eyes;
  let runner;
  let driver;

  before(() => {
    runner = new ClassicRunner();
  });

  beforeEach(async function () {
    eyes = new Eyes(runner);

    const config = new Configuration();
    config.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setConfiguration(config);

    // 🔑 Create Execution Cloud session manually
    const executionCloudUrl = new URL(await Eyes.getExecutionCloudUrl());
    const protocol = executionCloudUrl.protocol.replace(':', '');

    driver = await remote({
      protocol,
      hostname: executionCloudUrl.hostname,
      port: Number(executionCloudUrl.port),
      path: executionCloudUrl.pathname,
      capabilities: {
        browserName: 'chrome'
      }
    });

    await eyes.open(
      driver,
      'WDIO Execution Cloud App',
      this.currentTest.fullTitle()
    );
  });

  it('runs on Execution Cloud', async () => {
    await driver.url('https://demo.applitools.com');
    await eyes.check('Home', Target.window().fully());
  });

  afterEach(async () => {
    await eyes.closeAsync();
    await driver.deleteSession();
  });

  after(async () => {
    await runner.getAllTestResults();
  });
});
