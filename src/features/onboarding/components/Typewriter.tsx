import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
    text: string;
    onEndEffect?: () => void;
    style?: any;
    delay?: number;
}

type State = {
  textLength: number,
  text: string;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    height: 80,
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    fontFamily: 'Raleway'
  }
})

export default class TypeWriterText extends Component<Props, State> {
    static defaultProps = {
      style: {},
      delay: 500,
      onEndEffect: () => {}
    }
    state: State = {
      textLength: 0,
      text: ''
    }
    
    timer: any;

    componentDidMount() {
      this.startTypeWriterAnimation(1);
      this.setState({text: this.props.text})
    }

    componentWillUnmount() {
      clearTimeout(this.timer)
    }

    componentWillReceiveProps(props: any) {
      if(props.text !== this.state.text){
        this.startTypeWriterAnimation(1);
        this.setState({text: props.text})
      } 
    }

    startTypeWriterAnimation = (length: number) => {
        this.timer = setTimeout(() => {
            this.setState({textLength: length});
            if(length < this.props.text.length){
              this.startTypeWriterAnimation(length + 1);
            } 
            else {
              this.props.onEndEffect()           
            }
            console.log(this.state.textLength)
        }, 35)
    }

    restartAnimation = () => {
      this.startTypeWriterAnimation(1);
      this.setState({text: this.props.text})
    }

    render() {
        return (
          <Text style={[styles.text, this.props.style]}>
            {this.props.text.substr(0, this.state.textLength)}
          </Text>
        )
    }
}
