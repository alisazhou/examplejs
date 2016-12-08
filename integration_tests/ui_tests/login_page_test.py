from ui_mixins import AuthenticationMixin
from browser_fixture import BaseBrowser, setup_pytest_browser_fixture


class LoginPageBrowser(AuthenticationMixin, BaseBrowser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.find_element_by_xpath('//button[text()="Log in"]').click()


browser = setup_pytest_browser_fixture(LoginPageBrowser)


def test_has_login_form(browser):
    # alisa goes to login page, sees a form
    login_form = browser.find_element_by_tag_name('form')

    # she's asked to enter her email and pw
    email_node = login_form.find_element_by_xpath(
        './/label[contains(., "Email address:")]')
    email_node.find_element_by_tag_name('input')
    pw_node = login_form.find_element_by_xpath(
        './/label[contains(., "Password:")]')
    pw_node.find_element_by_tag_name('input')

    # she also sees a link to reset pw
    login_form.find_element_by_link_text('Forgot password?')
