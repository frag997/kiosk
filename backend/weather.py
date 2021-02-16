from flask import Flask, Blueprint
import requests, os, json

from dotenv import load_dotenv

urls_blueprint = Blueprint('urls', __name__,)

@urls_blueprint.route('/weather', methods=['POST'])
def call_darsky_api():
    _api_key = os.getenv('DARKSKY_API_KEY')
    lat = 33.350616
    lon = -115.729622
    api_url = f'https://api.darksky.net/forecast/{temp_key}/${lat},${lon}'
    response = requests.get(api_url)
    print('call_darksky_api')
    print(api_url)
    print(response)
    result = json.loads(response)
    return result

    