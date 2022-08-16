import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import colors from '../config/colors';

function Icon({ name, color, size, ...otherProps }) {
  return (
    <Ionicons
      {...otherProps}
      name={name}
      size={size || 20}
      color={color || colors.darkGray}
    />
  );
}

export default Icon;
