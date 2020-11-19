// Login Screen

import React from 'react';
import { View, ScrollView, Image, BackHandler, Keyboard, Platform } from 'react-native';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import appleAuth, {
	AppleButton,
	AppleAuthRequestOperation,
	AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import VersionNumber from 'react-native-version-number';

import BaseView from '../../components/base';
import { InputBlock, FacebookButton } from './components';
import { AvoText, AvoTextInput, AvoButton, Text } from '../../components';
import { ImageBigHeader, ImageLogoWithWelcome, IconMarkLine } from '../../assets/svg';

import {
	loginRequest,
	registerRequest,
	socialLoginRequest,
	passResetRequest,
	passCodeRequest,
} from '../../actions/authActions';
import { userStatusRequest } from '../../actions';
import { emailValidation, passwordValidation } from '../../Utilities';
import styles from './styles';
import constants from '../../const';
import { TouchableOpacity } from 'react-native-gesture-handler';

const formName = ['login', 'forgot password', 'register'];

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			offsetX: constants.screen.width - 40,
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			screen: props.navigation.state.params.id == 0 ? 'login' : 'regis',
			resetCode: '',
			newPass: '',
			confirmPass: ''
		};
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	componentDidUpdate(prevProps) {
		const {
			isLoginWaiting,
			accessToken,
			userData,
			isPassCode,
			isChangePass,
			loginError,
			registerError,
			userStatusRequest
		} = this.props;
		const { isRegis } = this.state;

		if (prevProps.isLoginWaiting != isLoginWaiting && isLoginWaiting == false) {
			if (loginError != null) {
				constants.DropDownAlert.showDropdownAlert(
					'error',
					'Échec de la connexion',
					loginError.message
				);
			} else if (registerError) {
				constants.DropDownAlert.showDropdownAlert(
					'error',
					`L'enregistrement a échoué`,
					registerError.message
				);
			} else if (prevProps.isPassCode != isPassCode && isPassCode == true) {
				constants.DropDownAlert.showDropdownAlert(
					'success',
					'Success',
					`Password reset code successfully send to your email`
				);
				this.onBtnToResetPass();
			} else if (prevProps.isChangePass != isChangePass && isChangePass == true) {
				constants.DropDownAlert.showDropdownAlert('success', 'Success', `Le mot de passe a bien été mis à jour.`);
				this.onBtnToLogin();
			} else {
				if (accessToken && isRegis == false) {
					const { access_token } = userData;

					userStatusRequest({
						access_token,
						version: VersionNumber.appVersion
					});
				} else if (accessToken && isRegis) {
					const { access_token } = userData;

					userStatusRequest({
						access_token,
						version: VersionNumber.appVersion
					});
					this.setState({ isRegis: false });
				} else {
				}
			}
		}
	}

	handleBackButton = () => {
		return true;
	}

	moveToHome = () => {
		const { navigation } = this.props;

		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: ''
		});
		Keyboard.dismiss();
		navigation.dispatch(StackActions.push({ routeName: "Main" }));
	};

	moveToWelcome = () => {
		const { navigation } = this.props;

		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: ''
		});
		Keyboard.dismiss();
		navigation.dispatch(StackActions.push({ routeName: "Welcome" }));
	};

	/*
	// Button Actions
	*/

	onBtnToFP = () => {
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			screen: 'login',
			resetCode: '',
			newPass: '',
			confirmPass: ''
		});
	};
	onBtnToResetPass = () => {
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			resetCode: '',
			newPass: '',
			confirmPass: '',
			screen: 'resetPass'
		});
	};

	onBtnToRegister = () => {
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			resetCode: '',
			newPass: '',
			confirmPass: '',
			screen: 'regis'
		});
	};

	onPressForgotPassword = () => {
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			resetCode: '',
			newPass: '',
			confirmPass: '',
			screen: 'forgot'
		});
	}

	onBtnToLogin = () => {
		this.setState({
			loginEmail: '',
			loginPassword: '',
			registerEmail: '',
			registerPassword: '',
			confirmPassword: '',
			forgotEmail: '',
			isRegis: false,
			lName: '',
			fName: '',
			resetCode: '',
			newPass: '',
			confirmPass: '',
			screen: 'login'
		});
	};

	onBtnLogin = () => {
		this.setState({ isRegis: false });
		Keyboard.dismiss();

		const { loginRequest } = this.props;
		const { loginEmail, loginPassword } = this.state;
		if (!loginEmail || loginEmail == '' || emailValidation(loginEmail) == false) {
			constants.DropDownAlert.showDropdownAlert('error', 'Email Address', `Veuillez entrer une addresse email valide.`);
			return;
		} else if (!loginPassword || loginPassword == '') {
			constants.DropDownAlert.showDropdownAlert('error', 'Password', `Veuillez entrer un mot de passe valide.`);
			return;
		} else {
			const params = {
				email: loginEmail,
				password: loginPassword
			};
			loginRequest(params);
		}
	};

	onAppleButtonPress = async () => {
		// performs login request
		const appleAuthRequestResponse = await appleAuth.performRequest({
			requestedOperation: AppleAuthRequestOperation.LOGIN,
			requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
		});

		// get current authentication state for user
		// /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
		const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
		console.log(credentialState);
		// use credentialState response to ensure the user is authenticated
		if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
			// user is authenticated

		}
	}

	onBtnFacebook = () => {
		const { socialLoginRequest } = this.props;
		this.setState({
			isRegis: false
		});

		LoginManager.logInWithPermissions(['public_profile']).then(
			(result) => {
				if (result.isCancelled) {
					//alert('Login cancelled');
				} else {
					AccessToken.getCurrentAccessToken().then((data) => {
						const params = {
							token: data.accessToken.toString(),
							provider: 'facebook'
						};
						socialLoginRequest(params);
					}, (error) => {
						console.log(error);
					}
					);
				}
			}, (error) => {
				console.log(error);
			}
		);
	};

	onAppleButtonPress = () => {
		const { socialLoginRequest } = this.props;

		appleAuth.performRequest({
			requestedOperation: AppleAuthRequestOperation.LOGIN,
			requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
		}).then(appleAuthRequestResponse => socialLoginRequest({
			firstName: appleAuthRequestResponse.fullName.givenName,
			lastName: appleAuthRequestResponse.fullName.familyName,
			token: appleAuthRequestResponse.identityToken,
			provider: 'apple'
		}), (error) => {
			console.log(error);
		});
	};

	onBtnPassCode = () => {
		const { passCodeRequest } = this.props;
		const { forgotEmail } = this.state;
		this.setState({
			isRegis: false
		});
		if (!forgotEmail || forgotEmail == '' || emailValidation(forgotEmail) == false) {
			constants.DropDownAlert.showDropdownAlert('error', 'Email Address', `Veuillez entrer une addresse email valide.`);
			//alert('Please insert password!');
			return;
		} else {
			const params = {
				email: forgotEmail
			};
			passCodeRequest(params);
		}
	};
	onBtnForgotPass = () => {
		const { passResetRequest } = this.props;
		const { resetCode, newPass, confirmPass } = this.state;
		this.setState({ isRegis: false });

		if (!resetCode || resetCode == '') {
			constants.DropDownAlert.showDropdownAlert('error', 'Reset Code', `Veuillez entrer une addresse email valide.`);
			//alert('Please insert password!');
			return;
		} else if (newPass == '' || newPass.length < 8 || !passwordValidation(newPass)) {
			constants.DropDownAlert.showDropdownAlert(
				'error',
				'New Password',
				`Le mot de passe doit contenir au moins 8 caractères, dont un chiffre.`
			);
			//alert('Please insert password!');
			return;
		} else if (newPass != confirmPass) {
			constants.DropDownAlert.showDropdownAlert(
				'error',
				'Confirm Password',
				`Les deux mot de passe ne correspondent pas.`
			);
			//alert('Please insert password!');
			return;
		} else {
			const params = {
				password: newPass,
				code: resetCode,
				password_confirm: newPass
			};
			passResetRequest(params);
		}
	};
	onBtnRegister = () => {
		const { registerRequest } = this.props;
		const { registerEmail, registerPassword, confirmPassword, lName, fName } = this.state;

		this.setState({ isRegis: true });
		Keyboard.dismiss();

		if (!registerEmail || registerEmail == '' || emailValidation(registerEmail) == false) {
			constants.DropDownAlert.showDropdownAlert('error', 'Email Address', `Veuillez entrer une addresse email valide.`);
			//alert('Please insert password!');
			return;
		} else if (
			!registerPassword ||
			registerPassword == '' ||
			registerPassword.length < 8 ||
			!passwordValidation(registerPassword)
		) {
			constants.DropDownAlert.showDropdownAlert(
				'error',
				'Password',
				`Le mot de passe doit contenir au moins 8 caractères, dont un chiffre.`
			);
			//alert('Please insert password!');
			return;
		} else if (!confirmPassword || confirmPassword == '') {
			constants.DropDownAlert.showDropdownAlert('error', 'Confirm Password', `Veuillez confirmer le mot de passe.`);
			//alert('Please confirm password!');
			return;
		} else if (registerPassword != confirmPassword) {
			constants.DropDownAlert.showDropdownAlert(
				'error',
				'Password',
				`Les deux mot de passe ne correspondent pas.`
			);
			//alert('Please check password again. It does not match!');
			return;
		} else {
			const params = {
				email: registerEmail,
				password: registerPassword,
				firstname: fName,
				lastname: lName
			};
			registerRequest(params);
		}
	};

	/*
	// Rendering UI
	*/

	renderBackground = () => {
		return (
			<View style={styles.header}>
				<ImageBigHeader width={styles.headerBg.width} height={styles.headerBg.height} />
			</View>
		);
	};

	renderViewScreen = () => {
		const { screen } = this.state;

		if (screen == 'regis') {
			return this.renderInputRegister();
		} else if (screen == 'forgot') {
			return this.renderInputForget();
		} else if (screen == 'resetPass') {
			return this.renderInputResetPass();
		} else {
			return this.renderInputLogin();
		}
	};

	renderInputLogin = () => {
		const { loginEmail, loginPassword } = this.state;
		const { isLoginWaiting } = this.props;

		return (
			<InputBlock title="Connexion">
				<AvoTextInput
					style={styles.input}
					type="mail"
					placeholder="Tapez votre email"
					value={loginEmail}
					blurOnSubmit={false}
					onChangeText={(text) => this.setState({ loginEmail: text })}
					onSubmitEditing={() => this.loginPW.getInnerRef().focus()}
				/>
				<AvoTextInput
					ref={input => this.loginPW = input}
					style={styles.input}
					type="password"
					placeholder="Tapez un mot de passe"
					value={loginPassword}
					onChangeText={(text) => this.setState({ loginPassword: text })}
					onSubmitEditing={this.onBtnLogin}
				/>
				<View style={styles.row}>
					<View style={styles.wrapperCenter} />
					<AvoText
						style={styles.fypLogin}
						text="Mot de passe oublié ?"
						onPress={this.onPressForgotPassword}
					/>
				</View>
				<AvoButton
					style={styles.button}
					title="Se connecter"
					isLoading={isLoginWaiting}
					onPress={this.onBtnLogin}
				/>
				<View style={[constants.styles.row, { marginTop: 20 }]}>
					<AvoText
						style={{ fontSize: constants.sizes.TXT_SIZE, textAlign: 'center' }}
						text={`Toujours pas de compte ? `}
					/>
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={this.onBtnToRegister}
					>
						<AvoText
							style={{ fontSize: constants.sizes.TXT_SIZE, color: constants.colors.tint }}
							fontWeight="bold"
							text={` C’est par ici`}
						/>
					</TouchableOpacity>
				</View>
				<View style={[styles.row, { marginBottom: 10, marginTop: 20 }]}>
					<IconMarkLine width={50} />
					<AvoText
						style={{ fontSize: constants.sizes.TXT_SIZE, color: constants.colors.grey }}
						fontWeight="bold"
						text={`  Ou  `}
					/>
					<IconMarkLine width={50} />
				</View>
				<FacebookButton
					onPress={() => this.onBtnFacebook()}
				/>
				{
					Platform.OS === "ios" &&
					<AppleButton
						buttonStyle={AppleButton.Style.WHITE}
						buttonType={AppleButton.Type.SIGN_IN}
						style={{
							marginTop: 7,
							borderRadius: 4,
							borderWidth: 1,
							paddingVertical: 7,
							paddingHorizontal: 15,
							flexDirection: 'row',
							alignSelf: 'center',
							alignItems: 'center',
							width: 160,
							height: 45
						}}
						onPress={() => this.onAppleButtonPress()}
					/>
				}
			</InputBlock>
		);
	};

	renderInputRegister = () => {
		const { registerEmail, registerPassword, confirmPassword, fName, lName } = this.state;
		const { isLoginWaiting } = this.props;

		return (
			<InputBlock title="Inscription">
				<AvoTextInput
					style={styles.input}
					type="mail"
					placeholder="Tapez votre email"
					value={registerEmail}
					blurOnSubmit={false}
					onChangeText={(text) => this.setState({ registerEmail: text })}
					onSubmitEditing={() => this.registerPW.getInnerRef().focus()}
				/>
				<AvoTextInput
					ref={ref => this.registerPW = ref}
					style={styles.input}
					type="password"
					blurOnSubmit={false}
					placeholder="Tapez un mot de passe"
					value={registerPassword}
					onChangeText={(text) => this.setState({ registerPassword: text })}
					onSubmitEditing={() => this.registerConfirmPW.getInnerRef().focus()}
				/>
				<AvoTextInput
					ref={ref => this.registerConfirmPW = ref}
					style={styles.input}
					type="password"
					blurOnSubmit={false}
					placeholder="Confirmation du mot de passe"
					value={confirmPassword}
					onChangeText={(text) => this.setState({ confirmPassword: text })}
					onSubmitEditing={this.onBtnRegister}
				/>
				<AvoButton
					style={styles.button}
					title={`S'inscrire`}
					isLoading={isLoginWaiting}
					onPress={this.onBtnRegister}
				/>
				<View style={[constants.styles.row, { marginTop: 30 }]}>
					<AvoText
						style={{ fontSize: constants.sizes.TXT_SIZE, textAlign: 'center' }}
						text={`Tu as déjà un compte ? `}
					/>
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={this.onBtnToLogin}
					>
						<AvoText
							style={{ fontSize: constants.sizes.TXT_SIZE, color: constants.colors.tint }}
							fontWeight="bold"
							text={` Connecte toi ici`}
						/>
					</TouchableOpacity>
				</View>
			</InputBlock>
		);
	};

	renderInputResetPass = () => {
		const { resetCode, newPass, confirmPass } = this.state;
		const { isLoginWaiting } = this.props;

		return (
			<InputBlock title="Changez votre mot de passe">
				<AvoText
					style={styles.fyp}
					text={`Indiquez votre adresse email et nous vous enverrons un code, que vous pourrez ensuite utiliser pour réinitialiser votre mot de passe.`}
				/>
				<AvoTextInput
					value={resetCode}
					onChangeText={(resetCode) => {
						this.setState({ resetCode });
					}}
					type=""
					style={styles.input}
					placeholder="Tapez votre code"
				/>
				<AvoTextInput
					value={newPass}
					onChangeText={(newPass) => {
						this.setState({ newPass });
					}}
					style={styles.input}
					type="password"
					placeholder="Tapez votre nouveau mot de passe"
				/>
				<AvoTextInput
					value={confirmPass}
					onChangeText={(confirmPass) => {
						this.setState({ confirmPass });
					}}
					style={styles.input}
					type="password"
					placeholder="Confirmation du nouveau mot de passe"
				/>
				<AvoButton
					style={styles.button}
					title="Envoyer"
					isLoading={isLoginWaiting}
					onPress={this.onBtnForgotPass}
				/>
				<AvoText
					style={{ fontSize: constants.sizes.TXT_SIZE, textAlign: 'center', marginTop: 37 }}
					text={`Vous vous souvenez de votre mot de passe ? `}
				>
					<AvoText
						style={{ fontSize: constants.sizes.TXT_SIZE, color: constants.colors.tint }}
						fontWeight="bold"
						text={`Connectez-vous`}
						onPress={() => {
							this.onBtnToLogin();
						}}
					/>
				</AvoText>
			</InputBlock>
		);
	};

	renderInputForget = () => {
		const { forgotEmail } = this.state;
		const { isLoginWaiting } = this.props;
		return (
			<InputBlock title="Mot de passe oublié">
				<AvoText
					style={styles.fyp}
					text={`On te renvoie toutes les instructions pour changer ton mot de passe par email.`}
				/>
				<AvoTextInput
					value={forgotEmail}
					onChangeText={(forgotEmail) => {
						this.setState({ forgotEmail });
					}}
					style={styles.input}
					type="mail"
					placeholder="Renseigne ton email"
				/>
				<AvoButton
					style={styles.button}
					title="Envoyer"
					isLoading={isLoginWaiting}
					onPress={() => {
						this.onBtnPassCode();
					}}
				/>
				<AvoText
					style={{
						fontSize: constants.sizes.TXT_SIZE,
						color: constants.colors.tint,
						textAlign: 'center',
						marginVertical: 20
					}}
					fontWeight="bold"
					text={`j'ai mon code`}
					onPress={() => {
						this.onBtnToResetPass();
					}}
				/>
				<AvoText
					style={{ fontSize: constants.sizes.TXT_SIZE, textAlign: 'center', marginTop: 10 }}
					text={`Ton mot de passe te revient ? `}
				>
					<AvoText
						style={{ fontSize: constants.sizes.TXT_SIZE, color: constants.colors.tint }}
						fontWeight="bold"
						text={`Connecte-toi ici`}
						onPress={() => this.onBtnToLogin()}
					/>
				</AvoText>
			</InputBlock>
		);
	};

	render() {
		return (
			<BaseView>
				{this.renderBackground()}
				<View style={styles.container}>
					<View style={styles.wrapperCenter}>
						<Image
							style={{ width: styles.logo.width, height: styles.logo.height }}
							source={require('../../assets/png/logo_with_welcome.png')}
						/>
					</View>
					<View style={styles.inputBlock}>
						{this.renderViewScreen()}
					</View>
				</View>
			</BaseView>
		);
	}
}

const mapStateToProps = (state) => {
	const { auth } = state.reducer;
	const { loginError, registerError } = auth;

	return {
		isLoginWaiting: auth.isWaiting,
		accessToken: auth.accessToken,
		id: auth.id,
		error: auth.eMessage,
		userData: auth.userData,
		isPassCode: auth.isPassCode,
		isChangePass: auth.isChangePass,
		loginError,
		registerError
	};
};

const mapDispatchToProps = {
	loginRequest,
	registerRequest,
	socialLoginRequest,
	passResetRequest,
	passCodeRequest,
	userStatusRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
