import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from './Icon';

function BackButton({ onPress, size }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="chevron-back-outline" size={size || 30} />
    </TouchableOpacity>
  );
}

export default BackButton;
