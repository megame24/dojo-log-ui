import { Platform } from 'react-native';
import colors from './colors';

export default {
  text: {
    color: colors.darkGray,
    fontSize: 16,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
};
