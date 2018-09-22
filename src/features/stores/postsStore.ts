import { observable, action } from 'mobx';
import { getPosts } from '../../services';
import moment from 'moment';

export default class ObservableStore implements IPostsStore {
    constructor(public root: RootStore) { }
    
    @observable posts: Post[];
    
    get listOfPosts() {
        return this.posts;
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
        };
    }
    