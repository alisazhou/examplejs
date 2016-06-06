def test_has_menu_names_in_header(browser):
    # click on first menu detail link
    browser.click_link_id('menu_0')
    assert 'Demo Menu 0' in browser.body_text
    browser.back()
    # click on second menu detail link
    browser.click_link_id('menu_1')
    assert 'Demo Menu 1' in browser.body_text
