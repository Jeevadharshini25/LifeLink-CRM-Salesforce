
import { LightningElement, api, track } from 'lwc';

import saveDonor
from '@salesforce/apex/DonorController.saveDonor';

export default class DonorForm extends LightningElement {

    @track showModal = false;

    donorName = '';
    bloodGroup = '';
    age = '';
    gender = '';
    city = '';
    phone = '';
    email = '';
    availability = '';

    @api
    openModal() {

        this.showModal = true;
    }

    closeModal() {

        this.showModal = false;
    }

    bloodOptions = [

        { label:'A+', value:'A+' },
        { label:'A-', value:'A-' },
        { label:'B+', value:'B+' },
        { label:'B-', value:'B-' },
        { label:'AB+', value:'AB+' },
        { label:'AB-', value:'AB-' },
        { label:'O+', value:'O+' },
        { label:'O-', value:'O-' }

    ];

    genderOptions = [

        { label:'Male', value:'Male' },
        { label:'Female', value:'Female' },
        { label:'Other', value:'Other' }

    ];

    availabilityOptions = [

        { label:'Available', value:'Available' },
        { label:'Not Available', value:'Not Available' },
        { label:'Emergency Only', value:'Emergency Only' }

    ];

    handleName(event){

        this.donorName = event.target.value;
    }

    handleBlood(event){

        this.bloodGroup = event.target.value;
    }

    handleAge(event){

        this.age = event.target.value;
    }

    handleGender(event){

        this.gender = event.target.value;
    }

    handleCity(event){

        this.city = event.target.value;
    }

    handlePhone(event){

        this.phone = event.target.value;
    }

    handleEmail(event){

        this.email = event.target.value;
    }

    handleAvailability(event){

        this.availability = event.target.value;
    }

    saveDonor(){

        saveDonor({

            donorName:this.donorName,
            bloodGroup:this.bloodGroup,
            age:this.age,
            gender:this.gender,
            city:this.city,
            phone:this.phone,
            email:this.email,
            availability:this.availability

        })

        .then(() => {

            alert('✅ Donor Registered Successfully!');

            this.closeModal();

            window.location.reload();
        })

        .catch(error => {

            console.error(error);

        });
    }
}
