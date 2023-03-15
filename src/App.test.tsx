
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SearchPage from './pages/SearchPage';

describe('<SearchPage />', () => {
  test('SearchPage properly', () => {
    const wrapper = render(<SearchPage/>)
    expect(wrapper).toBeTruthy()

    // Get by h1
    const h1 = wrapper.container.querySelector('h1')
    expect(h1?.textContent).toBe('NASA Image Library')

    // Get by text using the React testing library
    const text = screen.getByText(
      /Search Images/i
    );
    expect(text.textContent).toBeTruthy()
  })
});
