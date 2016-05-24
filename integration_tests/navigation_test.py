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

def test_saves_state_between_pages():
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
    assert 'test_name' not in browser.body_text

    # fill in reservation form
    for field, value in user.items():
        browser.find_element_by_name(field).send_keys(value)
    assert 'test_name' in browser.body_text

    # go to next page and back again, booking info is displayed
    browser.find_element_by_xpath('//div[text()="2. Choose Available People"]').click()
    browser.find_element_by_xpath('//div[text()="1. Booking Details"]').click()
    assert 'test_name' in browser.body_text
