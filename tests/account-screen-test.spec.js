// @ts-check
const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../page/login-page')
const {AccountScreenPage} = require('../page/account-screen-page');

let page;
let loginPage;
let account_screen;
let context;
const urlOurDocs = "https://docsblocklens.readme.io/reference/overview"

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    await loginPage.goto('/login');
    await loginPage.inputCredsAndLogin(process.env.BLOCKLEN_USERNAME, process.env.PASSWORD);

    account_screen = new AccountScreenPage(page);
    await account_screen.clickCloseToastMessage();
    await account_screen.clickProfile();
    await account_screen.clickAccount();
});

test.describe("Check initial information", ()=>{
    test("verify display Basic Details", async({})=>{
        await account_screen.verifyLabelOnBasicDetailsIsVisible()
        await account_screen.verifyButtonOnBasicDetailEnable()
    })

    test("verify information Notifications", async ({})=>{
        await account_screen.verifyCheckBoxEmailIsChecked()
        await account_screen.verifyReceiveEmail(process.env.BLOCKLEN_USERNAME)
    })

    test("verify infomation User API Key", async({})=>{
        await account_screen.verifyUserApiKey()
    })
})

test.describe('Check information at each field', async()=>{
    test('Check email', async({})=>{
        await account_screen.verifyEmail(process.env.BLOCKLEN_USERNAME)
    })
    test('Check name user', async({})=>{
        await account_screen.verifyFullName(process.env.FULL_NAME)
    })
    test('Check receive email', async({})=>{
        await account_screen.checkContainEmail(process.env.BLOCKLEN_USERNAME)
    })
    test('check Security field', async({})=>{
        await account_screen.clickEditPassword()
        await account_screen.checkSecurityField()
        await account_screen.clickCloseChangePassword()
    })
    test('Check notification', async({})=>{
        await account_screen.clickCheckBoxNotification();
        await account_screen.checkActionClickCheckBoxNotification()
        await account_screen.clickCloseToastMessage();
    })
    test('Check User Api Key', async ({})=>{
        await account_screen.clickButtonCopy();
        await account_screen.checkActionClickCopyUserApi();
        await account_screen.clickCloseToastMessage();
        
        await account_screen.clickButtonRegenerateApi();
        await account_screen.checkActionClickRegenerate()
        await account_screen.clickButtonConfirm();
        await account_screen.clickCloseToastMessage();
        
        const pagePromise = context.waitForEvent('page')
        await account_screen.clickOurDocs();
        const newPage = await pagePromise;
        expect(await newPage.url()).toEqual(urlOurDocs)
    })
})

test.afterAll(async ()=>{
    await page.close();
})


