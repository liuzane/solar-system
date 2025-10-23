// 方法集合
import { Tween, Shape } from './assist';

/**
 * 彗星
 */
class Comet {
  /**
   * 彗星
   * @param  {Number} cx       椭圆中心横坐标
   * @param  {Number} cy       椭圆中心纵坐标
   * @param  {Number} a        椭圆横半轴长
   * @param  {Number} b        椭圆纵半轴长
   * @param  {Number} r        圆球半径
   * @param  {Number} angle    旋转角度和初始位置角度
   * @param  {String} color    颜色
   * @param  {Number} duration 周期(秒)
   */
  constructor(cx, cy, a, b, r, angle, color, duration) {
    this.a = a;
    this.b = b;
    this.r = r;
    this.cx = cx;
    this.cy = cy;
    this.x = 0;
    this.y = 0;
    this.color = color;
    this.angle = angle;
    this.duration = duration;
  }

  update(startTime) {
    let t = Tween.linear(new Date() - startTime, 0, Math.PI * 2, this.duration * 1000);
    this.x = this.cx + this.a * Math.cos(this.angle + t);
    this.y = this.cy + this.b * Math.sin(this.angle + t);
  }

  draw(ctx) {
    ctx.save();
    ctx.rotate(this.angle);
    // 画运动轨迹
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(15,69,116,0.2)';
    Shape.ellipse(ctx, this.cx, this.cy, this.a, this.b);

    // 画球
    ctx.beginPath();
    // ctx.globalCompositeOperation = "lighter";
    ctx.globalCompositeOperation = 'source-atop';
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 1;
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    // 画尾迹
    ctx.restore();
  }
}

export default Comet;