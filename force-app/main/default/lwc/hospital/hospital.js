
import { LightningElement, wire, track } from 'lwc';
import getHospitals from '@salesforce/apex/HospitalController.getHospitals';

export default class Hospital extends LightningElement {

    @track hospitals = [];
    @track showHospitalList = false;

    @wire(getHospitals)
    wiredHospitals({ data, error }) {

        if (data) {

            console.log('Hospitals Loaded:', data);

            this.hospitals = data;
        }

        if (error) {

            console.error('Hospital Error:', error);

            alert(JSON.stringify(error));
        }
    }

    handleEmergencyCall() {

        alert('📞 Emergency Call Has Been Initiated!');
    }

    showHospitals() {

        this.showHospitalList = true;

        setTimeout(() => {

            window.scrollTo({
                top: 900,
                behavior: 'smooth'
            });

        }, 300);
    }
}
