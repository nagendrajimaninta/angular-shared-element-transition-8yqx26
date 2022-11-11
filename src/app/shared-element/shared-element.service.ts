import { Injectable } from '@angular/core';

interface IElementPositioning {
  top: number;
  left: number;
  width: number;
  height: number;
}

@Injectable()
export class SharedElementService {

  /** The key will be a string identifier, and the value will be an element */
  private elementsMap = new Map<string, IElementPositioning>();

  constructor() { }

  createSharedElementTransition(identifier: string, element: Element) {
    const positioning = this.getElementPositioning(element);
    this.elementsMap.set(identifier, positioning);
  }

  getSharedElementData(identifier: string): IElementPositioning {
    return this.elementsMap.get(identifier);
  }

  getElementPositioning(el: Element): IElementPositioning {
    const rect = el.getBoundingClientRect();

    const elementPositioning: IElementPositioning = {
       width: rect.width,
       height: rect.height,
      left: rect.left,
      top: rect.top
    };

    return elementPositioning;
  }


}
