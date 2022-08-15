import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import colors from '../config/colors';

function BackButton({ onPress, size }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name="chevron-back-outline"
        size={size || 30}
        color={colors.darkGray}
      />
    </TouchableOpacity>
  );
}

export default BackButton;
