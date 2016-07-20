import pytest
from selenium.webdriver.support.ui import Select

from browser_fixture import get_browser_fixture_of_class
from reservation_page_test import ResPageBrowser

class PmtPageBrowser(ResPageBrowser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fill_reservation_form_and_submit('alisa', 'az add', 'az tel')

pmt_page_browser = get_browser_fixture_of_class(PmtPageBrowser)
pytest.yield_fixture()(pmt_page_browser)


def test_shows_menu_and_reservation_of_order(pmt_page_browser):
    # browser is initiated at /payment with prev forms filled
    order_summary = {
        'Number of guests' :'3 ~ 4',
        'Time': 'Sun 1pm',
        'Menu': 'Demo Menu 0',
        'Name': 'alisa',
        'Address': 'az add',
        'Phone': 'az tel' }
    for label, content in order_summary.items():
        assert label in pmt_page_browser.body_text
        assert content in pmt_page_browser.body_text


def test_has_back_btn_to_reservation_page(pmt_page_browser):
    pmt_page_browser.find_element_by_xpath('//a/button[text()="Back"]').click()
    assert '/reservation' in pmt_page_browser.current_url


def test_can_make_payment(pmt_page_browser):
    # see a paypal button
    paypal_button = pmt_page_browser.get_slow_loading_css_element('input[name="submit"]')
    assert 'PayPal' in paypal_button.get_attribute('alt')
    # click on it
    # temporary hack before refactoring
    pmt_page_browser.set_page_load_timeout(30)
    paypal_button.click()
    # we are redirected to paypal site
    assert 'paypal.com' in pmt_page_browser.current_url
