import { LightningElement,api } from 'lwc';

export default class MeetingRoomChild extends LightningElement {
    @api meetingRoomInfo;

    @api showInfo=false;

    tileclickhandler(){
        const tileclicked = new CustomEvent('tileclick', {detail : this.meetingRoomInfo});
        this.dispatchEvent(tileclicked);
    }

}