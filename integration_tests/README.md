### setup
- pip install -r requirements.txt
- change pytest.ini
- for mac's, 
    - brew cask install xquartz
    - install xvfb by installing xserver with --enable-xvfb flag
        - https://xquartz.macosforge.org/trac/wiki/DeveloperInfo

### running the tests
- py.test


### todo
- have diff mixins for browser test fixture
- add navbar mixin for multiple test pages
- setup mixins as test fixture, and then have single line in each test to create the required intropage fixture etc
- add check for navbar title btn in intro page (need empty btn due to css stuff)
