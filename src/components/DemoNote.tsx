import type { ReactNode } from 'react'
import { Link } from 'react-router'

/** Shown beside every form so nobody mistakes a demo for a real registration. */
export function DemoNote({ children }: { children?: ReactNode }) {
  return (
    <aside className="demo-note" aria-label="About this form">
      <p className="demo-note__title">This form is a demonstration</p>
      <p>{children ?? 'It checks your answers and shows a summary, but nothing is sent, saved or reserved. Refreshing the page clears it.'}</p>
      <p><Link to="/about#concept">About this concept</Link></p>
    </aside>
  )
}
