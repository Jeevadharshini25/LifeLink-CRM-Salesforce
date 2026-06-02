import { LightningElement } from 'lwc';

export default class HomePage extends LightningElement {

    handleEmergencyCall() {

        alert('📞 Emergency Call Has Been Initiated!');
    }

    openDonorForm() {

        const donorForm =
            this.template.querySelector('c-donor-form');

        if (donorForm) {

            donorForm.openModal();
        }
    }
}