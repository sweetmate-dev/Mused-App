
type Navigate = (route: string, params?: any) => void;


interface ICollectionHeader {
    title: string;
    subTitle: string;
}

interface IFilterItem {
    id?: string;
    name: string;
    imgUrl: HashMap<string>;
}

type Product = {
    id: number;
    description: string;
    category: string;
    image: string;
    priceLabel: string;
    colors: string[];
    retailerName: string;
    brand: string;
    subCategories: string[];
    unbrandedName: string;
}

type Author = {
    id: nubmer;
    fullName: string;
    authorImg: string;
}

/** USER DATA */
type UserProfile = {
    email: string;
    name: string;
    firstName: string;
    lastName: string;
}

type ProductImage = {
    img: ImageSourcePropType;
    id: number | string;
}

type Post = {
    _id: any;
    postId: number;
    timeAgo: string;
    authorName: string;
    authorProfilePhoto: string;
    inspirationalImage: string;
    slots: Slot[]
};

type Slot = {
    productId: number;
    alternatives: number[];
};

type Category = {
    category: string;
    subCategories: string[];
}

type Outfit = {
    userEmail: string;
    slots: number[];
    timestamp: string;
}

type Bookmark = {
    userEmail: string;
    productId: number;
    _id?: any;
    timestamp: string; 
}

