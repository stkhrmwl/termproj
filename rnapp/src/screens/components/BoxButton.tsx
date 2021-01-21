import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationState } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface Props {
  title: string;
  onPress: any;
}

const BoxButton = (props: Props) => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default BoxButton;
