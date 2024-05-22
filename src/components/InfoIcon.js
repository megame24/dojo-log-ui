import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from './Icon';
import colors from '../config/colors';

const InfoIcon = ({ infoIconPress }) => {
  return (
    <TouchableOpacity onPress={infoIconPress}>
      <Icon name="help-circle-outline" size={20} color={colors.mediumGray} />
    </TouchableOpacity>
  );
};

export default InfoIcon;
