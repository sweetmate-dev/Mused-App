import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import TypeWriterText from './Typewriter'

const text = "Yes! You've got it.";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

type Props = {
  continue: () => void;
}
type State = {
  textLength: number,
};

export default class Step7 extends Component<Props, State> {

    componentDidMount() {

    }

    onEndEffect = () => {
      setTimeout(() => {
        this.props.continue();
      }, 1000)
    }

    render() {
      return (
        <View style={styles.container}>
          <TypeWriterText text={text} onEndEffect={() => this.onEndEffect()}/>
        </View>
      )
    }
}
