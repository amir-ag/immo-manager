import normal from './normal';
import dark from './dark';
import { Theme } from '@material-ui/core/styles';

type ThemeType = 'normal' | 'dark';

const themes = {
    normal,
    dark,
};

export default function getTheme(theme: ThemeType): Theme {
    return themes[theme];
}
