// import { screen, waitFor, within } from '@testing-library/react';
import { getEventDetailsAPI } from '../../../api';
import { TAnyObject } from '../../../constants';
import { mockAPICall, renderWithProvider } from '../../../testUtils';
import { CalendarComponent } from '../CalendarComponent';
import { evenDetailsAPI } from './__ignore_tests__/fixtures';
import { defaultState } from '../../__tests__/fixtures';

jest.mock('../../../api', () => ({
  getEventDetailsAPI: jest.fn()
}));

const evenDetailsResponse = {
  ok: true,
  body: evenDetailsAPI
};

describe('Calendar component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<CalendarComponent />, {
      route: `/dashboard`,
      path: '/dashboard',
      initialStoreState
    });

  beforeEach(() => {
    mockAPICall(getEventDetailsAPI, evenDetailsResponse);
  });

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });
});
