/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    testDir: './tests',
    timeout: 30 * 1000,
    use: {
        headless: true,
        actionTimeout: 10 * 1000,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        baseURL: 'https://demo.realworld.io'
    },
    reporter: [['list'], ['html', { outputFolder: '../reports/ui-report', open: 'never' }]]
};
module.exports = config;
