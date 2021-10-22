import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { ContentDirective } from '../../content.directive';
import { ComponentHandlerService} from '../component-handler.service';
import { KeyWord, Portlet } from '../../portlets/portlet';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-component-selector-dialog',
  templateUrl: './component-selector-dialog.component.html',
  styleUrls: ['./component-selector-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComponentSelectorDialogComponent implements OnInit {

@ViewChild(ContentDirective, {static: true}) appContent: ContentDirective;
service: any;
selected: String = "-1";
controlPanels: any;
keyWordsList: KeyWord[];
unFilteredControlPanels: any;


  constructor(@Inject(ComponentHandlerService) service) {
    this.service = service;
  }

  ngOnInit() {
    this.selected = "-1";
    this.controlPanels = Array.from(Portlet.GetPreviews().entries());
    this.unFilteredControlPanels = this.controlPanels;
    console.log("Portlet Previews: " + this.controlPanels.length);
    this.keyWordsList = Portlet.GetKeyWords();
  }

  toggle(index) {
    if (this.selected == index) {
      this.selected = "-1";
    }
    else {
      this.selected = index;
    }
  }

  createResult(success: boolean) {
    if (success) {
      return {'success': success, 'selected': this.selected};
    }
    return {'success': success};
  }

  accordionOpened() {
    console.log("Accordion opened");
  }

  search(value: string) {
    if (value === '')
    {
      this.controlPanels = this.unFilteredControlPanels;
    }
    else
    {
      let filtered: KeyWord[] = this.keyWordsList.filter((item: KeyWord) => item.keyWord.toLowerCase().toString().indexOf(value) !== -1);
      if (filtered.length != 0)
      {
        let filteredIdList: String[] = filtered.map((item: KeyWord) => item.uuid);
        let filteredControlPanels: any[] = [];
        for (let index = 0; index < this.unFilteredControlPanels.length; index++)
        {
          if (filteredIdList.includes(this.unFilteredControlPanels[index][0].uuid))
          {
            filteredControlPanels.push(this.unFilteredControlPanels[index]);
          }
        }
        this.controlPanels = filteredControlPanels;
      }
      else
      {
        this.controlPanels = [];
      }
    }
  }
}