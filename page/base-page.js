import { expect } from "@playwright/test";

export class BasePage{
    constructor(page){
        this.page = page;
        this.logInBtn = this.page.getByRole('button', {name: 'Log in'});
    }

    async clickButtonLogin(){
        await this.logInBtn.click()
    }
}