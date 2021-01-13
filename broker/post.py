# -*- coding: utf-8 -*- 

import datetime
import env
import firebase_admin as admin
from firebase_admin import firestore
import json
import MySQLdb
import sys
import time

def post_to_firestore(collection_name, data):
    db = firestore.client()
    db.collection('topics/' + collection_name).document(
        datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')).set(data)
    print('Posted')
 
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
posting_interval = 30

collection_names = []
jsons = {}

while True:
    if time.time() - posting_interval > last_posting_time:
        cur.execute("SELECT * FROM temp_dumps")
        con.commit()
        result = cur.fetchall()
        for row in result:
            if not row[1] in collection_names:
                collection_names.append(row[1])
                jsons[row[1]] = []
            jsons[row[1]].append({'time': row[0], 'value': row[2]})
        print(jsons)
        del_limit = len(result)
        cur.execute("DELETE FROM temp_dumps LIMIT " + str(del_limit))
        con.commit()

        for collection_name in collection_names:
            post_to_firestore(collection_name, {'dumps': jsons[collection_name]})
            jsons[collection_name] = []

        last_posting_time = time.time()


# con.close()  