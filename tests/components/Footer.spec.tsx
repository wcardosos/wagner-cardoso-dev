import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Footer from '../../src/components/Footer';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../src/hooks/useResponsiveness');

describe('Component: Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render the footer', () => {
    expect(screen.getByAltText('Contato Gmail')).toBeInTheDocument();
    expect(screen.getByAltText('Contato LinkedIn')).toBeInTheDocument();
    expect(screen.getByAltText('Contato Github')).toBeInTheDocument();
  });
});
