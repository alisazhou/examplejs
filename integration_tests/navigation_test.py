
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
    pass
