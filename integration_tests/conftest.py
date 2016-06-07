## import datetime
from contextlib import contextmanager
import pytest

from pyvirtualdisplay import Display
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


class TestBrowser(webdriver.PhantomJS):
    def __init__(self, host_address, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.implicitly_wait(5)
        self.set_page_load_timeout(5)
        self.host_address = host_address
        self.get(self.host_address + '/')

    @property
    def body_text(self):
        return self.find_element_by_tag_name('body').text

    def type_into(self, html_id, text):
        html_input = self.find_element_by_id(html_id)
        html_input.send_keys(text)
        assert html_input.get_attribute('value') == text

    def goto(self, url_path):
        # self.host_address does not have a ending/trailing "/"
        self.get(self.host_address + url_path)

    def click_link_id(self, link_id):
        self.find_element_by_id(link_id).click()

    def login_admin(self):
        assert 'not logged in' in browser.body_text
        browser.type_into('id_username', 'admin')
        browser.type_into('id_password', 'password')
        browser.find_element_by_xpath('//form/input[@type="submit"]').click()

    @contextmanager
    def context_to_assert_page_reload(self, time_out=1):
        old_page = self.find_element_by_tag_name('html')
        yield
        wait = WebDriverWait(self, time_out)
        wait.until(
            expected_conditions.staleness_of(old_page)
        )

    def get_slow_loading_css_element(self, css_selector, timeout=10):
        wait = WebDriverWait(self, timeout)
        return wait.until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, css_selector)
            )
        )



@pytest.yield_fixture()
def browser(live_server, settings):
    # also require the live_server fixture from pytest-django
    # django runserver doesnt support https.
    # todo: can just replace live_server with own fixture that
    # runs the stunnel script instead
    # todo: or can do local setting imports and have a testing one?
    settings.SESSION_COOKIE_SECURE = False
    settings.CSRF_COOKIE_SECURE = False
    with Display(visible=0, size=(800, 600)):
        _browser = TestBrowser(host_address=live_server.url)
        yield _browser
        _browser.close()


@pytest.yield_fixture()
def normal_user(django_user_model):
    user = django_user_model.objects.create(username='user1')
    user.set_password('password')
    user.save()
    yield user
    # do i need this? maybe if we don't kill db between tests?
    user.delete()
