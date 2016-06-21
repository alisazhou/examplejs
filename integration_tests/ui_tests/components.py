
def click_on_nth_menu(browser, nth):
    ### HACK
    browser.click_link_id('menu_{}'.format(nth))

def click_on_option_by_text(opt_list, opt_text):
    for opt in opt_list:
        if opt.text == opt_text:
            opt.click()
