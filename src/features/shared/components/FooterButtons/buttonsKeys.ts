export const LOVE: string = 'Love it';
export const VIEW: string = 'View';
export const CATEGORIES: string = 'Categories';
export const APPLY: string = 'Apply';
export const CLEAR: string = 'Clear';
export const CANCEL: string = 'Cancel';
export const BACK: string = 'Back';

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
        icon: 'verificationMarkWhite'
    },
    {
        text: CLEAR,
        icon: 'verificationMarkWhite'
    },
    {
        text: CANCEL,
        icon: 'verificationMarkWhite'
    }
    
];

export const dragAndDropButtons: HashMap<string | number | any>[] = [
    {
        text: LOVE,
        icon: 'filter'
    },
    {
        text: BACK,
        icon: 'filter'
    }
]