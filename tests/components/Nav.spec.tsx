import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from '../../src/components/Nav';
import '@testing-library/jest-dom/extend-expect';

describe('Component: Nav', () => {
  it('Shoulde render the nav', () => {
    render(<Nav />);

    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Stack')).toBeInTheDocument();
    expect(screen.getByText('Opiniões')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });
});
