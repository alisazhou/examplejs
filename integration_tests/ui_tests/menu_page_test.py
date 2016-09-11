from selenium.webdriver.common.keys import Keys

from ui_mixins import NavigationMixin, NavbarMixin
from browser_fixture import BaseBrowser, setup_pytest_browser_fixture

class MenuPageBrowser(BaseBrowser, NavigationMixin, NavbarMixin):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.from_intro_page_select_menu('Demo Menu 0')

browser = setup_pytest_browser_fixture(MenuPageBrowser)


def test_has_menu_name_in_navbar(browser):
    navbar_title = browser.get_navbar_title_btn()
    assert navbar_title.text == 'Demo Menu 0'


def test_has_menu_image(browser):
    image = browser.find_element_by_tag_name('img')
    assert image.get_attribute('alt') == 'menu image'


def test_has_chef_name_and_description(browser):
    assert 'cuckoo lis' in browser.body_text
    assert 'description 0' in browser.body_text


def test_has_correct_navigation_buttons(browser):
    home_url = browser.host_address + '/'
    # alisa is at the menu page
    # she can click the home icon to go back to the home page
    browser.get_navbar_home_btn().click()
    assert browser.current_url == home_url

    # alisa goes to the intro page
    # she navigates to the menu page
    browser.click_link_text('Demo Menu 0')
    assert browser.current_url != home_url

    # she finds and clicks a back button on the menu page
    browser.find_element_by_xpath('//a/button[text()="Back"]').click()

    # she returns to the intro page
    assert browser.current_url == home_url
    assert 'How many guests?' not in browser.body_text


def test_can_save_specified_order_attrs(browser):
    # fill order form, go to next page
    browser.from_menu_page_fill_form_and_submit('5 ~ 6', 'Sat 7pm')
    # go back to menu page, order attributes are preserved
    browser.find_element_by_xpath('//a/button[text()="Back"]').click()
    attrs = browser.find_element_by_class_name('menu_page--attributes')
    party_size = browser.get_order_party_size_select()
    assert '5 ~ 6' in party_size.first_selected_option.text
    party_time = attrs.find_element_by_tag_name('input')
    assert party_time.get_attribute('value') == 'Sat 7pm'


def test_performs_form_validation(browser):
    # no error msg shown
    assert 'select the number of guests' not in browser.body_text
    assert 'specify a time' not in browser.body_text
    # not fill in form, click on next button, remain on the same page
    next_btn = browser.find_element_by_xpath('//button[text()="Next"]')
    next_btn.click()
    assert '/menus/0' in browser.current_url
    # sees error messages for both fields
    assert 'select the number of guests' in browser.body_text
    assert 'specify a time' in browser.body_text
    # select party size, click on next button, remain on the same page
    browser.from_menu_page_fill_form_and_submit('3 ~ 4', '', expect_fail=True)
    assert '/menus/0' in browser.current_url
    # sees error message for only date time
    assert 'select the number of guests' not in browser.body_text
    assert 'specify a time' in browser.body_text
    # fill date time, click on next button, land on /reservation
    browser.from_menu_page_fill_form_and_submit('3 ~ 4', 'Fri 4pm', expect_fail=True)
    assert '/reservation' in browser.current_url
    assert 'Mobile' in browser.body_text


def test_disable_query_submit_on_enter_press(browser):
    # click on input, press enter
    party_time = browser.find_element_by_tag_name('input')
    party_time.send_keys(Keys.ENTER)
    # does not send get request to server, stays on same page
    assert 'dateTime=' not in browser.current_url
    assert '/menus/0' in browser.current_url
    assert 'Demo Menu 0' in browser.body_text

