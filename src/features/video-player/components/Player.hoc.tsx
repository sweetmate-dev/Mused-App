import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import VideoPlayer from './Player';
import { Header, BROWSE, VIDEOPLAYER } from '../../shared';
import { ROOT_STORE } from '../../stores';
type Props = {
    navigation: any;
    root: RootStore;
};
function BrowseHOC(VideoPlayer: any) {
    @inject(ROOT_STORE)
    @observer
    class NewComp extends Component<Props> {
      static navigationOptions: ([string]: any) => HashMap<Object> = ({ navigation }) => {
        return {
            header: <Header navigation={navigation} />
        } 
      };
      
      componentDidMount() {
        const { root: { products }, navigation } = this.props;
        const { getAlternatives } = products
        const productIds: number[] = navigation.getParam('alternatives', []);
        getAlternatives(productIds)
      }

      render() {
            return <VideoPlayer
                        navigation={this.props.navigation}
                        goToBrowse={this.goToBrowse}
                    />
      }

      goToBrowse = () => {
        const { root: { ui }, navigation } = this.props;
        const { navigate } = ui;
        const alternatives: number[] = navigation.getParam('alternatives', []);
        navigate(BROWSE, VIDEOPLAYER, {alternatives, transition: 'opacityTransition'});
      }
    }
    return NewComp;
  }

export default BrowseHOC(VideoPlayer);