import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Keyboard, View, SafeAreaView } from 'react-native';

import { AvoText } from '../../../components';

import constants from '../../../const';

const HBar = (props) => {
  const [lowRange, setLowRange] = useState(0);
  const [highRange, setHighRange] = useState(0);

  useEffect(() => {
    const { lowRange, highRange } = props;

    setLowRange(parseInt(lowRange * 100));
    setHighRange(parseInt(highRange * 100));
  }, []);

  return (
    <View
      {...props} 
      style={{ width: "100%" }} 
    >
      <View style={styles.container}>
        <AvoText
          style={{ width: "30%" }}
          fontWeight="bold"
          text={props.title}
        />
        <View style={{ width: "70%" }}>
          <View style={styles.bar}>
            {
              props.percentage > 0 &&
              <View style={[styles.activeBar, { width: `${props.percentage > 100 ? 100 : props.percentage}%`, backgroundColor: `${props.color}` }]}>
                {
                  props.percentage >= 20 &&
                  <AvoText
                    style={{ alignSelf: 'flex-end' }}
                    text={props.percentage > 200 ? `>200%` : `${props.percentage}%`}
                  />
                }
              </View>
            }
            {
              props.percentage < 20 &&
              <AvoText
                style={{ alignSelf: 'flex-end', marginLeft: 10 }}
                text={`${props.percentage}%`}
              />
            }
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <View style={{ width: `${lowRange}%` }} />
            <View style={{ height: 1, width: `${highRange - lowRange}%`, backgroundColor: 'black' }} />
            <View style={{ width: `${100 - highRange}%` }} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 5
  },
  bar: {
    height: 20,
    borderRadius: 10,
    backgroundColor: constants.colors.grey,
    flexDirection: 'row'
  },
  activeBar: {
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    paddingRight: 10,
  }
});

export default HBar;