'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn('email', { email, redirect: false })
    setSent(true)
  }

  if (sent) {
    return <p className="p-4">Check your email for a login link.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2"
        placeholder="you@example.com"
      />
      <div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
          Sign in
        </button>
      </div>
    </form>
  )
}
