import pytest
from browser_fixture import setup_pytest_browser_fixture

from constants import OFFLINE
from ui_mixins import NavigationMixin, NavbarMixin
from browser_fixture import BaseBrowser

class ResPageBrowser(BaseBrowser, NavigationMixin, NavbarMixin):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.from_intro_page_select_menu('Demo Menu 0')
        self.from_menu_page_fill_form_and_submit('3 ~ 4', 'Sun 1pm')

browser = setup_pytest_browser_fixture(ResPageBrowser)

def test_ordered_menu_is_shown(browser):
    assert '/reservation' in browser.current_url
    order_summary = {
        'Number of guests' :'3 ~ 4',
        'Time': 'Sun 1pm',
        'Menu': 'Demo Menu 0'}
    for label, content in order_summary.items():
        assert label in browser.body_text
        assert content in browser.body_text


def test_has_back_btn_to_menu_page(browser):
    browser.find_element_by_xpath('//a/button[text()="Back"]').click()
    assert '/menus/0' in browser.current_url


    # TODO: put navbar into reservation page
    ## home_url = browser.host_address + '/'
    ## # alisa is at the reservation page
    ## # she can click the home icon to go back to the home page
    ## browser.get_navbar_home_btn().click()
    ## assert browser.current_url == home_url

    ## browser.from_intro_page_select_menu('Demo Menu 0')
    ## self.from_menu_page_fill_form_and_submit('3 ~ 4', 'Sun 1pm')

def test_saves_reservation_detail_between_pages(browser):
    # fill res form, go back to prev page
    browser.from_reservation_page_fill_form_and_submit(
        'alisa', 'az add', 'az tel')
    browser.back()
    # go fwd to res page, reservation details are still shown
    browser.forward()
    name_field = browser.find_element_by_class_name(
        'reservation_form--name')
    assert name_field.get_attribute('value') == 'alisa'
    add_field = browser.find_element_by_class_name(
        'reservation_form--add')
    assert add_field.get_attribute('value') == 'az add'
    tel_field = browser.find_element_by_class_name(
        'reservation_form--tel')
    assert tel_field.get_attribute('value') == 'az tel'


@pytest.mark.skipif(OFFLINE, reason='no internet')
def test_can_make_payment(browser):
    # see a paypal button
    paypal_button = browser.get_slow_loading_css_element('input[name="submit"]')
    assert 'PayPal' in paypal_button.get_attribute('alt')
    # fill in reservation form, and click on paypal btn
    browser.from_reservation_page_fill_form_and_submit('name0', 'address0', 'tel0')
    ## temporary hack before refactoring
    browser.set_page_load_timeout(30)
    paypal_button.click()
    # we are redirected to paypal site
    assert 'paypal.com' in browser.current_url


def test_performs_form_validation(browser):
    # no error msg shown at first
    assert 'Please fill in your name' not in browser.body_text
    assert 'Address is required' not in browser.body_text
    assert 'Contact info is required' not in browser.body_text
    # click on Paypal button, remain on same page
    paypal_button = browser.get_slow_loading_css_element(
        'input[name="submit"]')
    paypal_button.click()
    assert '/reservation' in browser.current_url
    # see error msgs for name, address, and phone
    assert 'Please fill in your name' in browser.body_text
    assert 'Address is required' in browser.body_text
    assert 'Contact info is required' in browser.body_text
    # fill in name, click on Paypal, remain on same page
    browser.from_reservation_page_fill_form_and_submit(
        'alisa', '', '')
    paypal_button.click()
    assert '/reservation' in browser.current_url
    # no more error for name
    assert 'Please fill in your name' not in browser.body_text
    assert 'Address is required' in browser.body_text
    assert 'Contact info is required' in browser.body_text
    # fill in address, click on Paypal, remain on same page
    browser.from_reservation_page_fill_form_and_submit(
        '', 'alisa address', '')
    paypal_button.click()
    assert '/reservation' in browser.current_url
    # no more error for address
    assert 'Please fill in your name' not in browser.body_text
    assert 'Address is required' not in browser.body_text
    assert 'Contact info is required' in browser.body_text
    # fill form, click on Paypal, land on Paypal page
    browser.from_reservation_page_fill_form_and_submit(
        '', '', 'alisa phone')

    if not OFFLINE:
        browser.set_page_load_timeout(30)
        paypal_button.click()
        assert 'paypal.com' in browser.current_url
