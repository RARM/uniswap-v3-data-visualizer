import { describe, expect, test } from '@jest/globals';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PromptBox from '@/app/ui/req-prompt';

describe('PromptBox Component', () => {
  test('renders PromptBox component', () => {
    render(<PromptBox onClose={() => {}} />);
    expect(screen.getByText('Key Configuration')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('input field updates on change', () => {
    render(<PromptBox onClose={() => {}} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(input).toHaveValue('test input');
  });

  test('calls onClose with input value on submit', () => {
    const handleClose = jest.fn();
    render(<PromptBox onClose={handleClose} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: 'test input' } });
    fireEvent.click(button);

    expect(handleClose).toHaveBeenCalledWith('test input');
  });
});