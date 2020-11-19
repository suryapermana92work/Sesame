import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { AvoText } from '../../../components';
import constants from '../../../const';

export const Tags = (props) => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    setKeywords(props.keywords);
  });

  onClose = index => {
    var array = [...keywords];
    array.splice(index, 1);
    setKeywords(array);
    props.onRemoveTags(index);
  }

  return (
    <View style={styles.container}>
      {
        keywords.map((key, index) => {
          if (key !== undefined) {
            return (
              <Tag
                index={index}
                title={key}
                onClose={() => onClose(index)}
              />
            )
          }
        })
      }
    </View >
  );
}

const Tag = ({ title, onClose }) => {
  return (
    <View style={styles.tag}>
      <TouchableOpacity
        style={styles.tagClose}
        onPress={onClose}
      >
        <Icon name="x" size={15} color='white' />
      </TouchableOpacity>
      <AvoText style={styles.tagTitle} text={title} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: constants.screen.width,
    paddingHorizontal: 10,
    flexWrap: 'wrap'
  },
  tag: {
    flexDirection: 'row',
    height: 24,
    borderRadius: 12,
    backgroundColor: constants.colors.tint,
    alignItems: 'center',
    paddingHorizontal: 7,
    marginRight: 5,
    marginBottom: 5
  },
  tagTitle: {
    color: 'white',
    fontSize: 12,
    marginTop: 2
  },
  tagClose: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});