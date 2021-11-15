import App from './App';
import { renderWithStore } from '../mocks/renderWithStore';
import * as hooks from './appSlice';

describe('<App />', () => {
  it('should call hooks', () => {
    const useHandleSearchChange = jest
      .spyOn(hooks, 'useHandleSearchChange')
      .mockImplementation(() => ({
        searchCity: 'Brisbane, AU',
        handleSearchChange: jest.fn(),
      }));
    renderWithStore(<App />);
    expect(useHandleSearchChange).toBeCalled();
  });
  it('should render correct value into input element', () => {
    jest.spyOn(hooks, 'useHandleSearchChange').mockImplementation(() => ({
      searchCity: 'Brisbane, AU',
      handleSearchChange: jest.fn(),
    }));
    const { getByTestId } = renderWithStore(<App />);
    const searchInput = getByTestId('searchCity');
    expect((searchInput as HTMLInputElement).value).toEqual('Brisbane, AU');
  });
});
