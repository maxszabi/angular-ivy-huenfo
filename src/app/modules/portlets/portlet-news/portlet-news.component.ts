import { Component, OnInit } from '@angular/core';
import { Portlet } from '../portlet';

@Component({
  selector: 'app-portlet-news',
  templateUrl: './portlet-news.component.html',
  styleUrls: ['./portlet-news.component.css']
})
@Portlet.registerValue("8791a2af-2380-4745-a3a7-fe160ed03785")
export class PortletNewsComponent implements OnInit, Portlet {

  header = "Hírek";

  constructor() { }
  
  doAnyThing(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-portlet-preview-news',
  templateUrl: './portlet-news.component.preview.html',
  styleUrls: ['./portlet-news.component.css']
})
@Portlet.registerPreviewValue({uuid: '8791a2af-2380-4745-a3a7-fe160ed03785', title: 'News', description: "asdf", keyWords: ['news','category','daily','try','do','it','yeah']})
export class PortletNewsPreviewComponent implements OnInit, Portlet {

  constructor() { }
  
  doAnyThing(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

}