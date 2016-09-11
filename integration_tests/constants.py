
import requests

try:
    resp = requests.get('https://google.com')
    print(resp.status_code)
    print(resp.text)
    OFFLINE = (resp.status_code != 200)
except Exception as e:
    print(e)
    OFFLINE = True

assert OFFLINE == False
