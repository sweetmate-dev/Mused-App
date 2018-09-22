import { observable, action } from 'mobx';

import { getUserDetails, logout } from '../../services';

export default class ObservableStore implements IUserStore {

    constructor(public root: RootStore) {}

    @observable id: string = null;
    @observable profile: UserProfile = null;
    @observable userDetails: any = null;

    @action
    public logout = () => {
        logout().then(() => {
            this.id = null;
            this.profile = null;
            this.userDetails = null;
        });
    };

    public get userProfile() {
        return this.profile;
    };

    public get userId() {
        return this.id;
    }

    @action
    public setUserDetails = async (userId: string, userProfile: UserProfile) => {
        const { email } = userProfile;
        const userData = await getUserDetails(email);

        await this.setUser({ userId, userData });
    };

    private setUser = (user: any) => {
        const { userId, userData: { profile, details } } = user;
        this.id = userId;
        this.profile = profile;
        this.userDetails = details;
    }

}
