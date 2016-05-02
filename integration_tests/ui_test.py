
def test_can_go_to_different_pages(browser):
    browser.goto('/')
    assert 'Welcome' in browser.body_text
    assert '+852' not in browser.body_text
    # click on footer contact us link
    browser.find_element_by_xpath('//a[@href="#"][text()[contains(.,"Contact")]]').click()
    assert 'Welcome' not in browser.body_text
    assert '+852' in browser.body_text
    # click on footer main intro page link
    browser.find_element_by_xpath('//a[@href="#"][text()[contains(.,"Main")]]').click()
    assert 'Welcome' in browser.body_text
    assert '+852' not in browser.body_text

def test_make_reservations(browser):
    browser.goto('/')
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
    assert 'seller--selected' in seller_div.get_attribute("class")
    # now the next button is enabled

    # click next
    # browser.find_element_by_css_selector('input[type="button"]').click()

    # select details based on availability
