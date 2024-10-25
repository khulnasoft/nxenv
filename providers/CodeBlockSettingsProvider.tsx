import { Themes } from '@nxenv/styleguide';
import { createContext, type Dispatch, type PropsWithChildren, useContext } from 'react';

import { useLocalStorage } from '~/common/useLocalStorage';

type CodeBlockSettingsContextType = {
  preferredTheme: Themes;
  setPreferredTheme: Dispatch<Themes>;
  wordWrap: boolean;
  setWordWrap: Dispatch<boolean>;
};

nxenvrt const CodeBlockSettingsContext = createContext<CodeBlockSettingsContextType>({
  preferredTheme: Themes.AUTO,
  setPreferredTheme: (_: Themes) => {},
  wordWrap: false,
  setWordWrap: (_: boolean) => {},
});

nxenvrt function CodeBlockSettingsProvider({ children }: PropsWithChildren) {
  const [preferredTheme, setPreferredTheme] = useLocalStorage({
    defaultValue: Themes.AUTO,
    name: 'CODEBLOCK_THEME',
  });
  const [wordWrap, setWordWrap] = useLocalStorage({
    defaultValue: false,
    name: 'CODEBLOCK_WORDWRAP',
  });

  return (
    <CodeBlockSettingsContext.Provider
      value={{
        preferredTheme,
        setPreferredTheme,
        wordWrap,
        setWordWrap,
      }}>
      {children}
    </CodeBlockSettingsContext.Provider>
  );
}

nxenvrt function useCodeBlockSettingsContext() {
  return useContext(CodeBlockSettingsContext);
}
