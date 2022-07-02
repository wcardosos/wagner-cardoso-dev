import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../src/hooks/useResponsiveness');

describe('Component: Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  afterEach(() => {
    cleanup();
  });

  describe('Building site period', () => {
    it('Should render only the logo', () => {
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
      expect(screen.queryByTestId('nav')).not.toBeInTheDocument();
      expect(screen.queryByTestId('open-drawer-button')).not.toBeInTheDocument();
    });
  });

  // describe('Responsiveness', () => {
  //   describe('Desktop', () => {
  //     it('Should render the nav; does not render the drawer', () => {
  //       const useResponsivenessMock = useResponsiveness as jest
  //       .MockedFunction<typeof useResponsiveness>;

  //       useResponsivenessMock.mockReturnValue(true);

  //       render(<Header />);

  //       expect(useResponsivenessMock).toHaveBeenCalled();
  //       expect(screen.getByTestId('logo')).toBeInTheDocument();
  //       expect(screen.queryByTestId('open-drawer-button')).not.toBeInTheDocument();
  //     });
  //   });

  //   describe('Mobile', () => {
  //     it('Should render the drawer', () => {
  //       const useResponsivenessMock = useResponsiveness as jest
  //         .MockedFunction<typeof useResponsiveness>;

  //       useResponsivenessMock.mockReturnValue(false);

  //       render(<Header />);

  //       expect(useResponsivenessMock).toHaveBeenCalled();
  //       expect(screen.getByTestId('open-drawer-button')).toBeInTheDocument();
  //     });
  //   });
  // });
});
