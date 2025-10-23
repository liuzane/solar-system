// 方法集合
import { drawCircle, Tween } from './assist';

/**
 * 星球基类
 */
class Planet {
  /**
   * @param  {Number} x         x坐标
   * @param  {Number} y         y坐标
   * @param  {Number} r         半径
   * @param  {Number} duration  周期(秒)
   * @param  {Object} fillStyle
   * @param  {Object} blurStyle
   */
  constructor(x, y, r, duration, fillStyle, blurStyle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.duration = duration;
    this.angle = 0;
    this.fillStyle = fillStyle;
    this.blurStyle = blurStyle;
  }

  update(startTime) {
    this.angle = Tween.linear(new Date() - startTime, 0, Math.PI * 2, this.duration * 1000);
  }

  draw(ctx) {
    ctx.save();
    ctx.rotate(this.angle);
    // ctx.translate(this.x,this.y);
    drawCircle(ctx, this.x, this.blurStyle.color);
    ctx.beginPath();
    // ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = this.fillStyle;
    ctx.shadowColor = this.blurStyle.color;
    ctx.shadowBlur = this.blurStyle.blur;
    // ctx.arc(0,0,this.r,Math.PI*2,false);
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }
}

export default Planet;