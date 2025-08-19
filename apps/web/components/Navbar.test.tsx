import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Navbar } from './Navbar'

import { test, expect } from 'vitest'
=======


test('renders CTA', () => {
  render(<Navbar />)
  expect(screen.getByText('Inizia ora')).toBeInTheDocument()
})
