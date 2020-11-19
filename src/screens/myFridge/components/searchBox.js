import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { IconSearchWhite } from '../../../assets/svg';

import { searchInspirationRequest } from '../../../actions';

import constants from '../../../const';
import { AvoText } from '../../../components';

const SearchBox = props => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [isSearchMode, setMode] = useState(false);
  const [listHeight, setListHeight] = useState(0);

  const userData = useSelector(state => state.reducer.auth.userData);
  const searchResult = useSelector(state => state.reducer.inspiration.searchResult);

  const dispatch = useDispatch();
  const search = params => dispatch(searchInspirationRequest(params));

  useEffect(() => {
    setResult(searchResult);

    if (searchResult.length <= 5) {
      setListHeight(40 * searchResult.length);
    } else {
      setListHeight(200);
    }
  }, [searchResult]);

  onChangeText = text => {
    setValue(text);
    setMode(true);
    if (text.length < 2) return;

    const { access_token } = userData;
    const params = {
      access_token,
      name: text
    };
    search(params);
  }

  onSearch = () => {
    Keyboard.dismiss();
    if (value.length < 2) return;

    const { access_token } = userData;
    const params = { access_token, name: value };
    search(params);
  }

  onResult = item => {
    Keyboard.dismiss();
    setMode(false);
    props.onResult(item);
    setResult([]);
    setValue("");
    this.textInput.clear();
  }

  renderResult = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={styles.item}
      onPress={() => onResult(item)}
    >
      <AvoText text={item.name} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={constants.styles.wrapperRow}>
        <View style={styles.search}>
          <TextInput
            ref={input => { this.textInput = input }}
            style={styles.searchText}
            autoCorrect={false}
            placeholder=""
            placeholderTextColor={constants.colors.placeholder}
            onChangeText={text => onChangeText(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => this.textInput.clear()}
        >
          <Icon name="eraser" size={15} color="white" />
        </TouchableOpacity>
      </View>
      {
        isSearchMode && result.length > 0 &&
        <FlatList
          style={[styles.result, { height: listHeight }]}
          data={result}
          renderItem={object => renderResult(object)}
          keyboardShouldPersistTaps='handled'
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 20,
    width: constants.screen.width - 40,
    alignSelf: 'center'
  },
  search: {
    flex: 1,
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderColor: constants.colors.border,
    backgroundColor: 'white'
  },
  searchText: {
    flex: 1,
    fontFamily: 'Gotham-Book',
    fontSize: 15,
    color: "black"
  },
  button: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constants.colors.tint,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'transparent',
    shadowColor: constants.colors.tint,
    shadowOpacity: 0.5,
    shadowOffset: {
      x: 0,
      y: 5
    },
    shadowRadius: 5
  },
  result: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginTop: 5
  },
  item: {
    width: '100%',
    height: 40,
    justifyContent: 'center'
  }
});

export default SearchBox;