export const LOVE: string = 'Love it';
export const VIEW: string = 'View';
export const CATEGORIES: string = 'Categories';
export const APPLY: string = 'Apply';
export const CLEAR: string = 'Clear';
export const CANCEL: string = 'Cancel';

export const footerButtons: HashMap<string>[] = [
    {
        text: LOVE,
        icon: 'verificationMarkBlack'
    },
    {
        text: VIEW,
        icon: 'arrowUp'
     },
     {
        text: CATEGORIES,
        icon: 'filter'
     }
    ];

export const footerDarkButtons: HashMap<string | number | any>[] = [
    {
        text: APPLY,
        icon: 'verificationMarkWhite',
        whiteTheme: false,
        styleForContainer: {},
    },
    {
        text: CLEAR,
        icon: 'verificationMarkWhite',
        whiteTheme: false,
        styleForContainer: {},
    },
    {
        text: CANCEL,
        icon: 'verificationMarkWhite',
        whiteTheme: false,
        styleForContainer: {},
    }
    
]