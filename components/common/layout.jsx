"use client"

import Header from "./header"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">{children}</main>
    </>
  )
}
