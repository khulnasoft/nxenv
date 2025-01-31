import { FeedData } from '@nxenv/shared/src/graphql/posts';
import {
  BOOKMARKS_FEED_QUERY,
  supportedTypesForPrivateSources,
} from '@nxenv/shared/src/graphql/feed';
import nock from 'nock';
import React, { act } from 'react';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { LoggedUser } from '@nxenv/shared/src/lib/user';
import { NextRouter, useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';
import ad from '@nxenv/shared/__tests__/fixture/ad';
import defaultUser from '@nxenv/shared/__tests__/fixture/loggedUser';
import defaultFeedPage from '@nxenv/shared/__tests__/fixture/feed';
import {
  MockedGraphQLResponse,
  mockGraphQL,
} from '@nxenv/shared/__tests__/helpers/graphql';
import { waitForNock } from '@nxenv/shared/__tests__/helpers/utilities';
import { TestBootProvider } from '@nxenv/shared/__tests__/helpers/boot';
import BookmarksPage from '../pages/bookmarks';

const routerReplace = jest.fn();

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
  nock.cleanAll();
  mocked(useRouter).mockImplementation(
    () =>
      ({
        pathname: '/bookmarks',
        query: {},
        replace: routerReplace,
        push: jest.fn(),
      } as unknown as NextRouter),
  );
});

const createFeedMock = (
  page = defaultFeedPage,
  query: string = BOOKMARKS_FEED_QUERY,
  variables: unknown = {
    first: 7,
    after: '',
    loggedIn: true,
    supportedTypes: supportedTypesForPrivateSources,
  },
): MockedGraphQLResponse<FeedData> => ({
  request: {
    query,
    variables,
  },
  result: {
    data: {
      page,
    },
  },
});

let client: QueryClient;

const renderComponent = (
  mocks: MockedGraphQLResponse[] = [createFeedMock()],
  user: LoggedUser = defaultUser,
): RenderResult => {
  client = new QueryClient();

  mocks.forEach(mockGraphQL);
  nock('http://localhost:3000').get('/v1/a').reply(200, [ad]);

  return render(
    <TestBootProvider client={client} auth={{ user }}>
      {BookmarksPage.getLayout(
        <BookmarksPage />,
        {},
        BookmarksPage.layoutProps,
      )}
    </TestBootProvider>,
  );
};
it('should request bookmarks feed', async () => {
  renderComponent();
  await waitForNock();
  await waitFor(async () => {
    const elements = await screen.findAllByTestId('postItem');
    expect(elements.length).toBeTruthy();
  });
});

it('should redirect to home page when logged-out', async () => {
  renderComponent([], null);
  await waitFor(() => expect(routerReplace).toBeCalledWith('/'));
});

it('should show empty screen when feed is empty', async () => {
  renderComponent([
    createFeedMock({
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
      edges: [],
    }),
  ]);
  await waitForNock();
  await screen.findByText('Your bookmark list is empty.');
  await waitFor(() => {
    const elements = screen.queryAllByTestId('postItem');
    expect(elements.length).toBeFalsy();
  });
});

it('should show the search bar', async () => {
  renderComponent();
  await waitForNock();
  expect(await screen.findByTestId('searchField')).toBeInTheDocument();
});

it('should update query param on enter', async () => {
  renderComponent();
  await waitForNock();
  const input = await screen.findByPlaceholderText('Search bookmarks');
  fireEvent.input(input, { target: { value: 'daily' } });
  await act(() => new Promise((resolve) => setTimeout(resolve, 100)));
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13 });
  await waitFor(() =>
    expect(routerReplace).toBeCalledWith({
      pathname: '/bookmarks',
      query: { q: 'daily' },
    }),
  );
});
