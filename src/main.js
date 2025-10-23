// 引入太阳系
import SolarSystem from './SolarSystem.js';

// 等待DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  const solarSystemInstance = new SolarSystem();
  document.body.appendChild(solarSystemInstance.render());
});
