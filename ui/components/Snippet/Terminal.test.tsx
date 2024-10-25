import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Terminal } from '.';

describe(Terminal, () => {
  it('generates correct copyCmd from single command', async () => {
    render(
      <>
        <Terminal cmd={['$ nxenv install nxenv-updates']} />
        <textarea />
      </>
    );
    expect(screen.getByText('Copy')).toBeVisible();

    const user = userEvent.setup();
    await user.click(screen.getByText('Copy'));
    await user.click(screen.getByRole('textbox'));
    await user.paste();

    expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe(
      'nxenv install nxenv-updates'
    );
  });

  it('generates correct copyCmd from single command with comments and blank lines', async () => {
    render(
      <>
        <Terminal
          cmd={[
            '# This line is a comment',
            '',
            '$ nxenv install nxenv-dev-client',
            '# One more to add!',
          ]}
        />
        <textarea />
      </>
    );
    expect(screen.getByText('Copy')).toBeVisible();

    const user = userEvent.setup();
    await user.click(screen.getByText('Copy'));
    await user.click(screen.getByRole('textbox'));
    await user.paste();

    expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe(
      'nxenv install nxenv-dev-client'
    );
  });

  it('do not generate copyCmd if first line is a comment', () => {
    render(<Terminal cmd={["# We don't want this to generate cmdCopy"]} />);
    expect(screen.queryByText('Copy')).toBe(null);
  });

  it('do not generate copyCmd if there is more than one command', () => {
    render(<Terminal cmd={['$ npx create-nxenv-app init test', '$ cd test']} />);
    expect(screen.queryByText('Copy')).toBe(null);
  });
});