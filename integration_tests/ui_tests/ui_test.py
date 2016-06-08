def test_can_go_to_different_pages(browser):
    assert 'iChef' in browser.body_text
    assert '+852' not in browser.body_text
    # click on footer contact us link
    browser.find_element_by_xpath('//a[@href="#"][text()[contains(.,"Contact")]]').click()
    assert 'iChef' not in browser.body_text
    assert '+852' in browser.body_text
    # click on footer main intro page link
    browser.find_element_by_xpath('//a[@href="#"][text()[contains(.,"Main")]]').click()
    assert 'iChef' in browser.body_text
    assert '+852' not in browser.body_text


def test_reservations_page_asks_for_information(browser):
    # click on button inside of intro page
    browser.find_element_by_xpath('//button[text()[contains(.,"Book Now")]]').click()
    # there are four input fields
    all_inputs = browser.find_elements_by_class_name("reservation_detail")
    assert len(all_inputs) == 4
    # ask for name, tel, add, time, with appropriate labels
    name_attr_to_label = {}
    for node in all_inputs:
        name_attr = node.get_attribute("name")
        label = node.find_element_by_xpath('..').text
        name_attr_to_label[name_attr] = label
    expected = {
        "name": "Name:",
        "tel": "Mobile:",
        "address": "Address:",
        "time": "Preferred time:",
    }
    assert name_attr_to_label == expected


def test_seller_page_prompts_to_fill_reservation_form_if_empty(browser):
    browser.find_element_by_xpath('//button[text()[contains(.,"Book Now")]]').click()
    # user is prompted for booking info if reservation form left unfilled
    browser.find_element_by_xpath('//div[text()="2. Choose Available People"]').click()
    assert 'Please specify time and address' in browser.body_text


def test_seller_page_displays_booking_if_reservation_form_filled(browser):
    browser.find_element_by_xpath('//button[text()[contains(.,"Book Now")]]').click()
    # fill reservation form
    booking = {
        "name": "test_name",
        "tel": "test_tel",
        "address": "test_address",
        "time": "test_time",
    }
    for name_attr, value in booking.items():
        browser.find_element_by_name(name_attr).send_keys(value)
    # booking summary displayed on seller page
    browser.find_element_by_xpath('//div[text()="2. Choose Available People"]').click()
    assert "Time: test_time" in browser.body_text
    assert "Address: test_address" in browser.body_text


def test_make_reservations(browser):
    # click on button inside of intro page
    browser.find_element_by_xpath('//button[text()[contains(.,"Book Now")]]').click()
    assert 'Reservation Details' in browser.body_text

    # enter details
    browser.find_element_by_css_selector('input[name="address"]').send_keys('hi')

    # click next
    browser.find_element_by_css_selector('input[type="button"]').click()

    # see availability
    assert 'Reservation Details' not in browser.body_text
    assert 'Choose' in browser.body_text
    # see available sellers
    assert 'vincent' in browser.body_text

    # the next button is disabled
    #
    #
    # no sellers selcted yet
    assert len(browser.find_elements_by_css_selector('div[class="seller--selected"]')) == 0
    # click on one seller
    seller_div = browser.find_element_by_xpath('//div[text()[contains(.,"vincent")]]')
    seller_div.click()
    # it changes color
    assert 'seller--selected' in seller_div.get_attribute('class')
    # now the next button is enabled

    # click next
    # browser.find_element_by_css_selector('input[type="button"]').click()

    # select details based on availability


def test_can_make_payment(browser):
    # click on button inside of intro page
    browser.find_element_by_xpath('//button[text()[contains(.,"Book Now")]]').click()

    # fill in information into form
    #
    #
    # click next to go to availability page
    browser.find_element_by_css_selector('input[type="button"]').click()
    # click on one seller
    seller_div = browser.find_element_by_xpath('//div[text()[contains(.,"vincent")]]')
    # click next to go to payment confirmation page
    browser.find_element_by_css_selector('input[type="button"]').click()

    # see a paypal button
    paypal_button = browser.get_slow_loading_css_element('input[name="submit"]')
    assert 'PayPal' in paypal_button.get_attribute('alt')
    # click on it
    # temporary hack before refactoring
    browser.set_page_load_timeout(30)
    paypal_button.click()
    # we are redirected to paypal site
    assert 'paypal.com' in browser.current_url
