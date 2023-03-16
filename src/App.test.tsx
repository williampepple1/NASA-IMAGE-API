
import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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


describe('<SearchPage />', () => {
  test('The input field works well', () => {
    render(<SearchPage />)
    const input = document.querySelector(
      'input'
    ) as HTMLInputElement | null;
    
    // input exists in the form component
    expect(input).toBeTruthy()
    
    // is empty
    expect(input?.textContent).toBe('')

    if (input) {
      // test the input text
      input.textContent = 'Moon'
      expect(input.textContent).toBe('Moon')

      // test the type prop
      expect(input.type).toBe('text')
      

      // test the value prop
      fireEvent.change(input, {
        target: {
          value: 'Moon'
        }
      })
      expect(input.value).toBe('Moon')
    }
  });
});
