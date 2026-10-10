"use strict";

// src/main/preload.ts
var import_electron = require("electron");
var invoke = (name, input) => import_electron.ipcRenderer.invoke("zeitfield:" + name, input);
var bridge = {
  snapshot: () => invoke("snapshot"),
  newConversation: () => invoke("newConversation"),
  deleteConversation: (id) => invoke("deleteConversation", id),
  chat: (input) => invoke("chat", input),
  stopChat: () => invoke("stopChat"),
  attach: () => invoke("attach"),
  capture: () => invoke("capture"),
  prepareDraft: (input) => invoke("prepareDraft", input),
  generate: (input) => invoke("generate", input),
  retryDownload: (id) => invoke("retryDownload", id),
  reconcile: (id) => invoke("reconcile", id),
  insert: (id) => invoke("insert", id),
  reveal: (id) => invoke("reveal", id),
  saveSettings: (input) => invoke("saveSettings", input),
  checkForUpdates: () => invoke("checkForUpdates"),
  installUpdate: () => invoke("installUpdate"),
  chooseMediaFolder: () => invoke("chooseMediaFolder"),
  savePreset: (input) => invoke("savePreset", input),
  windowControl: (action) => invoke("windowControl", action),
  onEvent: (callback) => {
    const listener = (_event, data) => callback(data);
    import_electron.ipcRenderer.on("zeitfield:event", listener);
    return () => import_electron.ipcRenderer.removeListener("zeitfield:event", listener);
  }
};
import_electron.contextBridge.exposeInMainWorld("zeitfield", bridge);
