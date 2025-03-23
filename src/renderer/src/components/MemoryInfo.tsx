import useSystemMemory from '@renderer/hooks/useSystemMemory'

function MemoryInfo(): JSX.Element {
  const systemMemoryInfo = useSystemMemory()
  console.log('[MemoryInfoComponent]', systemMemoryInfo)
  return (
    <div>
      <h1>MemoryInfo</h1>
      <pre>{JSON.stringify(systemMemoryInfo)}</pre>
    </div>
  )
}

export default MemoryInfo
