import React, { useState, useEffect, Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

// components
import SasCard from './SasCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
  },
});

interface Props {
  navigation: any;
  route: any;
}

const DetailScreen = (props: Props) => {
  const { navigation, route } = props;
  const { topicName } = route.params;

  const [sasCounts, setSasCounts] = useState<number[]>([]);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('topics/' + topicName)
      .doc('_sas')
      .get()
      .then((doc: any) => {
        setSasCounts([doc.data().d2, doc.data().d1, doc.data().d0]);
      });
  }, [sasCounts]);

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <SasCard datasets={sasCounts} />
        <Text>容態監視ダッシュボード ./ プロトタイプ</Text>
      </SafeAreaView>
    </Fragment>
  );
};

export default DetailScreen;
