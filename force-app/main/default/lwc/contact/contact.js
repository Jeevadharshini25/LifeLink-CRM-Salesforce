
import { LightningElement } from 'lwc';

export default class Contact extends LightningElement {

    handleCall() {

        alert('📞 Emergency Call Has Been Initiated!');
    }

    handleMessage() {

        alert('✅ Thank you for contacting LifeLink CRM!');

        const inputs =
            this.template.querySelectorAll(
                'input, textarea'
            );

        inputs.forEach(input => {

            input.value = '';
        });
    }
}
