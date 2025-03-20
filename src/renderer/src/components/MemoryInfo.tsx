import { useEffect, useState } from 'react'

function MemoryInfo(): JSX.Element {
  const [memoryInfo, setMemoryInfo] = useState('')
  useEffect(() => {
    const removeListener = window.api.onMemoryUsageUpdate((value) => {
      console.log('values', value)
      setMemoryInfo(JSON.stringify(value))
    })

    // Cleanup function that runs when component unmounts
    return (): void => {
      if (removeListener) {
        console.log('clean up, unsubscribing to onMemoryUsageUpdate')
        removeListener()
      }
    }
  }, [])
  return (
    <div>
      <h1>MemoryInfo</h1>
      <pre>{memoryInfo}</pre>
    </div>
  )
}

export default MemoryInfo
