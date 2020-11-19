import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, TouchableOpacity, SafeAreaView, View } from 'react-native';
import VersionNumber from 'react-native-version-number';

import { AvoText, AvoButton } from "../../components";
import {
  IconBlender,
	IconBlenderGrey,
	IconCocotte,
	IconCocotteGrey,
	IconFour,
	IconFourGrey,
	IconFriteuse,
	IconFriteuseGrey,
	IconMicroOnde,
	IconMicroOndeGrey,
	IconPlaque,
	IconPlaqueGrey,
	IconRobotCuiseur,
	IconRobotCuiseurGrey,
	IconWok,
	IconWokGrey
} from '../../assets/svg';

import { updateProfileRequest, userStatusRequest } from '../../actions';

import { styles } from './styles';
import constants from '../../const';

const Kitchen = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const profileData = props.isRegistration ? useSelector(state => state.reducer.auth.userData) : useSelector(state => state.reducer.profile.profileData);
  const isUpdatingProfile = useSelector(state => state.reducer.profile.isLoading);
  const userData = useSelector(state => state.reducer.auth.userData);
  const { kitchen_gear } = profileData.filters;

  const dispatch = useDispatch();
  const updateProfile = params => dispatch(updateProfileRequest(params));
  const updateStatus = params => dispatch(userStatusRequest(params));

  const prevIsUpdatingProfile = usePrevious(isUpdatingProfile);

  useEffect(() => {
    var array = [];
    kitchen_gear.map(item => {
      const id = Object.keys(item)[0];
      const name_fr = item[id];

      array.push({
        id,
        name_fr,
        isChecked: false
      });
    });
    profileData.kitchen_gear.map(id => {
      array.map((value, index) => {
        if (id == value.id) {
          array[index].isChecked = true;
        }
      });
    });
    setData(array);
  }, []);

  useEffect(() => {
    const { isRegistration } = props;

    setIsLoading(isUpdatingProfile);

    if (isRegistration) return;
    if (prevIsUpdatingProfile != isUpdatingProfile && prevIsUpdatingProfile) {
      props.onConfirm();

      const { access_token } = userData;
      updateStatus({ 
				access_token, 
				version: VersionNumber.appVersion 
			});
    }
  }, [isUpdatingProfile]);

  onPressItem = item => {
    var array = [...data];
    data.map((value, index) => {
      if (value.id == item.id) {
        array[index].isChecked = !array[index].isChecked
      }
    });
    setData(array);
  }

  onPressConfirm = () => {
    const { access_token } = userData;
    var array = [];
    var params = {};
    data.map(item => {
      const { id, isChecked } = item;
      if (isChecked) array.push(id);
    });
    array.map((id, index) => {
      params[`kitchen_gear[${index}]`] = id;
    });
    if (props.isRegistration) {
      props.onConfirm(params);
    } else {
      updateProfile({ access_token, ...params });
    }    
  }

  renderIcon = (name, size) => {
    if (name == "Cocotte-minute") {
      return <IconCocotte width={size} height={size} />
    } else if (name == "Mixer") {
      return <IconBlender width={size} height={size} />
    } else if (name == "Plaque de cuisson") {
      return <IconPlaque width={size} height={size} />
    } else if (name == "Micro-onde") {
      return <IconMicroOnde width={size} height={size} />
    } else if (name == "Friteuse") {
      return <IconFriteuse width={size} height={size} />
    } else if (name == "Wok") {
      return <IconWok width={size} height={size} />
    } else if (name == "Four") {
      return <IconFour width={size} height={size} />
    }
    return <IconRobotCuiseur width={size} height={size} />
  }

  renderGreyIcon = (name, size) => {
    if (name == "Cocotte-minute") {
      return <IconCocotteGrey width={size} height={size} />
    } else if (name == "Mixer") {
      return <IconBlenderGrey width={size} height={size} />
    } else if (name == "Plaque de cuisson") {
      return <IconPlaqueGrey width={size} height={size} />
    } else if (name == "Micro-onde") {
      return <IconMicroOndeGrey width={size} height={size} />
    } else if (name == "Friteuse") {
      return <IconFriteuseGrey width={size} height={size} />
    } else if (name == "Wok") {
      return <IconWokGrey width={size} height={size} />
    } else if (name == "Four") {
      return <IconFourGrey width={size} height={size} />
    }
    return <IconRobotCuiseurGrey width={size} height={size} />
  }

  renderItem = ({ item, index }) => {
    const { name_fr } = item;

    return (
      <TouchableOpacity
        key={index}
        style={styles.item}
        activeOpacity={0.9}
        onPress={() => onPressItem(item)}
      >
        { item.isChecked ? renderIcon(name_fr, 50) : renderGreyIcon(name_fr, 50) }
        <AvoText
          style={styles.itemTitle}
          numberOfLines={2}
          text={name_fr}
        />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AvoText
          style={styles.title}
          fontWeight='bold'
          text="Je trouve ..."
        />
        <View style={styles.list}>
          <FlatList
            style={{ flex: 1 }}
            data={data}
            numColumns={2}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => renderItem({ item, index })}
          />
        </View>
      </View>
      <AvoButton
        style={styles.button}
        isLoading={isLoading}
        title="C'est parti !"
        onPress={() => onPressConfirm()}
      />
    </SafeAreaView>
  )
}

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default Kitchen;