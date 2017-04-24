import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableHighlight, Text, Button } from 'react-native';
import Model from './Model';
import Utils from './Utils';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
  }

  componentWillMount() {
    this.setState({
      todo: ''
    });    
  }

  //Listen whenever value is changing in input field
  onChange(event){
    var title = event.nativeEvent.text;
    var dataList = this.props.data.filter((item) => item.title.match(new RegExp('.*' + title +'.*', 'gi')));

    this.setState({
      todo: title  
    });
    //To update the list array
    this.props.updateDataList(dataList);
  }

  //On clicking Add button
  buttonPressed(event){
    if(this.state.todo == ""){
      //Show toast if new todo is empty
      alert("Kindly enter text...!");
    }else {
      var newDataItem = new Model(this.state.todo);
      var dataList = this.props.data;

      //To check whether the todo is already added or not
      var dataItem = Utils.findTodo(newDataItem, dataList);
      if(dataItem) {
        //If added already it will go to the top
        Utils.move(dataList, (dataList.indexOf(dataItem)), 0);

        this.setState({
          todo: ''
        });

        //To update the list array
        this.props.updateDataList(dataList);
        return;
      }

      //Add the new todo to the top of the array list
      dataList.unshift(newDataItem);

      this.setState({
        todo: ''    
      });

      //To update the list array
      this.props.updateDataList(dataList);
    }      
  }

  render() {
    return (
      <View>
        <TextInput style={styles.input}
            placeholder='Add a todo or Search'
            blurOnSubmit={false}
            value={this.state.todo}
            onChange={this.onChange}
            onChangeText={(text) => this.setState({todo:text})}>
        </TextInput>
        <TouchableHighlight style={ styles.add } underlayColor = {'red'} onPress = {this.buttonPressed}>
            <Text>
               Add
            </Text>
         </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  add: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'silver',
    height: 40,
    marginLeft: 15,
    marginRight: 15
  },
  input: {
    height: 50, 
    padding: 5, 
    margin: 10,
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#eee', 
    borderRadius: 8, 
    backgroundColor: '#fff'
  }
});


module.exports = TextField;