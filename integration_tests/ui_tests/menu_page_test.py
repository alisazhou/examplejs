import pytest
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select

from browser_fixture import BaseBrowser, get_browser_fixture_of_class

class MenuPageBrowser(BaseBrowser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.click_link_text('Demo Menu 0')

    def fill_order_form_and_submit(self, size_option, time_input):
        attrs = self.find_element_by_class_name('menu_page--attributes')
        party_size = Select(attrs.find_element_by_tag_name('select'))
        party_size.select_by_visible_text(size_option)
        party_time = attrs.find_element_by_tag_name('input')
        party_time.send_keys(time_input)
        self.find_element_by_xpath('//button[text()="Next"]').click()



menu_page_browser = get_browser_fixture_of_class(MenuPageBrowser)
pytest.yield_fixture()(menu_page_browser)


def test_has_menu_name_in_navbar(menu_page_browser):
    navbar_title = menu_page_browser.find_element_by_css_selector('button.navbar-buttons__title-btn')
    assert navbar_title.text == 'Demo Menu 0'


def test_has_menu_image(menu_page_browser):
    image = menu_page_browser.find_element_by_tag_name('img')
    assert image.get_attribute('alt') == 'menu image'


def test_has_chef_name_and_description(menu_page_browser):
    assert 'cuckoo lis' in menu_page_browser.body_text
    assert 'description 0' in menu_page_browser.body_text


def test_has_back_btn_to_intro_page(browser):
    # start at intro page, get url
    starting_url = browser.current_url
    browser.click_link_text('Demo Menu 0')
    assert browser.current_url != starting_url
    # find Back btn, click on it, land back on intro page
    browser.find_element_by_xpath('//a/button[text()="Back"]').click()
    assert browser.current_url == starting_url
    assert 'How many guests?' not in browser.body_text


def test_can_save_specified_order_attrs(menu_page_browser):
    # fill order form, go to next page
    menu_page_browser.fill_order_form_and_submit('5 ~ 6', 'Sat 7pm')
    # go back to menu page, order attributes are preserved
    menu_page_browser.find_element_by_xpath('//a/button[text()="Back"]').click()
    attrs = menu_page_browser.find_element_by_class_name('menu_page--attributes')
    party_size = Select(attrs.find_element_by_tag_name('select'))
    assert '5 ~ 6' in party_size.first_selected_option.text
    party_time = attrs.find_element_by_tag_name('input')
    assert party_time.get_attribute('value') == 'Sat 7pm'


def test_performs_form_validation(menu_page_browser):
    # no error msg shown
    assert 'select the number of guests' not in menu_page_browser.body_text
    assert 'specify a time' not in menu_page_browser.body_text
    # not fill in form, click on next button, remain on the same page
    next_btn = menu_page_browser.find_element_by_xpath('//button[text()="Next"]')
    next_btn.click()
    assert '/menus/0' in menu_page_browser.current_url
    # sees error messages for both fields
    assert 'select the number of guests' in menu_page_browser.body_text
    assert 'specify a time' in menu_page_browser.body_text
    # select party size, click on next button, remain on the same page
    menu_page_browser.fill_order_form_and_submit('3 ~ 4', '')
    assert '/menus/0' in menu_page_browser.current_url
    # sees error message for only date time
    assert 'select the number of guests' not in menu_page_browser.body_text
    assert 'specify a time' in menu_page_browser.body_text
    # fill date time, click on next button, land on /reservation
    menu_page_browser.fill_order_form_and_submit('3 ~ 4', 'Fri 4pm')
    assert '/reservation' in menu_page_browser.current_url
    assert 'Mobile' in menu_page_browser.body_text


def test_disable_query_submit_on_enter_press(menu_page_browser):
    # click on input, press enter
    party_time = menu_page_browser.find_element_by_tag_name('input')
    party_time.send_keys(Keys.ENTER)
    # does not send get request to server, stays on same page
    assert 'dateTime=' not in menu_page_browser.current_url
    assert '/menus/0' in menu_page_browser.current_url
    assert 'Demo Menu 0' in menu_page_browser.body_text
