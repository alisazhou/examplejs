
import requests

try:
    print('testing if there is external internet access')
    resp = requests.get('https://google.com')
    OFFLINE = (resp.status_code != 200)
except Exception as e:
    OFFLINE = True
print('OFFLINE = {}'.format(OFFLINE))

URLS = {
    'intro': r'/$',
    'menu': r'/menus/[0-9]+/$',
    'reservation': r'/reservation/$',
    'signup': r'/signup/$',
    'login': r'/login/$',
}
USE_PHANTOMJS = True
