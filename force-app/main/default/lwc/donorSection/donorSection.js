import { LightningElement, wire, api } from 'lwc';

import getDonors
from '@salesforce/apex/DonorController.getDonors';

export default class DonorSection extends LightningElement {

    donors = [];

    allDonors = [];

    bloodGroup = '';

    city = '';

    availability = '';

    @wire(getDonors)

    wiredDonors({ data, error }) {

        if (data) {

            this.allDonors = data;

            this.donors = data;
        }

        if (error) {

            console.error('ERROR:', JSON.stringify(error));
        }
    }

    @api
    filterBloodGroup(value) {

        this.bloodGroup = value.toLowerCase();

        this.applyFilters();
    }

    @api
    filterCity(value) {

        this.city = value.toLowerCase();

        this.applyFilters();
    }

    @api
    filterAvailability(value) {

        this.availability = value.toLowerCase();

        this.applyFilters();
    }

    applyFilters() {

        this.donors = this.allDonors.filter(donor => {

            const bloodMatch =
                !this.bloodGroup ||

                donor.Blood_Group__c?.toLowerCase()
                .includes(this.bloodGroup);

            const cityMatch =
                !this.city ||

                donor.City__c?.toLowerCase()
                .includes(this.city);

            const availabilityMatch =
                !this.availability ||

                donor.Availability_Status__c?.toLowerCase()
                .includes(this.availability);

            return bloodMatch &&
                   cityMatch &&
                   availabilityMatch;
        });
    }
}