import { flowLineCont, relativeRect } from '@/pages/flow-chart/utils';

class RelativeRect {
  constructor() {
    this.l = 0;
    this.t = 0;
    this.scaleSize = 1;
  }

  setTransform(l, t) {
    const relativeRectDOM = document.getElementById(relativeRect);
    const flowLineContDOM = document.getElementById(flowLineCont);
    if (!relativeRect) return false;
    this.l = l;
    this.t = t;
    relativeRectDOM.style.transform = `translate(${ this.l }px, ${ this.t }px) scale(${ this.scaleSize })`;
    flowLineContDOM.style.transform = `translate(${ this.l }px, ${ this.t }px) scale(${ this.scaleSize })`;
  }

  setScale(scaleSize = 1) {
    const relativeRectDOM = document.getElementById(relativeRect);
    const flowLineContDOM = document.getElementById(flowLineCont);
    if (!relativeRectDOM) return false;
    this.scaleSize = scaleSize;
    relativeRectDOM.style.transform = `translate(${ this.l }px, ${ this.t }px) scale(${ this.scaleSize })`;
    flowLineContDOM.style.transform = `translate(${ this.l }px, ${ this.t }px) scale(${ this.scaleSize })`;
  }

}

const relativeRectInstance = new RelativeRect();

export default relativeRectInstance;
