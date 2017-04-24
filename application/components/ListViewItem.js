import React, {Component} from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import CheckBox from './CheckBox';

class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
    this._onItemPressed = this._onItemPressed.bind(this);
    this.state = {
      data: this.props.data
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    })
  }

  //If checkBox is pressed, it will removed from the list (Invisible)
  _onCheckBoxPressed() {
    var data = this.state.data;
    data.completed = !data.completed;
    this.setState({
      data: data
    });
    this.props.onCompletedChange(data, this.props.dataIndex);
  }

  //On clicking the list item, pass the index to the parent component
  _onItemPressed(){
    this.props.onItemPressed(this.props.dataIndex);
  }

  render() {
    let data = this.state.data;
    let color = data.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = data.completed ? 'line-through' : 'none';
    return (
      <TouchableHighlight underlayColor={'#eee'} style={ styles.itemList } {...this.props.sortHandlers} onPress={this._onItemPressed}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed}></CheckBox>
          <Text style={{fontSize:18, color: color, textDecorationLine: textDecorationLine}}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
 itemList: {
    paddingTop: 6, 
    paddingBottom: 6, 
    backgroundColor: "#F8F8F8", 
    borderBottomWidth:1, 
    borderColor: '#eee'
  }
});

module.exports = ListViewItem;