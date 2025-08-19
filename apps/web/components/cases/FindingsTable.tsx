'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Severity } from '../../lib/discovery'

export interface FindingRow {
  id: string
  url: string
  domain: string
  severity: Severity
  title?: string | null
}

export function FindingsTable({
  caseId,
  findings,
}: {
  caseId: string
  findings: FindingRow[]
}) {
  const [domain, setDomain] = useState('')
  const [sev, setSev] = useState<'all' | Severity>('all')
  const filtered = findings.filter(
    (f) =>
      (domain ? f.domain.includes(domain) : true) &&
      (sev === 'all' || f.severity === sev)
  )
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          aria-label="Filtro dominio"
          className="bg-transparent border px-2 py-1 rounded"
          value={domain}
          placeholder="dominio"
          onChange={(e) => setDomain(e.target.value)}
        />
        <select
          aria-label="Filtro gravità"
          className="bg-transparent border px-2 py-1 rounded"
          value={sev}
          onChange={(e) => setSev(e.target.value as 'all' | Severity)}
        >
          <option value="all">tutte</option>
          <option value="low">low</option>
          <option value="med">med</option>
          <option value="high">high</option>
        </select>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">Dominio</th>
            <th className="p-2">Titolo</th>
            <th className="p-2">Severity</th>
            <th className="p-2">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((f) => (
            <tr key={f.id} className="border-b">
              <td className="p-2">{f.domain}</td>
              <td className="p-2">{f.title || f.url}</td>
              <td className="p-2 capitalize">{f.severity}</td>
              <td className="p-2 flex gap-2">
                <Link
                  href={`/cases/${caseId}/requests/new?url=${encodeURIComponent(f.url)}`}
                  className="px-2 py-1 bg-nd-secondary text-white rounded"
                >
                  Crea Request
                </Link>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 border rounded"
                >
                  Apri sito
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
