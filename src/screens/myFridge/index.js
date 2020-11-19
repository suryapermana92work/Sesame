import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BackHandler, TouchableOpacity, SafeAreaView, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { BaseView, Header, AvoText, AvoButton } from "../../components";
import SearchBox from './components/searchBox';
import { IconSqureUnchecked, IconSqureChecked } from '../../assets/svg';

import { generateMenuRequest } from '../../actions/menu';

import { styles } from './styles';
import constants from "../../const";

const MyFridge = ({ navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [checkArray, setCheckArray] = useState([]);

  const userData = useSelector(state => state.reducer.auth.userData);

  const dispatch = useDispatch();
  const generateMealPlan = params => dispatch(generateMenuRequest(params));

  useEffect(() => {
    const backAction = () => {
      navigation.pop();
      return true;
    }
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);
 
  onItem = item => {
    var array = [...ingredients];
    var check_array = [...checkArray, true];
    array.push(item);
    setIngredients(array);
    setCheckArray(check_array);
  }

  onDelete = index => {
    var array = [...ingredients];
    var check_array = [...checkArray];
    array.splice(index, 1);
    check_array.splice(index, 1);
    setIngredients(array);
    setCheckArray(check_array);
  }

  onBtnGo = () => {
    var IDs = [];
    ingredients.map((ingredient, index) => {
      if (checkArray[index] == true) IDs.push(ingredient.id);
    });

    const { access_token } = userData;
    const { popupCount } = navigation.state.params;
    const params = {
      access_token,
      nb_meal: popupCount,
      leftover_ingredient_ids: IDs
    };
    generateMealPlan(params);
    navigation.navigate('MenuHome', { id: 0 });
  }

  onPressCheck = index => {
    var check_array = [...checkArray];
    check_array[index] = !check_array[index];
    setCheckArray(check_array);
  }

  renderItem = ({ item, index }) => {
    const { name } = item;

    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.check}
          onPress={() => onPressCheck(index)}
        >
          {
            checkArray[index] ? <IconSqureChecked /> : <IconSqureUnchecked />
          }
        </TouchableOpacity>
        <AvoText style={constants.styles.wrapper} text={name} />
        <TouchableOpacity
          style={constants.styles.centerHV}
          onPress={() => onDelete(index)}
        >
          <Icon name="trash" size={16} color={constants.colors.grey} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <BaseView>
      <Header
        isBack
        navigation={navigation}
      />
      <View style={styles.container}>
        <AvoText
          style={styles.title}
          fontWeight="museo"
          text="ANTI-GASPI: Je veux utiliser des ingrédients de mon frigo"
        />
        <View style={constants.styles.wrapper}>
          {
            ingredients.length > 0 &&
            <FlatList
              style={styles.list}
              data={ingredients}
              renderItem={({ item, index }) => renderItem({ item, index })}
              keyboardShouldPersistTaps='handled'
            />
          }
          <SearchBox onResult={item => onItem(item)} />
        </View>
        <SafeAreaView>
          <AvoButton
            style={{ marginBottom: 20 }}
            title="On y va!"
            onPress={() => onBtnGo()}
          />
        </SafeAreaView>
      </View>
    </BaseView>
  )
}

const backPressHandler = navigation => {
  navigation.pop();
  return true;
}

export default MyFridge;