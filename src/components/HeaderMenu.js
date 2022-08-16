import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from './Icon';

function HeaderMenu({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="menu-outline" size={30} />
    </TouchableOpacity>
  );
}

export default HeaderMenu;
