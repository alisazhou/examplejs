from selenium.webdriver.support.ui import Select

from ui_mixins import NavigationMixin, SearchBarMixin, NavbarMixin, MenuListMixin
from browser_fixture import BaseBrowser, setup_pytest_browser_fixture

class IntroPageBrowser(NavigationMixin, SearchBarMixin, MenuListMixin, NavbarMixin, BaseBrowser):
    pass

browser = setup_pytest_browser_fixture(IntroPageBrowser)


def test_links_to_menu_details(browser):
    link_menu_details = browser.find_elements_by_class_name('menu-list--item')
    assert len(link_menu_details) == 2
    assert 'Demo Menu 0' in link_menu_details[0].text
    assert 'Demo Menu 1' in link_menu_details[1].text

def test_displays_menus_that_go_to_menu_page(browser):
    # click on first menu detail link
    browser.click_on_nth_menu(0)
    assert 'Demo Menu 0' in browser.body_text
    assert '/menus/0' in browser.current_url
    browser.back()
    # click on second menu detail link
    browser.click_on_nth_menu(1)
    assert 'Demo Menu 1' in browser.body_text

def test_there_is_search_bar(browser):
    search_bar = browser.get_search_bar()

    input_box = browser.get_search_bar().find_element_by_tag_name('input')
    assert input_box.get_attribute('placeholder') == 'I feel like having...'

    dropdown = Select(search_bar.find_element_by_tag_name('select'))
    selected = dropdown.all_selected_options
    assert len(selected) == 1
    assert selected[0].text == 'All Cuisines'

    options_texts = [opt.text for opt in dropdown.options]
    for expected_text in ['All Cuisines', 'American', 'Chinese', 'French', 'Indian']:
        assert expected_text in options_texts


def test_search_bar_updates_menu_list_by_name(browser):
    # alisa types 'menu' into the search bar input form
    browser.type_into_search_input('menu')

    # both menus are shown
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' in browser.body_text

    # type in menu 0, only first menu is shown
    browser.type_into_search_input('menu 0')
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text

    # type in menu 1, only second menu is shown
    browser.type_into_search_input('menu 1')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' in browser.body_text

    # type in menu 2, neither menus are shown
    browser.type_into_search_input('menu 2')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text


def test_search_bar_udpates_menu_list_by_description(browser):
    # alisa types in part of a menu description into search box
    browser.type_into_search_input('description')

    # both menus are shown
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' in browser.body_text

    # alisa searches for desction 0, only first menu is shown
    browser.type_into_search_input('description 0')
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text

    # type in description 1, only second menu is shown
    browser.type_into_search_input('description 1')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' in browser.body_text

    # type in description 2, neither are shown
    browser.type_into_search_input('description 2')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text


def test_search_bar_updates_menu_list_by_cuisine(browser):
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' in browser.body_text

    select = Select(browser.get_search_bar().find_element_by_tag_name('select'))

    # choose American, only first menu is shown
    select.select_by_visible_text('American')
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text

    # choose Chinese, only second menu is shown
    select.select_by_visible_text('Chinese')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' in browser.body_text

    # choose All, both menus are shown
    select.select_by_visible_text('All Cuisines')
    assert 'Demo Menu 0' in browser.body_text
    assert 'Demo Menu 1' in browser.body_text

    # choose Indian, neither menus are shown
    select.select_by_visible_text('Indian')
    assert 'Demo Menu 0' not in browser.body_text
    assert 'Demo Menu 1' not in browser.body_text


def test_navbar_works_correctly(browser):
    # alisa goes to the intro page and sees a navbar
    browser.get_navbar_div()
    # she sees that the navbar does not have a title
    # (but need a textless button there so that the css spacing is correct)
    assert browser.get_navbar_title_btn().text == ''

    # she sees a sign up button with the appropriate text
    signup_button = browser.get_navbar_signup_btn()
    signup_button.text == 'Sign up'
    # she clicks on it
    signup_button.click()
    # and is taken to the signup page
    browser.assert_on_page('signup')

    # she goes back and sees a login button
    browser.back()
    login_button = browser.get_navbar_login_btn()
    login_button.text == 'Log in'
    # she clicks on it
    login_button.click()
    # she is taken to the login page
    browser.assert_on_page('login')
