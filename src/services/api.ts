import { getClient, login } from './db';

export const loginViaFBProvider = (token: string) => {
    return login('facebook', token);
};

export const loginViaAnonProvider = () => {
    return login('anonymous');
};

export const logout = () => {
    const client = getClient();
    return client.auth.logout();
};

export const getAuthUserData = () => {
    const client = getClient();
    const { isLoggedIn } = client.auth;
    if (!isLoggedIn) return null;

    const { user: { id, profile } } = client.auth;
    const { email, firstName, lastName, name } = profile;

    return {
        userId: id,
        userProfile: {
            email,
            firstName,
            lastName,
            name,
        },
    };
};

export const getProducts = () => {
    const client = getClient();
    return client.callFunction("search", ["shorts", "Black"]);
};

export const getAuthors = () => {
    const client = getClient();
    return client.callFunction("getAuthors", []);
};

export const getOutfits = () => {
    const client = getClient();
    return client.callFunction("getOutfits", []);
};

export const getPosts = () => {
    const client = getClient();
    return client.callFunction("getPosts", []);
}

export const getProductsByIds = (ids: number[]) => {
    const client = getClient();
    const _ids = [...ids];
    return client.callFunction("getProductsByIds", [_ids]);
};

export const getProductsByCatsSubs = (categories: Category[]) => {
    const client = getClient();
    let _categories = 
        [...categories.map( (category: Category) => ({...category, subCategories: [...category.subCategories]}))];
    return client.callFunction("getProductsByCatsSubs", [_categories]);
}

export const updateUser = (userProfile: any) => {
    const client = getClient();
    return client.callFunction("updateUser", [userProfile]);
};

export const getUserDetails = (email: string) => {
    const client = getClient();
    return client.callFunction("getUserDetails", [email]);
};

export const createOutfit = (outfit: Outfit) => {
    const client = getClient();
    return client.callFunction("createOutfit", [outfit]);
};

export const getBookmarksByUserId = (userEmail: string) => {
    const client = getClient();
    return client.callFunction("getBookmarksByUserId", [userEmail]);
}

export const createBookmark = (bookmark: Bookmark ) => {
    const client = getClient();
    return client.callFunction("createBookmark", [bookmark]);
}

export const deleteBookmark = (_id: any) => {
    const client = getClient();
    return client.callFunction("deleteBookmark", [_id]);
}

export const getProductsByCategory = (category: string) => {
    const client = getClient();
    return client.callFunction("searchByCategory", [category]);
}
