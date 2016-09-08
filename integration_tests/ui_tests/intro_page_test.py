import pytest
from selenium.webdriver.support.ui import Select

from components import click_on_nth_menu
from browser_fixture import BaseBrowser, get_browser_fixture_of_class

class IntroPageBrowser(BaseBrowser):
    def click_on_nth_menu(self, nth):
        return click_on_nth_menu(self, nth)

    def get_search_bar(self):
        return self.find_element_by_class_name('searchbar-form')

    def type_into_search_input(self, text):
        input_box = self.get_search_bar().find_element_by_tag_name('input')
        input_box.clear()
        input_box.send_keys(text)

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

def test_there_is_search_bar(intro_page_browser):
    search_bar = intro_page_browser.get_search_bar()

    input_box = intro_page_browser.get_search_bar().find_element_by_tag_name('input')
    assert input_box.get_attribute('placeholder') == 'I feel like having...'

    dropdown = Select(search_bar.find_element_by_tag_name('select'))
    options_text = [opt.text for opt in dropdown.options]
    assert options_text == ['All', 'American', 'Chinese', 'French', 'Indian']


def test_search_bar_updates_menu_list_by_name(intro_page_browser):
    # alisa types 'menu' into the search bar input form
    intro_page_browser.type_into_search_input('menu')

    # both menus are shown
    assert 'Demo Menu 0' in intro_page_browser.body_text
    assert 'Demo Menu 1' in intro_page_browser.body_text

    # type in menu 0, only first menu is shown
    intro_page_browser.type_into_search_input('menu 0')
    assert 'Demo Menu 0' in intro_page_browser.body_text
    assert 'Demo Menu 1' not in intro_page_browser.body_text

    # type in menu 1, only second menu is shown
    intro_page_browser.type_into_search_input('menu 1')
    assert 'Demo Menu 0' not in intro_page_browser.body_text
    assert 'Demo Menu 1' in intro_page_browser.body_text

    # type in menu 2, neither menus are shown
    intro_page_browser.type_into_search_input('menu 2')
    assert 'Demo Menu 0' not in intro_page_browser.body_text
    assert 'Demo Menu 1' not in intro_page_browser.body_text


def test_search_bar_udpates_menu_list_by_description(intro_page_browser):
    # alisa types in part of a menu description into search box
    intro_page_browser.type_into_search_input('description')

    # both menus are shown
    assert 'Demo Menu 0' in intro_page_browser.body_text
    assert 'Demo Menu 1' in intro_page_browser.body_text

    # alisa searches for desction 0, only first menu is shown
    intro_page_browser.type_into_search_input('description 0')
    assert 'Demo Menu 0' in intro_page_browser.body_text
    assert 'Demo Menu 1' not in intro_page_browser.body_text

    # type in description 1, only second menu is shown
    intro_page_browser.type_into_search_input('description 1')
    assert 'Demo Menu 0' not in intro_page_browser.body_text
    assert 'Demo Menu 1' in intro_page_browser.body_text

    # type in description 2, neither are shown
    intro_page_browser.type_into_search_input('description 2')
    assert 'Demo Menu 0' not in intro_page_browser.body_text
    assert 'Demo Menu 1' not in intro_page_browser.body_text


def test_search_bar_updates_menu_list_by_cuisine(intro_page_browser):
    assert 'Demo Menu 0' in intro_page_browser.body_text
    assert 'Demo Menu 1' in intro_page_browser.body_text

    select = Select(intro_page_browser.get_search_bar().find_element_by_tag_name('select'))

    # choose American, only first menu is shown
    select.select_by_visible_text('American')
    assert 'Demo Menu 0' in intro_page_browser.body_text
    assert 'Demo Menu 1' not in intro_page_browser.body_text

    # choose Chinese, only second menu is shown
    select.select_by_visible_text('Chinese')
    assert 'Demo Menu 0' not in intro_page_browser.body_text
    assert 'Demo Menu 1' in intro_page_browser.body_text

    # choose All, both menus are shown
    select.select_by_visible_text('All')
    assert 'Demo Menu 0' in intro_page_browser.body_text
    assert 'Demo Menu 1' in intro_page_browser.body_text

    # choose Indian, neither menus are shown
    select.select_by_visible_text('Indian')
    assert 'Demo Menu 0' not in intro_page_browser.body_text
    assert 'Demo Menu 1' not in intro_page_browser.body_text


def test_has_navbar_with_signup_and_login(browser):
    # find signup and login buttons in navbar
    navbar = browser.find_element_by_class_name('navbar')
    # sign up button links to signup
    signup = navbar.find_element_by_class_name('navbar-buttons__user-signup-btn')
    assert signup.text == 'Sign up'
    signup.click()
    assert '/signup/' in browser.current_url
    browser.back()
    # login button links to login
    login_button = browser.find_element_by_class_name('navbar-buttons__user-login-btn')
    assert login_button.text == 'Log in'
    login_button.click()
    assert '/login/' in browser.current_url
