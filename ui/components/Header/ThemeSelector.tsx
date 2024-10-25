import { useTheme, mergeClasses } from '@nxenv/styleguide';
import { ChevronDownIcon } from '@nxenv/styleguide-icons/outline/ChevronDownIcon';
import { Contrast02SolidIcon } from '@nxenv/styleguide-icons/solid/Contrast02SolidIcon';
import { Moon01SolidIcon } from '@nxenv/styleguide-icons/solid/Moon01SolidIcon';
import { SunSolidIcon } from '@nxenv/styleguide-icons/solid/SunSolidIcon';
import { useEffect, useState } from 'react';

nxenvrt const ThemeSelector = () => {
  const { themeName, setAutoMode, setDarkMode, setLightMode } = useTheme();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(function didMount() {
    setLoaded(true);
  }, []);

  return (
    <div className="relative">
      <select
        aria-label="Theme selector"
        title="Select theme"
        className={mergeClasses(
          'flex items-center justify-center h-9 text-default leading-[1.3] p-0 m-0 w-[50px] border border-default shadow-xs rounded-md indent-[-9999px] appearance-none bg-default text-sm',
          'hocus:bg-element',
          'max-lg-gutters:w-auto max-lg-gutters:min-w-[100px] max-lg-gutters:px-2 max-lg-gutters:text-secondary max-lg-gutters:indent-0 max-lg-gutters:pl-8'
        )}
        value={themeName}
        onChange={e => {
          const option = e.target.value;
          if (option === 'auto') setAutoMode();
          if (option === 'dark') setDarkMode();
          if (option === 'light') setLightMode();
        }}>
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      {isLoaded && (
        <>
          {themeName === 'auto' && <Contrast02SolidIcon className={ICON_CLASSES} />}
          {themeName === 'dark' && <Moon01SolidIcon className={ICON_CLASSES} />}
          {themeName === 'light' && <SunSolidIcon className={ICON_CLASSES} />}
        </>
      )}
      <ChevronDownIcon className="icon-xs text-icon-secondary absolute right-2 top-3 pointer-events-none" />
    </div>
  );
};

const ICON_CLASSES = 'icon-sm absolute left-2.5 top-2.5 text-icon-secondary pointer-events-none';
