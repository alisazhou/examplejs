import pytest
from selenium.webdriver.support.ui import Select

from browser_fixture import BaseBrowser, get_browser_fixture_of_class

class MenuPageBrowser(BaseBrowser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.click_link_text('Demo Menu 0')


menu_page_browser = get_browser_fixture_of_class(MenuPageBrowser)
pytest.yield_fixture()(menu_page_browser)


def test_has_menu_name_as_header(menu_page_browser):
    header = menu_page_browser.find_element_by_tag_name('h1')
    assert header.text == 'Demo Menu 0'


def test_has_menu_image(menu_page_browser):
    image = menu_page_browser.find_element_by_tag_name('img')
    assert image.get_attribute('alt') == 'menu image'


def test_has_chef_name_and_description(menu_page_browser):
    assert 'cuckoo lis' in menu_page_browser.body_text
    assert 'description 0' in menu_page_browser.body_text

def test_can_save_specified_order_attrs(menu_page_browser):
    # find form for order attributes
    attrs = menu_page_browser.find_element_by_class_name('menu_page--attributes')
    # select party size and fill in time, click next
    party_size = Select(attrs.find_element_by_tag_name('select'))
    party_size.select_by_visible_text('5 ~ 6')
    party_time = attrs.find_element_by_tag_name('input')
    party_time.send_keys('Sat 7pm')
    # click on next to customer info page, 
    next_btn = menu_page_browser.find_element_by_link_text('Next')
    next_btn.click()
    assert '/reservation' in menu_page_browser.current_url
    # TODO: ordered menu is shown
    # go back, order attributes are preserved
    menu_page_browser.back()
    attrs = menu_page_browser.find_element_by_class_name('menu_page--attributes')
    party_size = Select(attrs.find_element_by_tag_name('select'))
    assert '5 ~ 6' in party_size.first_selected_option.text
    party_time = attrs.find_element_by_tag_name('input')
    assert party_time.get_attribute('value') == 'Sat 7pm'
