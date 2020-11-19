import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import FastImage from 'react-native-fast-image';
import StarRating from 'react-native-star-rating';

import AvoText from './avoText';
import {
  IconClock,
  ImageCancelTxt,
  IconHeartSwipe,
  IconUtensil,
  IconEditGrey,
  IconDelete,
  IconPlusWBG
} from '../assets/svg';

import constants from '../const';

const AvoCard = props => {

  const [uid, setID] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState(null);
  const [isSeason, setIsSeason] = useState(0);
  const [diet, setDiet] = useState("");
  const [time, setTime] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState("");
  const [servings, setServings] = useState(0);

  const {
    data,
    type,
    onCard,
    onDislike,
    onLike,
    onPerson,
    onReplace,
    onRemove,
    onPlus
  } = props;

  useEffect(() => {
    const {
      uid,
      picture,
      name,
      author,
      in_season,
      total_time,
      rating,
      reviews,
      diet,
      servings
    } = data;

    var pictureUri = "";
    if (picture) {
      if (picture[constants.FIX_CONST.RECIPE_THUMB_SIZE]) {
        pictureUri = picture[constants.FIX_CONST.RECIPE_THUMB_SIZE].replace('very_large', 'large');
      } else {
        pictureUri = picture["original"];
      }
    }

    var avis = "";
    if (reviews) {
      avis = reviews.length + "avis";
    } else {
      avis = "0 avis";
    }

    setID(uid);
    setImage(pictureUri);
    // setName(name);
    setAuthor(author);
    setIsSeason(in_season);
    setDiet(diet);
    setTime(total_time + " minutes");
    setRating(rating);
    setReviews(avis);
    setServings(servings);

  }, []);

  onPressCard = () => {
    onCard(data);
  }

  onPressDislike = () => {
    onDislike();
  }

  onPressLike = () => {
    onLike();
  }

  onPressPerson = () => {
    onPerson();
  }

  onPressReplace = () => {
    onReplace();
  }

  onPressRemove = () => {
    onRemove();
  }

  onPressPlus = () => {
    onPlus();
  }

  return (
    <View
      style={styles.container}
     >
      <FastImage
        style={styles.image}
        source={{ uri: image }}
      />
      <AvoText
        style={styles.title}
        fontWeight="bold"
        numberOfLines={1}
        text={"name"+data.name}
      />
      <View style={[constants.styles.row, constants.styles.center]}>
        {
          !!author &&
          <AvoText
            style={styles.author}
            text={`par ${author.name}`}
          />
        }
        {
          !!isSeason &&
          <AvoText
            style={styles.season}
            text="De saison"
          />
        }
        {
          !!diet &&
          <AvoText
            style={styles.season}
            text={diet}
          />
        }
      </View>
      <View style={styles.rowContainerTime}>
        <View style={styles.rowView}>
          <IconClock
            width={constants.screen.width * 0.05}
            height={constants.screen.width * 0.05}
          />
          <AvoText
            style={styles.time}
            fontWeight="normal"
            text={time}
          />
        </View>
        <View style={styles.rowView}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={rating}
            starSize={12}
            fullStarColor={"yellow"}
            emptyStarColor={"grey"}
            starStyle={{ marginHorizontal: 1 }}
          />
          <AvoText
            style={styles.star}
            fontWeight="normal"
            text={reviews}
          />
        </View>
      </View>
      {
        type == 1 &&
        <View>
          <View style={[styles.borderStyle, { marginVertical: 0 }]} />
          <View style={[constants.styles.row, { justifyContent: "space-evenly", marginVertical: 10 }]}>
            <TouchableOpacity
              onPress={() => onPressDislike()}
              style={[constants.styles.row, { alignItems: "center" }]}
            >
              <ImageCancelTxt height={25} />
              <AvoText
                style={styles.unlike}
                fontWeight="light"
                text={`Je n'aime pas`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressLike()}
              style={[constants.styles.row, { alignItems: "center" }]}
            >
              <IconHeartSwipe height={20} />
              <AvoText
                style={styles.like}
                fontWeight="light"
                text={`J'aime`}
              />
            </TouchableOpacity>
          </View>
        </View>
      }
      {
        type == 2 &&
        <View>
          <View style={[styles.borderStyle, { marginVertical: 0 }]} />
          <View style={[constants.styles.row, { justifyContent: "space-evenly", marginVertical: 15 }]}>
            <TouchableOpacity
              style={[constants.styles.row, { justifyContent: "center" }]}
              activeOpacity={0.8}
              onPress={() => onPressPerson()}
            >
              <IconUtensil width={17} height={17} />
              <AvoText
                style={styles.iconTitle}
                fontWeight="light"
                text={servings}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[constants.styles.row, { justifyContent: "center" }]}
              activeOpacity={0.8}
              onPress={() => onPressReplace()}
            >
              <IconEditGrey width={16} height={16} />
              <AvoText
                style={styles.iconTitle}
                fontWeight="light"
                text={`Remplacer`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[constants.styles.row, { justifyContent: "center" }]}
              activeOpacity={0.8}
              onPress={() => onPressRemove()}
            >
              <IconDelete width={16} height={16} />
              <AvoText
                style={styles.iconTitle}
                fontWeight="light"
                text={`Supprimer`}
              />
            </TouchableOpacity>
          </View>
        </View>
      }
      {
        type == 3 &&
        <View>
          <View style={[styles.borderStyle, { marginVertical: 0 }]} />
          <TouchableOpacity
            style={[constants.styles.row, constants.styles.centerHV, { paddingVertical: 10 }]}
            onPress={() => onPressPlus()}
          >
            <IconPlusWBG height={20} />
            <AvoText
              style={{ marginHorizontal: 10, fontSize: constants.sizes.INPUT_TXT_SIZE, color: '#7283A7' }}
              fontWeight="light"
              text={`Ajouter aux menus`}
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: constants.screen.width * 0.9,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: constants.colors.borderColor,
    backgroundColor: "white",
    overflow: "hidden",
    marginVertical: 10
  },
  image: {
    width: constants.screen.width * 0.9,
    height: constants.screen.width * 0.3
  },
  title: {
    fontSize: constants.sizes.TXT_SIZE + 2,
    marginHorizontal: 10,
    marginTop: 15,
    color: 'black'
  },
  author: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 10,
  },
  season: {
    backgroundColor: constants.colors.greenBg,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 12,
    color: 'white',
    marginRight: 10,
    overflow: 'hidden',
    borderRadius: 4,
  },
  rowContainerTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
    marginTop: 10
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  time: {
    marginHorizontal: 5,
    marginTop: Platform.OS == "android" ? 0 : 3,
    fontSize: constants.sizes.TXT_SIZE - 2,
    color: "black"
  },
  star: {
    marginHorizontal: 5,
    marginTop: Platform.OS == "android" ? 0 : 3,
    fontSize: constants.sizes.TXT_SIZE - 2,
    color: "black"
  },
  borderStyle: {
    width: '100%',
    borderColor: constants.colors.borderColor,
    borderTopWidth: 0.5,
    marginVertical: 10
  },
  iconTitle: {
    marginHorizontal: 10,
    fontSize: 15,
    color: constants.colors.placeholder
  },
  unlike: {
    marginHorizontal: 10,
    fontSize: constants.sizes.TXT_SIZE,
    color: "#7283A7"
  },
  like: {
    marginHorizontal: 10,
    fontSize: constants.sizes.TXT_SIZE,
    color: "#FF784C"
  }
});

export default AvoCard;