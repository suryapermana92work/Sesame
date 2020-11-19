import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';

import { AvoButton, AvoText } from '../../components';
import { IconMinusGreen, IconPlusGreen, IconSqureUnchecked, IconSqureChecked } from '../../assets/svg';

import { styles } from './styles';
import constants from '../../const';

var timer = null;

const Filter = (props) => {
  const [diet, setDiet] = useState(-1);
  const [prepTime, setPrepTime] = useState(25);
  const [totalTime, setTotalTime] = useState(25);
  const [checkAllergies, setCheckAllergies] = useState([]);
  const [filters, setFilters] = useState({
    prep_time: 0,
    total_time: 0,
    allergies: [],
    diet: ""
  });

  const profileData = useSelector(state => state.reducer.profile.profileData);
  const { allergies, diets } = profileData.filters;
  

  useEffect(() => setup(), []);

  setup = () => {
    var array = [];
    Object.keys(allergies).map(key => {
      array.push({ isChecked: false, name: allergies[key], key });
    });

    setCheckAllergies(array);

    const { originalFilters } = props;
    if (originalFilters == null) return;

    const { prep_time, total_time, diet } = originalFilters;
    if (prep_time) setPrepTime(prep_time);
    if (total_time) setTotalTime(total_time);

    setFilters(originalFilters); 

    Object.keys(diets).map((key, i) => {
      if (key == diet) setDiet(i);
    });
    Object.keys(allergies).map((key, i) => {
      originalFilters.allergies.map(k => {
        if (key == k) array[i].isChecked = true;
      });
    });
    setCheckAllergies(array);
  }

  onFilter = () => {
    var object = {
      prep_time: prepTime,
      total_time: totalTime,
      diet: Object.keys(diets)[diet],
      allergies: []
    };
    var array = [];
    checkAllergies.map((allergy) => {
      if (allergy.isChecked) array.push(allergy.key);
    });

    if (array.length != 0) {
      object.allergies = array;
    }
    
    setFilters(object);
    props.onFilterSet(object);
  }

  onPressPlus = isTotalTime => {
    if (isTotalTime) {
      if (totalTime == 120) return;
      setTotalTime(totalTime + 5);
      return;
    }

    if (prepTime == 120) return;
    if (prepTime >= totalTime) {
      setTotalTime(prepTime + 5);
    }
    setPrepTime(prepTime + 5);
  }

  onPressMinus = isTotalTime => {
    if (isTotalTime) {
      if (totalTime == 0) return;
      if (totalTime <= prepTime) {
        setPrepTime(totalTime - 5);
      }
      setTotalTime(totalTime - 5);
      return;
    }

    if (prepTime == 0) return;
    setPrepTime(prepTime - 5);
  }

  onLongPressPlus = isTotalTime => {
    if (isTotalTime) {
      onPressPlus(true);
      timer = setInterval(() => {
        onPressPlus(true);
      }, 100);
      return;
    }

    onPressPlus(false);
    timer = setInterval(() => {
      onPressPlus(false);
    }, 100);
  }

  onLongPressMinus = isTotalTime => {
    if (isTotalTime) {
      onPressMinus(true);
      timer = setInterval(() => {
        onPressMinus(true);
      }, 100);
      return;
    }

    onPressMinus(false);
    timer = setInterval(() => {
      onPressMinus(false);
    }, 100);
  }

  onCheckAllergy = (index) => {
    var array = [];
    checkAllergies.map((allergy, i) => {
      if (index == i) {
        array.push({ isChecked: !allergy.isChecked, name: allergy.name, key: allergy.key });
      } else {
        array.push(allergy);
      }
    });
    setCheckAllergies(array);
  }

  renderTimeEditor = isTotalTime => {
    return (
      <View style={[
        styles.timeEditor,
        constants.styles.wrapper,
        constants.styles.wrapperRowCenter
      ]}>
        <TouchableOpacity
          style={styles.plus}
          onPress={() => onPressMinus(isTotalTime)}
          onLongPress={() => onLongPressMinus(isTotalTime)}
          onPressOut={() => clearInterval(timer)}
        >
          <IconMinusGreen />
        </TouchableOpacity>
        <View style={constants.styles.wrapperHVCenter}>
          <AvoText
            text={`${isTotalTime ? totalTime : prepTime} min`}
          />
        </View>
        <TouchableOpacity
          style={styles.plus}
          onPress={() => onPressPlus(isTotalTime)}
          onLongPress={() => onLongPressPlus(isTotalTime)}
          onPressOut={() => clearInterval(timer)}
        >
          <IconPlusGreen />
        </TouchableOpacity>
      </View>
    );
  }

  renderTime = () => {
    return (
      <View style={[constants.styles.row, { marginVertical: 20 }]}>
        <View style={constants.styles.wrapper}>
          <AvoText
            fontWeight="bold"
            text="Préparation temps"
          />
          {renderTimeEditor(false)}
        </View>
        <View style={{ width: 10 }} />
        <View style={constants.styles.wrapper}>
          <AvoText
            fontWeight="bold"
            text="Total temps"
          />
          {renderTimeEditor(true)}
        </View>
      </View>
    );
  }

  renderDietItem = index => {
    const { tint, grey } = constants.colors;
    const imageSources = [
      require('../../assets/png/omni.png'),
      require('../../assets/png/pesc.png'),
      require('../../assets/png/veg.png'),
      require('../../assets/png/vegan.png'),
    ];

    return (
      <TouchableOpacity
        style={constants.styles.wrapperRow}
        activeOpacity={0.9}
        onPress={() => setDiet(index)}
      >
        <Image
          style={[styles.dietIcon, { backgroundColor: index == diet ? tint : grey }]}
          source={imageSources[index]}
          resizeMode='contain'
        />
        <AvoText
          style={{ color: index == diet ? tint : 'black' }}
          text={diets[Object.keys(diets)[index]]}
        />
      </TouchableOpacity>
    );
  }

  renderDiet = () => {
    return (
      <View style={styles.reglime}>
        <AvoText
          fontWeight="bold"
          text="Régime alimentaire"
        />
        <View style={[constants.styles.row, { marginTop: 10 }]}>
          {renderDietItem(0)}
          {renderDietItem(1)}
        </View>
        <View style={[constants.styles.row, { marginTop: 10 }]}>
          {renderDietItem(2)}
          {renderDietItem(3)}
        </View>
      </View>
    )
  }

  renderAllergies = () => {
    return (
      <View style={{ marginVertical: 20 }}>
        <AvoText
          fontWeight="bold"
          text="Allerties"
        />
        {
          checkAllergies.map((allergy, index) =>
            <TouchableOpacity
              key={index}
              style={[constants.styles.wrapperRowCenter, { marginTop: 10 }]}
              activeOpacity={0.9}
              onPress={() => onCheckAllergy(index)}
            >
              {allergy.isChecked ? <IconSqureChecked /> : <IconSqureUnchecked />}
              <AvoText
                style={{ marginLeft: 10 }}
                text={allergy.name}
              />
            </TouchableOpacity>
          )
        }
      </View>
    );
  }

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterContent}>
        <ScrollView style={{ marginVertical: 20 }}>
          {renderTime()}
          {renderDiet()}
          {renderAllergies()}
        </ScrollView>
        <AvoButton
          style={styles.filterButton}
          title="C'est parti !"
          onPress={onFilter}
        />
        <TouchableOpacity
          style={styles.filterCancel}
          activeOpacity={0.8}
          onPress={props.onDismiss}
        >
          <AvoText
            style={styles.cancel}
            fontWeight="bold"
            text={`Retour`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Filter;