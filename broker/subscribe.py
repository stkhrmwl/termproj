# -*- coding: utf-8 -*- 

import env
import json
import MySQLdb
import paho.mqtt.client as mqtt
import sys
import time

MQTT_TOPIC = 'conditions/takahara'

def on_connect(client, userdata, flag, rc):
    print("Connected with result code " + str(rc))
    client.subscribe(MQTT_TOPIC)

def on_disconnect(client, userdata, flag, rc): 
    if  rc != 0:
        print("Unexpected disconnection.")

def on_message(client, userdata, msg):
    print("Received message " +  str(msg.payload.decode()) + " on topic " + msg.topic + " with QoS " + str(msg.qos))
    dec = json.loads(msg.payload.decode())
    cur.execute("""
        INSERT INTO temp_dumps (subscribed_at, topic, value)
        VALUES (%s, %s, %s)
        """, (time.time(), MQTT_TOPIC, dec['val']))
    con.commit()

con = MySQLdb.connect( 
    user=env.MYSQL_USER,
    passwd=env.MYSQL_PASSWORD,
    host=env.MYSQL_HOST,
    db=env.MYSQL_DB,
    charset='utf8')
cur = con.cursor()

client = mqtt.Client()
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message
client.connect('localhost', 1883, 60)
client.loop_forever()

# con.close()  