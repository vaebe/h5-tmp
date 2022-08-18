// VUE_APP_CONFIG_TYPE 环境类型 测试环境  dev 线上环境 pro
const APP_CONFIG = {
  VUE_APP_CONFIG_TYPE: "dev",
  VUE_APP_PROJECT_NAME: "平台-h5",
  VUE_APP_BASE_URL: "",
  timeout: 120000, // 60000 一分钟
};

// 开发
if (APP_CONFIG.VUE_APP_CONFIG_TYPE === 'dev') {
  APP_CONFIG.VUE_APP_BASE_URL = ''
}

// 线上
if (APP_CONFIG.VUE_APP_CONFIG_TYPE === 'pro') {
  APP_CONFIG.VUE_APP_BASE_URL = ''
}

document.title = APP_CONFIG.VUE_APP_PROJECT_NAME;
window.APP_CONFIG = APP_CONFIG
