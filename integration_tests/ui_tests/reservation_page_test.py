import pytest
from selenium.webdriver.support.ui import Select

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
        self.find_element_by_xpath('//a/button[text()="Next"]').click()


res_page_browser = get_browser_fixture_of_class(ResPageBrowser)
pytest.yield_fixture()(res_page_browser)

def test_ordered_menu_is_shown(res_page_browser):
    assert '/reservation' in res_page_browser.current_url
    order_summary = {
        'Number of guests' :'3 ~ 4',
        'Time': 'Sun 1pm',
        'Menu': 'Demo Menu 0' }
    for label, content in order_summary.items():
        assert label in res_page_browser.body_text
        assert content in res_page_browser.body_text


def test_has_back_btn_to_menu_page(res_page_browser):
    res_page_browser.find_element_by_xpath('//a/button[text()="Back"]').click()
    assert '/menus/0' in res_page_browser.current_url


def test_saves_reservation_detail_between_pages(res_page_browser):
    # fill res form, click next
    res_page_browser.fill_reservation_form_and_submit(
        'alisa', 'az add', 'az tel')
    # go back, reservation details are still shown
    res_page_browser.back()
    name_field = res_page_browser.find_element_by_class_name(
        'reservation_form--name')
    assert name_field.get_attribute('value') == 'alisa'
    add_field = res_page_browser.find_element_by_class_name(
        'reservation_form--add')
    assert add_field.get_attribute('value') == 'az add'
    tel_field = res_page_browser.find_element_by_class_name(
        'reservation_form--tel')
    assert tel_field.get_attribute('value') == 'az tel'

def test_links_to_payment_page(res_page_browser):
    # fill res form, click next, lands on payment page
    res_page_browser.fill_reservation_form_and_submit(
        'alisa', 'az add', 'az tel')
    assert '/payment' in res_page_browser.current_url
