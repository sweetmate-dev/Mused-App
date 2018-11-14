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
    alignItems: 'center',
    paddingBottom: 30
  },
  section: {
    marginVertical: 25,
  }
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
          <View style={styles.section}>
            <TypeWriterText 
              text={['That‘s it!', 'You can match anything.']} 
              delay={0}
              style={{fontSize: 22}}
            />
          </View>
          <View style={styles.section}>
            <TypeWriterText 
              text={['Play with different styles or',  'create totally new looks']} 
              delay={2000}
              style={{fontSize: 22}}
            />
          </View>
          <View style={styles.section}>
            <TypeWriterText 
              text={['it‘s completely up to you...', '']}
              onEndEffect={() => this.onEndEffect()}
              delay={5500}
              style={{fontSize: 22}}
            />
          </View>          
        </View>
      )
    }
}
