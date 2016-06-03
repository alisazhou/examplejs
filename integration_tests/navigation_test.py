import pytest


def test_can_use_progress_bar_to_navigate(browser):
    browser.goto('/')
    # click on button inside of intro page
    browser.find_element_by_xpath('//button[text()[contains(.,"Book Now")]]').click()

    # click on navbar
    browser.find_element_by_xpath('//div[text()="2. Choose Available People"]').click()
    assert 'Reservation Details' not in browser.body_text

    # return to booking reservation page using navbar
    browser.find_element_by_xpath('//div[text()="1. Booking Details"]').click()
    assert 'Reservation Details' in browser.body_text


def test_saves_state_between_pages(browser):
    browser.goto('/')
    # click on button inside of intro page
    browser.find_element_by_xpath('//button[text()[contains(.,"Book Now")]]').click()
    booking = {
        "name": "test_name",
        "tel": "test_tel",
        "address": "test_address",
        "time": "test_time",
    }
    # no booking info displayed before filling in form
    for field_label in booking.keys():
        field = browser.find_element_by_name(field_label)
        field_text = field.get_attribute('value')
        assert field_text == ''

    # fill in reservation form
    for field_label, value in booking.items():
        field = browser.find_element_by_name(field_label)
        field.send_keys(value)
        browser.implicitly_wait(1)
        assert value in field.get_attribute('value')

    # go to next page and back again, booking info is preserved
    browser.find_element_by_xpath('//div[text()="2. Choose Available People"]').click()
    browser.find_element_by_xpath('//div[text()="1. Booking Details"]').click()
    for field_label, value in booking.items():
        field = browser.find_element_by_name(field_label)
        field_text = field.get_attribute('value')
        assert field_text == value
