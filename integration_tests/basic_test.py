import pytest
@pytest.mark.skip()
def test_front_page_loads(browser):
    browser.goto('/')
    assert 'sexy page' in browser.body_text

import requests
def test_can_have_js_test(live_server):
    response = requests.get(live_server.url + '/static/tests/testy.js')
    assert response.status_code == 200
