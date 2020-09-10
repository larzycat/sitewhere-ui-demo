import { app } from "electron";
import { initSplashScreen } from "@trodi/electron-splashscreen";
import path from "path";
import { format as formatURL } from "url";
import IsDev from "electron-is-dev";

const { autoUpdater } = require("electron-updater");
const isDevelopment = process.env.NODE_ENV !== "production";

app.on("ready", () => {
  let version = !IsDev ? app.getVersion() : "2.0.0";

  // Main window options.
  let windowOptions = {
    width: 1440,
    minWidth: 1024,
    height: 900,
    minHeight: 768,
    title: `AVIC`,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: { webSecurity: false }
  };

  // Create splash screen.
  let window = initSplashScreen({
    windowOpts: windowOptions,
    templateUrl: path.join(__static, "/icon.svg"),
    delay: 0,
    minVisible: 2000,
    splashScreenOpts: {
      height: 350,
      width: 350,
      transparent: true,//背景透明
      webPreferences: {
        webSecurity: false //设置web安全性
      }
    }
  });

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatURL({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }

  require("./menu/mainmenu");

  // check for updates.
  autoUpdater.checkForUpdatesAndNotify();
});

app.on("window-all-closed", () => {
  app.quit();
});
