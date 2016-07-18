import pytest
from selenium.webdriver.support.ui import Select

from browser_fixture import get_browser_fixture_of_class
from menu_page_test import MenuPageBrowser

class ResPageBrowser(MenuPageBrowser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fill_order_form_and_submit('3 ~ 4', 'Sun 1pm')



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
