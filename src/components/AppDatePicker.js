import { StyleSheet, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';
import { useState } from 'react';
import dateService from '../utility/dateService';

const AppDatePicker = ({
  inputContainerStyle,
  inputContentStyle,
  onBlur,
  onSelectItem,
  placeholder,
  value,
  disabled,
}) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onSelectItem(currentDate);
  };

  const showDatePicker = () => {
    setShow(!show);
    if (clicked && !value) {
      onBlur();
    }
    setClicked(true);
  };

  return (
    <>
      <Pressable
        style={[styles.container, inputContainerStyle]}
        onPress={!disabled ? () => showDatePicker() : null}
      >
        {value ? (
          <AppText
            style={[
              inputContentStyle,
              { color: disabled ? colors.lightGray : colors.black },
            ]}
          >
            {dateService.formatDate(value)}
          </AppText>
        ) : (
          <AppText style={[styles.placeholder, inputContentStyle]}>
            {placeholder}
          </AppText>
        )}
        <Icon
          style={{ color: disabled ? colors.lightGray : colors.black }}
          name="calendar-outline"
        />
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.borderGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  placeholder: {
    color: colors.lightGray,
  },
});

export default AppDatePicker;
