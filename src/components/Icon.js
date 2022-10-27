import React from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import colors from '../config/colors';

function Icon({ name, color, size, isFontAwesome, ...otherProps }) {
  return (
    <>
      {isFontAwesome && (
        <FontAwesome5
          {...otherProps}
          name={name}
          size={size || 20}
          color={color || colors.darkGray}
        />
      )}
      {!isFontAwesome && (
        <Ionicons
          {...otherProps}
          name={name}
          size={size || 20}
          color={color || colors.darkGray}
        />
      )}
    </>
  );
}

export default Icon;
