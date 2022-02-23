import { getUserDetailsAPI } from '../../api';
import { TAnyObject } from '../../constants';
import { mockAPICall, renderWithProvider } from '../../testUtils';
import { UserInfo } from '../UserInfo';
import { defaultState, userInfoAPIResponse } from '../__tests__/fixtures';

jest.mock('../../api', () => ({
  getUserDetailsAPI: jest.fn()
}));

const userInfoResponse = {
  ok: true,
  body: userInfoAPIResponse
};

describe('User Info component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<UserInfo />, {
      route: `/dashboard`,
      path: '/dashboard',
      initialStoreState
    });

  beforeEach(() => {
    mockAPICall(getUserDetailsAPI, userInfoResponse);
  });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });
});
