import pytest

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
