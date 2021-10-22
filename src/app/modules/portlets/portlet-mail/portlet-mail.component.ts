import { Component, OnInit } from '@angular/core';
import { Portlet } from '../portlet';

@Component({
  selector: 'app-portlet-mail',
  templateUrl: './portlet-mail.component.html',
  styleUrls: ['./portlet-mail.component.css']
})
@Portlet.registerValue("2a0813ce-4226-425c-88d2-6fac7f24821b")
export class PortletMailComponent implements OnInit, Portlet {

  header: String = "Üdv a fedélzeten!";

  constructor() { }
  
  doAnyThing(): void {
    return;
    //throw new Error('Method not implemented.');
  }



  ngOnInit() {
  }

}

@Component({
  selector: 'app-portlet-preview-mail',
  templateUrl: './portlet-mail.component.preview.html',
  styleUrls: ['./portlet-mail.component.css']
})
@Portlet.registerPreviewValue({uuid: '2a0813ce-4226-425c-88d2-6fac7f24821b', title: 'Mail', description: "asdf", keyWords: ['mail','teszt','hossz']})
export class PortletMailPreviewComponent implements OnInit, Portlet {
  
  doAnyThing(): void {
    console.log("Mail Portlet Preview Do Any Thing");
  }
  ngOnInit(): void {
  
  }

  //"2a0813ce-4226-425c-88d2-6fac7f24821b","mail","test","hossz"
}