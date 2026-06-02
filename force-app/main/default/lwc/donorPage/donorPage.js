import { LightningElement, wire } from 'lwc';

import getBloodGroupCounts
from '@salesforce/apex/DonorController.getBloodGroupCounts';

import getDonors
from '@salesforce/apex/DonorController.getDonors';

export default class DonorPage extends LightningElement {

    counts = {};

    allDonors = [];

    filteredDonors = [];

    bloodGroup = '';

    city = '';

    availability = '';

    // BLOOD GROUP COUNTS

    @wire(getBloodGroupCounts)

    wiredCounts({ data, error }) {

        if(data){

            this.counts = data;

        }

        if(error){

            console.error(error);

        }
    }

    // ALL DONORS

    @wire(getDonors)

    wiredDonors({ data, error }) {

        if(data){

            this.allDonors = data;

            this.filteredDonors = data;

        }

        if(error){

            console.error(error);

        }
    }

    // BLOOD GROUP COUNTS

    get aPositive() {

        return this.counts['A+'] || 0;
    }

    get bPositive() {

        return this.counts['B+'] || 0;
    }

    get oPositive() {

        return this.counts['O+'] || 0;
    }

    get abPositive() {

        return this.counts['AB+'] || 0;
    }

    get aNegative() {

        return this.counts['A-'] || 0;
    }

    get bNegative() {

        return this.counts['B-'] || 0;
    }

    get oNegative() {

        return this.counts['O-'] || 0;
    }

    get abNegative() {

        return this.counts['AB-'] || 0;
    }

    // SEARCH BLOOD GROUP

    handleBloodGroup(event) {

        this.bloodGroup =
            event.target.value.toLowerCase();

        this.applyFilters();
    }

    // SEARCH CITY

    handleCity(event) {

        this.city =
            event.target.value.toLowerCase();

        this.applyFilters();
    }

    // FILTER AVAILABILITY

    handleAvailability(event) {

        this.availability =
            event.target.value.toLowerCase();

        this.applyFilters();
        
    }
    handleEmergencyCall() {

    alert('📞 Emergency Call Has Been Initiated!');
}

    // APPLY ALL FILTERS

    applyFilters() {

        this.filteredDonors =
            this.allDonors.filter(donor => {

                const bloodMatch =

                    !this.bloodGroup ||

                    donor.Blood_Group__c
                    ?.toLowerCase()
                    .includes(this.bloodGroup);

                const cityMatch =

                    !this.city ||

                    donor.City__c
                    ?.toLowerCase()
                    .includes(this.city);
                const availabilityMatch =

    !this.availability ||

    donor.Availability_Status__c
    ?.toLowerCase()
    === this.availability;

                return bloodMatch &&
                       cityMatch &&
                       availabilityMatch;
            });
    }
}