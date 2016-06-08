## import pytest
import requests

def test_static_files_are_served(live_server):
    response = requests.get(live_server.url + '/static/tests/testy.js')
    assert response.status_code == 200

def test_react_script_loads_successfully_for_index_page(browser):
    assert 'Loading...' not in browser.body_text
    assert 'iChef' in browser.body_text
