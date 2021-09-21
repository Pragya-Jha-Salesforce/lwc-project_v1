import { LightningElement,track } from 'lwc';

export default class DisplayHideDiv extends LightningElement {
     @track name='Pragya';
     @track inputCheck=false;
     @track animalist=['Cat','Dog','Cow'];
     changeHandler(event){
         this.name=event.target.value;
     };
     displayComp(event){
         this.inputCheck=event.target.checked;
     }
}