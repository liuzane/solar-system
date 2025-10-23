// 方法集合
import { drawCircle } from './assist';

// 星球基类
import Planet from './Planet';

/**
 * 土星
 */
class Saturn extends Planet {
  draw(ctx) {
    ctx.save();
    ctx.rotate(this.angle);
    drawCircle(ctx, this.x, this.blurStyle.color);

    ctx.beginPath();
    ctx.fillStyle = this.fillStyle;
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fill();

    // 土星光环
    ctx.globalCompositeOperation = 'source-over';
    let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r + 25);
    let startStop = (this.r + 3) / (this.r + 24);
    gradient.addColorStop(startStop, '#282421');
    gradient.addColorStop(startStop + 0.06, '#282421');
    gradient.addColorStop(startStop + 0.1, '#7e7966');
    gradient.addColorStop(startStop + 0.18, '#706756');
    gradient.addColorStop(startStop + 0.24, '#7e7966');
    gradient.addColorStop(startStop + 0.25, '#282421');// 间隔
    gradient.addColorStop(startStop + 0.26, '#282421');
    gradient.addColorStop(startStop + 0.27, '#807766');
    gradient.addColorStop(1, '#595345');
    ctx.fillStyle = gradient;
    ctx.beginPath();// 从beginPath处，开始使用非零环绕原则画环
    ctx.arc(this.x, this.y, this.r + 24, 0, Math.PI * 2, true);
    ctx.arc(this.x, this.y, this.r + 3, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }
}

export default Saturn;