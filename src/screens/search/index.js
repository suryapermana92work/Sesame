import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, TouchableOpacity, Keyboard, Modal, SafeAreaView, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';

import BaseView from '../../components/base';
import { Header } from './components';
import Filter from './filter';
import { AvoCard, AvoText } from '../../components';

import { searchRecipeRequest } from '../../actions';

import { styles } from './styles';
import constants from '../../const';
import { all } from 'redux-saga/effects';

const Search = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [originalFilters, setOriginalFilters] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [text, setText] = useState("");
  const [isLoadMore, setIsLoadMore] = useState(false);

  const searchResult = useSelector(state => state.reducer.recipe.searchResult);
  const isLoading = useSelector(state => state.reducer.recipe.isLoading);
  const userData = useSelector(state => state.reducer.auth.userData);
  const profileData = useSelector(state => state.reducer.profile.profileData);
  const myAllergies = profileData.allergies;
  const myDiet = profileData.diet;
  const myDiets = profileData.filters.diets;

  const dispatch = useDispatch();
  const search = params => dispatch(searchRecipeRequest(params));

  useEffect(() => {
    setOriginalFilters({ allergies: myAllergies, diet: myDiet });

    var keywords = [myDiets[myDiet]];
    const { allergies } = profileData.filters;
    Object.keys(allergies).map(key => {
      myAllergies.map(allergy => {
        if (allergy == key) keywords.push(allergies[key]);
      });
    });

    setKeywords(keywords);
    setTimeout(() => onChangeSearch(text), 500);
  }, []);

  useEffect(() => {
    console.log(searchResult);
    if (isLoadMore) {
      var array = data;
      setData(array.concat(searchResult));
      setIsLoadMore(false);
    } else {
      setData(searchResult);
    }
  }, [searchResult]);

  useEffect(() => {
    setIsSearching(isLoading);
  }, [isLoading]);

  onChangeSearch = name => {
    setText(name);

    const { access_token } = userData;
    if (originalFilters == null) {
      search({ access_token, name });
    } else {
      const { allergies, diet } = originalFilters;
      var params = {
        access_token,
        name,
        diet
      };
      allergies.map((allergy, i) => {
        params[`allergies[${i}]`] = allergy;
      });
      search(params);
    }
  }

  onFilterSet = filters => {
    const { prep_time, total_time, diet, allergies } = filters;
    var array = [diet, `${prep_time}mins, ${total_time}mins`];
    allergies.map(allergy => array.push(allergy));
    setKeywords(array);
    setOriginalFilters(filters);
    setOpenFilter(false)
    setTimeout(() => onChangeSearch(text), 500);
  }

  onRemoveTags = index => {
    var array = [...keywords];
    delete array[index];
    setKeywords(array);

    if (index == 0) {
      const { prep_time, total_time, allergies } = originalFilters;
      setOriginalFilters({ prep_time, total_time, allergies });
    } else if (index == 1) {
      const { diet, allergies } = originalFilters;
      setOriginalFilters({ diet, allergies });
    } else {
      const { diet, prep_time, total_time, allergies } = originalFilters;
      console.log(index);
      var array = [...allergies];
      array.splice(index - 2, 1);
      setOriginalFilters({ diet, prep_time, total_time, allergies: array });
    }

    onChangeSearch(text);
  }

  onResult = index => {
    const { uid } = data[index];
    Keyboard.dismiss();
    navigation.navigate("ItemDetails", { id: uid });
  }

  onEndReached = () => {
    const { access_token } = userData;
    var blacklist = {};

    if (data.length < 20) return;

    setIsLoadMore(true);

    data.map((item, index) => {
      blacklist[`blacklist[${index}]`] = item.uid;
    });

    if (originalFilters == null) {
      search({
        access_token,
        text,
        ...blacklist
      });
    } else {
      const { allergies, diet } = originalFilters;
      var params = {
        access_token,
        text,
        diet,
        ...blacklist
      };
      allergies.map((allergy, i) => {
        params[`allergies[${i}]`] = allergy;
      });
      search(params);
    }
  }

  renderItem = ({ item, index }) => {
    const { uid } = item;

    return (
      <AvoCard
        type={0}
        data={item}
        onCard={() => navigation.navigate("ItemDetails", { id: uid })}
      />
    )
  }

  return (
    <BaseView>
      <Header
        navigation={navigation}
        keywords={keywords}
        isWaiting={isSearching}
        onRemoveTags={onRemoveTags}
        onFilter={() => setOpenFilter(true)}
        onChangeText={text => onChangeSearch(text)}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          onScroll={() => Keyboard.dismiss()}
          renderItem={renderItem}
          onEndReached={() => onEndReached()}
          onEndReachedThreshold={1.5}
        />
      </SafeAreaView>
      {
        <Modal
          visible={openFilter}
          transparent
        >
          <Filter
            originalFilters={originalFilters}
            onFilterSet={onFilterSet}
            onDismiss={() => setOpenFilter(false)}
          />
        </Modal>
      }
    </BaseView>
  );
}

export default Search;