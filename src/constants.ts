export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
] as const;

export const dateFormatStoring = 'yyyy-MM-dd';
export const dateFormatShort = 'dd.MM.yyyy';
export const dateFormatLong = 'do MMMM Y';

export const emailPattern = '\\w+@\\w+\\.\\w{2,10}';
export const swissPhonePattern =
    '(\\b(0041|0)|\\B\\+41)(\\s?\\(0\\))?(\\s)?[1-9]{2}(\\s)?[0-9]{3}(\\s)?[0-9]{2}(\\s)?[0-9]{2}\\b';
export const swissPhoneHelpText = 'Valid Swiss phone number';

export const minPasswordLength = 12;
export const passwordLengthHint = `Min. length is ${minPasswordLength} chars.`;

export const notAvailableText = '-';

export const appName = 'Immo Manager';
