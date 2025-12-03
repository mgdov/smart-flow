"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"

export function useProjectProgress(projectId) {
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!projectId) return

    let mounted = true
    const poll = async () => {
      try {
        const res = await api.get(`/projects/${projectId}/progress`)
        if (mounted) {
          setProgress(res.data)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err)
        }
      }
    }

    poll()
    const interval = setInterval(poll, 2500)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [projectId])

  return progress
}
