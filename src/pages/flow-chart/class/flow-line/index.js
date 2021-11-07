export class FlowLine {
  constructor () {
    this.l = 0;
    this.t = 0;
    this.w = 0;
    this.h = 0;
    this.gPath = { x1: 0, y1: 0, x2: 0, y2: 0 };
  }

  setFlowLine (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  /* 鼠标移动时设置svg的l,t,w,h */
  setLineByMove (fromPos, toPos) {
    let l = fromPos.x;
    let t = fromPos.y;
    const w = Math.ceil(Math.abs(fromPos.x - toPos.x));
    const h = Math.ceil(Math.abs(fromPos.y - toPos.y));
    this.gPath = { x1: 0, y1: 0, x2: w, y2: h };
    if (fromPos.x > toPos.x) {
      l = toPos.x;
      this.gPath = { ...this.gPath, x1: w, x2: 0 };
    }
    if (fromPos.y > toPos.y) {
      t = toPos.y;
      this.gPath = { ...this.gPath, y1: h, y2: 0 };
    }

    this.l = l;
    this.t = t;
    this.w = w;
    this.h = h;
  }
}
