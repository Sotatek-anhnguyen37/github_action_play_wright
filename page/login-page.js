const { expect } = require('@playwright/test');
//@ts-check
export class LoginPage{
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.emailInput = this.page.locator('input.chakra-input').first();
        this.passwordInput = this.page.locator('input.chakra-input').nth(1);
        this.logInBtn = this.page.getByRole('button', {name: 'Log in'});
        this.ToastWelcomeMessage = this.page.locator('div.chakra-alert__desc').first();
        this.forgotPasswordBtn = this.page.getByText('Forgot your password?');
        this.textNotVerifyMessage = this.page.locator('//p[contains(@class,"chakra-text")]').nth(1);
        this.toast_message = this.page.locator('div.chakra-alert__desc').first();
    }
    async goto(path){
        await this.page.goto(path);
    }
    async inputCredsAndLogin(userName, password){
        await this.emailInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.logInBtn.click();
    }
    async inputUserName(userName){
        await this.emailInput.fill(userName);
    }
    async inputPassword(passWord){
        await this.passwordInput.fill(passWord);
    }
    async verifyTitleCorrectly(){
        await expect(this.page).toHaveTitle('Blocklens');
    }
    async verifyWelcomeToastMessageDisplayed(){
        await expect(this.ToastWelcomeMessage).toHaveText('Welcome to Blocklens!');
    }

    async clickToForgotPasswordBtn(){
        await this.forgotPasswordBtn.click();
    }

    async verifyNotVerifyToastMessageDisplayed(){
        await expect(this.textNotVerifyMessage).toHaveText('That email is not verified. Please check your email first.');
        await expect(this.logInBtn).toBeDisabled();
    }
    async verifyToastMessage(message){
        await expect(this.toast_message).toHaveText(message)
    }
    
}