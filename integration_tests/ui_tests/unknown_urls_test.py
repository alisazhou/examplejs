from ui_mixins import NavbarMixin
from browser_fixture import BaseBrowser, setup_pytest_browser_fixture


class UnknownUrlBrowser(NavbarMixin, BaseBrowser):
    pass

browser = setup_pytest_browser_fixture(UnknownUrlBrowser)


def test_future_links_routes_to_under_construction(browser):
    # alisa goes to home page, clicks on log in button
    login_button = browser.get_navbar_login_btn()
    login_button.click()
    assert '/login' in browser.current_url
    # under-construction page is shown
    assert 'This page is under construction' in browser.body_text
    assert 'iChef' in browser.body_text


def test_unknown_urls_routes_to_not_found(browser):
    # alisa randomly enters jibberish as url
    browser.goto('/random-url/')
    # not-found page is shown
    assert 'Nothing to see here' in browser.body_text
    assert 'iChef' in browser.body_text
