// Style
import './style.css';

// 方法集合
import { random } from './assist';

// 场景
import Stage from './Stage';

// 行星基类
import Planet from './Planet';

// 太阳
import Sun from './Sun';

// 土星
import Saturn from './Saturn';

// 小行星
import Asteroid from './Asteroid';

// 彗星
import Comet from './Comet';

class SolarSystem {
  constructor() {
    this.ctx = null;
    this.width = 0;
    this.height = 0;
    this.stage = null;

    setTimeout(() => {
      this.init();
      this.sun();
      this.mercury();
      this.venus();
      this.earth();
      this.mars();
      this.jupiter();
      this.saturn();
      this.uranus();
      this.neptune();
      this.asteroids();
      this.comets();
      if (this.stage) this.stage.init(this.ctx);
    }, 100);
  }

  // 初始化
  init() {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    canvas.style.background = '#000';

    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.stage = new Stage(width, height);
  }

  // 太阳
  sun() {
    const sunStyle = this.ctx.createRadialGradient(0, 0, 0, 0, 0, 60);
    sunStyle.addColorStop(0, 'white');
    sunStyle.addColorStop(0.5, 'white');
    sunStyle.addColorStop(0.8, '#ffca1e');
    sunStyle.addColorStop(1, '#b4421d');
    const sun = new Sun(0, 0, 60, 0, sunStyle, { color: '#b4421d', blur: 300 });
    this.stage.planets.push(sun);
  }

  // 水星
  mercury() {
    const mercuryStyle = this.ctx.createRadialGradient(100, 0, 0, 100, 0, 9);
    mercuryStyle.addColorStop(0, '#75705a');
    mercuryStyle.addColorStop(1, '#464646');
    const mercury = new Planet(100, 0, 9, 8.77, mercuryStyle, { color: '#464646' });
    this.stage.planets.push(mercury);
  }

  // 金星
  venus() {
    const venusStyle = this.ctx.createRadialGradient(150, 0, 0, 150, 0, 12);
    venusStyle.addColorStop(0, '#f6cd7e');
    venusStyle.addColorStop(1, '#ce8c42');
    const venus = new Planet(150, 0, 15, 22.47, venusStyle, { color: '#ce8c42' });
    this.stage.planets.push(venus);
  }

  // 地球
  earth() {
    const earthStyle = this.ctx.createRadialGradient(200, 0, 0, 200, 0, 15);
    earthStyle.addColorStop(0, '#3193b8');
    earthStyle.addColorStop(1, '#056fe5');
    const earth = new Planet(200, 0, 15, 36.5, earthStyle, { color: '#056fe5' });
    this.stage.planets.push(earth);
  }

  // 火星
  mars() {
    const marsStyle = this.ctx.createRadialGradient(250, 0, 0, 250, 0, 14);
    marsStyle.addColorStop(0, '#b77660');
    marsStyle.addColorStop(1, '#8c2f10');
    const mars = new Planet(250, 0, 12, 68.69, marsStyle, { color: '#8c2f10' });
    this.stage.planets.push(mars);
  }

  // 木星
  jupiter() {
    const jupiterStyle = this.ctx.createRadialGradient(400, 0, 0, 400, 0, 30);
    jupiterStyle.addColorStop(0, '#be854e');
    jupiterStyle.addColorStop(0.4, '#be854e');
    jupiterStyle.addColorStop(0.7, '#e3ad87');
    jupiterStyle.addColorStop(1, '#873d20');
    const jupiter = new Planet(400, 0, 30, 433.25, jupiterStyle, { color: '#873d20' });
    this.stage.planets.push(jupiter);
  }

  // 土星
  saturn() {
    const saturnStyle = this.ctx.createRadialGradient(500, 0, 0, 500, 0, 26);
    saturnStyle.addColorStop(0, '#f2e558');
    saturnStyle.addColorStop(1, '#4c4a3b');
    const saturn = new Saturn(500, 0, 26, 1075.995, saturnStyle, { color: '#4c4a3b' });
    this.stage.planets.push(saturn);
  }

  // 天王星
  uranus() {
    const uranusStyle = this.ctx.createRadialGradient(600, 0, 0, 600, 0, 22);
    uranusStyle.addColorStop(0, '#cdf3f6');
    uranusStyle.addColorStop(1, '#4ea2ce');
    const uranus = new Planet(600, 0, 22, 3079.9095, uranusStyle, { color: '#4ea2ce' });
    this.stage.planets.push(uranus);
  }

  // 海王星
  neptune() {
    const neptuneStyle = this.ctx.createRadialGradient(700, 0, 0, 700, 0, 20);
    neptuneStyle.addColorStop(0, '#2f61dc');
    neptuneStyle.addColorStop(1, '#1933a1');
    const neptune = new Planet(700, 0, 20, 6015.295, neptuneStyle, { color: '#1933a1' });
    this.stage.planets.push(neptune);
  }

  // 小行星带
  asteroids() {
    function getAsteroidColor() {
      const ret = ['#'];
      const val = random(10, 15).toString(16);
      for (let i = 0; i < 3; i++) {
        ret.push(val);
      }
      return ret.join('');
    }

    let asteroid = null,
      x = 300,
      y = 0,
      r = 2,
      rd = 300,
      angle = 0,
      d = 283,
      color = '#fff';
    for (let i = 0; i < 400; i++) {
      rd = random(300, 320);
      angle = random(0, Math.PI * 2 * 1000) / 1000;
      x = Math.round(Math.cos(angle) * rd);
      y = Math.round(Math.sin(angle) * rd);
      r = random(1, 3);
      d = random(28.3, 511);
      color = getAsteroidColor();
      // console.log(angle,color);
      asteroid = new Asteroid(x, y, r, d, color, { color: color, blur: 1 });
      this.stage.planets.push(asteroid);
    }
  }

  // 彗星
  comets() {
    function getCometColor() {
      const ret = ['#'];
      for (let i = 0; i < 6; i++) {
        ret.push(random(3, 15).toString(16));
      }
      return ret.join('');
    }

    let l = 180,
      a = 800,
      b = 300,
      cx = a - l,
      cy = 0,
      r = 3,
      duration = 30,
      angle = 0,
      color = '#fff';
    for (let i = 0; i < 20; i++) {
      l = random(120, 350);
      a = random(600, 1000);
      b = a / random(1, 3);
      cx = a - l;
      r = random(2, 4);
      angle = random(0, Math.PI * 2 * 1000) / 1000;
      color = getCometColor();
      duration = random(20, 100);
      this.stage.planets.push(new Comet(cx, cy, a, b, r, angle, color, duration));
    }
  }

  render() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    document.body.appendChild(canvas);
  }
}

export default SolarSystem;
