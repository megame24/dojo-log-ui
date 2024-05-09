import React from 'react';
import { View, StyleSheet } from 'react-native';
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import colors from '../config/colors';
import constants from '../config/constants';
import AppText from './AppText';
import HeatmapItem from './HeatmapItem';

function HeatmapGridItem({
  heatmapItemData,
  monthStyle,
  dayStyle,
  heatmapCellStyle,
  allowMenu = false,
  trophySize,
  todayMarkSize,
  navigation,
  logbookId,
  updateGoal,
  allowDayDisplay = true,
  logOnAGoalStyle,
}) {
  return (
    <View style={styles.heatmapParentContainer}>
      {heatmapItemData.month && (
        <AppText
          style={[
            styles.month,
            monthStyle,
            { opacity: heatmapItemData.monthVisible ? 1 : 0, width: 27 },
          ]}
        >
          {heatmapItemData.month}
        </AppText>
      )}
      <View style={styles.heatmapContainer}>
        {heatmapItemData.day && allowDayDisplay && (
          <AppText style={[styles.day, dayStyle]}>
            {heatmapItemData.day}
          </AppText>
        )}
        {heatmapItemData.inactive && (
          <View style={[styles.heatmapCell, heatmapCellStyle]} />
        )}
        {allowMenu ? (
          <Menu>
            <MenuTrigger>
              <HeatmapItem
                heatmapItemData={heatmapItemData}
                heatmapCellStyle={[styles.heatmapCell, heatmapCellStyle]}
                logOnAGoalStyle={logOnAGoalStyle}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{ optionsContainer: styles.popupMenuOptions }}
            >
              <MenuOption
                disabled={!heatmapItemData.color}
                onSelect={() =>
                  navigation.navigate(constants.LOGS_SCREEN, {
                    startDate: heatmapItemData.startDate,
                    endDate: heatmapItemData.endDate,
                    logbookId,
                  })
                }
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
                  disableTouchable
                  style={[
                    styles.popupMenuOption,
                    { backgroundColor: colors.borderPrimary },
                  ]}
                >
                  <AppText numberOfLines={1} style={{ fontSize: 14 }}>
                    {heatmapItemData.goalName}
                  </AppText>
                </MenuOption>
              )}
              {heatmapItemData.hasGoal && (
                <MenuOption
                  onSelect={() =>
                    navigation.navigate(constants.GOAL_SCREEN, {
                      goalId: heatmapItemData.goalId,
                      logbookId,
                    })
                  }
                  style={styles.popupMenuOption}
                >
                  <AppText style={{ fontSize: 14 }}>View goal</AppText>
                </MenuOption>
              )}
              {heatmapItemData.hasGoal && !heatmapItemData.goalAchieved && (
                <MenuOption
                  onSelect={() =>
                    updateGoal({ achieved: true }, heatmapItemData.goalId)
                  }
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
            heatmapCellStyle={[styles.heatmapCell, heatmapCellStyle]}
            trophySize={trophySize}
            todayMarkSize={todayMarkSize}
            logOnAGoalStyle={logOnAGoalStyle}
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
    marginRight: 5,
  },
  popupMenuOptions: {
    width: 150,
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
