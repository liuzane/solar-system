// 星球基类
import Planet from './Planet';

/**
 * 太阳
 */
class Sun extends Planet {
  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = this.fillStyle;
    ctx.shadowColor = this.blurStyle.color;
    ctx.shadowBlur = this.blurStyle.blur;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }
}

export default Sun;