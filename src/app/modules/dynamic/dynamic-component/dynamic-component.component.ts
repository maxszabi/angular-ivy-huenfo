import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Inject,
  EventEmitter,
  Output,
  ViewRef,
  AfterViewInit,
  ElementRef,
  HostListener, HostBinding, TemplateRef
} from "@angular/core";
import { v4 as uuidv4 } from "uuid";
import { PortletDirective } from "../../portlets/portlet.directive";
import { ComponentHandlerService } from "../component-handler.service";
import { MatDialog } from "@angular/material/dialog";
import { ComponentSelectorDialogComponent } from "../component-selector-dialog/component-selector-dialog.component";
import { FormGroup } from "@angular/forms";
import { DragRef } from "@angular/cdk/drag-drop";

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2
}

export class DynamicReferences {
  placeHolderRef: TemplateRef<any>;
  selfReference: ViewRef;
  dragNdropRef: DragRef<any>;

  constructor(placeHolder: TemplateRef<any>, selRef: ViewRef, dndRef: DragRef<any>) {
    this.placeHolderRef = placeHolder;
    this.selfReference = selRef;
    this.dragNdropRef = dndRef;
  }
}

@Component({
  selector: "app-dynamic-component",
  templateUrl: "./dynamic-component.component.html",
  styleUrls: ["./dynamic-component.component.scss"]
})
export class DynamicComponentComponent implements OnInit, AfterViewInit {
  @ViewChild(PortletDirective) portletContent: PortletDirective;
  @ViewChild("placeholder", { read: TemplateRef }) placeholderRef: TemplateRef<any>;
  random: any;
  @Input()
  modifyAble: boolean = true;
  service: any;
  header: String = "";
  closed: boolean = false;
  state: String = "normal";
  elements$: any[] = [];
  resizeWarningText: String = "N/A";
  resizeWarningDisplay: boolean = false;

  @Input("width") public width: number = 300;
  @Input("height") public height: number = 150;
  @Input("minWidth") public minWidth: number = 100;
  @Input("minHeight") public minHeight: number = 50;
  @Input("maxWidth") public maxWidth: number = 600;
  @Input("maxHeight") public maxHeight: number = 300;
  
  public mouse: { x: number; y: number; moveX: number; moveY: number };
  public status: Status = Status.OFF;
  private originalHeight: number;

  @Output() destroy = new EventEmitter<DynamicReferences>();

  @Output() placeHolderEmit = new EventEmitter<DynamicReferences>();

  @HostBinding('class.example-box') get valid() { return this.modifyAble; }
  @HostBinding('class.cdk-drag-placeholder') get valid2() { return this.modifyAble; }

  constructor(
    @Inject(ComponentHandlerService) service,
    public dialog: MatDialog
  ) {
    this.service = service;
  }

  ngAfterViewInit(): void {
    console.log("After View Init");
    console.log("PlaceHolderRef", this.placeholderRef);
    this.placeHolderEmit.emit(new DynamicReferences(this.placeholderRef,this["selfRef"],this["dragDropRef"]));
  }

  ngOnInit() {
    console.log(this);
    this.random = uuidv4();
    this.header = "dynamic-component works " + this.random;
    if (this.modifyAble) {
      const dialogRef = this.dialog.open(ComponentSelectorDialogComponent, {
        disableClose: true,
        minHeight: '500px'
      });

      const originalScope = this;
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result.success) {
          console.log("success");
          this.elements$.push({
            controlType: "checkbox",
            key: "emailAddress",
            label: "Email",
            type: "email",
            order: 2
          });
          this.elements$.push({
            controlType: "textbox",
            key: "firstName",
            label: "First Name",
            type: "text",
            order: 1
          });
          const viewContainerRef =
            originalScope.portletContent.viewContainerRef;
          viewContainerRef.clear();
          const portlet = originalScope.service.getPortlet(result.selected);
          originalScope.header = portlet.instance.header;
          viewContainerRef.insert(portlet.hostView);
        } else {
          console.log("failed");
          originalScope.destroy.emit(new DynamicReferences(this.placeholderRef,this["selfRef"],this["dragDropRef"]));
        }
      });
    }
  }

  addComponent() {
    //this.service.addDynamicComponent()
    const viewContainerRef = this.portletContent.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.insert(this.service.getMailComponent());
  }

  toggleContent() {
    this.closed = !this.closed;
    if (this.closed) {
      this.originalHeight = this.height;
      this.height = 0;
    } else {
      this.height = this.originalHeight;
    }
  }

  openConfiguration() {
    this.state = "config";
  }

  saveConfiguration() {
    this.state = "normal";
  }

  setStatus(event: MouseEvent, status: number) {
    if (status === Status.RESIZE) event.stopPropagation();
    this.status = status;
    if (status === Status.OFF) {
      this.resizeWarningDisplay = false;
    }
  }

  @HostListener("window:mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    // console.log("Mouse Moved: x:y " + event.movementX + ":" + event.movementY);
    this.mouse = {
      x: event.clientX,
      y: event.clientY,
      moveX: event.movementX,
      moveY: event.movementY
    };

    //if (this.status === Status.RESIZE) this.resize();
    //else if (this.status === Status.MOVE) this.move();
    if (this.status === Status.RESIZE) this.resizeBasedMovement();
    //else if (this.status === Status.MOVE) this.move();
  }

  private resizeBasedMovement() {
    if (this.resizeContMeetBasedMovement()) {
      var newWidth = this.width + this.mouse.moveX;
      var newHeight = this.height + this.mouse.moveY;
      let minWidthReached = false;
      let minHeightReached = false;
      if (newWidth > this.minWidth) {
        this.width = newWidth;
      } else {
        minWidthReached = true;
        this.width = this.minWidth;
      }
      //this.width = newWidth > 300 ? newWidth : 300;
      if (newHeight > this.minHeight) {
        this.height = newHeight;
      } else {
        minHeightReached = true;
        this.height = this.minHeight;
      }
      //this.height = newHeight > 150 ? newHeight : 150;
      if (minHeightReached && minWidthReached) {
        this.resizeWarningDisplay = true;
        this.resizeWarningText = "Minimum";
      } else if (minHeightReached) {
        this.resizeWarningDisplay = true;
        this.resizeWarningText = "Minimum height";
      } else if (minWidthReached) {
        this.resizeWarningDisplay = true;
        this.resizeWarningText = "Minimum width";
      } else {
        this.resizeWarningDisplay = false;
      }
    }
  }

  private resizeContMeetBasedMovement() {
    var newWidth = this.width + this.mouse.moveX;
    var newHeight = this.height + this.mouse.moveY;
    console.log(
      "Resize Cond Meet Movement: newW:" +
        newWidth +
        " newH:" +
        newHeight +
        " maxW: " +
        this.maxWidth +
        " maxH: " +
        this.maxHeight
    );

    let maxWidthReached = false;
    let maxHeightReached = false;

    if (newWidth >= this.maxWidth) {
      maxWidthReached = true;
    }

    if (newHeight >= this.maxHeight) {
      maxHeightReached = true;
    }

    if (maxWidthReached && maxHeightReached) {
      this.resizeWarningDisplay = true;
      this.resizeWarningText = "Maximum";
    } else if (maxHeightReached) {
      this.resizeWarningDisplay = true;
      this.resizeWarningText = "Maximum height";
    } else if (maxWidthReached) {
      this.resizeWarningDisplay = true;
      this.resizeWarningText = "Maximum width";
    } else {
      this.resizeWarningDisplay = false;
    }

    return (
      newWidth < this.maxWidth && newHeight < this.maxHeight
    );
  }
}
