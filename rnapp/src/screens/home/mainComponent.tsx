import React, { Fragment, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

// componensts
import TopicsCard from './TopicsCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
  },
});

const HomeScreen = (props: any) => {
  const { navigation } = props;

  const [topicsCardHeight, setTopicsCardHeight] = useState<number>(42);
  const [topicNames, setTopicNames] = useState<string[]>([]);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('topics')
      .doc('_names')
      .onSnapshot((doc: any) => {
        setTopicNames(doc.data().names);
      });
    setTopicsCardHeight(42 + topicNames.length * 42);
  }, [topicsCardHeight, topicNames]);

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <TopicsCard
          height={topicsCardHeight}
          topicNames={topicNames}
          navigation={navigation}
        />
        <Text>容態監視ダッシュボード ./ プロトタイプ</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Fragment>
  );
};

export default HomeScreen;
