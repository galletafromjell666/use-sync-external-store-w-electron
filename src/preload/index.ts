import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

export const api = {
  onMemoryUsageUpdate: (callback) => {
    ipcRenderer.on('memory-usage', (_event, data) => callback(data))

    // Return a cleanup function
    return (): void => {
      console.log("[preload] Removing listener from ipcRenderer 'memory-usage'")
      ipcRenderer.removeListener('memory-usage', callback)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
