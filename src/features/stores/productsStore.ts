import { observable, action } from 'mobx';
import moment from 'moment';

import { getProductsByIds, getProductsByCatsSubs, createOutfit, createBookmark, getBookmarksByUserId, deleteBookmark } from '../../services';


export default class ObservableStore implements IProductStore {
    constructor(public root: RootStore) {
        this.root = root 
    }

    @observable collection: Product[] = [];
    @observable alternatives: Product[] = [];
    @observable arrayImages: ProductImage[] = [];
    @observable bookmarks: Bookmark[] = [];

    get listOfCollection() {
        return this.collection;
    }
    get listOfAlternatives() {
        return this.alternatives;
    }
    get listOfBookmarks() {
        return this.bookmarks;
    }


    @action
    public getAlternatives = async (ids: number[]) => {
        await getProductsByIds(ids).then((products: Product[]) => {
            this.alternatives = [...products]
        });
    }

    @action
    public getAlternativesByFilter = async () => {
        await getProductsByCatsSubs(this.root.filters.listOfCategory).then((products: Product[]) => {
            this.alternatives = [...products]
        });
    }

    @action
    public  getCollection = async (slots: Slot[]) => {
        const ids: number[] = slots.map((slot: Slot) => slot.productId);
        await getProductsByIds(ids).then((products: Product[]) => {
            this.collection = products
        });
        this.arrayImages  = this.collection.map( (product: Product) => {
            return { 
                img: { uri: product.image },
                id: product.id   
            }
        });
    }

    @action
    public changeArrayImages = (slotNumber: number, newImg: ProductImage) => {
        const newArray = [...this.arrayImages];
        const indexSlot: number = newArray.findIndex( (item: ProductImage) => item.id === slotNumber);
        newArray.splice(indexSlot, 1, newImg);
        this.arrayImages = newArray;
    }

    @action
    public resetArrayImages = () => {
        this.arrayImages = [];
        this.collection = [];
    }

    @action resetAlternativies = () => {
        this.alternatives = [];
    }

    @action
    public moveImageToLeft = (slotNumber: number) => {
        const newArrayImgs = [...this.arrayImages];
        const product: ProductImage = newArrayImgs.find((item: ProductImage, index: number) => {
            return item && index === slotNumber;
        });
        newArrayImgs.splice(slotNumber, 1);
        (slotNumber - 1 ) < 0
            ? newArrayImgs.push(product)
            : newArrayImgs.splice(slotNumber - 1, 0, product);
        this.arrayImages = newArrayImgs;
    }

    @action
    public createNewOutfit = () => {
        const outfit: Outfit = {
            userEmail: this.root.user.userProfile.email,
            slots: this.arrayImages.map( ( product: ProductImage) => product.id as number),
            timestamp: moment().format()
        };
        createOutfit(outfit);
    }

    @action
    public createBookmark = async (productId: number) => {
        const bookmark: Bookmark = {
            userEmail: this.root.user.userProfile.email,
            productId,
            timestamp: moment().format()
        };
        await createBookmark(bookmark);
        await this.getBookmarksByUserId();
    }

    @action getBookmarksByUserId = async () => {
        await getBookmarksByUserId(this.root.user.userProfile.email).then((bookmarks: Bookmark[]) => {
            this.bookmarks = bookmarks
        });
    }

    @action deleteBookmarkById = async (_id: any) => {
        await deleteBookmark(_id);
        await this.getBookmarksByUserId();
    }
}