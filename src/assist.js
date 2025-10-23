export function drawCircle(ctx, r, color) {
  const hsl = Color.hexToHsl(color);
  ctx.lineWidth = 1;
  // ctx.strokeStyle='rgba(176,184,203,0.3)';
  // ctx.arc(0,0,this.x,Math.PI*2,false);
  // ctx.stroke();
  const gradient = ctx.createLinearGradient(-r, 0, r, 0);
  gradient.addColorStop(0, 'hsla(' + hsl[0] + ',' + hsl[1] + '%,0%,.3)');
  gradient.addColorStop(0.6, 'hsla(' + hsl[0] + ',' + hsl[1] + '%,50%,.9)');
  gradient.addColorStop(1, 'hsla(' + hsl[0] + ',' + hsl[1] + '%,80%,1)');
  ctx.strokeStyle = gradient;
  // ctx.shadowColor=color;
  // ctx.shadowBlur=4;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI, true);
  ctx.stroke();
}

export function random(t, n) {
  return Math.floor(Math.random() * (n - t)) + t;
}

export function randomColor() {
  return '#' + ('000' + Math.floor(16777216 * Math.random()).toString(16)).slice(-6);
}

export function randomHsl() {
  return [ Math.floor(360 * Math.random()), Math.floor(50 * Math.random() + 50), Math.floor(20 * Math.random() + 40) ];
}

export function rotationToMouse(t, n, e, o) {
  let r = t - e, a = n - o;
  return Math.atan2(a, r);
}

export function windowToCanvas(t, n, e) {
  let o = t.getBoundingClientRect();
  return { x: n - o.left * (t.width / o.width), y: e - o.top * (t.height / o.height) };
}

export function captureMouse(t) {
  let n = { x: 0, y: 0 };
  t.addEventListener('mousemove', function (e) {
    let o = windowToCanvas(t, e.clientX, e.clientY);
    n.x = o.x;
    n.y = o.y;
  }, !1);
  return n;
}

export function isCollision(t, n, e, o) {
  let r = (t.y - n.y) / (t.x - n.x), a = (o.y - e.y) / (o.x - n.x), i = t.y - r * t.x, u = e.y - a * e.x,
    s = { x: (u - i) / (r - a), y: r * (u - i) / (r - a) + i };
  return s.x > e.x && s.x < o.x && n.y > e.y && n.x < o.x;
}

export function drawGrid(t, n, e, o) {
  t.save();
  t.lineWidth = .5;
  t.strokeStyle = n;
  for (let r = e + .5; r < t.canvas.width; r += e) {
    t.beginPath();
    t.moveTo(r, 0);
    t.lineTo(r, t.canvas.height);
    t.stroke();
  }
  for (let r = o + .5; r < t.canvas.height; r += o) {
    t.beginPath();
    t.moveTo(0, r);
    t.lineTo(t.canvas.width, r);
    t.stroke();
  }
  t.restore();
}

export function bezierPos(t, n, e, o, r) {
  return t * Math.pow(1 - r, 3) + 3 * n * r * Math.pow(1 - r, 2) + 3 * e * Math.pow(r, 2) * (1 - r) + o * Math.pow(r, 3);
}

export function quadraticPos(t, n, e, o) {
  return t * Math.pow(1 - o, 2) + 2 * n * o * (1 - o) + e * o * o;
}

export const Color = {
  rgbToHex: function (t) {
    let n = '';
    if (/^rgba?|RGBA?/.test(t)) {
      let e = t.match(/\d+/g), o = '';
      if (!e || e.length < 3) return n;
      for (let r = 0; r < 3; r++) {
        o = Math.min(parseInt(e[r], 10), 255).toString(16);
        n += ('0' + o).slice(-2);
      }
      n = '#' + n;
    }
    return n;
  }, 
  
  hexToRgb: function (t) {
    const n = [], e = t.toLowerCase();
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(e)) {
      for (let o = 4 === e.length ? 1 : 2, r = 1; r < 3 * o + 1; r += o) {
        n.push(parseInt('0x' + new Array(4 - o).join(e.slice(r, r + o))));
      }
    }
    return n;
  }, 
  
  rgbToHsl: function (t) {
    let n, e, o, r = t[0] / 255, a = t[1] / 255, i = t[2] / 255, u = Math.max(r, a, i), s = Math.min(r, a, i);
    o = (u + s) / 2;
    const c = u - s;
    e = 0 === c ? 0 : c / (1 - Math.abs(2 * o - 1));
    n = 0 === e ? 0 : r === u ? (a - i) / c % 6 : a === u ? (i - r) / c + 2 : (r - a) / c + 4;
    n *= 60;
    n < 0 && (n += 360);
    return [ Math.round(n), (100 * e).toFixed(1), (100 * o).toFixed(1) ];
  }, 
  
  hslToRgb: function (t) {
    const n = parseFloat(t[0] / 360, 10), e = parseFloat(t[1] / 100, 10), o = parseFloat(t[2] / 100, 10);
    if (0 === e) {
      const r = Math.ceil(255 * o), g = r, b = r;
      return [ r, g, b ];
    }
    let r = o >= .5 ? o + e - o * e : o * (1 + e), a = 2 * o - r, i = [ 1 / 3, 0, -1 / 3 ];
    for (let u = 0; u < 3; u++) {
      let s = n + i[u];
      s < 0 && (s += 1), s > 1 && (s -= 1), s = 6 * s < 1 ? a + 6 * (r - a) * s : 2 * s < 1 ? r : 3 * s < 2 ? a + (r - a) * (2 / 3 - s) * 6 : a, i[u] = Math.ceil(255 * s);
    }
    return i;
  }, 
  
  hexToHsl: function (t) {
    return this.rgbToHsl(this.hexToRgb(t));
  }, 
  
  hslToHex: function (t) {
    if (/^hsla?|HSLA?/.test(t)) {
      const n = t.match(/\d+/g);
      if (n && n.length >= 3) {
        const e = 'rgb(' + this.hslToRgb(n).join(',') + ')';
        return this.rgbToHex(e);
      }
    }
    return '';
  }
};

