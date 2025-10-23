// 星球基类
import Planet from './Planet';

/**
 * 小行星
 */
class Asteroid extends Planet {
  draw(ctx) {
    ctx.save();
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.globalCompositeOperation = 'xor';
    ctx.fillStyle = this.fillStyle;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }
}

export default Asteroid;