import { TAnyObject } from '../../../constants';
import { renderWithProvider } from '../../../testUtils';
import { defaultState } from '../../__tests__/fixtures';
import { Auth } from '../Auth';
import { Dashboard } from '../../Dashboard';

describe('Auth component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(
      <Auth>
        <Dashboard />
      </Auth>,
      {
        route: `/dashboard`,
        path: '/dashboard',
        initialStoreState
      }
    );

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });
});
