import React from "react";
import { connect } from "react-redux";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  BackHandler,
  ActivityIndicator
} from "react-native";
import { StackActions } from "react-navigation";

import Charging from '../charging';
import BaseComponent from '../base';
import Base from "../../components/base";
import { Header, AvoText, AvoButton, AvoCard } from "../../components";
import { CircleText, Score } from './components';
import {
  IconReplace,
  IconUtensil,
  IconDelete,
  IconDelPopup,
  IconReplaceWhite,
  IconMinusGreen,
  IconPlusGreen,
  IconEditGrey,
  IconEditPopup,
  IconClock,
  IconBellPopup
} from "../../assets/svg";

import {
  getMenuRequest,
  delMenuRequest,
  editGuestRequest,
  getDraftPlanRequest,
  getCurrentPlanRequest,
  getPreviousDraftRequest
} from "../../actions";

import styles from "./styles";
import constants from "../../const";

class Menu extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dialogShow: false,
      dialogShowAdd: false,
      isPersonDialog: false,
      isDeleteDialog: false,
      popupCount: 0,
      filterList: [],
      tier: 0,
      serving: 0,
      isGetting: false,
      isGettingDraft: false,
      draftPageIndex: 0,
      previousDrafts: {},
      disableMoreButton: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      var id = 1;
      if (this.isObjectAvailable(navigation.state.params)) {
        id = navigation.state.params.id;
      }
      if (id == 1) {
        this.getMenu();
        this.setState({
          draftPageIndex: 0,
          previousDrafts: {}
        });
      } else if (id == 2) {
        this.loadDraftPlan();
      }
    });

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener.remove();
  }

  componentDidUpdate = prevProps => {
    const {
      isLoading,
      isEditing,
      isValidated,
      isGettingDraft,
      menuData,
      previousDrafts,
      userData,
      deleteMealStatus,
      editGuestStatus,
      isMenuGenerated,
      error,
      navigation
    } = this.props;

    var id = 1;
    if (this.isObjectAvailable(navigation.state.params)) {
      id = navigation.state.params.id;
    }

    if (isEditing) {
      constants.showLoader.showLoader();
    } else {
      constants.showLoader.hideLoader();
    }

    if (isGettingDraft != prevProps.isGettingDraft) {
      this.setState({ isGettingDraft });
      if (!isGettingDraft && previousDrafts.length > 0) {
        const { draftPageIndex } = this.state;
        var object = this.state.previousDrafts;
        object[draftPageIndex] = previousDrafts;
        this.setState({
          draftPageIndex: draftPageIndex + 1,
          previousDrafts: object
        });
      } else if (!isGettingDraft && previousDrafts.length == 0) {
        this.setState({ disableMoreButton: true });
      }
    }

    if (isMenuGenerated && id == 0) {
      this.getMenu();
    }

    if (deleteMealStatus && prevProps.deleteMealStatus != deleteMealStatus) {
      constants.DropDownAlert.showDropdownAlert(
        "success",
        "Succès",
        `Nous avons retiré cette recette`
      );
      this.getMenu();
    }
    if (editGuestStatus && prevProps.editGuestStatus != editGuestStatus) {
      constants.DropDownAlert.showDropdownAlert(
        "success",
        "Succès",
        `Meal guest updated successfully`
      );
      this.getMenu();
    }

    if (this.isObjectAvailable(error) && error != prevProps.error) {
      constants.DropDownAlert.showDropdownAlert(
        "error",
        "Attention",
        error.message
      );
    }

    if (this.isObjectAvailable(menuData) &&
      id == 0 &&
      isLoading == false &&
      isLoading != prevProps.isLoading
    ) {
      this.loadMenu();
    } else if (this.isObjectAvailable(menuData) && id == 1) {
      if (this.state.isLoading) {
        this.loadMenu();
      }
      if (isValidated && isValidated != prevProps.isValidated) {
        this.loadMenu();
      }
    } else if (this.isObjectAvailable(menuData) &&
      id == 2 &&
      isLoading == false &&
      isLoading != prevProps.isLoading
    ) {
      this.loadMenu();
    }
  };

  loadMenu = () => {
    var array = [];

    const { filterList } = this.state;
    const { menuData, userData } = this.props;
    const { meals, analysis } = menuData;
    const { carbon_tier, carbon_per_serving, nutrition } = analysis;
    const { family_members } = userData;
    const { adult, child } = family_members;
    var totalFamilyMember = 0;

    this.setState({
      tier: carbon_tier,
      serving: carbon_per_serving,
      nutrition,
    });

    if (this.isValueAvailable(adult)) {
      totalFamilyMember += parseInt(adult);
    }
    if (this.isValueAvailable(child)) {
      totalFamilyMember += parseInt(child);
    }

    if (!this.isArrayAvailable(meals)) return;

    meals.map(meal => {
      const { starter, main_course, dessert } = meal;

      if (this.isObjectAvailable(starter)) {
        array.push(starter);
      }

      if (this.isObjectAvailable(main_course)) {
        array.push(main_course);
      }

      if (this.isObjectAvailable(dessert)) {
        array.push(dessert);
      }
    });

    if (JSON.stringify(filterList) != JSON.stringify(array)) {
      this.setState({ filterList: array, isLoading: false });
    }
  }

  loadDraftPlan = () => {
    const { filterList } = this.state;
    const { profileData } = this.props;
    const { draft_plan } = profileData;
    const { meals, analysis } = draft_plan;
    const { carbon_tier, carbon_per_serving, nutrition } = analysis;
    const { family_members } = profileData;
    const { adult, child } = family_members;
    var totalFamilyMember = 0;
    var array = [];

    this.setState({
      tier: carbon_tier,
      serving: carbon_per_serving,
      nutrition,
    });

    if (this.isValueAvailable(adult)) {
      totalFamilyMember += parseInt(adult);
    }
    if (this.isValueAvailable(child)) {
      totalFamilyMember += parseInt(child);
    }

    meals.map(meal => {
      const { starter, main_course, dessert } = meal;

      if (this.isObjectAvailable(starter)) {
        array.push(starter);
      }

      if (this.isObjectAvailable(main_course)) {
        array.push(main_course);
      }

      if (this.isObjectAvailable(dessert)) {
        array.push(dessert);
      }
    });

    if (JSON.stringify(filterList) != JSON.stringify(array)) {
      this.setState({ filterList: array, isLoading: false });
    }
  }

  handleBackButton = () => {
    const { navigation } = this.props;
    navigation.pop();
    return true;
  }

  getMenu = () => {
    const { userData, navigation, getDraftPlanRequest, getCurrentPlanRequest } = this.props;

    if (!this.isAuthenticated()) return;

    const params = { access_token: userData.access_token };
    var id = 1;
    if (this.isObjectAvailable(navigation.state.params)) {
      id = navigation.state.params.id;
    }

    if (id == 1) {
      getCurrentPlanRequest(params);
    } else {
      getDraftPlanRequest(params);
    }
  };

  delMenu = uid => {
    const { userData, delMenuRequest } = this.props;

    if (this.isAuthenticated()) {
      const params = {
        access_token: userData.access_token,
        meal_id: uid
      };
      delMenuRequest(params);
    }
  };

  editGuest = uid => {
    const { userData, editGuestRequest, navigation } = this.props;
    const { popupCount } = this.state;

    if (this.isAuthenticated()) {
      const params = {
        access_token: userData.access_token,
        meal_id: uid,
        servings: popupCount
      };
      editGuestRequest(params);
    }
  };

  onBtnReplace = (index) => {
    const { navigation } = this.props;
    const { filterList } = this.state;
    const { uid, mealId } = filterList[this.selectedIndex];

    const id = this.isObjectAvailable(navigation.state.params) ? navigation.state.params.id : 1;
    const nextScreen = id != 1 ? "AddRecipeHome" : "AppRecipe";
    console.log(index);
    navigation.dispatch(StackActions.push({
      routeName: nextScreen,
      params: {
        old_recipe_uid: uid,
        meal_id: mealId
      }
    }));
  }

  onBtnMore = () => {
    const { getPreviousDraftRequest, userData } = this.props;
    const { access_token } = userData;
    const { draftPageIndex } = this.state;
    const param = {
      access_token,
      page: draftPageIndex
    };
    getPreviousDraftRequest(param);
    this.setState({ isGettingDraft: true });
  }

  renderPersonDialog = () => {
    const { isPersonDialog, popupCount, filterList } = this.state;

    return (
      <Modal
        visible={isPersonDialog}
        transparent
      >
        <TouchableOpacity
          style={styles.dialogWrapper}
          activeOpacity={1}
          onPress={() => this.setState({ isPersonDialog: false })}
        >
          <View style={styles.dialogContainer}>
            <IconDelPopup style={{ marginTop: -40 }} width={80} height={80} />
            <AvoText
              style={styles.popupTxt}
              fontWeight="bold"
              text={`Modifier le nombre de convives`}
            />
            <View style={styles.popupRowControl}>
              <View style={styles.popupContainer1}>
                <TouchableOpacity
                  style={styles.mathBtn}
                  onPress={() => this.setState({ popupCount: popupCount > 1 ? popupCount - 1 : 1 })}
                >
                  <IconMinusGreen />
                </TouchableOpacity>
                <AvoText
                  style={[
                    styles.recipeTxt,
                    { fontSize: constants.sizes.BTN_TXT_SIZE, flex: 1 }
                  ]}
                  fontWeight="bold"
                  text={popupCount}
                />
                <TouchableOpacity
                  style={styles.mathBtn}
                  onPress={() => this.setState({ popupCount: popupCount + 1 })}
                >
                  <IconPlusGreen />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.popupContainer2}
                onPress={() => {
                  this.setState({ isPersonDialog: false });
                  var params = filterList[this.selectedIndex];
                  this.editGuest(params.mealId);
                }}
              >
                <AvoText
                  style={[
                    styles.recipeTxt,
                    { fontSize: constants.sizes.TXT_SIZE, color: "white" }
                  ]}
                  fontWeight="normal"
                  text={`C'est parti !`}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }

  dialogPop = () => {
    const { dialogShow } = this.state;

    return (
      <Modal
        visible={dialogShow}
        transparent
      >
        <TouchableOpacity
          style={styles.dialogWrapper}
          activeOpacity={1}
          onPress={() => this.setState({ dialogShowAdd: false })}
        >
          <View style={styles.dialogContainer}>
            <IconDelPopup style={{ marginTop: -40 }} width={80} height={80} />
            <AvoText
              style={styles.popupTxt}
              fontWeight="normal"
              text={` Êtes-vous sûr de vouloir supprimer ce menu ?`}
            />
            <TouchableOpacity
              style={[
                styles.btnStyle,
                { backgroundColor: constants.colors.tint }
              ]}
              onPress={() => this.setState({ dialogShow: false })}
            >
              <AvoText
                style={[styles.recipeTxt, { color: "white" }]}
                fontWeight="bold"
                text={`Supprimer`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnStyle, { backgroundColor: "white" }]}
              onPress={() => this.setState({ dialogShow: false })}
            >
              <IconReplace />
              <AvoText
                style={[
                  styles.recipeTxt,
                  { color: constants.colors.grey, marginLeft: 10 }
                ]}
                fontWeight="bold"
                text={`Remplacer`}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  renderDeleteDialog = () => {
    const { isDeleteDialog, filterList } = this.state;

    return (
      <Modal
        visible={isDeleteDialog}
        transparent
      >
        <TouchableOpacity
          style={styles.dialogWrapper}
          activeOpacity={1}
          onPress={() => this.setState({ isDeleteDialog: false })}
        >
          <View style={styles.dialogContainer}>
            <IconBellPopup style={{ marginTop: -40 }} width={80} height={80} />
            <AvoText
              style={styles.popupTxt}
              fontWeight="normal"
              text={`Retirer cette recette du menu?`}
            />
            <View style={styles.popupRowControl}>
              <AvoButton
                style={styles.buttonPopNag}
                txtStyle={{ color: constants.colors.grey }}
                title="Non"
                isNegative={true}
                onPress={() => this.setState({ isDeleteDialog: false })}
              />
              <AvoButton
                style={styles.buttonPop}
                title="Oui"
                onPress={() => {
                  this.setState({ isDeleteDialog: false });
                  var Params = filterList[this.selectedIndex];
                  this.delMenu(Params.mealId);
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderPreviousDraft = (meal, draft) => {
    const { navigation } = this.props;
    const { main_course } = meal;
    const { uid } = main_course;

    return (
      <AvoCard
        type={0}
        data={main_course}
        onCard={() => navigation.navigate("ItemDetails", { id: uid })}
      />
    )
  }

  renderPreviousDrafts = drafts => {
    return (
      <View>
        {
          drafts.map(draft => {
            const { meals } = draft;
            return (
              <View style={{ marginTop: 30 }}>
                <AvoText
                  style={{ marginHorizontal: 20, color: constants.colors.tint }}
                  fontWeight="museo"
                  text={`mon plan du ${draft.date}`}
                />
                {meals.map(meal => this.renderPreviousDraft(meal, draft))}
              </View>
            )
          })
        }
      </View>
    );
  }

  renderGuestDialogPop = () => {
    const { dialogShowAdd, popupCount, filterList } = this.state;
    const { navigation } = this.props;

    return (
      <Modal
        visible={dialogShowAdd}
        transparent
      >
        <TouchableOpacity
          style={styles.dialogWrapper}
          activeOpacity={1}
          onPress={() => this.setState({ dialogShowAdd: false })}
        >
          <View style={styles.dialogContainer}>
            <IconEditPopup style={{ marginTop: -40 }} width={80} height={80} />
            <AvoText
              style={styles.popupTxt}
              fontWeight="bold"
              text={` Modifier la recette`}
            />
            <AvoText
              style={styles.popupTxt}
              fontWeight="normal"
              text={` Nombre de convives`}
            />
            <View style={styles.popupRowControl}>
              <View style={styles.popupContainer1}>
                <TouchableOpacity
                  style={styles.mathBtn}
                  onPress={() => this.setState({ popupCount: popupCount > 1 ? popupCount - 1 : 1 })}
                >
                  <IconMinusGreen />
                </TouchableOpacity>
                <AvoText
                  style={[
                    styles.recipeTxt,
                    { fontSize: constants.sizes.BTN_TXT_SIZE, flex: 1 }
                  ]}
                  fontWeight="bold"
                  text={popupCount}
                />
                <TouchableOpacity
                  style={styles.mathBtn}
                  onPress={() => this.setState({ popupCount: popupCount + 1 })}
                >
                  <IconPlusGreen />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.popupContainer2}
                onPress={() => {
                  this.setState({ dialogShowAdd: false });
                  var params = filterList[this.selectedIndex];
                  this.editGuest(params.mealId);
                }}
              >
                <AvoText
                  style={[
                    styles.recipeTxt,
                    { fontSize: constants.sizes.TXT_SIZE, color: "white" }
                  ]}
                  fontWeight="normal"
                  text={`C'est parti !`}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.popupRowControl}>
              <AvoButton
                iconBtn={
                  <IconReplaceWhite style={{ marginRight: 10, tintColor: "#fff" }} />
                }
                style={styles.buttonPop}
                title="Remplacer"
                onPress={() => {
                  this.onBtnReplace()
                  this.setState({ dialogShowAdd: false });
                }}
              />
              <AvoButton
                style={styles.buttonPopNag}
                txtStyle={{ color: constants.colors.grey }}
                title="Supprimer"
                iconBtn={<IconDelete style={{ marginRight: 10 }} />}
                isNegative={true}
                onPress={() => {
                  this.setState({ dialogShowAdd: false });
                  var Params = filterList[this.selectedIndex];
                  this.delMenu(Params.mealId);
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  renderItem = (item, index) => {
    const { navigation } = this.props;
    const id = this.isObjectAvailable(navigation.state.params) ? navigation.state.params.id : 1;
    const { uid } = item;
    const destination = id != 1 ? "RecipeDetails" : "ItemDetails";
    console.log(index);
    return (
      <AvoCard
        type={2}
        data={item}
        onCard={() => {
          navigation.dispatch(StackActions.push({
						routeName: destination,
						params: { id: uid }
					}));
        }}
        onPerson={() => {
          this.selectedIndex = index;
          this.setState({ isPersonDialog: true, popupCount: item.person });
        }}
        onReplace={() => {
          this.selectedIndex = index;
          this.onBtnReplace(index);
        }}
        onRemove={() => {
          this.selectedIndex = index;
          this.setState({ isDeleteDialog: true });
        }}
      />
    );
  };

  render() {
    const { navigation, menuData, userData } = this.props;
    const { draft_plan } = userData;
    const { analysis } = draft_plan;
    const id = this.isObjectAvailable(navigation.state.params) ? navigation.state.params.id : 1;
    const {
      isLoading,
      filterList,
      tier,
      serving,
      nutrition,
      isGettingDraft,
      disableMoreButton,
      previousDrafts
    } = this.state;

    return (
      <Base>
        <Header
          title="Menu"
          navigation={navigation}
          isBack={id == 1 ? false : true}
          isBackTo={2}
        />
        <View style={styles.rowContainerCenter}>
          <AvoText
            style={styles.headerTxt}
            fontWeight='bold'
            text="Voici les "
          />
          <CircleText text={filterList.length.toString()} />
          <AvoText
            style={styles.headerTxt}
            fontWeight='bold'
            text=" recettes de votre menu actuel :"
          />
        </View>
        <ScrollView>
          {
            filterList.map(this.renderItem)
          }
          <AvoButton
            style={styles.button}
            title="Ajouter une recette"
            onPress={() =>
             
               navigation.navigate(id == 1 ? "AddRecipe" : 'AddRecipeHome', { meal_plan_id: id.toString() })
              }
          />
          <View style={styles.borderStyle} />
          {
            Object.keys(previousDrafts).map(key => this.renderPreviousDrafts(previousDrafts[key]))
          }
          {
            id == 1 ?
              <View style={constants.styles.center}>
                <TouchableOpacity
                  style={[constants.styles.row, { marginTop: 10 }]}
                  activeOpacity={0.9}
                  disabled={disableMoreButton || isGettingDraft}
                  onPress={this.onBtnMore}
                >
                  <AvoText
                    style={disableMoreButton ? styles.disabledMoreButtonTitle : styles.moreButtonTitle}
                    text={disableMoreButton ? "Vous n'avez pas d'autres repas à afficher!" : "afficher les repas précédents"}
                  />
                  <ActivityIndicator
                    hidesWhenStopped
                    animating={isGettingDraft}
                  />
                </TouchableOpacity>
              </View>
              :
              <View>
                <AvoText
                  style={styles.title}
                  fontWeight='bold'
                  text={"Caractéristiques du menu"}
                />
                <View>
                  <AvoText
                    style={styles.title}
                    text={"Score nutritionnel"}
                  />
                  <Score nutrition={nutrition} serving={serving ? serving : 0} />
                  <AvoText
                    style={styles.title}
                    text={"Impact environnemental"}
                  />
                  <Score tier={tier} serving={serving ? serving : 0} />
                  <TouchableOpacity
                    style={styles.detail}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.dispatch(StackActions.push({
                        routeName: "MealPlanDetail",
                        params: { data: id == 2 ? analysis : menuData.analysis }
                      }))
                    }
                  >
                    <AvoText
                      style={styles.detailTitle}
                      fontWeight="bold"
                      text="Voir plus >"
                    />
                  </TouchableOpacity>
                </View>
                <AvoButton
                  isNegative
                  style={styles.borderButton}
                  title="Voir la liste de courses"
                  onPress={() => navigation.navigate('Course')}
                />
              </View>
          }
          <View style={{ height: 40 }} />
        </ScrollView>
        {this.dialogPop()}
        {this.renderGuestDialogPop()}
        {this.renderPersonDialog()}
        {this.renderDeleteDialog()}
        {
          id == 0 &&
          <Charging isLoading={isLoading} />
        }
      </Base>
    );
  }
}

const mapDispatchToProps = {
  getMenuRequest,
  delMenuRequest,
  editGuestRequest,
  getDraftPlanRequest,
  getCurrentPlanRequest,
  getPreviousDraftRequest
};

const mapStateToProps = state => {
  const { auth, menu, profile } = state.reducer;
  const { userData } = auth;
  const { profileData } = profile;
  const {
    menuData,
    isMenuGenerated,
    deleteMealStatus,
    editGuestStatus,
    previousDrafts,
    error,
    isLoading,
    isEditing,
    isGettingDraft,
    isValidated
  } = menu;

  return {
    isLoading,
    isEditing,
    isGettingDraft,
    userData,
    profileData,
    menuData,
    previousDrafts,
    isMenuGenerated,
    deleteMealStatus,
    editGuestStatus,
    error,
    isValidated
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
