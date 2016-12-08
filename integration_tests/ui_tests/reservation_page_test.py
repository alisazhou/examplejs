import pytest
from browser_fixture import setup_pytest_browser_fixture

from constants import OFFLINE
from ui_mixins import NavigationMixin, NavbarMixin, PaypalMixin
from browser_fixture import BaseBrowser


class ResPageBrowser(PaypalMixin, NavigationMixin, NavbarMixin, BaseBrowser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.from_intro_page_select_menu('Demo Menu 0')
        self.from_menu_page_fill_form_and_submit('3 ~ 4', '09122016')


browser = setup_pytest_browser_fixture(ResPageBrowser)


def test_ordered_menu_is_shown(browser):
    browser.assert_on_page('reservation')
    order_summary = {
        'Number of guests': '3 ~ 4',
        'Time': '09122016',
        'Menu': 'Demo Menu 0'}
    for label, content in order_summary.items():
        assert label in browser.body_text
        assert content in browser.body_text


def test_has_back_btn_to_menu_page(browser):
    browser.find_element_by_xpath('//a/button[text()="Back"]').click()
    browser.assert_on_page('menu')

    # TODO: put navbar into reservation page
    # home_url = browser.host_address + '/'
    # # alisa is at the reservation page
    # # she can click the home icon to go back to the home page
    # browser.get_navbar_home_btn().click()
    # assert browser.current_url == home_url

    # browser.from_intro_page_select_menu('Demo Menu 0')
    # self.from_menu_page_fill_form_and_submit('3 ~ 4', 'Sun 1pm')


def test_saves_reservation_detail_between_pages(browser):
    # fill res form, go back to prev page
    browser.from_reservation_page_fill_form_and_submit('alisa', 'az add', 'az tel')
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
@pytest.mark.timeout(60)
def test_can_make_payment(browser):
    # when alisa first go to the page she doesn't see a paypal button
    browser.assert_paypal_button_does_not_exist()

    # she fills out the form on the page
    browser.from_reservation_page_fill_form_and_submit('alisa', 'az add', 'az tel')

    # she now sees a paypal button
    paypal_button = browser.get_paypal_button()

    # she clicks on it and it loads slowly
    browser.set_page_load_timeout(10)
    paypal_button.click()

    # we are redirected to paypal site
    assert 'paypal.com' in browser.current_url


# assert_does_not_exist takes at least 3 seconds each
@pytest.mark.timeout(60)
def test_performs_form_validation(browser):
    # no error msg shown at first
    assert 'Please fill in your name' not in browser.body_text
    assert 'Address is required' not in browser.body_text
    assert 'Contact info is required' not in browser.body_text
    # fill in form with empty strings, don't see payment options
    browser.from_reservation_page_fill_form('', '', '')
    browser.assert_paypal_button_does_not_exist()

    # click on submit button, still no payment options
    browser.from_reservation_page_submit_form()
    browser.assert_paypal_button_does_not_exist()

    # see error msgs for name, address, and phone
    assert 'Please fill in your name' in browser.body_text
    assert 'Address is required' in browser.body_text
    assert 'Contact info is required' in browser.body_text

    # fill in name, don't see payment options
    browser.from_reservation_page_fill_form('alisa', '', '')
    browser.assert_paypal_button_does_not_exist()

    # click on submit button, still no payment options
    browser.from_reservation_page_submit_form()
    browser.assert_paypal_button_does_not_exist()

    # no more error for name
    assert 'Please fill in your name' not in browser.body_text
    assert 'Address is required' in browser.body_text
    assert 'Contact info is required' in browser.body_text

    # fill in address, don't see payment options
    browser.from_reservation_page_fill_form('', 'alisa address', '')
    browser.assert_paypal_button_does_not_exist()

    # click on submit button, still no payment options
    browser.from_reservation_page_submit_form()
    browser.assert_paypal_button_does_not_exist()

    # no more error for address
    assert 'Please fill in your name' in browser.body_text
    assert 'Address is required' not in browser.body_text
    assert 'Contact info is required' in browser.body_text

    # fill form correctly, don't click on confirm, don't see payment options
    browser.from_reservation_page_fill_form('az', 'az add', 'alisa phone')
    browser.assert_paypal_button_does_not_exist()

    # click on confirm, and payment options are shown
    browser.from_reservation_page_submit_form()
    browser.get_paypal_button()

    # no error messages for any
    assert 'Please fill in your name' not in browser.body_text
    assert 'Address is required' not in browser.body_text
    assert 'Contact info is required' not in browser.body_text

    # change a field, paypal button disappears
    name_input = browser.find_element_by_class_name('reservation_form--name')
    name_input.send_keys('blah')
    browser.assert_paypal_button_does_not_exist()

    # click on confirm, and payment options are shown
    browser.from_reservation_page_submit_form()
    browser.get_paypal_button()
