import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TAnyObject } from '../../../constants';
import { renderWithProvider } from '../../../testUtils';
import { defaultState } from '../../__tests__/fixtures';
import { Header } from '../AppBar';

jest.mock('../../../utils', () => ({
  isValidToken: () => {
    return true;
  }
}));

describe('AppBar component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<Header />, {
      route: `/dashboard`,
      path: '/dashboard',
      initialStoreState
    });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });

  it('should be able to click on navigation and redirect to page', () => {
    generateNode();
    waitFor(() => userEvent.click(screen.getByText('Dashboard')));
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveClass(
      'active'
    );
  });

  //   it('should render profile menu and close on tap out', () => {
  //     generateNode();
  //     waitFor(() => userEvent.click(screen.getByTestId('profile-menus')));
  //     userEvent.click(screen.getByTestId('logo-icon'));
  //     expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  //   });

  it('should render profile menu and logout', () => {
    generateNode();
    waitFor(() => userEvent.click(screen.getByTestId('profile-menus')));
    expect(screen.getByText('Logout'));
    waitFor(() => userEvent.click(screen.getByText('Logout')));
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
