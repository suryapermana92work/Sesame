import React from 'react';
import { View, StyleSheet } from 'react-native';

import { AvoText } from '../../../components';

import constants from '../../../const';

const colors = [
  constants.colors.tint,
  '#189f4e',
  '#96c249',
  '#f2e44c',
  '#fea941'
];

const Score = (props) => {

  const { tier, serving, nutrition } = props;

  getColor = level => {
    if (level == 1) return colors[0];
    else if (level == 2) return colors[1];
    else if (level == 3) return colors[2];
    else if (level == 4) return colors[3];
    else if (level == 5) return colors[4];
    else return colors[0];
  }

  getWidth = level => {
    if (level == 1) return '30%';
    else if (level == 2) return '40%';
    else if (level == 3) return '50%';
    else if (level == 4) return '60%';
    else if (level == 5) return '70%';
    else return '0%';
  }

  getMark = level => {
    if (level == 1) return 'A';
    else if (level == 2) return 'B';
    else if (level == 3) return 'C';
    else if (level == 4) return 'D';
    else if (level == 5) return 'E';
    else return '';
  }

  getLevel = score => {
    if (score >= 1115) {
      return 5;
    } else if (score >= 665 && score < 1115) {
      return 4;
    } else if (score >= 420 && score < 665) {
      return 3;
    } else if (score >= 250 && score < 420) {
      return 2;
    }
    return 1;
  }

  if (nutrition) {
    const { score } = nutrition;
    const level = getLevel(score);

    return (
      <View style={[styles.container, constants.styles.row, { alignItems: 'center', marginLeft: 20 }]}>
        <View style={[styles.container, { width: getWidth(level), backgroundColor: getColor(level) }]} />
        <AvoText style={{ color: getColor(level), fontSize: 18, marginLeft: 10 }} fontWeight='bold' text={getMark(level)} />
      </View>
    )
  }

  return (
    <View style={[styles.container, constants.styles.row, { alignItems: 'center', marginLeft: 20 }]}>
      <View style={[styles.container, { width: getWidth(tier), backgroundColor: getColor(tier), paddingHorizontal: 10, justifyContent: 'center' }]}>
        <AvoText style={styles.value} text={serving.toString()} />
      </View>
      <AvoText style={{ color: getColor(tier), fontSize: 18, marginLeft: 10 }} fontWeight='bold' text={getMark(tier)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 25
  },
  value: {
    color: 'white',
  }
});

export default Score;