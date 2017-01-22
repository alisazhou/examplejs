[![Build Status](https://travis-ci.org/conradho/examplejs.svg?branch=master)](https://travis-ci.org/conradho/examplejs)

See individual folders for their READMEs


[Greenkeeper](https://greenkeeper.io/) is being used to automatically create pull requests.

# Setup
- be sure to symlink pre-commit hook to .git/hooks/pre-commit, and have it executable. won't need to do it after git 2.9
- git submodule update --recursive --init


#### Kanban Bananas
**TO-DO**
- check SearchBar classNames for css
- i18n
- stripe + alipay button
- make menu page single picture into scrolling pics with all dishes in menu
- more data validation (currently just validating not empty)
    - use momentjs to validate dates
    - have min/max dates
    - for menu details page, will need to grey out unavailable dates on date picker
    - [ui] make datetime captured in OrderAttributes more readable on reservation page
- figure out firefox date picker (use react date picker + momentjs?)
- refreshing on reservation page will error (menu id is not saved, and so js errors -> just says loading)
    - i thought you could use local storage or something to fix this?
    - _az_ notes: search in localStorage, hydrate store with values if found (involves not-insignificant refactor); what if nothing found, ie never filled out menu page form?
- refactory things:
    - menupage next button vs link button. maybe let link button take in optional props for onclick to merge them?
    - consider pulling node urls out into contants.py. but it is not super easy to do because need to interpolate menu id etc. (and js doesn't have a good way to dynamically interpolate that)
        - after doing that, consider taking off trailing slashes for everything
    - instead of xs-hide, sm-hide, md-hide etc, maybe have a function that hides if less than lg etc
    - maybe have ABC for name/price text left/right div (to merge the left/right divs on front page vs menu page)
    - clean up reducers/initial state/`__mocks__`- it's inconsistent right now

**DOING**
- _ch_:
    - use basscss font
    - turn sticky page footer into the navbar header?
    - validation errors from menu order attributes screw up placement of inputs etc
    - ask arun:
        - menu page order button is screwed up
- _az_:
    - login and register pages
    - make template page component, move navbar there
    - can remove SearchBarMixin?


**DONE**
- merge Seller key/id  
- payment page
- ReservationForm wired to store 
- webpack
- switch firefox selenium to phantomjs
- react router
- type-as-you-search menus list
- refactor fts into modules based on page
- add calendar widget to pick date time
- add back buttons to pages
- make going to hosturl/menu/0 etc redirect on the server side
- refactor form validation
- move paypal button outside of reservation form component
- upgrade redux form to v6
- update redux form to get rid of uknown props warning
- move paypal button outside of reservation form component
- make 404 component
- start adding static urls for pics
- create react component for intro page menu items
- add date component to frontpage searchbar
- scrape insta for menu images
- get title to change depending on react routing
- wire up date input on front page. add ft for this as well
- refactor out searchbar into separate components/forms. or stripe out redux form :p
