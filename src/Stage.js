/**
 * 场景
 */
class Stage {
  constructor(W, H) {
    this.W = W;
    this.H = H;
    this.planets = [];
  }

  init(ctx) {
    const { W, H } = this;
    ctx.translate(W / 2, H / 2);// 坐标重置为中间
    this.animate(ctx);
  }

  drawBG(ctx) {
    const { W, H } = this;
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 600);
    gradient.addColorStop(0, 'rgba(3,12,13,0.1)');
    gradient.addColorStop(1, 'rgba(0,0,0,1');
    ctx.fillStyle = gradient;
    ctx.fillRect(-W / 2, -H / 2, W, H);
    ctx.restore();
  }

  animate(ctx) {
    const that = this,
      startTime = new Date();
    (function run() {
      that.drawBG(ctx);
      that.planets.forEach(item => {
        item.update(startTime);
        item.draw(ctx);
      });
      requestAnimationFrame(run);
    }());
  }
}

export default Stage;