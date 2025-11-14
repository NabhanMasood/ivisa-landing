// composables/useFormPersistence.ts
import { ref, watch } from 'vue'

interface FormState {
  [key: string]: any
}

export function useFormPersistence(storageKey: string, expirationHours: number = 24) {
  const EXPIRATION_MS = expirationHours * 60 * 60 * 1000

  /**
   * Save state to localStorage
   */
  const saveState = (state: FormState): boolean => {
    try {
      const dataToSave = {
        ...state,
        timestamp: Date.now()
      }
      
      localStorage.setItem(storageKey, JSON.stringify(dataToSave))
      console.log('💾 State saved to localStorage:', storageKey)
      return true
    } catch (error) {
      console.error('❌ Failed to save state:', error)
      return false
    }
  }

  /**
   * Load state from localStorage
   */
  const loadState = (): FormState | null => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (!saved) {
        console.log('ℹ️ No saved state found')
        return null
      }
      
      const state = JSON.parse(saved)
      
      // Check if data has expired
      if (Date.now() - state.timestamp > EXPIRATION_MS) {
        console.log('⚠️ Saved state expired, clearing...')
        clearState()
        return null
      }
      
      console.log('✅ State restored from localStorage:', storageKey)
      return state
    } catch (error) {
      console.error('❌ Failed to load state:', error)
      return null
    }
  }

  /**
   * Clear state from localStorage
   */
  const clearState = (): boolean => {
    try {
      localStorage.removeItem(storageKey)
      console.log('🗑️ Cleared saved state:', storageKey)
      return true
    } catch (error) {
      console.error('❌ Failed to clear state:', error)
      return false
    }
  }

  /**
   * Check if saved state exists and is valid
   */
  const hasValidState = (): boolean => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (!saved) return false
      
      const state = JSON.parse(saved)
      return Date.now() - state.timestamp <= EXPIRATION_MS
    } catch {
      return false
    }
  }

  /**
   * Setup auto-save watchers for reactive refs
   */
  const setupAutoSave = (refs: Record<string, any>) => {
    const watchers = Object.entries(refs).map(([key, refValue]) => {
      return watch(
        refValue,
        () => {
          const state: FormState = {}
          Object.entries(refs).forEach(([k, v]) => {
            state[k] = v.value
          })
          saveState(state)
        },
        { deep: true }
      )
    })

    // Return cleanup function
    return () => {
      watchers.forEach(unwatch => unwatch())
    }
  }

  return {
    saveState,
    loadState,
    clearState,
    hasValidState,
    setupAutoSave
  }
}