export const Shape = {
  ellipse: function (t, n, e, o, r) {
    let a = .5522848, i = o * a, u = r * a;
    t.beginPath();
    t.moveTo(n - o, e);
    t.bezierCurveTo(n - o, e - u, n - i, e - r, n, e - r);
    t.bezierCurveTo(n + i, e - r, n + o, e - u, n + o, e);
    t.bezierCurveTo(n + o, e + u, n + i, e + r, n, e + r);
    t.bezierCurveTo(n - i, e + r, n - o, e + u, n - o, e);
    t.closePath();
    t.stroke();
  },

  roundRect: function (t, n, e, o, r, a) {
    t.beginPath();
    o > 0 ? t.moveTo(n + a, e) : t.moveTo(n - a, e);
    t.arcTo(n + o, e, n + o, e + r, a);
    t.arcTo(n + o, e + r, n, e + r, a);
    t.arcTo(n, e + r, n, e, a);
    o > 0 ? t.arcTo(n, e, n + a, e, a) : t.arcTo(n, e, n - a, e, a);
    t.stroke();
  }
};

export const Curve = {
  getBezierAngle: function (t, n, e, o, r) {
    let a = 3 * t.x * Math.pow(1 - r, 2) * -1 + 3 * n.x * (Math.pow(1 - r, 2) + 2 * r * (1 - r) * -1) + 3 * e.x * (2 * r * (1 - r) + r * r * -1) + 3 * o.x * r * r,
      i = 3 * t.y * Math.pow(1 - r, 2) * -1 + 3 * n.y * (Math.pow(1 - r, 2) + 2 * r * (1 - r) * -1) + 3 * e.y * (2 * r * (1 - r) + r * r * -1) + 3 * o.y * r * r;
    return Math.atan2(i, a);
  },

  getBezierPosition: function (t, n, e, o, r) {
    return {
      x: bezierPos(t.x, n.x, e.x, o.x, r),
      y: bezierPos(t.y, n.y, e.y, o.y, r)
    };
  },

  getQuadraticAngle: function (t, n, e, o) {
    let r = 2 * t.x * (1 - o) * -1 + 2 * n.x * (1 - o + -1 * o) + 2 * e.x * o,
      a = 2 * t.y * (1 - o) * -1 + 2 * n.y * (1 - o + -1 * o) + 2 * e.y * o;
    return Math.atan2(a, r);
  },

  getQuadraticPosition: function (t, n, e, o) {
    return {
      x: quadraticPos(t.x, n.x, e.x, o),
      y: quadraticPos(t.y, n.y, e.y, o)
    };
  }
};

export const Tween = {
  linear: function (t, n, e, o) {
    return e * t / o + n;
  },

  easeIn: function (t, n, e, o) {
    return e * (t /= o) * t * t * t + n;
  },

  easeOut: function (t, n, e, o) {
    return e * ((t = t / o - 1) * t * t * t + 1) + n;
  },

  easeInOut: function (t, n, e, o) {
    return (t /= o / 2) < 1 ? e / 2 * t * t * t * t * t + n : e / 2 * ((t -= 2) * t * t * t * t + 2) + n;
  },

  elastic: function (t, n, e, o, r, a) {
    let i = 0;
    if (0 === t) return n;
    if (1 === (t /= o)) return n + e;
    if (a || (a = .3 * o), !r || r < Math.abs(e)) {
      r = e;
      i = a / 4;
    } else {
      i = a / (2 * Math.PI) * Math.asin(e / r);
    }
    return r * Math.pow(2, -10 * t) * Math.sin((t * o - i) * (2 * Math.PI) / a) + e + n;
  },

  bounce: function (t, n, e, o) {
    return (t /= o) < 1 / 2.75
      ? e * (7.5625 * t * t) + n
      : t < 2 / 2.75
        ? e * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n
        : t < 2.5 / 2.75
          ? e * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n
          : e * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n;
  },

  back: function (t, n, e, o, r) {
    return void 0 === r && (r = 1.70158), e * ((t = t / o - 1) * t * ((r + 1) * t + r) + 1) + n;
  }
};

export const TweenFn = function (t, n, e, o, r, a) {
  let u, s = new Date, c = Tween[t];
  function i() {
    if ((u = new Date - s) >= o) return void (a && a());
    r(c(u, n, e, o));
    requestAnimationFrame(i);
  }
  i();
};

export const Rotates = {
  rotateX: function (t, n) {
    let e = Math.cos(n), o = Math.sin(n);
    return { y: t.y * e - t.z * o, z: t.z * e + t.y * o };
  },

  rotateY: function (t, n) {
    let e = Math.cos(n), o = Math.sin(n);
    return { x: t.x * e - t.z * o, z: t.z * e + t.x * o };
  },

  rotateZ: function (t, n) {
    let e = Math.cos(n), o = Math.sin(n);
    return { x: t.x * e - t.y * o, y: t.y * e + t.x * o };
  }
};