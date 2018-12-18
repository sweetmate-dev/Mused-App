import { observable, action } from 'mobx';
import { getPosts } from '../../services';
import moment from 'moment';

const post1: RetailerPost = {
    "_id": "5c17d294dced5f3e02a9005a",
    "title":"Retailer test post 2",
    "date":"1545065108000",
    "inspirationalImage":"https://uploads-ssl.webflow.com/5a2841982551540001970010/5c16574085ed6245f9791ec8_1103298_ou_xl-p-500.jpeg",
    "slots":[
        {
            "productId": 729159317,
            "alternatives":[
                730091103,
                742991924,
                688468400,
                742230694,
                692920762,
                737381906,
                746451187,
                699909705,
                735475424,
                714827634
            ]
        },
        {
            "productId":650975570,
            "alternatives":[
                743801068,
                728044069,
                728359404,
                746870315,
                732039110,
                737515664,
                715573916,
                733905226,
                726858336,
                729330703
            ]
        },
        {
            "productId":715648972,
            "alternatives":[
                688151377,
                739503375,
                726639614,
                698468856,
                741116947,
                677539125,
                753352728,
                715740286,
                748091105,
                739704606
            ]
        },
        {
            "productId":739489561,
            "alternatives":[
                742481662,
                690956837,
                741703409,
                738277431,
                732634614,
                690956836,
                743050267,
                672864030,
                691904726,
                738277430,
                741189053,
                689907469,
                712262828,
                737766635,
                679766502,
                619041794,
                748201461,
                746588324,
                664661212,
                691290531
            ]
        }
    ],
    "postId": 21
}




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
        // await getRetailerPosts().then((posts: RetailerPost[]) => {
        //     this.retailerPosts = posts;
        // })
        this.retailerPosts = [post1, post1, post1, post1];
    };}
    