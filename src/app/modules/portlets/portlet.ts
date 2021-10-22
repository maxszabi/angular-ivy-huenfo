export interface Portlet {
  doAnyThing(): void;
}

export class KeyWord {
  uuid: String;
  keyWord: String;
  constructor(uuid: String, keyWord: String) {
    this.uuid = uuid;
    this.keyWord = keyWord;
  }
}

export class PortletPreviewConfig {
  uuid: String;
  keyWords: String[];
  title: String;
  description: String;
  constructor(uuid: String, title: String, description: String, ...keyWords: String[]) {
    this.uuid = uuid;
    this.keyWords = keyWords;
    this.title = title;
    this.description = description;
  }
}

export namespace Portlet {
type Constructor<T> = {
    new(...args: String[]): T;
    readonly prototype?: T;
  }
  const implementationsMap: Map<String, Constructor<Portlet>> = new Map<String, Constructor<Portlet>>();
  const previewImplementationsMap: Map<PortletPreviewConfig, Constructor<Portlet>> = new Map<PortletPreviewConfig, Constructor<Portlet>>();
  const implementations: Constructor<Portlet>[] = [];
  const previewImplementations: Constructor<Portlet>[] = [];
  const keyWordsList: KeyWord[] = []; 
  
  export function GetImplementations(): Constructor<Portlet>[] {
    return Array.from(implementationsMap.values());
  }

  export function GetPreviews(): Map<PortletPreviewConfig, Constructor<Portlet>> {
    return previewImplementationsMap;
  }

  export function GetKeyWords(): KeyWord[] {
    return keyWordsList;
  }

  export function registerValue(value) {
    return function decorator(target) {
      implementationsMap.set(value, target);
      implementations.push(target);
      console.log('Our decorated class:', value);
      console.log('Our decorated class:', target.name);
    }
  }

  export function registerPreviewValue(value: PortletPreviewConfig) {
    return function decorator(target) {
      //value: String, ...keyWords: String[]
      previewImplementations.push(target);
      previewImplementationsMap.set(value,target);
      
      let previewValue = value.uuid;
      let originalScope = this;
      value.keyWords.forEach(keyWord => {
        keyWordsList.push(new KeyWord(previewValue, keyWord));
      }, originalScope);

      console.log('Our decorated class:', value);
      console.log('Our decorated class:', target.name);
      console.log("KeyWords: ", value.keyWords);
    }
  }

  export function GetImplementation(uuid: String): Constructor<Portlet> {
    return implementationsMap.get(uuid);
  }
}