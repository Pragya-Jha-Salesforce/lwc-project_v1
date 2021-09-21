import { api, LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/contactAccController.getContacts';
import { refreshApex } from '@salesforce/apex';
import updateContacts from '@salesforce/apex/contactAccController.updateContacts';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const COLS = [
	{ label: 'First Name', fieldName: 'FirstName', editable: true },
	{ label: 'Last Name', fieldName: 'LastName', editable: true },
	{ label: 'Title', fieldName: 'Title' },
	{ label: 'Phone', fieldName: 'Phone', type: 'phone' },
	{ label: 'Email', fieldName: 'Email', type: 'email' }
	];

export default class RelatedList extends LightningElement {
@api recordId;
columns = COLS;
draftValues = [];

@wire(getContacts, { accId: '$recordId' })
contact;

async handleSave( event ) {
	const updatedFields = event.detail.draftValues;
	const notifyChangeIds = updatedFields.map(row => { return { "recordId": row.Id } });
	await updateContacts( { data: updatedFields } )
	.then( result => {
	console.log( JSON.stringify( "Apex update result: " + result ) );

	this.dispatchEvent(
	new ShowToastEvent({
		title: 'Success',
		message: 'Account(s) updated',
		variant: 'success'
	})
	);
	 getRecordNotifyChange(notifyChangeIds);
	refreshApex( this.contact ).then( () => {
	this.draftValues = [];
	});
	}).catch( error => {
	console.log( 'Error is ' + JSON.stringify( error ) );
	this.dispatchEvent(
	new ShowToastEvent({
		title: 'Error updating or refreshing records',
		message: error.body.message,
		variant: 'error'
	})
	);
});
}
}