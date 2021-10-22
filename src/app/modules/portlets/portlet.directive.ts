import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPortlet]'
})
export class PortletDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}