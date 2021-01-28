#!/usr/bin/env python
from recognition import detect_hand
from storage import Storage

import os
import numpy as np
import cv2
import json
from bottle import *
import asyncio
import websockets
import json
from array import array
import time



BaseRequest.MEMFILE_MAX = 1e8
app = Bottle()

def read_image(binary_data):
    img_array = np.asarray(binary_data, dtype=np.uint8)
    image_data = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    if image_data is None:
        raise Exception('Unable to decode posted image!')
    return image_data


def read_data_uri(uri):
    encoded_data = uri.split(',')[1]
    nparr = np.fromstring(encoded_data.decode('base64'), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img


async def handler(websocket, path):
    global last_tuple_timestamp

    while True:
        try:
            message = await websocket.recv()
            # message = array("B", message)
            # print(message)
            # message = json.dumps(message)
            #if message:
                #print("Got message of len {}".format(len(message)))
            #print(type(message) is bytes)
            if type(message) is bytes:
                image_data = read_image(bytearray(message))
                data = detect_hand.process(image_data)
                if data != None:
                    Storage.add_triples([data["palm"]["x"], data["palm"]["y"], data["palm"]["r"]],
                                        [data["skinColor"]["r"], data["skinColor"]["g"], data["skinColor"]["b"]],
                                        data["fingers"], data["gesture"])
                    Storage.save_graph()
                    await websocket.send(json.dumps(data))

                    #print(data)
            else:
                image_data = read_data_uri(message)
                data = detect_hand.process(image_data)
                await websocket.send(json.dumps(data))
                s = time.time()
                print(s)
        except Exception as err:
            print(err)
            continue



start_server = websockets.serve(handler, "127.0.0.1", 8000)

print("Server started on 127.0.0.1, port = 8000")

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
