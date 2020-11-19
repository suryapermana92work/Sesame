// Second Screen

import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, Image, Animated, TextInput, Keyboard, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import Timeline from 'react-native-timeline-flatlist';
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';

import BaseComponent from '../base';
import { AvoButton, AvoText, AvoTextInput } from '../../components';
import { Header } from './components';
import {
  updateFavoriteRequest,
  getRecipeByIdRequest,
  addToMenuRequest,
  deleteFavoriteRequest,
  getFavoritesRequest,
  reportIssueRequest,
  reviewSetRequest,
  updateRecipeIngredientRequest,
  delMenuRequest
} from '../../actions';
import {
  IconBack,
  IconHeartPopIcon,
  IconHeart,
  IconFoodBG,
  IconClock,
  IconCooker,
  IconForkKnife,
  IconWorld,
  IconMinus,
  IconPlus,
  PlaceholderImg,
  IconBellPopup,
  ImageHeader,
  ImageHeaderX
} from '../../assets/svg';
import constants from '../../const';
import styles from './styles';

class ItemDetails extends BaseComponent {

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      opacity: 0,
      showHeader: false,
      name: '',
      author: null,
      currentStap: 1,
      servingsCount: 0,
      uid: '',
      preparationTime: 0,
      cookingTime: 0,
      dialogShow: false,
      imgUrl: '',
      recipeStatus: [],
      ingredientList: [],
      carbonFoot: 0,
      season: false,
      inSeason: null,
      isDraftPlan: false,
      price: 0,
      rating: 0,
      tier: "",
      reviews: [],
      userReview: null,
      ingredients: [{ id: 1, name: 'De saison' }],
      imageHeight: constants.screen.width / 1.4,
      isBooked: false,
      userRating: 0,
      showReportDialog: false,
      reportedIndex: -1,
      comment: "",
      message: "",
      isConfirmReport: false,
      isCommentMode: true,
      draft_meal_id: null
    };

    this.animation = new Animated.Value(0);
    this.modalAnimation = new Animated.Value(0);
  }

  componentDidMount() {
    const { navigation, userData, getRecipeByIdRequest } = this.props;
    const uid = navigation.state.params.id;
    const { access_token } = userData;

    if (uid != undefined) {
      const params = { access_token, uid };
      getRecipeByIdRequest(params);
    }

    if (Platform.OS == 'ios') {
      Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
    }
  }

  componentDidUpdate = prevProps => {
    const {
      isAdded,
      isLoadingFavorite,
      isLoadingRecipe,
      recipeObject,
      updatedIngredients,
      isAddedMenu,
      isLoadingMenu,
      isDeleted,
      userData,
      getFavoritesRequest
    } = this.props;

    if (isLoadingRecipe) {
      constants.showLoader.showLoader();
    } else {
      if (isLoadingMenu) {
        constants.showLoader.showLoader();
      } else {
        constants.showLoader.hideLoader();
      }
    }

    if (prevProps.isAddedMenu != isAddedMenu && isAddedMenu) {
      constants.DropDownAlert.showDropdownAlert('success', 'Success', `Recette ajoutée :)`);
    }

    if (isAdded && prevProps.isAdded != isAdded) {
      const { access_token } = userData;
      getFavoritesRequest({ access_token });
    }

    if (isDeleted && prevProps.isDeleted != isDeleted) {
      const { access_token } = userData;
      getFavoritesRequest({ access_token });
    }

    var ingredientsArray = [];
    if (updatedIngredients.length > 0 && updatedIngredients != prevProps.updatedIngredients) {
      ingredientsArray = updatedIngredients;
      this.setState({ ingredientList: ingredientsArray });
    }

    if (!this.isObjectAvailable(recipeObject) || recipeObject == prevProps.recipeObject) return;

    const { recipe } = recipeObject;
    if (!this.isObjectAvailable(recipe)) return;

    const { ingredients, description } = recipe;
    if (!this.isArrayAvailable(description)) return;

    ingredientsArray = ingredients;

    var array = [];
    const icon = require('../../assets/images/unSelected.png');

    description.map((item, index) => {
      const node = {
        id: index + 1,
        time: '',
        lineColor: constants.colors.grey,
        icon,
        description: '',
        title: item
      }
      array.push(node);
    });

    const {
      uid,
      name,
      picture,
      season,
      in_season,
      diet,
      author,
      servings,
      carbon_footprint,
      carbon_tier,
      preparation_time,
      cook_time,
      favorited,
      price_tier,
      rating,
      reviews,
      user_review,
      draft_meal_id
    } = recipe;

    var pictureUri = ""
    if (picture) {
      if (picture[constants.FIX_CONST.RECIPE_THUMB_SIZE]) {
        pictureUri = picture[constants.FIX_CONST.RECIPE_THUMB_SIZE].replace('very_large', 'large');
      } else {
        pictureUri = picture["original"];
      }
    }

    this.setState({
      season: this.isValueAvailable(season) ? season : false,
      inSeason: in_season,
      diet,
      count: servings,
      servingsCount: servings,
      imgUrl: pictureUri,
      ingredientList: ingredientsArray,
      recipeStatus: array,
      carbonFoot: carbon_footprint,
      tier: carbon_tier == 5 ? "E" : carbon_tier == 4 ? "D" : carbon_tier == 3 ? "C" : carbon_tier == 2 ? "B" : carbon_tier == 1 ? "A" : "",
      name: name,
      preparationTime: preparation_time,
      author,
      cookingTime: cook_time,
      uid,
      rating,
      reviews,
      user_review,
      userRating: user_review ? (user_review.rating ? user_review.rating : 0) : 0,
      isBooked: favorited,
      price: price_tier,
      message: user_review ? (user_review.message ? user_review.message : "") : "",
      isCommentMode: user_review ? (user_review.message ? false : true) : true,
      isDraftPlan: draft_meal_id == null ? false : true,
      draft_meal_id
    });
  };

  keyboardDidShow = () => {
    const { showReportDialog } = this.state;
    if (showReportDialog) {
      Animated.timing(this.modalAnimation, {
        toValue: -constants.screen.height / 4,
        duration: 500,
      }).start();
    } else {
      Animated.timing(this.animation, {
        toValue: -constants.screen.height / 4,
        duration: 500,
      }).start();
    }
  };

  keyboardDidHide = () => {
    Animated.timing(this.modalAnimation, {
      toValue: 0,
      duration: 500,
    }).start();
    Animated.timing(this.animation, {
      toValue: 0,
      duration: 500,
    }).start();

  }

  addToMenu = () => {
    const { error, userData, addToMenuRequest, navigation } = this.props;
    const { uid } = this.state;

    if (!this.isObjectAvailable(userData)) return;

    const { access_token } = userData;
    const params = {
      access_token,
      main_course_uid: uid
    };
    addToMenuRequest(params);
  };

  onEventComplete = event => {
    const { recipeStatus } = this.state;
    const { id } = event;

    var isComp = false;
    var array = [];
    recipeStatus.map((itm, index) => {
      var node = itm;

      if (isComp) {
        node.lineColor = constants.colors.grey;
        node.icon = require('../../assets/images/unSelected.png');
      } else {
        node.lineColor = itm.id == id ? constants.colors.grey : constants.colors.tint;
        node.icon = require('../../assets/images/selected.png');
      }
      if (itm.id == id) {
        isComp = true;
      }

      array.push(node);
    });
    this.setState({ recipeStatus: array });
  };

  onStar = rating => {
    this.setState({ userRating: rating });

    const { userData, reviewSetRequest } = this.props;
    const { access_token } = userData;
    const { uid } = this.state;
    const params = {
      access_token,
      recipe_uid: uid,
      rating
    };
    reviewSetRequest(params);
  }

  onBtnReport = () => {
    this.setState({ showReportDialog: true });
  }

  onBtnReportSend = () => {
    const { userData, reportIssueRequest } = this.props;
    const { access_token } = userData;
    const { reportedIndex, uid, comment } = this.state;

    Keyboard.dismiss();

    if (reportedIndex < 0) return;

    const params = {
      access_token,
      uid,
      problem_type: reportedIndex + 1,
      comment
    };
    reportIssueRequest(params);

    this.setState({ showReportDialog: false }, () => {
      this.setState({
        isConfirmReport: true,
        comment: "",
        reportedIndex: -1
      });
      setTimeout(() => {
        this.setState({ isConfirmReport: false });
      }, 2000);
    });
  }

  onBtnReportCancel = () => {
    this.setState({
      showReportDialog: false,
      reportedIndex: -1,
      comment: "",
    });
  }

  onBtnSend = () => {
    const { userData, reviewSetRequest } = this.props;
    const { access_token } = userData;
    const { uid, userRating, message, isCommentMode } = this.state;

    if (!isCommentMode) {
      this.setState({ isCommentMode: true });
      return;
    }

    if (userRating == 0) {
      return;
    }

    const params = {
      access_token,
      recipe_uid: uid,
      rating: userRating,
      message
    };
    reviewSetRequest(params);
    this.setState({ isCommentMode: false });
  }

  onEditComment = text => {
    this.setState({ message: text });
  }

  onBtnProfile = () => {
    const { author } = this.state;
    this.props.navigation.navigate('Author', { author });
  }

  renderReportConfirm = () => {
    const { isConfirmReport } = this.state;
    const backgroundColor = { backgroundColor: 'rgba(0, 0, 0, 0.5' };

    return (
      <Modal
        visible={isConfirmReport}
        modalStyle={backgroundColor}
      >
        <ModalContent>
          <View style={styles.reportConfirm}>
            <Icon name="check-circle" size={38} color={constants.colors.tint} />
            <AvoText
              style={styles.reportConfirmTitle}
              fontWeight="bold"
              text="Merci!"
            />
            <AvoText
              style={styles.reportConfirmText}
              text="Votre message a bien été envoyé, nous revenons vers vous rapidement"
            />
          </View>
        </ModalContent>
      </Modal>
    );
  }

  renderReportItem = (item, index) => {
    const { reportedIndex } = this.state;

    return (
      <TouchableOpacity
        style={styles.reportItem}
        activeOpacity={0.8}
        onPress={() => this.setState({ reportedIndex: index })}
      >
        <Icon
          name="circle"
          size={16}
          color={index == reportedIndex ? constants.colors.tint : constants.colors.pink}
        />
        <AvoText
          style={styles.reportItemText}
          text={item}
        />
      </TouchableOpacity>
    )
  }

  renderReport = () => {
    const { showReportDialog, comment } = this.state;
    const reports = [
      "Régime alimentaire erroné",
      "Problème sur les allergies",
      "Problème sur la liste d'ingrédient",
      "La photo ne correspond pas",
      "Description erronée",
      "C'est autre chose"
    ];

    if (showReportDialog) {
      return (
        <View style={styles.reportWrapper}>
          <Animated.View style={[styles.reportContainer, { marginTop: this.modalAnimation }]}>
            {reports.map(this.renderReportItem)}
            <TextInput
              style={styles.reportComment}
              autoCorrect={false}
              numberOfLines={0}
              multiline
              value={comment}
              onChangeText={(text) => this.setState({ comment: text })}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <View style={[
              constants.styles.row,
              { justifyContent: 'space-evenly', marginTop: 10 }
            ]}>
              <TouchableOpacity
                style={styles.reportButton}
                activeOpacity={0.8}
                onPress={this.onBtnReportSend}
              >
                <AvoText style={styles.reportButtonTitle} text="envoyer" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.reportCancelButton}
                activeOpacity={0.8}
                onPress={this.onBtnReportCancel}
              >
                <AvoText style={styles.reportButtonTitle} text="annuler" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      );
    } else {
      return null;
    }
  }

  renderIngredients = (item, index) => {
    return (
      <View key={index} style={styles.tag}>
        <AvoText
          style={styles.ingrTxt}
          fontWeight="light"
          text={item.name}
        />
      </View>
    );
  };

  dialogPop = () => {
    return (
      <Modal
        containerStyle={{ justifyContent: 'flex-end' }}
        onDismiss={() => {
          this.setState({ dialogShow: false });
        }}
        rounded
        modalStyle={{
          backgroundColor: 'rgba(0,0,0,0)'
        }}
        width={1}
        onTouchOutside={() => {
          this.setState({ dialogShow: false });
        }}
        visible={this.state.dialogShow}
        modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
      >
        <ModalContent style={{ paddingVertical: 50 }}>
          <View style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 25 }}>
            <IconBellPopup style={{ marginTop: -40 }} width={80} height={80} />
            <AvoText
              style={styles.popupTxt}
              fontWeight="normal"
              text={`Souhaitez-vous ajouter cette recette à votre menu ?`}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState(
                  {
                    dialogShow: false
                  },
                  () => {
                    //this.props.navigation.navigate('RecipeType');
                    this.addToMenu();
                  }
                );
              }}
              style={[styles.btnStyle, { backgroundColor: constants.colors.tint }]}
            >
              <AvoText style={[styles.recipeTxt, { color: 'white' }]} fontWeight="bold" text={`Oui`} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  dialogShow: false
                });
              }}
              style={[styles.btnStyle, { backgroundColor: 'white' }]}
            >
              <AvoText
                style={[styles.recipeTxt, { color: constants.colors.grey }]}
                fontWeight="bold"
                text={`Non merci`}
              />
            </TouchableOpacity>
          </View>
        </ModalContent>
      </Modal>
    );
  };

  ingredientDec = () => {
    const { updateRecipeIngredientRequest, userData } = this.props;
    const { access_token } = userData;
    const { count, uid } = this.state;

    if (count == 1) return;

    const servings = count - 1;
    const params = {
      access_token,
      uid,
      servings
    }
    updateRecipeIngredientRequest(params)
    this.setState({ count: servings });
  };

  ingredientInc = () => {
    const { updateRecipeIngredientRequest, userData } = this.props;
    const { access_token } = userData;
    const { count, uid } = this.state;
    const servings = count + 1;
    const params = {
      access_token,
      uid,
      servings
    }
    updateRecipeIngredientRequest(params)
    this.setState({ count: servings });
  };

  onScrollEvent = event => {
    const originalHeight = constants.screen.width / 1.4;
    var offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < 0) {
      this.setState({ imageHeight: originalHeight - offsetY });
    } else {
      this.setState({ imageHeight: originalHeight });
    }
    Keyboard.dismiss();
  };

  onDish = () => {
    const { isDraftPlan, uid, draft_meal_id } = this.state;
    const { userData, addToMenuRequest, delMenuRequest } = this.props;
    const { access_token } = userData;

    if (isDraftPlan) {
      const params = {
        access_token,
        meal_id: draft_meal_id
      };
      delMenuRequest(params);
    } else {
      const param = {
        access_token,
        main_course_uid: uid
      };
      addToMenuRequest(param);
    }

    this.setState({ isDraftPlan: !isDraftPlan });
  }

  addToFev = () => {
    const { userData, updateFavoriteRequest, deleteFavoriteRequest } = this.props;
    const { uid, isBooked } = this.state;
    const { access_token } = userData;
    const params = {
      access_token,
      uid
    };
    if (isBooked) {
      this.setState({ isBooked: false });
      deleteFavoriteRequest(params);
    } else {
      this.setState({ isBooked: true });
      updateFavoriteRequest({ ...params, uid });
    }
  }

  renderReviews = ({ rating, message, author }) => {
    const { firstname, lastname } = author;
    var fullName = "";

    if (firstname) fullName += firstname;
    if (lastname) fullName = `${fullName} ${lastname}`;

    return (
      <View style={styles.ratingItem}>
        <View style={constants.styles.row}>
          <AvoText
            style={styles.ratingName}
            fontWeight='museo'
            text={fullName}
          />
          <StarRating
            disabled={true}
            maxStars={5}
            rating={rating}
            starSize={12}
            fullStarColor={"orange"}
            emptyStarColor={"grey"}
            starStyle={{ marginHorizontal: 1 }}
          />
        </View>
        <AvoText
          text={message}
        />
      </View>
    );
  }

  renderContent = () => {
    const {
      name,
      season,
      inSeason,
      diet,
      ingredients,
      preparationTime,
      cookingTime,
      carbonFoot,
      tier,
      recipeStatus,
      ingredientList,
      count,
      author,
      reviews,
      user_review,
      price,
      userRating,
      message,
      isCommentMode
    } = this.state;
    var priceColor = [constants.colors.grey, constants.colors.grey, constants.colors.grey];
    if (price == 1) {
      priceColor = [constants.colors.tint, constants.colors.grey, constants.colors.grey];
    } else if (price == 2) {
      priceColor = [constants.colors.tint, constants.colors.tint, constants.colors.grey];
    } else if (price == 3) {
      priceColor = [constants.colors.tint, constants.colors.tint, constants.colors.tint];
    }

    return (
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(event) => this.onScrollEvent(event)}
      >
        <View style={styles.content}>
          <AvoText
            style={styles.descTxtTitle}
            fontWeight="museo"
            text={name}
          />
          <View style={[constants.styles.row, { marginBottom: 10 }]}>
            {
              !!inSeason &&
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
          {
            !!author &&
            <TouchableOpacity
              style={[constants.styles.row, { alignItems: 'center' }]}
              activeOpacity={0.9}
              onPress={this.onBtnProfile}
            >
              <AvoText
                style={constants.styles.wrapper}
                text={`par ${author.name}`}
              />
              <Image
                style={styles.profileImage}
                source={{ uri: author.image }}
              />
            </TouchableOpacity>
          }
          <View style={constants.styles.row}>
            {season && ingredients.map(this.renderIngredients)}
          </View>
          <View style={styles.rowContainerDetails}>
            <View style={styles.boxContainer}>
              <IconClock width={14} height={14} />
              <AvoText
                style={{ fontSize: 12, marginTop: 5 }}
                fontWeight='bold'
                text="Préparation"
              />
              <AvoText
                style={{ fontSize: 12 }}
                fontWeight='light'
                text={`${preparationTime} minutes`}
              />
            </View>
            <View style={styles.boxContainer}>
              <IconCooker width={23} height={14} />
              <AvoText
                style={{ fontSize: 12, marginTop: 5 }}
                fontWeight='bold'
                text="Cuisson"
              />
              <AvoText
                style={{ fontSize: 12 }}
                fontWeight='light'
                text={`${cookingTime} minutes`}
              />
            </View>
            <View style={styles.boxContainer}>
              <IconForkKnife width={13} height={14} />
              <AvoText
                style={{ fontSize: 12, marginTop: 5 }}
                fontWeight='bold'
                text="Difficulté"
              />
              <AvoText
                style={{ fontSize: 12 }}
                fontWeight='light'
                text="Moyenne"
              />
            </View>
          </View>
          <View style={styles.rowContainerDetails}>
            <View style={styles.boxContainer_1}>
              <IconWorld width={14} height={14} />
              <AvoText
                style={{ fontSize: 12, marginRight: 15, marginLeft: 10, marginTop: 5 }}
                fontWeight='bold'
                text="Empreinte carbone"
              />
              <AvoText
                style={{ fontSize: 12, marginTop: 5 }}
                fontWeight="bold"
              >
                {`${tier}  `}
                <AvoText
                  style={{ fontSize: 12 }}
                  fontWeight='light'
                  text={`${carbonFoot}g / portion`}
                />
              </AvoText>
            </View>
            <View style={styles.boxContainer_1}>
              <Icon name="tag" size={15} color={constants.colors.grey} />
              <AvoText
                style={{ fontSize: 12, marginTop: 5 }}
                fontWeight='bold'
                text="Prix"
              />
              <View style={constants.styles.row}>
                <AvoText
                  style={{ fontSize: 12, color: priceColor[0] }}
                  fontWeight='bold'
                  text='€'
                />
                <AvoText
                  style={{ fontSize: 12, color: priceColor[1] }}
                  fontWeight='bold'
                  text='€'
                />
                <AvoText
                  style={{ fontSize: 12, color: priceColor[2] }}
                  fontWeight='bold'
                  text='€'
                />
              </View>
            </View>
          </View>
          <View style={styles.borderStyle} />
          <View style={styles.rowContainerDetails}>
            <View style={{ flex: 1 }}>
              <AvoText
                style={styles.title}
                fontWeight='museo'
                text={`Ingrédients`}
              />
              <AvoText
                style={{ fontSize: 14, marginTop: 7 }}
                fontWeight='light'
                text="Choisissez le nb. de personnes"
              />
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={[styles.optBtn, { marginRight: 10 }]}
                onPress={() => this.ingredientDec()}
              >
                <IconMinus width={15} height={15} />
              </TouchableOpacity>
              <AvoText
                style={{
                  width: 30,
                  textAlign: 'center',
                  marginTop: 2,
                  color: 'black',
                  fontSize: 18
                }}
                fontWeight="Bold"
                text={count.toString()}
              />
              <TouchableOpacity
                onPress={() => this.ingredientInc()}
                style={[styles.optBtn, { marginLeft: 10 }]}
              >
                <IconPlus width={15} height={15} />
              </TouchableOpacity>
            </View>
          </View>
          {
            ingredientList.map((recItem, recIndex) =>
              <View
                key={recIndex}
                style={[styles.rowContainerDetails, { marginVertical: 5 }]}
              >
                <PlaceholderImg width={38} height={38} />
                <AvoText
                  style={styles.flexTxt}
                  fontWeight="bold"
                  text={recItem.text}
                />
                {
                  recItem.in_season == 1 &&
                  <AvoText
                    style={styles.season}
                    text="De saison"
                  />
                }
              </View>
            )
          }
          <View style={styles.borderStyle} />
          <AvoText
            style={styles.title}
            fontWeight="museo"
            text={'Recette'}
          />
          <Timeline
            style={{ marginTop: 10 }}
            onEventPress={(event) => this.onEventComplete(event)}
            titleStyle={[styles.timeline, { marginVertical: 10 }]}
            circleSize={20}
            innerCircle={'icon'}
            circleColor={'#fff'}
            showTime={false}
            data={recipeStatus}
            options={{ bounces: false }}
          />
          <View style={styles.borderStyle} />
          <View style={constants.styles.wrapperRow}>
            <AvoText
              style={styles.title}
              fontWeight="museo"
              text={'Notez cette recette: '}
            />
            {
              user_review ?
                <StarRating
                  maxStars={5}
                  disabled={true}
                  rating={user_review.rating}
                  starSize={24}
                  fullStarColor={"orange"}
                  emptyStarColor={"grey"}
                  starStyle={{ marginHorizontal: 1 }}
                />
                :
                <StarRating
                  maxStars={5}
                  rating={userRating}
                  starSize={24}
                  fullStarColor={"orange"}
                  emptyStarColor={"grey"}
                  starStyle={{ marginHorizontal: 1 }}
                  selectedStar={this.onStar}
                />
            }
          </View>
          {
            isCommentMode ?
              <View style={[constants.styles.row, { marginVertical: 10, alignItems: 'center' }]}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="votre commentaire"
                  value={message}
                  onChangeText={this.onEditComment}
                />
                <TouchableOpacity
                  style={{ padding: 5 }}
                  onPress={this.onBtnSend}
                >
                  <Icon
                    name="paper-plane"
                    size={20}
                    color={constants.colors.tint}
                  />
                </TouchableOpacity>
              </View>
              :
              <View style={[constants.styles.row, { marginVertical: 10, alignItems: 'center' }]}>
                <AvoText
                  style={styles.commentText}
                  text={message}
                />
                <TouchableOpacity
                  style={{ padding: 5 }}
                  onPress={this.onBtnSend}
                >
                  <Icon
                    name="edit"
                    size={20}
                    color={constants.colors.grey}
                  />
                </TouchableOpacity>
              </View>
          }
          {
            reviews.map(review => this.renderReviews(review))
          }
          <AvoButton
            style={{ marginTop: 20 }}
            title='Signaler un problème sur cette recette'
            onPress={this.onBtnReport}
          />
          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    );
  };

  renderHeader = (animatedStyle) => {
    const { navigation } = this.props;
    const { isBooked } = this.state;
    const padding = { padding: 10 };
    const width = constants.screen.width * 0.12;

    return (
      <Animated.View style={[styles.containerHeader, animatedStyle]}>
        <View style={styles.bg}>
          {
            constants.isIphoneX ?
              <ImageHeaderX width={styles.bg.width} height={styles.bg.height} />
              :
              <ImageHeader width={styles.bg.width} height={styles.bg.height} />
          }
        </View>
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity
            style={padding}
            activeOpacity={0.8}
            onPress={() => navigation.pop()}
          >
            <IconBack width={width} height={width} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.setState({ dialogShow: true })}
              style={{ padding: 10, marginRight: 10 }}
            >
              <IconFoodBG width={width} height={width} />
            </TouchableOpacity>
            <TouchableOpacity
              style={padding}
              activeOpacity={0.8}
              onPress={() => this.addToFev()}
            >
              {
                isBooked ?
                  <IconHeartPopIcon
                    width={width}
                    height={width}
                  />
                  :
                  <IconHeart
                    width={width}
                    height={width}
                  />
              }
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { imgUrl, imageHeight, isBooked, isDraftPlan } = this.state;

    return (
      <Animated.View style={[styles.container, { marginTop: this.animation }]}>
        <FastImage
          style={[styles.headerImage, { height: imageHeight }]}
          source={{ uri: imgUrl, priority: FastImage.priority.high }}
        />
        {this.renderContent()}
        <Header
          navigation={navigation}
          isBooked={isBooked}
          isAdded={isDraftPlan}
          onPressHeart={() => this.addToFev()}
          onDish={this.onDish}
        />
        {this.renderReport()}
        {this.renderReportConfirm()}
        {this.dialogPop()}
      </Animated.View>
    );
  }
}

const mapDispatchToProps = {
  updateFavoriteRequest,
  getRecipeByIdRequest,
  addToMenuRequest,
  deleteFavoriteRequest,
  getFavoritesRequest,
  reportIssueRequest,
  reviewSetRequest,
  updateRecipeIngredientRequest,
  delMenuRequest
};

const mapStateToProps = (state) => {
  const { auth, menu, recipe, favorite, profile } = state.reducer;
  const { userData } = auth;
  const { isAddedMenu, menuData } = menu;
  const { recipeObject, updatedIngredients } = recipe;
  const { error, isDeleted, isAdded } = favorite;
  const { profileData } = profile;

  return {
    userData,
    profileData,
    isLoadingFavorite: favorite.isLoading,
    isAddedMenu,
    isLoadingMenu: menu.isLoading,
    recipeObject,
    updatedIngredients,
    isLoadingRecipe: recipe.isLoading,
    error,
    isDeleted,
    isAdded
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);