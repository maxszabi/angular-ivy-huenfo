import {
  Component,
  VERSION,
  Inject,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  TemplateRef,
  OnInit,
  ViewRef,
} from '@angular/core';

import {
  DragDrop,
  CdkDragDrop,
  moveItemInArray,
  DragRefConfig,
  DropListRef,
  DragRef,
} from '@angular/cdk/drag-drop';

import { ComponentHandlerService } from './modules/dynamic/component-handler.service';
import { ContentDirective } from './modules/content.directive';
import { Portlet } from './modules/portlets/portlet';
import { DynamicReferences } from './modules/dynamic/dynamic-component/dynamic-component.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  service: any;
  @ViewChild(ContentDirective, { static: true }) appContent: ContentDirective;

  @ViewChild('dataContainer', { static: true }) dataContainer: ElementRef;
  @ViewChild('dropListArea', { static: true })
  dropListArea: ElementRef<HTMLElement>;

  private dragDrop: DragDrop;

  public portlets: DragRef<any>[] = [];
  dropListRef: DropListRef;

  constructor(
    @Inject(ComponentHandlerService) service,
    @Inject(ViewContainerRef) viewContainerRef,
    private dragDropService: DragDrop
  ) {
    this.service = service;
    this.service.setRootViewContainerRef(viewContainerRef);
    this.dragDrop = dragDropService;

    var controlPanels = Portlet.GetImplementations();
    console.log('Portlet implementations: ' + controlPanels.length);
    for (var x = 0; x < controlPanels.length; x++) {
      //document.write(controlPanels[x].name + ", ");
      const panel = new controlPanels[x]();
      panel.doAnyThing();
    }
  }
  ngOnInit(): void {
    this.dataContainer.nativeElement.insertAdjacentHTML(
      'beforeend',
      '<h6>Powered by</h6>'
    );
    this.dropListRef = this.dragDropService.createDropList(this.dropListArea);
    this.dropListRef.withItems(this.portlets);
    this.dropListRef.withOrientation('horizontal');
    this.dropListRef.dropped.subscribe((event) => {
      console.log('Drop event happend');
      const newPlaceItem = this.portlets[event.currentIndex].getRootElement();
      newPlaceItem.style.order = '' + event.previousIndex;
      const oldPlaceItem = this.portlets[event.previousIndex].getRootElement();
      oldPlaceItem.style.order = '' + event.currentIndex;
      moveItemInArray(this.portlets, event.previousIndex, event.currentIndex);
    });
  }

  addComponent() {
    const viewContainerRef = this.appContent.viewContainerRef;
    //   viewContainerRef.clear();
    /**Config Begin*/
    const comp = this.service.prepareComponent();
    const newRef = viewContainerRef.insert(comp.hostView);
    const dnDRef = this.dragDrop
      .createDrag(comp.location.nativeElement)
      .withBoundaryElement(this.dropListArea);

    dnDRef._withDropContainer(this.dropListRef);
    /**Config End */

    /**Set Instance Begin */
    comp.instance.selfRef = newRef;
    comp.instance.dragDropRef = dnDRef;
    /**Set Instance End */

    /**Subscribe Begin */
    comp.instance.destroy.subscribe((data) => {
      this.childSelfDestroy(data);
    });
    comp.instance.placeHolderEmit.subscribe((data) => {
      this.updatePlaceHolderRef(data);
    });
    /**Subscribe End */

    this.portlets.push(dnDRef);
  }

  childSelfDestroy(data: DynamicReferences) {
    console.log('childSelfDestroy');
    console.log(data);
    const viewContainerRef = this.appContent.viewContainerRef;
    let indexSelf = viewContainerRef.indexOf(data.selfReference);
    if (indexSelf >= 0) {
      viewContainerRef.remove(indexSelf);
    }
    let indexDND = this.portlets.indexOf(data.dragNdropRef);
    {
      this.portlets.splice(indexDND, 1);
    }
  }
  updatePlaceHolderRef(data: DynamicReferences) {
    console.log('UpdatePlaceHolderRef: ', data);

    let index = this.portlets.indexOf(data.dragNdropRef);

    if (index != -1) {
      const placeholder = {
        template: data.placeHolderRef,
        context: null,
        viewContainer: this.appContent.viewContainerRef,
      };
      data.dragNdropRef.withPlaceholderTemplate(placeholder);
      this.portlets[index] = data.dragNdropRef;
    }
  }
}
