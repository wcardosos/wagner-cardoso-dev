import React from 'react';
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drawer from '../../src/components/Drawer';
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Component: Drawer', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(<Drawer />);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render the drawer', () => {
    expect(screen.getByTestId('open-drawer-button')).toBeInTheDocument();
  });

  it('Should open the drawer', async() => {
    const openDrawerButton = screen.getByTestId('open-drawer-button');

    await user.click(openDrawerButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });

  it('Should close the drawer', async() => {
    const openDrawerButton = screen.getByTestId('open-drawer-button');

    await user.click(openDrawerButton);

    const closeDrawerButton = screen.getByTestId('close-drawer-button');

    await user.click(closeDrawerButton);

    await waitForElementToBeRemoved(() => screen.getByRole('dialog'));

    expect(screen.queryByTestId('nav')).not.toBeInTheDocument();
  });
});
