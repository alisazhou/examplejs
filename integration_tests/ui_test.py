## import pytest

def test_can_go_to_different_pages(browser):
    browser.goto('/')
    assert 'Welcome' in browser.body_text
    assert '+852' not in browser.body_text
    browser.find_element_by_xpath('//a[@href="#"][text()[contains(.,"Contact")]]').click()
    assert 'Welcome' not in browser.body_text
    assert '+852' in browser.body_text
    browser.find_element_by_xpath('//a[@href="#"][text()[contains(.,"Main")]]').click()
    assert 'Welcome' in browser.body_text
    assert '+852' not in browser.body_text

def test_make_reservations(browser):
    browser.goto('/')
    browser.find_element_by_xpath('//button[text()[contains(.,"Book Now")]]').click()
    assert 'Reservation Details' in browser.body_text
    # click and choose options
    # click next
    # see availability
    # select details based on availability
