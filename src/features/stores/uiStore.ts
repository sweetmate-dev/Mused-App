import { observable, action} from 'mobx';
import { NEWSFEED } from '../shared';

export default class ObservableStore implements IUiStore {

    constructor(public root: RootStore) {}
    
    @observable footerIsVisible: boolean = false;
    @observable contextMenuIsVisible: boolean = false;
    @observable navigation: any = null;
    @observable currentRoute: string = NEWSFEED;
    @observable prevRoute: string = '';

    

    @action
    public  hideFooter = () =>  {
        this.footerIsVisible = false;
    }

    @action
    public showFooter = () => {
        this.footerIsVisible = true;
    }
 
    @action setNavigation = (navigation: any) => {
        this.navigation = navigation;
    }

    @action
    toggleContextMenu = (flag: boolean) =>
            this.contextMenuIsVisible = flag;
    
    @action
    navigate = (currentRoute: string, prevRoute: string, params: any = {}) => {
        this.currentRoute = currentRoute;
        this.prevRoute =  prevRoute;
        this.navigation.navigate(currentRoute, params)
    }

    @action
    setPrevCurrentRoutes = (currentRoute: string, prevRoute: string) => {
        this.currentRoute = currentRoute;
        this.prevRoute =  prevRoute;
    }


}