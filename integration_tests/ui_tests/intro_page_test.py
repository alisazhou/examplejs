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

def test_there_is_search_bar(browser):
    search_bar = browser.find_element_by_class_name('search-bar')
    input_box = search_bar.find_element_by_tag_name('input')
    assert input_box.get_attribute('placeholder') == 'I feel like having...'

def test_search_bar_updates_menu_list_by_name(browser):
    # find search bar input
    input_box = browser.find_element_by_css_selector('.search-bar input')
    # type in "menu", both menus are shown
    input_box.send_keys('menu')
    filtered_menus = browser.find_elements_by_class_name('menu-list--item')
    assert len(filtered_menus) == 2
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' in browser.body_text
    # type in menu 0, only first menu is shown
    input_box.clear()
    input_box.send_keys('menu 0')
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text
    # type in menu 1, only second menu is shown
    input_box.clear()
    input_box.send_keys('menu 1')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' in browser.body_text
    # type in menu 2, neither menus are shown
    input_box.clear()
    input_box.send_keys('menu 2')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text

@pytest.mark.skip('not yet implemented')
def test_search_bar_udpates_menu_list_by_description(browser):
    pass
    # find search bar input, type in "description", both menus are shown
    # type in description 0, only first menu is shown
    # type in description 1, only second menu is shown
    # type in description 2, neither are shown
