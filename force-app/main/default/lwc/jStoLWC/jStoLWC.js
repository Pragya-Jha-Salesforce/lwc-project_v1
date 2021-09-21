import { LightningElement, wire,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class JStoLWC extends NavigationMixin(LightningElement) {
    @api recordId;
    connectedCallback11() {
        // Navigate to a URL
      //alert('Heyy'+'/apex/TestJS?id=' + recordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/TestJS?id=' + recordId
            }
        },
        false // Replaces the current page in your browser history with the URL
      );
    }
    
    connectedCallback() {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: '/apex/TestJS?id=' + this.recordId
            }
        }).then(vfURL => {
            alert(vfURL);

        window.open(vfURL);
        });
           
    }
}