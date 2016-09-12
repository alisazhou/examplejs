[![Build Status](https://travis-ci.org/conradho/examplejs.svg?branch=master)](https://travis-ci.org/conradho/examplejs)

See individual folders for their READMEs


[Greenkeeper](https://greenkeeper.io/) is being used to automatically create pull requests.

# Setup
- be sure to symlink pre-push hook to .git/hooks/pre-push, and have it executable. won't need to do it after git 2.9


#### Kanban Bananas
**TO-DO**
- ! _ch_: review and remove legacy code
- login and register pages
- make going to hosturl/menu/0 etc redirect on the server side
- clean up reducers/initial state/mocks
- update redux form to get rid of uknown props warning
- menupage next button vs link button. maybe let link button take in optional props for onclick to merge them?
- consider pulling node urls out into contants.py. but it is not super easy to do because need to interpolate menu id etc. (and js doesn't have a good way to dynamically interpolate that)
- after doing that, consider taking off trailing slashes for everything
- [ui] make datetime captured in OrderAttributes more readable on reservation page


**DOING**
- _ch_: add new user stories
- _az_: refactor form validation
- _az_: OrderAttributes, break datetime into two separate input fields (need to change state shape)


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
