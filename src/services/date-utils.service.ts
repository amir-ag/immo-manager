import { format, parseISO } from 'date-fns';
import * as constants from '../constants';

export const formatNormalizedDateToShortString = (normalizedDate: string | undefined) =>
    normalizedDate ? format(parseISO(normalizedDate), constants.dateFormatShort) : constants.notAvailableText;
