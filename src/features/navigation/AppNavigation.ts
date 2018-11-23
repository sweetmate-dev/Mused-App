import { createStackNavigator } from 'react-navigation';

import { Newsfeed } from '../newsfeed'
import { Collection } from '../collection';
import { VideoPlayer } from '../video-player';
import { Browse, BrowseOnly } from '../browse';
import { Zoom } from '../zoom';
import { Filter } from '../filter';
import { DragAndDrop } from '../drag-and-drop';

import { 
    COLLECTION,
    VIDEOPLAYER,
    BROWSE, 
    COLLECTION_ZOOM,
    BROWSE_ONLY,
    NEWSFEED, 
    ZOOM, 
    FILTER,
    VIEW } from '../shared';

import { transitionConfig } from './transitionConfig';

export default createStackNavigator(
    {
        [NEWSFEED]: {
            screen: Newsfeed
        },
        [COLLECTION]: {
            screen: Collection
        },
        [VIDEOPLAYER]: {
            screen: VideoPlayer
        },
        [BROWSE]: {
            screen:  Browse
        },        
        [BROWSE_ONLY]: {
            screen: BrowseOnly
        },
        [ZOOM]: {
            screen:  Zoom,
            navigationOptions: {
                header: null
            }
        },
        [COLLECTION_ZOOM]: {
            screen:  Zoom,
            navigationOptions: {
                header: null
            }
        },
        [FILTER]: {
            screen:  Filter
        },
        [VIEW]: {
            screen: DragAndDrop
        }
    }, {

    initialRouteName: NEWSFEED,
    // headerMode: 'float',
    cardStyle:{
        backgroundColor: '#fff'
    },
    transitionConfig
  },

);
