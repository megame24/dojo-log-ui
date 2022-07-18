import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import colors from '../config/colors';

function BackButton({ onPress, size }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={size || 40}
        color={colors.darkGray}
      />
    </TouchableOpacity>
  );
}

export default BackButton;
