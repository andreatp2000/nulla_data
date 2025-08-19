import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FAQItem } from './FAQItem'
import { test, expect } from 'vitest'

test('faq item snapshot', () => {
  const { container } = render(<FAQItem q="Q" a="A" />)
  expect(container).toMatchSnapshot()
})
