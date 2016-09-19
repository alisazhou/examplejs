[![Build Status](https://travis-ci.org/conradho/examplejs.svg?branch=master)](https://travis-ci.org/conradho/examplejs)

See individual folders for their READMEs


[Greenkeeper](https://greenkeeper.io/) is being used to automatically create pull requests.

# Setup
- be sure to symlink pre-push hook to .git/hooks/pre-push, and have it executable. won't need to do it after git 2.9


#### Kanban Bananas
**TO-DO**
- take out back button
- wire up date input on front page. add ft for this as well
     - date on intro page is only used to initialize the menu page forms
     - subsequent changes have no effect
- create react component for intro page menu items
- turn sticky page footer into the navbar header?
- start adding static urls for pics
- add # of guests react component to frontpage searchbar
     - refactor out searchbar into separate components
     - also add date component to frontpage searchbar
- login and register pages
- more data validation (currently just validating not empty)
    - use momentjs to validate dates
    - have min/max dates
    - for menu details page, will need to grey out unavailable dates on date picker
- figure out firefox date picker (use react date picker + momentjs?)
- clean up reducers/initial state/`__mocks__`- it's inconsistent right now
- use basscss font
- refreshing on reservation page will an error (menu is not saved, and js errors -> just says loading)
- menupage next button vs link button. maybe let link button take in optional props for onclick to merge them?
- consider pulling node urls out into contants.py. but it is not super easy to do because need to interpolate menu id etc. (and js doesn't have a good way to dynamically interpolate that)
    - after doing that, consider taking off trailing slashes for everything
- [ui] make datetime captured in OrderAttributes more readable on reservation page
- get title to change depending on react routing
- instead of xs-hide, sm-hide, md-hide etc, maybe have a function that hides if less than lg etc
- ask arun:
    - login button slightly too close to right hand side


**DOING**
- _ch_: add new user stories
- _az_: scrape insta for menu images


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
