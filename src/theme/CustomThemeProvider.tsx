import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from './base';
import normal from './normal';

type CustomThemeContextType = {
    currentTheme: string;
    setTheme: { (name: string): void } | null;
};

export const CustomThemeContext = React.createContext<CustomThemeContextType>({
    currentTheme: 'normal',
    setTheme: null,
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
        setTheme: setThemeName,
    };

    return (
        <CustomThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export default CustomThemeProvider;
