import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import normal from './themes/normal';
import getTheme from './theming-utils';

type CustomThemeContextType = {
    currentTheme: string;
    setCurrentTheme: { (name: string): void } | null;
};

export const CustomThemeContext = React.createContext<CustomThemeContextType>({
    currentTheme: 'normal',
    setCurrentTheme: null,
});

const CustomThemeProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const currentTheme = localStorage.getItem('appTheme') || 'normal';
    const [themeName, _setThemeName] = useState(currentTheme);
    let theme = normal;
    if (themeName === 'dark' || themeName === 'normal') {
        theme = getTheme(themeName);
    }

    const setThemeName = (name: string) => {
        localStorage.setItem('appTheme', name);
        _setThemeName(name);
    };

    const contextValue: CustomThemeContextType = {
        currentTheme: themeName,
        setCurrentTheme: setThemeName,
    };

    return (
        <CustomThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export default CustomThemeProvider;
