export const IS_DEVELOPMENT = window.location.hostname === "localhost";

const HOST = window.location.host;
const HOST_SECURE = window.location.protocol === "https:";
const HOST_PROD = "http" + (HOST_SECURE ? "s" : "") + "://" + HOST + "/api";
const HOST_DEV = "http://localhost:8000";

export const BACKEND_URL = IS_DEVELOPMENT ? HOST_DEV : HOST_PROD;
