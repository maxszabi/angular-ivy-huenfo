import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core'
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { PortletMailComponent } from '../portlets/portlet-mail/portlet-mail.component';
import { Portlet } from '../portlets/portlet';

@Injectable()
export class ComponentHandlerService {

  factoryResolver: any;
rootViewContainer: any;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }
  addDynamicComponent() {
    const factory = this.factoryResolver
                        .resolveComponentFactory(DynamicComponentComponent)
    const component = factory
      .create(this.rootViewContainer.parentInjector)
    this.rootViewContainer.insert(component.hostView)
  }

  prepareComponent(): any {
    const factory = this.factoryResolver
                        .resolveComponentFactory(DynamicComponentComponent)
    const component = factory
      .create(this.rootViewContainer.parentInjector);
      //let current = component.instance;
      //current.index = 1;
    return component;
  }

  getMailComponent(): any {
    const factory = this.factoryResolver
                        .resolveComponentFactory(PortletMailComponent)
    const component = factory
      .create(this.rootViewContainer.parentInjector);

    return component.hostView;
  }

  prepareComponent2(portlet: any) {
    const factory = this.factoryResolver
                        .resolveComponentFactory(portlet)
    const component = factory
      .create(this.rootViewContainer.parentInjector);

    return component.hostView;
  }

  getPortlet(uuid: String) {
    const factory = this.factoryResolver
                        .resolveComponentFactory(Portlet.GetImplementation(uuid))
    const component = factory
      .create(this.rootViewContainer.parentInjector);

    return component;
  }
}