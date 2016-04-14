## import pytest

def test_can_go_to_different_pages(browser):
    browser.goto('/')
    browser.find_element_by_xpath('a[@href="#" and text()="Contact"]').click()
    assert '+852' in browser.body_text
