import electronLogo from './assets/electron.svg'
import { useState } from 'react'
import MemoryInfo from './components/MemoryInfo'

function App(): JSX.Element {
  const [isShowMemoryInfo, setIsShowMemoryInfo] = useState(false)
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const handleMemoryInfoButton = (): void => {
    setIsShowMemoryInfo((p) => !p)
  }

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer noopener">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={handleMemoryInfoButton}>
            Open Memory Info
          </a>
        </div>
      </div>

      {isShowMemoryInfo && <MemoryInfo key={1} />}
      {isShowMemoryInfo && <MemoryInfo key={2} />}
    </>
  )
}

export default App
