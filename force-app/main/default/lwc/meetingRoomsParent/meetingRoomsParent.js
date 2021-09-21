import { LightningElement,track,api } from 'lwc';

export default class MeetingRoomsParent extends LightningElement {

    @track selectedmeetingroom;


    meetingRoomInfo=[
        {RoomName:'A',RoomCapacity:'12'},
        {RoomName:'B',RoomCapacity:'122'},
        {RoomName:'C',RoomCapacity:'1223'},
        {RoomName:'D',RoomCapacity:'123'},
        {RoomName:'E',RoomCapacity:'142'}
    ];

    onselectedroomhandler(event){
        const meetingroominfoname = event.detail;
       //alert('ffffff'+meetingroominfoname.RoomName);
        this.selectedmeetingroom = meetingroominfoname.RoomName;
        alert('GGGGGG'+selectedmeetingroom);
    }

   /*constructor(){
        super();
        this.template.addEventListener('tileclick', this.onselectedroomhandler.bind(this));
    } */
}