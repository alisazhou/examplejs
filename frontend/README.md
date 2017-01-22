### setup
- make sure you are running updated node
    - npm install -g nvm
    - then after sourcing bash again, use `nvm ls-remote` to check what is latest version
    - then eg: `nvm install v5.10.1 && nvm alias default v5.10.1`
- npm install from this dir (with package.json)
- gem install --user-install bourbon
- `bourbon install` in folder src/scss-modules/vendor  
- then the only commands to run with developing is
    - nvm run build (or to break it apart, `nvm run js` and `nvm run css`)
    - nvm test
- to check for new updates:
    - `npm run ncu`. to actually update package.json `npm run ncu -- -u`


### notes
- Warning: React.createElement: type should not be null, undefined, boolean, or number. It should be a string (for DOM elements) or a ReactClass (for composite components).
    - this is when certain subcomponents are not mocked. the basechangepagecomponent / other redux-y wrappers is the usual suspect
    - be sure to clear cache etc after attempted fix
    - there is a similar (but more clear) error where mocked reducers aren't initializing the current values/formats
    - should really write a custom mock thingy for these
- don't use --watch=all for test runs. it creates a billion random errors that is inconsitent with single runs.
    - this has been taken out
    - instead `rerun --ignore npm-debug.log "npm test"`
        - that's a python module. install the requirements.txt
