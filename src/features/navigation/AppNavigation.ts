import { createStackNavigator } from 'react-navigation';

import { Newsfeed } from '../newsfeed'
import { Collection } from '../collection';
import { Browse } from '../browse';
import { Zoom } from '../zoom';
import { Filter } from '../filter';
import { 
    COLLECTION,
    BROWSE, 
    NEWSFEED, 
    ZOOM, 
    FILTER } from '../shared';

import { transitionConfig } from './transitionConfig';

export default createStackNavigator(
    {
        [NEWSFEED]: {
            screen: Newsfeed
        },
        [COLLECTION]: {
            screen: Collection
        },
        [BROWSE]: {
            screen:  Browse
        },
        [ZOOM]: {
            screen:  Zoom
        },
        [FILTER]: {
            screen:  Filter
        }
    }, {

    initialRouteName: NEWSFEED,
    headerMode: 'float',
    cardStyle:{
        backgroundColor: '#fff'
      },
    transitionConfig
  },

);
