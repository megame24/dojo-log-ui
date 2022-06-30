import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../config/colors';

function FormLogo() {
  return (
    <MaterialCommunityIcons
      name="semantic-web"
      size={40}
      color={colors.primary}
    />
  );
}

export default FormLogo;
