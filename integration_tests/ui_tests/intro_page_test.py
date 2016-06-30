import pytest
from selenium.common.exceptions import NoSuchElementException

from components import click_on_nth_menu, click_on_option_by_text
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
    dropdown = search_bar.find_element_by_tag_name('select')
    options = dropdown.find_elements_by_tag_name('option')
    assert len(options) == 5
    options_text = [opt.text for opt in options]
    assert options_text == [ 'All', 'American', 'Chinese', 'French', 'Indian' ]

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

def test_search_bar_udpates_menu_list_by_description(browser):
    # find search bar input
    input_box = browser.find_element_by_css_selector('.search-bar input')
    # type in "description", both menus are shown
    input_box.send_keys('description')
    filtered_menus = browser.find_elements_by_class_name('menu-list--item')
    assert len(filtered_menus) == 2
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' in browser.body_text
    # type in description 0, only first menu is shown
    input_box.clear()
    input_box.send_keys('description 0')
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text
    # type in description 1, only second menu is shown
    input_box.clear()
    input_box.send_keys('description 1')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' in browser.body_text
    # type in description 2, neither are shown
    input_box.clear()
    input_box.send_keys('description 2')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text

def test_search_bar_updates_menu_list_by_cuisine(browser):
    # find search bar select and options
    select = browser.find_element_by_css_selector('.search-bar select')
    options = select.find_elements_by_tag_name('option')
    # choose American, only first menu is shown
    select.click()
    click_on_option_by_text(options, 'American')
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text
    # choose Chinese, only second menu is shown
    select.click()
    click_on_option_by_text(options, 'Chinese')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' in browser.body_text
    # choose All, both menus are shown
    select.click()
    click_on_option_by_text(options, 'All')
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' in browser.body_text
    # choose French, both menus are shown
    select.click()
    click_on_option_by_text(options, 'French')
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' in browser.body_text
    # choose Indian, neither menus are shown
    select.click()
    click_on_option_by_text(options, 'Indian')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text

def test_has_navbar_with_signup_and_login(browser):
    # find signup and login buttons in navbar
    navbar = browser.find_element_by_class_name('navbar')
    # sign up button links to signup
    signup = browser.find_element_by_class_name('signup_btn')
    assert signup.text == 'Sign up'
    signup.click()
    assert '/signup/' in browser.current_url
    browser.back()
    # login button links to login
    login_button = browser.find_element_by_class_name('login_btn')
    assert login_button.text == 'Log in'
    login_button.click()
    assert '/login/' in browser.current_url
