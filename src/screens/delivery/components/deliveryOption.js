// Delivery Option

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import BaseComponent from '../../base';
import { AvoText } from '../../../components';
import { ImageFranprix, ImageCasino, ImageToupargel, IconRightArrow } from '../../../assets/svg';
import constants from '../../../const';

class DeliveryOption extends BaseComponent {

  renderBrand = name => {
    const imageWidth = constants.screen.width * 0.37;

    if (name == 'Franprix') {
      return <ImageFranprix width={imageWidth} height={imageWidth / 2} />;
    }
    if (name == 'Casino') {
      return <ImageCasino width={imageWidth} height={imageWidth / 2} />;
    }
    return <ImageToupargel width={imageWidth} height={imageWidth / 2} />;
  }

  renderItem = ({ item }) => {
    const { option } = this.props;
    const { id, name, chain_name, address, distance, is_pedestrian_drive, product_availability, unavailable, available } = item;

    return (
      <TouchableOpacity
        key={id}
        style={styles.deliveryItem}
        activeOpacity={0.9}
        onPress={() => this.props.onChooseDeliveryOption(item)}
      >
        {this.renderBrand(chain_name)}
        <View style={[constants.styles.wrapperHVCenter, { paddingVertical: 10 }]}>
          <AvoText
            style={[styles.deliveryDesc, { color: chain_name == 'franprix' ? constants.colors.pink : constants.colors.greenBg }]}
            fontWeight='bold'
            text={name}
          />
          <View style={constants.styles.wrapper}>
            <AvoText
              style={{ fontSize: 12 }}
              numberOfLines={2}
              text={`${product_availability}% des produits disponibles`}
            />
            {
              unavailable != 0 &&
              <AvoText
                style={{ fontSize: 12 }}
                numberOfLines={2}
                text={`${unavailable} produit non disponibles`}
              />
            }
          </View>
          {
            option == "Drive" &&
            <View style={[constants.styles.row, { height: 20 }]}>
              {
                is_pedestrian_drive &&
                <View style={[styles.tag, { backgroundColor: 'red' }]}>
                  <AvoText
                    style={styles.tagText}
                    text="Drive pieton"
                  />
                </View>
              }
              {
                this.isValueAvailable(distance) &&
                <View style={[styles.tag, { backgroundColor: 'blue' }]}>
                  <AvoText
                    style={styles.tagText}
                    text={`${parseFloat(distance).toFixed(2)} KM`}
                  />
                </View>
              }
            </View>
          }
        </View>
        <IconRightArrow width={6} height={10} />
      </TouchableOpacity>
    );
  }

  render() {
    const { stores, option } = this.props;

    return (
      <View style={styles.container}>
        <AvoText
          style={styles.title}
          fontWeight='museo'
          text={option}
        />
        <FlatList
          style={constants.styles.wrapper}
          data={stores}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1
  },
  title: {
    color: constants.colors.tint,
    fontSize: 29,
    marginBottom: 10
  },
  deliveryItem: {
    flexDirection: 'row',
    width: '100%',
    height: 93,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'transparent',
    paddingLeft: 8,
    paddingRight: 16,
    alignItems: 'center',
    marginBottom: 10
  },
  deliveryDesc: {
    fontSize: 14,
    marginBottom: 5
  },
  tag: {
    height: 20,
    paddingHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 3,
    marginRight: 10,
    marginTop: 5
  },
  tagText: {
    fontSize: 10,
    color: 'white'
  }
});

export default DeliveryOption;