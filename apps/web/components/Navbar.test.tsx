import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Navbar } from './Navbar'

test('renders CTA', () => {
  render(<Navbar />)
  expect(screen.getByText('Inizia ora')).toBeInTheDocument()
})
