import pytest

from browser_fixture import get_browser_fixture_of_class
from menu_page_test import MenuPageBrowser

class ResPageBrowser(MenuPageBrowser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fill_order_form_and_submit('3 ~ 4', 'Sun 1pm')

    def fill_reservation_form_and_submit(self, name, add, tel):
        self.find_element_by_class_name('reservation_form--name').send_keys(name)
        self.find_element_by_class_name('reservation_form--add').send_keys(add)
        self.find_element_by_class_name('reservation_form--tel').send_keys(tel)


res_page_browser = get_browser_fixture_of_class(ResPageBrowser)
pytest.yield_fixture()(res_page_browser)

def test_ordered_menu_is_shown(res_page_browser):
    assert '/reservation' in res_page_browser.current_url
    order_summary = {
        'Number of guests' :'3 ~ 4',
        'Time': 'Sun 1pm',
        'Menu': 'Demo Menu 0'}
    for label, content in order_summary.items():
        assert label in res_page_browser.body_text
        assert content in res_page_browser.body_text


def test_has_back_btn_to_menu_page(res_page_browser):
    res_page_browser.find_element_by_xpath('//a/button[text()="Back"]').click()
    assert '/menus/0' in res_page_browser.current_url


def test_saves_reservation_detail_between_pages(res_page_browser):
    # fill res form, go back to prev page
    res_page_browser.fill_reservation_form_and_submit(
        'alisa', 'az add', 'az tel')
    res_page_browser.back()
    # go fwd to res page, reservation details are still shown
    res_page_browser.forward()
    name_field = res_page_browser.find_element_by_class_name(
        'reservation_form--name')
    assert name_field.get_attribute('value') == 'alisa'
    add_field = res_page_browser.find_element_by_class_name(
        'reservation_form--add')
    assert add_field.get_attribute('value') == 'az add'
    tel_field = res_page_browser.find_element_by_class_name(
        'reservation_form--tel')
    assert tel_field.get_attribute('value') == 'az tel'


def test_can_make_payment(res_page_browser):
    # see a paypal button
    paypal_button = res_page_browser.get_slow_loading_css_element('input[name="submit"]')
    assert 'PayPal' in paypal_button.get_attribute('alt')
    # fill in reservation form, and click on paypal btn
    res_page_browser.fill_reservation_form_and_submit('name0', 'address0', 'tel0')
    ## temporary hack before refactoring
    res_page_browser.set_page_load_timeout(30)
    paypal_button.click()
    # we are redirected to paypal site
    assert 'paypal.com' in res_page_browser.current_url


def test_performs_form_validation(res_page_browser):
    # no error msg shown at first
    assert 'Please fill in your name' not in res_page_browser.body_text
    assert 'Address is required' not in res_page_browser.body_text
    assert 'Contact info is required' not in res_page_browser.body_text
    # click on Paypal button, remain on same page
    paypal_button = res_page_browser.get_slow_loading_css_element(
        'input[name="submit"]')
    paypal_button.click()
    assert '/reservation' in res_page_browser.current_url
    # see error msgs for name, address, and phone
    assert 'Please fill in your name' in res_page_browser.body_text
    assert 'Address is required' in res_page_browser.body_text
    assert 'Contact info is required' in res_page_browser.body_text
    # fill in name, click on Paypal, remain on same page
    res_page_browser.fill_reservation_form_and_submit(
        'alisa', '', '')
    paypal_button.click()
    assert '/reservation' in res_page_browser.current_url
    # no more error for name
    assert 'Please fill in your name' not in res_page_browser.body_text
    assert 'Address is required' in res_page_browser.body_text
    assert 'Contact info is required' in res_page_browser.body_text
    # fill in address, click on Paypal, remain on same page
    res_page_browser.fill_reservation_form_and_submit(
        '', 'alisa address', '')
    paypal_button.click()
    assert '/reservation' in res_page_browser.current_url
    # no more error for address
    assert 'Please fill in your name' not in res_page_browser.body_text
    assert 'Address is required' not in res_page_browser.body_text
    assert 'Contact info is required' in res_page_browser.body_text
    # fill form, click on Paypal, land on Paypal page
    res_page_browser.fill_reservation_form_and_submit(
        '', '', 'alisa phone')
    res_page_browser.set_page_load_timeout(30)
    paypal_button.click()
    assert 'paypal.com' in res_page_browser.current_url
