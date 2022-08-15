import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

function HeaderMenu({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="menu-outline" size={30} color={colors.darkGray} />
    </TouchableOpacity>
  );
}

export default HeaderMenu;
