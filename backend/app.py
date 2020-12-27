#!/usr/bin/env python
from dotenv import load_dotenv
from threading import Lock
from flask import Flask, render_template, session, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import time

#import gpt3

async_mode = None  # "threading", "eventlet" or "gevent", None=autochoose
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode, cors_allowed_origins='*')
cors = CORS(app)
thread = None
thread_lock = Lock()


def background_thread():
    socketio.sleep(10)
    socketio.emit('my_response', {'data': 'Server generated event'})
    while True:
        socketio.sleep(60)


@socketio.on('completion_request')
def receive_gpt3_request(message):
    print("IVE BEEN SUMMONED")
    #session['receive_count'] = session.get('receive_count', 0) + 1
    prompt_str = message['prompt']

    temperature = message['temperature']
    max_tokens = message['max_tokens']
    top_p = message['top_p']
    frequency_penalty = message['frequency_penalty']
    presence_penalty = message['presence_penalty']


    print('promtp', prompt_str)
    print(temperature, max_tokens, top_p, frequency_penalty, presence_penalty)
    print('---------------------')

    # completion = gpt3.gpt3_complete(
    #     prompt_str, 
    #     stops=['\n'], 
    #     max_tokens=max_tokens, 
    #     temperature=temperature, 
    #     engine='davinci',
    #     max_completions=1)
    
    completion = 'this is a completion from the server'    
    print('the completion', completion)
    
    message = {'data': completion}
    emit('completion', message, broadcast=False)


@socketio.on('connect')
def test_connect():
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)
    emit('my_response', {'data': 'Connected', 'count': 0})


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected', request.sid)


@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

if __name__ == '__main__':
    socketio.run(app)

