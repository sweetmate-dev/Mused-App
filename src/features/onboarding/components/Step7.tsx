import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import TypeWriterText from './Typewriter'

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

export default class Step7 extends Component<Props> {

    onEndEffect = () => {
      setTimeout(() => {
        this.props.continue();
      }, 1000)
    }

    render() {
      return (
        <View style={styles.container}>
          <TypeWriterText text={['Yes! You‘ve got it.', '']} onEndEffect={() => this.onEndEffect()}/>
        </View>
      )
    }
}
