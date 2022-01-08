import { useEffect } from 'react';
import * as constants from '../constants';

export const usePageTitle = (title: string) => {
    useEffect(() => {
        document.title = `${constants.appName} | ${title}`;
    }, [title]);
};
