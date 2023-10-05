import { expect } from '@playwright/test';

//@ts-check
export class AccountScreenPage{
        /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page){
        this.page = page;
        this.profile = this.page.locator('span.css-xl71ch').first();
        this.account = this.page.locator('div.user-account');
        this.edit_password = this.page.locator('div.btn-edit').nth(1);
        this.title_basic_details = this.page.locator('div.title').nth(0);
        this.label_email_basic_detail = this.page.locator('div.info-item div.label').nth(0);
        this.label_name_basic_detial = this.page.locator('div.info-item div.label').nth(1);
        this.btn_edit_name = this.page.locator('div.btn-edit').nth(0);
        this.btn_edit_password = this.page.locator('div.btn-edit').nth(1);
        this.checkbox_receive_email = this.page.locator('span.chakra-checkbox__control');
        this.receive_email = this.page.locator('div.email');
        this.label_user_api = this.page.locator('div.user-api__label');
        this.btn_regenerate_api = this.page.locator('div.btn-copy').nth(0);
        this.btn_copy = this.page.locator('div.btn-copy').nth(1);
        this.email_value = this.page.locator('div.info-item div.value').nth(0);
        this.full_name = this.page.locator('div.info-item div.value').nth(1);
        this.title_popup = this.page.locator('div.modal__title');
        this.btn_close_change_password = this.page.locator('div.modal__btn-close');
        this.btn_close_toast_message = this.page.getByRole('button', {name: "Close"});
        this.toast_message = this.page.locator('div.chakra-alert__desc');
        this.btn_confirm = this.page.getByRole('button', {name: 'Confirm'});
        this.btn_our_docs = this.page.locator('div.user-api__label a');

    }
    
    async clickProfile(){
        await this.profile.click();
    }

    async clickAccount(){
        await this.account.click();
    }

    async clickEditPassword(){
        await this.edit_password.click()
    }
    async clickEditPassword(){
        await this.btn_edit_password.click();
    }
    async clickCloseChangePassword(){
        await this.btn_close_change_password.click();
    }
    async clickCheckBoxNotification(){
        await this.checkbox_receive_email.click();
    }
    async clickCloseToastMessage(){
        await this.btn_close_toast_message.nth(0).click();
    }
    async clickButtonCopy(){
        await this.btn_copy.click();
    }
    async clickButtonRegenerateApi(){
        await this.btn_regenerate_api.click();
    }
    async clickButtonConfirm(){
        await this.btn_confirm.click();
    }
    async clickOurDocs(){
        await this.btn_our_docs.click();
    }
    async verifyLabelOnBasicDetailsIsVisible(){
        await expect(this.title_basic_details).toHaveText("Basic Details");
        await expect(this.label_email_basic_detail).toHaveText("Email:");
        await expect(this.label_name_basic_detial).toHaveText("Name:");
    }
    async verifyButtonOnBasicDetailEnable(){ 
        await expect(this.btn_edit_name).toBeEnabled({enabled: true});
        await expect(this.btn_edit_password).toBeEnabled({enabled: true});
    }
    async verifyCheckBoxEmailIsChecked(){
        await expect(this.checkbox_receive_email).toBeChecked({checked: false});
    }
    async verifyReceiveEmail(email){
        await expect(this.receive_email).toHaveText('Receive Email: '+ email)
    }
    async verifyUserApiKey(){
        await expect(this.label_user_api).toHaveText('You can query blockchain data via api by API keys now. See more in Our docs.')
        await expect(this.btn_regenerate_api).toBeEnabled({enabled: true})
        await expect(this.btn_copy).toBeEnabled({enabled: true})
    }
    async verifyEmail(email){
        await expect(this.email_value).toHaveText(email);
    }
    async verifyFullName(fullName){
        await expect(this.full_name).toHaveText(fullName);
    }
    async checkContainEmail(email){
        const txbReceiveEmail = await this.page.textContent('div.email')
        expect(txbReceiveEmail).toContain(email)
    }
    async checkSecurityField(){
        await expect(this.title_popup).toHaveText('Change Password');
    }
    async checkActionClickCheckBoxNotification(){
        await expect(this.checkbox_receive_email).toBeChecked({checked: true})
        await expect(this.toast_message).toHaveText('Successfully')
    }
    async checkActionClickCopyUserApi(){
        await expect(this.toast_message.nth(1)).toHaveText('Copied')
    }
    async checkActionClickRegenerate(){
        await expect(this.title_popup).toHaveText('Regenerate API Key');
    }
}