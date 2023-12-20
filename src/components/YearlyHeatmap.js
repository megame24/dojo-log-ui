import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import HeatmapGridItem from './HeatmapGridItem';

function YearlyHeatmap({ heatmapData }) {
  const renderItem = ({ item }) => (
    <HeatmapGridItem
      dayStyle={styles.day}
      monthStyle={styles.month}
      heatmapCellStyle={styles.heatmapCell}
      heatmapItemData={item}
      trophySize={15}
      todayMarkSize={20}
    />
  );

  return (
    <FlatList
      style={{ flexGrow: 0 }}
      nestedScrollEnabled
      data={heatmapData}
      numColumns={14}
      keyExtractor={(item) => item.index}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  heatmapCell: {
    width: 15,
    height: 15,
    borderRadius: 3,
    margin: 2,
  },
  day: {
    marginHorizontal: 0,
    fontSize: 8,
  },
  month: {
    fontSize: 8,
    marginRight: 0,
  },
});

export default YearlyHeatmap;
