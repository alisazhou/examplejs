
from selenium.webdriver.support.ui import Select

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
        ### HACK
        return self.click_link_id('menu_{}'.format(nth))

class OrderAttributesMixin():
    def get_order_party_size_select(self):
        attrs = self.find_element_by_class_name('menu_page--attributes')
        return Select(attrs.find_element_by_tag_name('select'))

    def get_order_party_time_input(self):
        attrs = self.find_element_by_class_name('menu_page--attributes')
        return attrs.find_element_by_tag_name('input')

class SearchBarMixin():
    def get_search_bar(self):
        return self.find_element_by_class_name('searchbar-form')

    def type_into_search_input(self, text):
        input_box = self.get_search_bar().find_element_by_tag_name('input')
        input_box.clear()
        input_box.send_keys(text)


class NavigationMixin(SearchBarMixin, OrderAttributesMixin):
    def from_intro_page_select_menu(self, menu_link_text):
        assert self.current_url == self.host_address + '/'
        self.click_link_text(menu_link_text)
        assert '/menus/' in self.current_url

    def from_menu_page_fill_form_and_submit(self, size_option, time_input, expect_fail=False):
        assert '/menus/' in self.current_url
        self.get_order_party_size_select().select_by_visible_text(size_option)
        self.get_order_party_time_input().send_keys(time_input)
        self.find_element_by_xpath('//button[text()="Next"]').click()
        if not expect_fail:
            assert self.current_url == self.host_address + '/reservation'

    def from_reservation_page_fill_form_and_submit(self, name, add, tel):
        assert self.current_url == self.host_address + '/reservation'
        self.find_element_by_class_name('reservation_form--name').send_keys(name)
        self.find_element_by_class_name('reservation_form--add').send_keys(add)
        self.find_element_by_class_name('reservation_form--tel').send_keys(tel)

