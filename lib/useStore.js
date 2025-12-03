"use client"

import { create } from "zustand"

export const useStore = create((set) => ({
  user: null,
  token: null,
  projectDraft: null,
  currentProject: null,
  wizardMessages: [],
  progress: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  bootstrapFromCookies: () => {
    try {
      const token = typeof window !== "undefined" ? require("js-cookie").get("token") : null
      if (token) set({ token })
    } catch (_) {}
  },
  setProjectDraft: (draft) => set({ projectDraft: draft }),
  setCurrentProject: (p) => set({ currentProject: p }),
  pushWizardMessage: (msg) => set((s) => ({ wizardMessages: [...s.wizardMessages, msg] })),
  resetWizard: () => set({ projectDraft: null, wizardMessages: [] }),
  setProgress: (progress) => set({ progress }),
}))
