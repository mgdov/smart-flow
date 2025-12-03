"use client"

import { useEffect, useRef, useCallback } from "react"

export function useAutoSave(data, onSave, interval = 10000) {
  const timeoutRef = useRef(null)

  const save = useCallback(async () => {
    try {
      await onSave(data)
    } catch (error) {
      console.error("Auto-save error:", error)
    }
  }, [data, onSave])

  useEffect(() => {
    if (!data) return

    const debouncedSave = () => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(save, interval)
    }

    debouncedSave()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, save, interval])
}
