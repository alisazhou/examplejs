## import pytest

def test_can_go_to_different_pages(browser):
    browser.goto('/')
    assert '+852' not in browser.body_text
    browser.find_element_by_xpath('//a[@href="#"][text()[contains(.,"Contact")]]').click()
    assert '+852' in browser.body_text
