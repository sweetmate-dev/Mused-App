interface IProductStore {
    getCollection: (slots: Slot[]) => void;
    getAlternatives: (ids: number[]) => void;
    getAlternativesByFilter: () => void;
    listOfCollection: Product[];
    alternatives: Product[];
    arrayImages: ProductImage[];
    listOfAlternatives: Product[];
    toggleViewCategory: boolean;
    getSliderToggleState: boolean;
    openProductCategory: () => void;
    changeArrayImages: (slotNumber: number, newImg: ImageSourcePropType) => void;
    moveImageToLeft: (slotNumber: number) => void;
    resetArrayImages: () => void;
    resetAlternativies: () => void;
    createNewOutfit: () => void;
    createBookmark: (productId: number) => void;
    deleteBookmarkById: (_id: any) => void;
    getBookmarksByUserId: () => void;
    listOfBookmarks: Bookmark[];
    getProductsByCategory: (category: string) => void;
    resetProductsByCategory: () => void;
    listOfProductsByCategories: Product[];
    categoryInDrag: string;
}

interface IUiStore {
    footerIsVisible: boolean;
    contextMenuIsVisible: boolean;
    navigation: any;
    currentRoute: string;
    prevRoute: string;
    hideFooter: () => void;
    showFooter: () => void;
    setNavigation: (navigation: any) => void;
    toggleContextMenu: (flag: boolean) => void;
    navigate: (currentRoute: string, prevRoute: string, params?: any) => void;
    setPrevCurrentRoutes: (currentRoute: string, prevRoute: string) => void;
}

interface IUserStore {
    userId: string;
    userProfile: UserProfile;
    logout: () => void;
    setUserDetails: (userId: string, userProfile: UserProfile, cb?: (userId: string) => void) => void;
}

interface ISlotsStore {
    isSlotMachine: boolean;
    slotNumber: number | null | string;
    secondSlotNumber: number | null | string;
    newImgUrl: HashMap<string> | null;
    isMoveProduct: boolean;
    setSlotNumber: (slotNumber: number | string) => void;
    setSecondSlotNumber: (slotNumber: number | string) => void;
    setNewImgUrl: (newImgUrl: HashMap<string>) => void;
    setSlotMachineEffect: (flag: boolean) => void;
    setMoveProduct: (flag: boolean) => void;
    getSixthSlot: HashMap<string>;
    addOrReplaceSixthSlot: (item: HashMap<string>) => void;
}

interface IPostsStore {
    posts: Post[];
    getPosts: () => void;
    listOfPosts: Post[];
}

interface IFilterStore {
    listOfCategory: Category[];
    filterTab: string;
    addNewCategory: (category: string, subCutegory: string) => void;
    removeCategory: (category: string, subCutegory: string) => void;
    selectAllSubCategories: (category: string) => void;
    setFilterTab: (tab: string) => void;
    clearFilters: () => void;
}

type RootStore = {
    ui: IUiStore;
    products: IProductStore;
    user: IUserStore;
    slots: ISlotsStore;
    posts: IPostsStore;
    filters: IFilterStore;
}
