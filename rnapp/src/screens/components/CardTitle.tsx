import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  underline: {
    marginTop: 4,
    width: '100%',
    height: 1,
    backgroundColor: '#D0D0D0',
  },
});

interface Props {
  title: string;
}

const CardTitle = (props: Props) => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.underline}></View>
    </View>
  );
};

export default CardTitle;
