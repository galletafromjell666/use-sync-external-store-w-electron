import { useSyncExternalStore } from 'react'

export interface SystemMemoryInfo {
  total: number
  free: number
  swapTotal: number
  swapFree: number
}

const memoryStore = {
  data: {} as SystemMemoryInfo,
  listeners: new Set<() => void>(),
  removeIpcListener: (): void => {},

  getSnapshot(): SystemMemoryInfo {
    // something like a selector
    return memoryStore.data
  },
  subscribe(listener: () => void): () => void {
    console.log('[useSystemMemory] Adding new subscriber')
    memoryStore.listeners.add(listener)

    return () => {
      memoryStore.listeners.delete(listener)
    }
  },
  update(data: SystemMemoryInfo): void {
    memoryStore.data = data
    memoryStore.listeners.forEach((listener) => listener())
  }
}

console.log(
  '[useSystemMemory] Initializing top-level subscription to "window.api.onMemoryUsageUpdate"'
)

window.addEventListener('beforeunload', () => {
  memoryStore.removeIpcListener()
})

memoryStore.removeIpcListener = window.api.onMemoryUsageUpdate((value) => {
  console.log('[useSystemMemory] Received new value from main:', value)
  memoryStore.update(value)
})

function useSystemMemory(): SystemMemoryInfo {
  return useSyncExternalStore(memoryStore.subscribe, memoryStore.getSnapshot)
}

export default useSystemMemory
