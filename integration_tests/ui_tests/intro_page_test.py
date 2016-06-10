import pytest

from components import click_on_nth_menu
from browser_fixture import BaseBrowser, get_browser_fixture_of_class

class IntroPageBrowser(BaseBrowser):
    def click_on_nth_menu(self, nth):
        return click_on_nth_menu(self, nth)

intro_page_browser = get_browser_fixture_of_class(IntroPageBrowser)
pytest.yield_fixture()(intro_page_browser)



def test_has_search_bar(browser):
    search_bar = browser.find_element_by_id('search')
    assert search_bar.get_attribute('placeholder') == 'search'

def test_links_to_menu_details(browser):
    link_menu_details = browser.find_elements_by_class_name('menu-list')
    assert len(link_menu_details) >= 1

def test_displays_menus_that_go_to_menu_page(intro_page_browser):
    # click on first menu detail link
    intro_page_browser.click_on_nth_menu(0)
    assert 'Demo Menu 0' in intro_page_browser.body_text
    assert '/menus/0' in intro_page_browser.current_url

    intro_page_browser.back()
    # click on second menu detail link
    intro_page_browser.click_on_nth_menu(1)
    assert 'Demo Menu 1' in intro_page_browser.body_text
