# -*- coding: utf-8 -*- 

import datetime
import env
import firebase_admin as admin
from firebase_admin import firestore
import json
import MySQLdb
import sys
import time

def post_dumps_to_firestore(collection_name, data):
    db = firestore.client()
    db.collection('topics/' + collection_name).document(
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')).set(data)
    print('Posted')

def post_topic_names_to_firestore(target_name):
    db = firestore.client()
    doc = db.collection('topics').document('_names').get()
    arr = doc.to_dict()['names']
    if target_name in arr:
        return
    arr.append(target_name)
    db.collection('topics').document('_names').update({'names': arr})

# TODO: proc on cloud
def count_sas_on_firestore(collection_name):
    db = firestore.client()
    doc = db.collection('topics/' + collection_name).document('_sas').get()
    sas_count = doc.to_dict()['d0']
    db.collection('topics/' + collection_name).document('_sas').update({'d0': sas_count+1})

con = MySQLdb.connect(  
    user=env.MYSQL_USER,
    passwd=env.MYSQL_PASSWORD,
    host=env.MYSQL_HOST,
    db=env.MYSQL_DB,
    charset='utf8')
cur = con.cursor()

admin.initialize_app(
    admin.credentials.Certificate(
        json.load(open('private-cred.json', 'r'))))

last_posting_time = time.time()
posting_interval = 10

collection_names = []
jsons = {}

while True:
    if time.time() - posting_interval > last_posting_time:

        hasCountedSas = False # Delete

        cur.execute("SELECT * FROM temp_dumps")
        con.commit()
        result = cur.fetchall()
        for row in result:
            if not row[1] in collection_names:
                post_topic_names_to_firestore(row[1])
                collection_names.append(row[1])
                jsons[row[1]] = []
            jsons[row[1]].append({'time': row[0], 'value': row[2]})

            if row[2] > 14000: # Delete
                hasCountedSas = True

        print(jsons)
        del_limit = len(result)
        cur.execute("DELETE FROM temp_dumps LIMIT " + str(del_limit))
        con.commit()

        for collection_name in collection_names:

            if hasCountedSas:
                count_sas_on_firestore(collection_name)

            post_dumps_to_firestore(collection_name, {'dumps': jsons[collection_name]})
            jsons[collection_name] = []

        last_posting_time = time.time()


# con.close()  