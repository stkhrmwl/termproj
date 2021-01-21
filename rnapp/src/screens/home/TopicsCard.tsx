import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CardTitle from '../components/CardTitle';
import BoxButton from '../components/BoxButton';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 192,
    backgroundColor: '#fff',
  },
});

interface Props {
  height: number;
  topicNames: string[];
  navigation: any;
}

const TopicsCard = (props: Props) => {
  const { height, topicNames, navigation } = props;
  return (
    <View style={[styles.container, { height: height }]}>
      <CardTitle title={'トピックス'} />
      {topicNames.map((topicName, index) => {
        return (
          <View key={index}>
            <View style={{ margin: 4 }} />
            <BoxButton
              title={topicName}
              onPress={() =>
                navigation.navigate('Detail', { topicName: topicName })
              }
            />
          </View>
        );
      })}
    </View>
  );
};

export default TopicsCard;
