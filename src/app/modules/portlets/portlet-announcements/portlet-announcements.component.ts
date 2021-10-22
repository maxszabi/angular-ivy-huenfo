import { Component, OnInit } from '@angular/core';
import { Portlet } from '../portlet';

@Component({
  selector: 'app-portlet-announcements',
  templateUrl: './portlet-announcements.component.html',
  styleUrls: ['./portlet-announcements.component.css']
})
@Portlet.registerValue("951652c0-9e35-4128-a8a6-3595b7bf5ec4")
export class PortletAnnouncementsComponent implements OnInit, Portlet {

  header: String = "Bejelentések";

  constructor() { }

  doAnyThing(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-portlet-preview-announcements',
  templateUrl: './portlet-announcements.component.preview.html',
  styleUrls: ['./portlet-announcements.component.css']
})
@Portlet.registerPreviewValue({uuid: '951652c0-9e35-4128-a8a6-3595b7bf5ec4', title: 'Announcement', description: "asdf", keyWords: ['announcements','important','computer','long words', 'very long']})
export class PortletAnnouncementsPreviewComponent implements OnInit, Portlet {
  doAnyThing(): void {
  
  }
  ngOnInit(): void {
  
  }

}