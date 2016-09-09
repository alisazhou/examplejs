
class NavbarMixin():
    def get_navbar(self):
        return self.find_element_by_css_selector('div.navbar')

    def get_navbar_title_btn(self):
        return self.find_element_by_css_selector('button.navbar-buttons__title-btn')

    def get_navbar_signup_btn(self):
        return self.find_element_by_css_selector('button.navbar-buttons__user-signup-btn')

    def get_navbar_login_btn(self):
        return self.find_element_by_css_selector('button.navbar-buttons__user-login-btn')


class MenuListMixin():
    def click_on_nth_menu(self, nth):
        ### HACK
        return self.click_link_id('menu_{}'.format(nth))
