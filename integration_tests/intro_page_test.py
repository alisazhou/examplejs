def test_ichef_in_header(browser):
    browser.goto('/')
    assert 'iChef' in browser.body_text

def test_search_bar(browser):
    browser.goto('/')
    search_bar = browser.find_element_by_id('search')
    assert search_bar.get_attribute('placeholder') == 'search'

def test_links_to_menu_details(browser):
    browser.goto('/')
    link_menu_details = browser.find_elements_by_class_name('router-link')
    assert len(link_menu_details) >= 1

def test_can_go_to_menu_details(browser):
    browser.goto('/')
    # click on first menu details link
    browser.find_element_by_id('menu_0').click()
    assert '/menus/0' in browser.current_url
