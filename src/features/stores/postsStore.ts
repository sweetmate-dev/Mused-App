import { observable, action } from 'mobx';
import { getPosts, getRetailerPosts } from '../../services';
import moment from 'moment';



export default class ObservableStore implements IPostsStore {
    constructor(public root: RootStore) { }
    
    @observable posts: Post[];
    @observable retailerPosts: RetailerPost[];
    
    get listOfPosts() {
        return this.posts;
    }

    get listOfRetailerPosts() {
        return this.retailerPosts;
    }

    @action
    public getPosts = async () => {
        await getPosts().then((posts: Post[]) => 
            this.posts = posts.map((post: Post) => {
              return {
                  ...post,
                  timeAgo: moment(post.timeAgo).fromNow()
              }  
            })
        ) 
        await getRetailerPosts().then((posts: RetailerPost[]) => {
            this.retailerPosts = posts;
        })
    };}
    