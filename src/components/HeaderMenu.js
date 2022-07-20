import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';

function HeaderMenu({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name="menu" size={25} color={colors.darkGray} />
    </TouchableOpacity>
  );
}

export default HeaderMenu;
