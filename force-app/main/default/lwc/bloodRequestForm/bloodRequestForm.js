import { LightningElement, track } from 'lwc';

import createBloodRequest from '@salesforce/apex/BloodRequestController.createBloodRequest';

export default class BloodRequestForm extends LightningElement {

    handleEmergencyCall() {

    alert('📞 Emergency Call Has Been Initiated!');

}

    @track patientName = '';
    @track hospital = '';
    @track bloodGroup = '';
    @track unitsRequired = '';
    @track requiredDate = '';
    @track emergencyLevel = '';

    handlePatientName(event) {
        this.patientName = event.target.value;
    }

    handleHospital(event) {
        this.hospital = event.target.value;
    }

    handleBloodGroup(event) {
        this.bloodGroup = event.target.value;
    }

    handleUnits(event) {
        this.unitsRequired = event.target.value;
    }

    handleDate(event) {
        this.requiredDate = event.target.value;
        console.log('Date Selected:', this.requiredDate);
    }

    handleEmergency(event) {
        this.emergencyLevel = event.target.value;
    }

    submitForm() {

        if (
            !this.patientName ||
            !this.hospital ||
            !this.bloodGroup ||
            !this.unitsRequired ||
            !this.requiredDate ||
            !this.emergencyLevel
        ) {
            alert('⚠️ Please fill all required fields');
            return;
        }

        console.log('Patient:', this.patientName);
        console.log('Hospital:', this.hospital);
        console.log('Blood Group:', this.bloodGroup);
        console.log('Units:', this.unitsRequired);
        console.log('Date:', this.requiredDate);
        console.log('Emergency:', this.emergencyLevel);

        createBloodRequest({
            patientName: this.patientName,
            hospital: this.hospital,
            bloodGroup: this.bloodGroup,
            unitsRequired: Number(this.unitsRequired),
            requiredDate: this.requiredDate,
            emergencyLevel: this.emergencyLevel
        })

        .then(() => {

            alert('✅ Blood Request Submitted Successfully');

            this.patientName = '';
            this.hospital = '';
            this.bloodGroup = '';
            this.unitsRequired = '';
            this.requiredDate = '';
            this.emergencyLevel = '';

            const fields = this.template.querySelectorAll(
                'input, textarea, select'
            );

            if (fields) {
                fields.forEach(field => {
                    field.value = '';
                });
            }

        })

        .catch(error => {

            console.error('Error:', error);

            if (error.body && error.body.message) {
                alert('❌ ' + error.body.message);
            } else {
                alert('❌ Error submitting request');
            }

        });
    }
}