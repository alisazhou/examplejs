## import pytest
import requests

def test_static_files_are_served(live_server):
    response = requests.get(live_server.url + '/static/tests/testy.js')
    assert response.status_code == 200

def test_index_page_executes_react_script_correctly(browser):
    assert 'Loading...' not in browser.body_text
    assert 'iChef' in browser.body_text
