// import { screen, waitFor, within } from '@testing-library/react';
import { TAnyObject } from '../../../constants';
import { renderWithProvider } from '../../../testUtils';
import { defaultState } from '../../__tests__/fixtures';
import { HolidayList } from '../HolidayList';

describe('Holiday List component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<HolidayList />, initialStoreState);

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });
});
