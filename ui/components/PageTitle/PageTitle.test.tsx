import { render, screen } from '@testing-library/react';

import { PageTitle } from './PageTitle';

import { renderWithTestRouter } from '~/common/test-utilities';

describe('PageTitle', () => {
  test('displays npm registry link', () => {
    render(<PageTitle title="test-title" packageName="nxenv-av" />);
    const linkElement = screen.getAllByRole('link', { hidden: false })[0];
    expect(linkElement.getAttribute('href')).toEqual('https://www.npmjs.com/package/nxenv-av');
    expect(linkElement.getAttribute('title')).toEqual('View package in npm Registry');
  });

  test('displays GitHub source code link', () => {
    render(
      <PageTitle
        title="test-title"
        packageName="nxenv-av"
        sourceCodeUrl="https://github.com/nxenv/nxenv/tree/main/packages/nxenv-av"
      />
    );
    const linkElement = screen.getAllByRole('link', { hidden: false })[0];
    expect(linkElement.getAttribute('href')).toEqual(
      'https://github.com/nxenv/nxenv/tree/main/packages/nxenv-av'
    );
    expect(linkElement.getAttribute('title')).toEqual('View source code of nxenv-av on GitHub');
  });

  test('displays edit page link for non-API docs', () => {
    const router = { pathname: '/router/reference/hooks/' };

    renderWithTestRouter(<PageTitle title="test-title" />, router);
    const linkElement = screen.getAllByRole('link', { hidden: false })[0];

    expect(linkElement.getAttribute('href')).toEqual(
      'https://github.com/nxenv/nxenv/edit/main/docs/pages/router/reference/hooks.mdx'
    );
    expect(linkElement.getAttribute('title')).toEqual('Edit content of this page on GitHub');
  });
});
