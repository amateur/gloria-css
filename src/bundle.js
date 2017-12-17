// baseline app styles
require('./app/app.pcss');

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent, );
const $html = document.documentElement;

document.addEventListener('DOMContentLoaded', () => {
  isMobile ? $html.classList.add('mobile-yes') : $html.classList.add('mobile-no');
});
