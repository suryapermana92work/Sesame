import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Keyboard, View, SafeAreaView } from 'react-native';

import { AvoText } from '../../../components';

import constants from '../../../const';

const VChart = props => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.bar}>
          <View style={[styles.activeBar, {
            backgroundColor: props.level == 0 ? "#B6D788" : constants.colors.grey,
            height: "20%"
          }]}
          />
        </View>
        <AvoText
          text="A"
        />
      </View>
      <View style={styles.section}>
        <View style={styles.bar}>
          <View style={[styles.activeBar, {
            backgroundColor: props.level == 1 ? "#B6D788" : constants.colors.grey,
            height: "40%"
          }]}
          />
        </View>
        <AvoText
          text="B"
        />
      </View>
      <View style={styles.section}>
        <View style={styles.bar}>
          <View style={[styles.activeBar, {
            backgroundColor: props.level == 2 ? "#B6D788" : constants.colors.grey,
            height: "60%"
          }]}
          />
        </View>
        <AvoText
          text="C"
        />
      </View>
      <View style={styles.section}>
        <View style={styles.bar}>
          <View style={[styles.activeBar, {
            backgroundColor: props.level == 3 ? "#B6D788" : constants.colors.grey,
            height: "80%"
          }]}
          />
        </View>
        <AvoText
          text="D"
        />
      </View>
      <View>
        <View style={styles.bar}>
          <View style={[styles.activeBar, {
            backgroundColor: props.level == 4 ? "#B6D788" : constants.colors.grey,
            height: "100%"
          }]}
          />
        </View>
        <AvoText
          text="E"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 15
  },
  section: {
    marginRight: 20
  },
  bar: {
    width: 14,
    height: 100,
    marginBottom: 10,
    justifyContent: 'flex-end'
  },
  activeBar: {
    width: 14,
    borderRadius: 7,
  }
});

export default VChart;