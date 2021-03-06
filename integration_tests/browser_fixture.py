from contextlib import contextmanager
import pytest
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time

from constants import USE_PHANTOMJS


BASE_WEBDRIVER = webdriver.PhantomJS if USE_PHANTOMJS else webdriver.Chrome


class BaseBrowser(BASE_WEBDRIVER):
    def __init__(self, host_address, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.implicitly_wait(5)
        self.set_page_load_timeout(5)
        self.host_address = host_address
        self.set_window_size(1200, 800)
        self.goto('/')

    @property
    def body_text(self):
        return self.find_element_by_tag_name('body').text

    def type_into(self, html_id, text):
        html_input = self.find_element_by_id(html_id)
        html_input.send_keys(text)
        assert html_input.get_attribute('value') == text

    def goto(self, url_path):
        # self.host_address does not have a ending/trailing "/"
        got_page = False
        for ii in range(3):
            try:
                self.get(self.host_address + url_path)
                got_page = True
                break
            except TimeoutException:
                print('pageload TimeoutException, reloading page')
                time.sleep(1)
        if not got_page:
            pytest.fail('page did not load')

    def click_link_id(self, link_id):
        self.find_element_by_id(link_id).click()

    def click_link_text(self, link_text):
        self.find_element_by_link_text(link_text).click()

    @contextmanager
    def context_to_assert_page_reload(self, time_out=1):
        old_page = self.find_element_by_tag_name('html')
        yield
        wait = WebDriverWait(self, time_out)
        wait.until(
            EC.staleness_of(old_page)
        )

    def get_slow_loading_clickable(self, by_method, selector, timeout=10):
        wait = WebDriverWait(self, timeout)
        return wait.until(
            EC.element_to_be_clickable(
                (by_method, selector)
            ),
            'could not find {} in page:\n{}'.format(selector, self.body_text)
        )

    def assert_does_not_exist(self, by_method, selector):
        with pytest.raises(TimeoutException):
            WebDriverWait(self, 3).until(
                EC.presence_of_element_located((by_method, selector))
            )

    def assert_is_not_visible(self, by_method, selector):
        # it is in the dom
        self.find_elements(by_method, selector)
        # but it is invisible
        WebDriverWait(self, 3).until(
            EC.invisibility_of_element_located((by_method, selector))
        )


def setup_pytest_browser_fixture(BrowserClass):
    def browser(live_server, settings):
        # also require the live_server fixture from pytest-django
        # django runserver doesnt support https.
        # todo: can just replace live_server with own fixture that
        # runs the stunnel script instead
        # todo: or can do local setting imports and have a testing one?
        settings.SESSION_COOKIE_SECURE = False
        settings.CSRF_COOKIE_SECURE = False
        _browser = BrowserClass(host_address=live_server.url)
        yield _browser
        # use quit instead of close to release all resources
        _browser.quit()
    return pytest.fixture(browser)
