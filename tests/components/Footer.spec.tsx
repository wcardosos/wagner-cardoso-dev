import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../src/components/Footer';
import '@testing-library/jest-dom/extend-expect';

describe('Component: Footer', () => {
  it('Shoulde render the Footer', () => {
    render(<Footer />);

    expect(screen.getByTestId('gmail-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
  });
});
