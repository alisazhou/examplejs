
from selenium.webdriver.common.by import By
from ui_tests.ui_mixins import NavbarMixin
from browser_fixture import BaseBrowser, setup_pytest_browser_fixture

class AppearnceTestBrowser(NavbarMixin, BaseBrowser):
    pass

browser = setup_pytest_browser_fixture(AppearnceTestBrowser)

def test_viewport_info_used_for_responsive_css(browser):
    # she sees the sign up button
    browser.set_window_size(1200, 800)
    browser.get_slow_loading_clickable(By.CSS_SELECTOR,  'button.navbar-buttons__user-signup-btn')
    # she resizes her screen to be smaller
    browser.set_window_size(10, 10)
    # she does not see the signup button
    browser.assert_is_not_visible(By.CSS_SELECTOR, 'button.navbar-buttons__user-signup-btn')
