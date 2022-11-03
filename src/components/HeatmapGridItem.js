import React from 'react';
import { View, StyleSheet } from 'react-native';
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import colors from '../config/colors';
import AppText from './AppText';
import HeatmapItem from './HeatmapItem';

function HeatmapGridItem({ heatmapItemData, allowMenu = false }) {
  return (
    <View style={styles.heatmapParentContainer}>
      {heatmapItemData.month && (
        <AppText
          style={[
            styles.month,
            { opacity: heatmapItemData.monthVisible ? 1 : 0 },
          ]}
        >
          {heatmapItemData.month}
        </AppText>
      )}
      <View style={styles.heatmapContainer}>
        {heatmapItemData.day && (
          <AppText style={styles.day}>{heatmapItemData.day}</AppText>
        )}
        {heatmapItemData.inactive && <View style={styles.heatmapCell} />}
        {allowMenu ? (
          <Menu>
            <MenuTrigger>
              <HeatmapItem
                heatmapItemData={heatmapItemData}
                heatmapCellStyle={styles.heatmapCell}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{ optionsContainer: styles.popupMenuOptions }}
            >
              <MenuOption
                disabled={!heatmapItemData.color}
                onSelect={() => console.log('hola')}
                style={styles.popupMenuOption}
              >
                <AppText
                  style={{
                    fontSize: 14,
                    color: heatmapItemData.color
                      ? colors.darkGray
                      : colors.lightGray,
                  }}
                >
                  View logs
                </AppText>
              </MenuOption>
              {heatmapItemData.hasGoal && (
                <MenuOption
                  onSelect={() => console.log(heatmapItemData.goalId)}
                  style={styles.popupMenuOption}
                >
                  <AppText style={{ fontSize: 14 }}>View goal</AppText>
                </MenuOption>
              )}
              {heatmapItemData.hasGoal && !heatmapItemData.goalAchieved && (
                <MenuOption
                  onSelect={() => console.log(heatmapItemData.goalId)}
                  style={styles.popupMenuOption}
                >
                  <AppText style={{ fontSize: 14 }}>Set to achieved</AppText>
                </MenuOption>
              )}
            </MenuOptions>
          </Menu>
        ) : (
          <HeatmapItem
            heatmapItemData={heatmapItemData}
            heatmapCellStyle={styles.heatmapCell}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heatmapCell: {
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 5,
    margin: 4,
  },
  day: {
    fontSize: 12,
    marginBottom: 5,
    marginHorizontal: 4,
  },
  heatmapContainer: {
    alignItems: 'center',
  },
  heatmapParentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  month: {
    fontSize: 12,
    marginRight: 10,
  },
  popupMenuOptions: {
    width: 'auto',
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    paddingVertical: 5,
  },
  popupMenuOption: {
    paddingHorizontal: 10,
  },
});

export default HeatmapGridItem;
