import { useEffect } from 'react'

const SITE = 'ABC Sales Consulting (concept)'

export function useDocumentTitle(title: string | null) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} · Sales training and advisory in Kampala`
  }, [title])
}
