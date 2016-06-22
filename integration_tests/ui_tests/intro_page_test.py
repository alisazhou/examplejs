import pytest
from selenium.common.exceptions import NoSuchElementException

from components import click_on_nth_menu
from browser_fixture import BaseBrowser, get_browser_fixture_of_class

class IntroPageBrowser(BaseBrowser):
    def click_on_nth_menu(self, nth):
        return click_on_nth_menu(self, nth)

intro_page_browser = get_browser_fixture_of_class(IntroPageBrowser)
pytest.yield_fixture()(intro_page_browser)



def test_links_to_menu_details(browser):
    link_menu_details = browser.find_elements_by_class_name('menu-list--item')
    assert len(link_menu_details) == 2
    assert 'Demo Menu 0' in link_menu_details[0].text
    assert 'Demo Menu 1' in link_menu_details[1].text

def test_displays_menus_that_go_to_menu_page(intro_page_browser):
    # click on first menu detail link
    intro_page_browser.click_on_nth_menu(0)
    assert 'Demo Menu 0' in intro_page_browser.body_text
    assert '/menus/0' in intro_page_browser.current_url
    intro_page_browser.back()
    # click on second menu detail link
    intro_page_browser.click_on_nth_menu(1)
    assert 'Demo Menu 1' in intro_page_browser.body_text

def test_search_bar_autocompletes(browser):
    search_bar = browser.find_element_by_class_name('search-bar')
    input_box = search_bar.find_element_by_css_selector('.Select input')
    # before clicking on search, no results are shown
    with pytest.raises(NoSuchElementException):
        browser.find_element_by_class_name('Select-menu-outer')
    # type in "demo", both menus are shown
    input_box.send_keys('demo')
    search_results = browser.find_element_by_class_name('Select-menu-outer')
    assert 'Demo Menu 0' in search_results.text
    assert 'Demo Menu 1' in search_results.text
    # type in 0, only first menu is shown
    input_box.clear()
    input_box.send_keys('0')
    assert 'Demo Menu 0' in search_results.text
    assert 'Demo Menu 1' not in search_results.text
    # type in 1, only second menu is shown
    input_box.clear()
    input_box.send_keys('1')
    assert 'Demo Menu 0' not in search_results.text
    assert 'Demo Menu 1' in search_results.text
    # type in fancy, neither menus are shown
    input_box.clear()
    input_box.send_keys('fancy')
    assert 'Demo Menu 0' not in search_results.text
    assert 'Demo Menu 1' not in search_results.text

def test_search_result_routes_to_menu_page(browser):
    # search for menu 0
    search_bar = browser.find_element_by_class_name('search-bar')
    input_box = search_bar.find_element_by_css_selector('.Select input')
    input_box.send_keys('Demo Menu 0')
    menu = browser.find_element_by_class_name('Select-option')
    menu.click()
    assert '/menus/0' in browser.current_url
