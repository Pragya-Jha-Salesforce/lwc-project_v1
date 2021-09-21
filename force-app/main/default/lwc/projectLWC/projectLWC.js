import { LightningElement, wire,track,api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import Lead_OBJECT from '@salesforce/schema/Lead';
import STATUS_FIELD from '@salesforce/schema/Lead.Status';
import INDUSTRY_FIELD from '@salesforce/schema/Lead.Industry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class projectLWC extends LightningElement {

strFirstName;
strLastName;
strCompany;
@track strStatus;
strAnnualRevenue;
strEmail;
strPhone;
@track strIndustry;
stroptionValue='';
strIndustryValue='';
@api recordId;
@track createRec=true;
@track viewRec=false;


@wire(getObjectInfo, { objectApiName: Lead_OBJECT })
leadMetadata;

@wire(getPicklistValues, {
recordTypeId: '$leadMetadata.data.defaultRecordTypeId', 
fieldApiName: STATUS_FIELD

})
wiredPickListValue({ data, error }){
if(data){
	console.log(` Picklist values are `, data.values);
	this.strStatus = data.values;
	this.error = undefined;
	console.log('Pkl V'+this.strStatus);
}
if(error){
	console.log(` Error while fetching Picklist values  ${error}`);
	this.error = error;
	this.strStatus = undefined;
}
}

@wire(getPicklistValues, {
recordTypeId: '$leadMetadata.data.defaultRecordTypeId', 
fieldApiName: INDUSTRY_FIELD

})
wiredPickValue({ data, error }){
	if(data){
	console.log(` Picklist values are `, data.values);
	this.strIndustry = data.values;
	this.error = undefined;
	console.log('Pkl V'+this.strIndustry);
	}
	if(error){
	console.log(` Error while fetching Picklist values  ${error}`);
	this.error = error;
	this.strIndustry = undefined;
	}
}	    


// Change Handlers.
fnameChangedHandler(event){
	this.strFirstName = event.target.value;
}
lnameChangedHandler(event){
	this.strLastName = event.target.value;
}
companyChangedHandler(event){
	this.strCompany = event.target.value;	
}
statusChangedHandler(event){
	this.stroptionValue = event.target.value;
}
annualRevenueChangedHandler(event){
	this.strAnnualRevenue = event.target.value;
}
emailChangedHandler(event){
	this.strEmail = event.target.value;
}
phoneChangedHandler(event){
	this.strPhone = event.target.value;
}
industryChangedHandler(event){
	this.strIndustryValue = event.target.value;
}

// Insert record.
createLead(){

// Creating mapping of fields of Account with values
console.log('Fn------'+this.strFirstName);
console.log('ln------------'+this.strLastName);
console.log('comp----------'+this.strCompany);
console.log('status---------'+this.stroptionValue);
console.log('src----------'+this.strAnnualRevenue);
console.log('email---------'+this.strEmail);
console.log('Phn-------------'+this.strPhone);
console.log('I-------------'+this.strIndustryValue);

var fields = {'FirstName' : this.strFirstName,'LastName' : this.strLastName, 'Company' : this.strCompany, 'Status' : this.stroptionValue,'AnnualRevenue' : this.strAnnualRevenue,'Email' : this.strEmail, 'Phone' : this.strPhone,'Industry' : this.strIndustryValue};

// Record details to pass to create method with api name of Object.
var objRecordInput = {'apiName' : 'Lead', fields};

// LDS method to create record.
createRecord(objRecordInput)
	.then(response => {
		console.log('Lead created with Id: ' +response.id);
		const evt = new ShowToastEvent({
			title: "Success",
			message: "Record created successfully!!",
			variant: "success",
			mode: 'dismissable'
		    });
		    this.dispatchEvent(evt);
		    this.viewRec=true;
		    this.createRec=false;
		    this.recordId=response.id;
		    console.log('Evt');

	}).catch(error => {
		console.log('Error: ' +JSON.stringify(error));
		const evt = new ShowToastEvent({
			title: "Error",
			message: "Something went worng!!",
			variant: "error",
			mode: 'dismissable'
		    });
		    this.dispatchEvent(evt);
		    alert('Evt');
	});
}
}