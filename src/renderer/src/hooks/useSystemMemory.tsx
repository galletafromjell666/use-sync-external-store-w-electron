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
    // This acts like a selector
    return memoryStore.data
  },

  subscribe(listener: () => void): () => void {
    console.log('[useSystemMemory] Adding new subscriber')
    memoryStore.listeners.add(listener)

    return () => {
      // Clean up
      memoryStore.listeners.delete(listener)
    }
  },

  update(data: SystemMemoryInfo): void {
    memoryStore.data = data
    // Notify each listener
    memoryStore.listeners.forEach((listener) => listener())
  }
}

console.log(
  '[useSystemMemory] Initializing top-level subscription to "window.api.onMemorySystemInfoUpdate"'
)

memoryStore.removeIpcListener = window.api.onMemorySystemInfoUpdate((value) => {
  console.log('[useSystemMemory] Received new value from main:', value)
  memoryStore.update(value)
})

window.addEventListener('beforeunload', (): void => {
  memoryStore.removeIpcListener()
})

function useSystemMemory(): SystemMemoryInfo {
  return useSyncExternalStore(memoryStore.subscribe, memoryStore.getSnapshot)
}

export default useSystemMemory
