// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page/login-page');
const { log } = require('console');

let page;

test.beforeAll(async ({browser})=>{
    const context = await browser.newContext()
    page = await context.newPage()
})
test.describe('check information dashboard', ()=>{
    test('test login successful', async ({})=>{
        const loginPage = new LoginPage(page)
        await loginPage.goto('https://stg-console.blocklens.io/login')
        await loginPage.inputCredsAndLogin('anh.nguyen37@sotatek.com', 'Baymax2000@')
        await loginPage.clickButtonLogin()
        await loginPage.verifyToastMessage('Welcome to Blocklens!')
    })
    test('check info default of tab dashboard', async({})=>{
        const loginPage = new LoginPage(page)
        await loginPage.checkButtonCreateEnable()
    })
})
test.afterAll(async({})=>{
    await page.close()
})

