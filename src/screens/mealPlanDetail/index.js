import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, FlatList, TouchableOpacity, Keyboard, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { BaseView, Header, AvoText } from '../../components';
import {
  IconApple,
  IconSalt,
  IconBarley,
  IconSugar,
  IconMilk,
  IconMeat,
  IconAcorn,
  IconMelon,
  IconFish,
  IconOnion,
  IconLeafWhite,
  IconTree,
  IconEuroActive,
  IconEuroLarge,
} from '../../assets/svg';
import { HChart, VChart } from './components';

import { styles } from './styles';
import constants from '../../const';

const MealPlanDetail = ({ navigation }) => {

  const animation1 = useRef(new Animated.Value(0)).current;
  const animation2 = useRef(new Animated.Value(0)).current;

  const [data, setData] = useState({});
  const [level, setLevel] = useState("");
  const [score, setScore] = useState("");
  const [badges, setBadges] = useState({});
  const [macros, setMacros] = useState([]);
  const [micros, setMicros] = useState([]);
  const [seasonIngredients, setSeasonIngredients] = useState([]);
  const [price, setPrice] = useState(0);
  const [expand1, setExpand1] = useState(false);
  const [maxHeight1, setMaxHeight1] = useState(0);
  const [minHeight1, setMinHeight1] = useState(0);
  const [expand2, setExpand2] = useState(false);
  const [maxHeight2, setMaxHeight2] = useState(0);
  const [minHeight2, setMinHeight2] = useState(0);
  const [carbonText, setCarbonText] = useState("");

  const onLayoutNutritionMax = useCallback(event => {
    const { height } = event.nativeEvent.layout;
    setMaxHeight1(height);
  }, []);
  const onLayoutNutritionMin = useCallback(event => {
    const { height } = event.nativeEvent.layout;
    setMinHeight1(height);
    animation1.setValue(height);
  }, [])
  const onLayoutCurrencyMax = useCallback(event => {
    const { height } = event.nativeEvent.layout;
    setMaxHeight2(height);
  }, []);
  const onLayoutCurrencyMin = useCallback(event => {
    const { height } = event.nativeEvent.layout;
    setMinHeight2(height);
    animation2.setValue(height);
  }, [])

  useEffect(() => {
    const { data } = navigation.state.params;
    setData(data);
    console.log(data);
    const { badges, environment, nutrition, season_ingredients, price_per_serving } = data;
    const badgesNameArray = Object.keys(badges);
    var filteredBadges = {};
    badgesNameArray.map(badgeName => {
      const { has_badge } = badges[badgeName];
      if (has_badge) filteredBadges[badgeName] = badges[badgeName];
    });
    setBadges(filteredBadges);

    const { carbon_tier, carbon_text } = environment;
    setLevel(carbon_tier);
    setCarbonText(carbon_text);

    const { nutrients, score } = nutrition;
    var macroArray = [];
    var microArray = [];
    Object.keys(nutrients).map(key => {
      const { type } = nutrients[key];
      if (type == "macronutrient") {
        macroArray.push(nutrients[key]);
      }
      if (type == "positive_nutrient") {
        microArray.push(nutrients[key])
      }
    });
    setScore(score);
    setMacros(macroArray);
    setMicros(microArray);
    setSeasonIngredients(season_ingredients);
    setPrice(Math.round(price_per_serving * 10) / 10);
  }, []);

  onPressNutrition = () => {
    const initialValue = expand1 ? maxHeight1 + minHeight1 : minHeight1;
    const finalValue = expand1 ? minHeight1 : maxHeight1 + minHeight1;

    setExpand1(!expand1);
    animation1.setValue(initialValue);
    Animated.spring(
      animation1,
      { toValue: finalValue }
    ).start();
  }

  onPressCurrency = () => {
    const initialValue = expand2 ? maxHeight2 + minHeight2 : minHeight2;
    const finalValue = expand2 ? minHeight2 : maxHeight2 + minHeight2;

    setExpand2(!expand2);
    animation2.setValue(initialValue);
    Animated.spring(
      animation2,
      { toValue: finalValue }
    ).start();
  }

  _getLevel = () => {
    if (level == 1) return 'A';
    else if (level == 2) return 'B';
    else if (level == 3) return 'C';
    else if (level == 4) return 'D';
    else if (level == 5) return 'E';
    else return '';
  }

  renderMacro = (macro, index) => {
    const { name, percent_calories, range, message } = macro;
    const percentage = parseInt(percent_calories * 100);
    const lowRange = range[0];
    const highRange = range[1];

    return (
      <View
        key={index}
        style={styles.nutritionItem}
      >
        <HChart
          title={name}
          percentage={percentage}
          lowRange={lowRange}
          highRange={highRange}
          color="#EDBBD1"
        />
        <AvoText
          text={message}
        />
      </View>
    )
  }

  renderMicros = (micro, index) => {
    const { name, percent } = micro;

    return (
      <HChart
        key={index}
        title={name}
        percentage={percent}
        color="#B6D788"
      />
    )
  }

  renderItem = ({ item, index }) => {
    const { has_badge, message } = badges[item];
    const width = (constants.screen.width * 0.8 - 40) / 3 * 0.75;
    const height = (constants.screen.width * 0.8 - 40) / 3 * 0.75;
    var icon = null;

    if (item == "added-sugars") {
      icon = <IconSugar width={width} height={height} />
    } else if (item == "fatty-acids") {
      icon = <IconAcorn width={width} height={height} />
    } else if (item == "food-proteins") {
      icon = <IconMeat width={width} height={height} />
    } else if (item == "greens-and-beans") {
      icon = <IconOnion width={width} height={height} />;
    } else if (item == "refined-grains") {
      icon = <IconBarley  width={width} height={height} />
    } else if (item == "saturated-fats") {
      icon = <IconMilk width={width} height={height} />;
    } else if (item == "seafood-plant-proteins") {
      icon = <IconFish width={width} height={height} />;
    } else if (item == "sodium") {
      icon = <IconSalt width={width} height={height} />
    } else {
      icon = <IconMelon width={width} height={height} />
    }

    return (
      <View style={styles.recipe}>
        {icon}
        <AvoText
          style={{ textAlign: 'center', marginTop: 5 }}
          numberOfLines={3}
          text={message}
        />
      </View>
    );
  }

  return (
    <BaseView>
      <Header
        navigation={navigation}
        isBack
        title="Infos nutritionnelles"
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <AvoText
          style={styles.level}
          fontWeight="bold"
          text={`La note de votre menu : ${score}`}
        />
        <FlatList
          data={Object.keys(badges)}
          style={styles.recipes}
          numColumns={3}
          renderItem={renderItem}
        />
        <Animated.View style={[{ marginBottom: 20 }, maxHeight1 <= minHeight1 ? {} : { height: animation1 }]}>
          <TouchableOpacity
            style={styles.nutrition}
            onLayout={onLayoutNutritionMin}
            onPress={() => onPressNutrition()}
          >
            <AvoText
              style={{ fontSize: 16 }}
              fontWeight="bold"
              text="Les composants nutritionnels"
            />
            {expand1 ? <Icon name="angle-up" size={20} /> : <Icon name="angle-down" size={20} />}
          </TouchableOpacity>
          <View
            style={{ opacity: expand1 ? 1 : 0 }}
            onLayout={onLayoutNutritionMax}
          >
            <View style={styles.nutritionBox}>
              <AvoText
                style={{ marginBottom: 10 }}
                fontWeight="bold"
                text="MACRO"
              />
              <View style={constants.styles.wrapper}>
                {
                  macros.map((macro, index) => renderMacro(macro, index))
                }
              </View>
            </View>
            <View style={styles.nutritionBox}>
              <AvoText
                style={{ marginBottom: 10 }}
                fontWeight="bold"
                text="MICRO"
              />
              <View style={constants.styles.wrapper}>
                {
                  micros.map((micro, index) => renderMicros(micro, index))
                }
              </View>
            </View>
          </View>
        </Animated.View>
        <View style={styles.env}>
          <View style={[constants.styles.row, constants.styles.center]}>
            <IconLeafWhite width={25} height={25} />
            <AvoText
              style={{ fontSize: 16, marginLeft: 10 }}
              fontWeight="bold"
              text="ENVIRONNEMENT"
            />
          </View>
          <VChart level={level - 1} />
          <AvoText style={{ fontSize: 14 }}>{carbonText}</AvoText>
          {/* <AvoText style={{ fontSize: 14 }}>
            Avec un
            <AvoText fontWeight="bold" text=" impact carbone de X, " />
            votre menu respecte la planète.
          </AvoText> */}
          <View style={styles.separate} />
          <View style={[constants.styles.row, constants.styles.center, { width: '70%', alignSelf: 'center', marginBottom: 20 }]}>
            <IconTree width={60} height={60} />
            {
              seasonIngredients.length > 0 &&
              <AvoText style={{ marginLeft: 20 }}>
                Votre panier contient
                <AvoText
                  style={{ color: "#B6D788" }}
                  fontWeight="bold"
                  text={` ${seasonIngredients.length} ${seasonIngredients.length == 1 ? "fruit" : "fruits"} et légumes de saison : `}
                />
                {
                  seasonIngredients.length == 1 ?
                    `${seasonIngredients[0].name}`
                    :
                    `${seasonIngredients.map(ingredient => (` ${ingredient.name}`))}`
                }
              </AvoText>
            }
          </View>
          <AvoText
            style={{ textAlign: 'center' }}
            text="Consommer de saison aide à préserver l’environnement et réduit le coût de votre panier."
          />
        </View>
        <Animated.View style={maxHeight2 <= minHeight2 ? {} : { height: animation2 }}>
          <TouchableOpacity
            style={styles.currency}
            onLayout={onLayoutCurrencyMin}
            onPress={() => onPressCurrency()}
          >
            <IconEuroActive width={25} height={25} />
            <AvoText
              style={{ fontSize: 16, marginLeft: 10 }}
              fontWeight="bold"
              text="PRIX"
            />
            <View style={constants.styles.wrapper} />
            {expand2 ? <Icon name="angle-up" size={20} /> : <Icon name="angle-down" size={20} />}
          </TouchableOpacity>
          <View
            style={{ padding: 20, alignItems: 'center', opacity: expand2 ? 1 : 0 }}
            onLayout={onLayoutCurrencyMax}
          >
            <IconEuroLarge width={60} height={60} />
            <AvoText style={{ textAlign: 'center', margin: 20 }}>
              Votre panier revient à
            <AvoText
                style={{ color: "#B6D788" }}
                fontWeight="bold"
                text={` ${price} euros par personne `}
              />
            et par repas
          </AvoText>
          </View>
        </Animated.View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </BaseView>
  );

}

export default MealPlanDetail;