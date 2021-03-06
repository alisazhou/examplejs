import re
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from constants import URLS


class AuthenticationMixin():
    def fill_in_email_and_pw(self, email, pw):
        email_field = self.find_element_by_xpath('//input[@type="email"]')
        email_field.send_keys(email)
        pw_field = self.find_element_by_xpath('//input[@type="password"]')
        pw_field.send_keys(pw)


class NavbarMixin():
    def get_navbar_div(self):
        return self.find_element_by_css_selector('div.navbar')

    def get_navbar_title_btn(self):
        return self.find_element_by_css_selector('button.navbar-buttons__title-btn')

    def get_navbar_signup_btn(self):
        return self.find_element_by_css_selector('button.navbar-buttons__user-signup-btn')

    def get_navbar_login_btn(self):
        return self.find_element_by_css_selector('button.navbar-buttons__user-login-btn')

    def get_navbar_home_btn(self):
        return self.find_element_by_css_selector('button.navbar-buttons__home-btn')


class MenuListMixin():
    def click_on_nth_menu(self, nth):
        return self.click_link_id('menu_{}'.format(nth))


class OrderAttributesMixin():
    def get_order_party_size_select(self):
        return Select(self.find_element_by_xpath('//select[@name="searchSize"]'))

    def get_order_date_input(self):
        return self.find_element_by_xpath('//input[@name="searchDate"]')


class SearchBarMixin():
    def get_search_bar(self):
        return self.find_element_by_class_name('searchbar-form')

    def type_into_search_input(self, text):
        text_search = self.get_search_bar().find_element_by_xpath('//input[@type="search"]')
        text_search.clear()
        text_search.send_keys(text)


class PaypalMixin():
    BUTTON_XPATH = '//input[@name="submit"][contains(@alt, "PayPal")]'

    def get_paypal_button(self):
        return self.get_slow_loading_clickable(By.XPATH, self.BUTTON_XPATH)

    def assert_paypal_button_does_not_exist(self):
        self.assert_does_not_exist(By.XPATH, self.BUTTON_XPATH)


class NavigationMixin(SearchBarMixin, OrderAttributesMixin):
    def assert_on_page(self, expected_page):
        expected_url = self.host_address + URLS[expected_page]
        matches = re.match(expected_url, self.current_url)
        assert matches, 'expected {} to match {}'.format(self.current_url, expected_url)

    def from_intro_page_select_menu(self, menu_link_text):
        self.assert_on_page('intro')
        self.find_element_by_xpath('//h4[text()="{}"]'.format(menu_link_text)).click()
        self.assert_on_page('menu')

    def from_menu_page_fill_form_and_submit(self, size_option, date, expect_fail=False):
        self.assert_on_page('menu')
        self.get_order_party_size_select().select_by_visible_text(size_option)
        self.get_order_date_input().send_keys(date)
        self.find_element_by_xpath('//button[text()="Order"]').click()
        if not expect_fail:
            self.assert_on_page('reservation')

    def from_reservation_page_fill_form(self, name, add, tel):
        self.assert_on_page('reservation')
        name_input = self.find_element_by_class_name('reservation_form--name')
        name_input.clear()
        name_input.send_keys(name)
        address_input = self.find_element_by_class_name('reservation_form--add')
        address_input.clear()
        address_input.send_keys(add)
        tel_input = self.find_element_by_class_name('reservation_form--tel')
        tel_input.clear()
        tel_input.send_keys(tel)

    def from_reservation_page_submit_form(self):
        self.find_element_by_xpath('//button[@type="submit"][text()="Confirm"]').click()

    def from_reservation_page_fill_form_and_submit(self, name, add, tel):
        self.from_reservation_page_fill_form(name, add, tel)
        self.from_reservation_page_submit_form()
