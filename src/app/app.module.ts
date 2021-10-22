import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { ComponentHandlerService } from "./modules/dynamic/component-handler.service";
import { DynamicComponentComponent } from "./modules/dynamic/dynamic-component/dynamic-component.component";
import { ContentDirective } from "./modules/content.directive";
import { PortletDirective } from "./modules/portlets/portlet.directive";
import { PortletMailComponent, PortletMailPreviewComponent } from "./modules/portlets/portlet-mail/portlet-mail.component";
import { MatDialogModule } from "@angular/material/dialog";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ComponentSelectorDialogComponent } from "./modules/dynamic/component-selector-dialog/component-selector-dialog.component";
import { CustomFormComponent } from "./modules/dynamic/custom-form/custom-form/custom-form.component";
import { FormElementComponent } from "./modules/dynamic/custom-form/form-element/form-element.component";
import { PortletNewsComponent } from './modules/portlets/portlet-news/portlet-news.component';
import { PortletAnnouncementsComponent } from './modules/portlets/portlet-announcements/portlet-announcements.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatFormFieldModule,
    MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatExpansionModule, MatChipsModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    DynamicComponentComponent,
    ContentDirective,
    PortletDirective,
    PortletMailComponent,
    ComponentSelectorDialogComponent,
    CustomFormComponent,
    FormElementComponent,
    PortletNewsComponent,
    PortletAnnouncementsComponent,
    PortletMailPreviewComponent
  ],
  bootstrap: [AppComponent],
  providers: [ComponentHandlerService],
  entryComponents: [
    DynamicComponentComponent,
    PortletMailComponent,
    PortletNewsComponent,
    PortletAnnouncementsComponent,
    ComponentSelectorDialogComponent,
    PortletMailPreviewComponent
  ],
  exports: [MatDialogModule, MatFormFieldModule, MatExpansionModule, MatChipsModule]
})
export class AppModule {}
