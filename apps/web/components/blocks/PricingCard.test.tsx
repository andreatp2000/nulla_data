import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PricingCard } from './PricingCard'

test('pricing card snapshot', () => {
  const { container } = render(
    <PricingCard title="Test" price="10€" features={['a', 'b']} />
  )
  expect(container).toMatchSnapshot()
})
