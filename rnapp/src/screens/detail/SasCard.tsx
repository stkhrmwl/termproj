import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

// components
import CardTitle from '../components/CardTitle';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 268,
    backgroundColor: '#fff',
  },
});

const SasCard = (props: any) => {
  const { datasets } = props;

  const data = {
    labels: ['Today - 2', 'Today - 1', 'Today'],
    datasets: [
      {
        data: datasets,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#021b19',
    backgroundGradientFrom: '#251711',
    backgroundGradientTo: '#675534',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <CardTitle title={'無呼吸検知回数'} />
      <View style={{ margin: 4 }} />
      <BarChart
        style={{ marginHorizontal: 16, borderRadius: 16 }}
        data={data}
        width={Dimensions.get('screen').width - 32}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default SasCard;
