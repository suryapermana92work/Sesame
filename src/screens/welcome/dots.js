// Dots

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import constants from '../../const';

const Dots = ({ index = 0, onPressDot }) => {
	return (
		<View style={styles.container}>
			{index == 0 ?
				<ActiveDot onPress={() => onPressDot(0)} />
				:
				<Dot onPress={() => onPressDot(0)} />
			}
			{index == 1 ?
				<ActiveDot onPress={() => onPressDot(1)} />
				:
				<Dot onPress={() => onPressDot(1)} />
			}
			{index == 2 ?
				<ActiveDot onPress={() => onPressDot(2)} />
				:
				<Dot onPress={() => onPressDot(2)} />
			}
			{index == 3 ?
				<ActiveDot onPress={() => onPressDot(3)} />
				:
				<Dot onPress={() => onPressDot(3)} />
			}
			{index == 4 ?
				<ActiveDot onPress={() => onPressDot(4)} />
				:
				<Dot onPress={() => onPressDot(4)} />
			}
		</View>
	);
};

const Dot = ({ onPress }) => {
	return <TouchableOpacity
		style={styles.circle}
		activeOpacity={0.9}
		onPress={onPress}
	/>
};

const ActiveDot = ({ onPress }) => {
	return <TouchableOpacity
		style={styles.bigCircle}
		activeOpacity={0.9}
		onPress={onPress}
	/>
};

const styles = StyleSheet.create({
	container: {
		width: 70,
		height: 17,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	circle: {
		width: constants.screen.width * 0.02,
		height: constants.screen.width * 0.02,
		borderRadius: 10,
		backgroundColor: constants.colors.tint50
	},
	bigCircle: {
		width: constants.screen.width * 0.04,
		height: constants.screen.width * 0.04,
		borderRadius: 20,
		backgroundColor: constants.colors.tint,
		shadowColor: constants.colors.tint,
		shadowOffset: {
			x: 0,
			y: 3
		},
		shadowRadius: 3,
		shadowOpacity: 0.5
	}
});

export default Dots;
