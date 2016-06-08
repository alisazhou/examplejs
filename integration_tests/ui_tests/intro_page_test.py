def test_ichef_in_header(browser):
    assert 'iChef' in browser.body_text

def test_search_bar(browser):
    search_bar = browser.find_element_by_id('search')
    assert search_bar.get_attribute('placeholder') == 'search'

def test_links_to_menu_details(browser):
    link_menu_details = browser.find_elements_by_class_name('router-link')
    assert len(link_menu_details) >= 1

def test_can_go_to_menu_details(browser):
    # click on first menu details link
    browser.click_link_id('menu_0')
    assert '/menus/0' in browser.current_url
