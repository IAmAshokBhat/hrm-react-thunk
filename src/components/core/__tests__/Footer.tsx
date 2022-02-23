import { TAnyObject } from '../../../constants';
import { renderWithProvider } from '../../../testUtils';
import { defaultState } from '../../__tests__/fixtures';
import { Footer } from '../Footer';

describe('Footer component', () => {
  const generateNode = (initialStoreState: TAnyObject = defaultState) =>
    renderWithProvider(<Footer />, initialStoreState);

  it('should render and match snapshot', () => {
    const { container } = generateNode();

    expect(container).toMatchSnapshot();
  });
});
