// Avocadoo Search

import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, Platform, FlatList, StyleSheet, BackHandler } from 'react-native';
import Modal, { SlideAnimation, ModalContent } from 'react-native-modals';

import AvoText from './avoText';
import AvoSearch from './avoSearch';
import AvoSqureCheck from './avoSqureCheck';
import AvoButton from './avoButton';
import { IconSettingPopup, IconMinusGreen, IconPlusGreen, IconBack } from '../assets/svg';

import { getStatusBarHeight } from '../Utilities';
import constants from '../const';

class SearchSettingPopup extends React.Component {
	hardwareBackPress = () => {
		if (this.props.FilterPopup) {
			this.props.onFilterPopupDismiss();
			return true;
		}
		if (this.props.SearchPopup) {
			this.props.onSearchPopupDismiss();
			return true;
		}
	};
	constructor(props) {
		super(props);
		this.state = {
			allData: this.props
		};
		BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress);
	}
	componentDidUpdate = (prevProp) => {
		if (prevProp.popupCount != this.props.popupCount) {
			this.setState({
				popupCount: this.props.popupCount
			});
		}
	};
	getImageFromKey = (key) => {
		if (key.toString().toLowerCase() == 'omnivore') {
			return require('../assets/png/omni.png');
		} else if (key.toString().toLowerCase() == 'pescetarian') {
			return require('../assets/png/pesc.png');
		} else if (key.toString().toLowerCase() == 'vegan') {
			return require('../assets/png/vegan.png');
		} else if (key.toString().toLowerCase() == 'vegetarian') {
			return require('../assets/png/veg.png');
		} else {
			return require('../assets/png/omni.png');
		}
	};
	dialogPop = () => {
		return (
			<Modal
				containerStyle={{ justifyContent: 'flex-end' }}
				onDismiss={() => this.props.onFilterPopupDismiss()}
				rounded
				modalStyle={{
					backgroundColor: 'rgba(0,0,0,0)'
				}}
				width={1}
				onTouchOutside={() => this.props.onFilterPopupDismiss()}
				visible={this.props.FilterPopup}
				modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
			>
				<ModalContent style={styles.blurPopupView}>
					<View style={styles.popupSettingView}>
						<IconSettingPopup style={{ marginTop: -40 }} width={80} height={80} />
						<ScrollView
							showsVerticalScrollIndicator={false}
							style={{ width: '90%', alignSelf: 'center', flexGrow: 1 }}
						>
							<AvoText style={styles.popupTitle} fontWeight="bold" text={`Type de recette`} />
							{this.props.recipeType.map((itm, ind) => {
								return (
									<AvoSqureCheck
										style={styles.squareBoxStyle}
										onPress={() => {
											this.props.onRecipePress(ind);
										}}
										isChecked={itm.selected}
										text={itm.name}
									/>
								);
							})}
							<View style={styles.borderStyle} />
							<AvoText style={styles.popupTitle} fontWeight="bold" text={`Régime alimentaire`} />

							<FlatList
								data={this.props.DietType}
								numColumns={2}
								columnWrapperStyle={{ justifyContent: 'space-between', paddingRight: 20 }}
								renderItem={({ item, index }) => {
									return (
										<TouchableOpacity
											onPress={() => this.props.onDietPress(index)}
											style={styles.squareBoxStyleRow}
										>
											<View
												style={[
													styles.dietIcon,
													{
														backgroundColor: item.selected
															? constants.colors.tint
															: constants.colors.grey
													}
												]}
											>
												<Image
													resizeMode={'contain'}
													source={this.getImageFromKey(item.key)}
													style={styles.dietIconImg}
												/>
											</View>
											<AvoText
												style={{
													marginLeft: 8,
													fontSize: constants.sizes.TXT_SIZE
												}}
												text={item.name}
											/>
										</TouchableOpacity>
									);
								}}
								extraData={this.state}
								scrollEnabled={false}
								showsVerticalScrollIndicator={false}
							/>
							<View style={styles.borderStyle} />
							<AvoText style={styles.popupTitle} fontWeight="bold" text={`Temps de préparation`} />
							<View style={styles.popupContainer1}>
								<TouchableOpacity
									onPress={() => this.props.onPopupCountPress(0)}
									style={styles.mathBtn}
								>
									<IconMinusGreen />
								</TouchableOpacity>
								<AvoText
									style={[styles.recipeTxt, { fontSize: constants.sizes.BTN_TXT_SIZE, flex: 1 }]}
									fontWeight="normal"
									text={this.props.popupCount + ' min'}
								/>
								<TouchableOpacity
									onPress={() => this.props.onPopupCountPress(1)}
									style={styles.mathBtn}
								>
									<IconPlusGreen />
								</TouchableOpacity>
							</View>
						</ScrollView>
						<AvoButton
							onPress={() => this.props.onFilterPopupGo()}
							style={styles.button}
							title="C'est parti !"
						/>

						<TouchableOpacity onPress={() => this.props.onFilterPopupDismiss()} style={styles.btnStyle}>
							<AvoText
								style={[styles.recipeTxt, { color: constants.colors.grey, marginLeft: 10 }]}
								fontWeight="bold"
								text={`Retour`}
							/>
						</TouchableOpacity>
					</View>
				</ModalContent>
			</Modal>
		);
	};
	dialogPopSearch = () => {
		const { isWaiting } = this.props;
		return (
			<Modal
				containerStyle={{ justifyContent: 'flex-end' }}
				onDismiss={() => {
					this.props.onSearchPopupDismiss();
				}}
				rounded
				modalStyle={{
					backgroundColor: 'rgba(0,0,0,0)'
				}}
				width={1}
				onTouchOutside={() => {
					this.props.onSearchPopupDismiss();
				}}
				visible={this.props.SearchPopup}
				modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
			>
				<ModalContent
					style={[
						styles.blurPopupView,
						{ paddingVertical: 0, height: constants.screen.height - getStatusBarHeight() }
					]}
				>
					<View style={{ paddingHorizontal: 10, height: '100%' }}>
						<View style={styles.simpleRowView}>
							<IconBack
								onPress={() => {
									this.props.onSearchPopupDismiss();
								}}
								width={constants.screen.width / 10}
								height={constants.screen.width / 10}
								style={{ marginRight: 10 }}
							/>
							<View style={{ flex: 1 }}>
								<AvoSearch
									ref={(searchRef) => (this.searchRef = searchRef)}
									isWaiting={isWaiting}
									style={{ backgroundColor: 'white' }}
									placeholder={''}
									value={this.props.searchTxt}
									onChangeText={(searchTxt) => {
										this.props.onSearchTxtChange(searchTxt);
									}}
								/>
							</View>
						</View>
						{this.props.searchResult.length > 0 && (
							<FlatList
								style={{ backgroundColor: 'white', borderRadius: 10, flexGrow: 0 }}
								extraData={this.state}
								data={this.props.searchResult}
								contentContainerStyle={{ paddingVertical: 5 }}
								renderItem={({ item, index }) => {
									return (
										<TouchableOpacity
											onPress={() => {
												this.props.onSearchResultPress(item);
											}}
											activeOpacity={0.8}
										>
											<AvoText
												style={{
													marginVertical: 5,
													marginHorizontal: 15,
													fontSize: constants.sizes.INPUT_TXT_SIZE,
													color: constants.colors.placeholder
												}}
												fontWeight="light"
												text={item.name}
											/>
										</TouchableOpacity>
									);
								}}
							/>
						)}
					</View>
				</ModalContent>
			</Modal>
		);
	};

	render() {
		return (
			<View>
				{this.dialogPop()}
				{this.dialogPopSearch()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	dietIconImg: {
		width: constants.screen.width * 0.06,
		height: constants.screen.width * 0.06
	},
	dietIcon: {
		padding: 7,
		borderRadius: 20
	},
	blurPopupView: { paddingVertical: 50, height: constants.screen.height * 0.95 },
	popupSettingView: { alignItems: 'center', backgroundColor: 'white', borderRadius: 25, height: '100%' },
	squareBoxStyle: { alignSelf: 'flex-start', marginVertical: 10 },
	squareBoxStyleRow: {
		width: '48%',
		alignSelf: 'flex-start',
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	container: {
		alignItems: 'center',
		height: '100%',
		paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : getStatusBarHeight() * 2,
		backgroundColor: 'white'
	},
	borderStyle: {
		width: constants.screen.width * 0.9,
		alignSelf: 'center',
		borderColor: constants.colors.borderColor,
		borderTopWidth: 0.5,
		marginVertical: 10
	},
	button: {
		width: '90%',
		alignSelf: 'center',
		marginVertical: 10
	},
	btnStyle: {
		width: '90%',
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
		alignSelf: 'center',
		backgroundColor: 'white'
	},
	simpleRowView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center'
	},
	recipeTxt: {
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'center',
		marginTop: Platform.OS == 'ios' ? 5 : 0
	},
	mathBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 },
	popupContainer1: {
		borderRadius: 5,
		borderColor: constants.colors.grey,
		borderWidth: 1,
		marginVertical: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row'
	},
	popupTitle: {
		fontSize: constants.sizes.TXT_SIZE,
		color: 'black',
		textAlign: 'left',
		marginVertical: 15,
		marginBottom: 10,
		width: '100%',
		alignSelf: 'center'
	}
});

export default SearchSettingPopup;
