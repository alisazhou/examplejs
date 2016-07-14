
def click_on_nth_menu(browser, nth):
    ### HACK
    browser.click_link_id('menu_{}'.format(nth))
