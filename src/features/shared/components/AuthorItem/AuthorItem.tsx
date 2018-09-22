import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleProp
} from 'react-native';

import theme from './theme';

type Props = {
        author: string;
        time: string;
        imgAuthorUrl: HashMap<string>;
        onCollection?: boolean;
        authorContainer: StyleProp<any>
}
export default class AuthorItem extends Component<Props> {
    static defaultProps = {
        onCollection: false
    };
    render() {
        const {  author, time, imgAuthorUrl, authorContainer, onCollection} = this.props;
        return (
            <View style={theme.authorWrapper}>
            {
                onCollection
                ? (
                    <>
                        <View style={[authorContainer, {flex: 1}]}>
                            <Image
                                style={theme.authorImage}
                                source={imgAuthorUrl} />
                            <View  style={theme.authorTextContainer}>
                                <Text style={theme.authorText}> {author.toUpperCase()}</Text>
                                <Text style={theme.authorText}>{time}</Text>
                            </View>
                        </View>
                    </>
                )
                : (
                    <>
                        <View style={[authorContainer, {flex: 0.4}]}>
                            <Image
                                style={theme.authorImage}
                                source={imgAuthorUrl} />
                            <View  style={theme.authorTextContainer}>
                                <Text style={theme.authorText}>Inspiration by</Text>
                                <Text style={theme.authorText}>
                                    {author.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        <View style={{flex: 0.55, flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={[theme.authorText, { flex: 1, textAlign: 'right', lineHeight: 18}]}>{time}</Text>
                        </View>
                    </>
                )
            }
        </View>    
        )
    }

 }