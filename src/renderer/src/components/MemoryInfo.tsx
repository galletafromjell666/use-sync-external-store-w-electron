import useSystemMemory from '@renderer/hooks/useSystemMemory'

function MemoryInfo(): JSX.Element {
  const x = useSystemMemory()
  console.log('[MemoryInfoComponent]', x)
  return (
    <div>
      <h1>MemoryInfo</h1>
      <pre>{JSON.stringify(x)}</pre>
    </div>
  )
}

export default MemoryInfo
