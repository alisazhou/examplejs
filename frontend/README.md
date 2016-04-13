### setup
- make sure you are running updated node
    - npm install -g nvm
    - then after sourcing bash again, use `nvm ls-remote` to check what is latest version
    - then eg: `nvm install v5.10.1 && nvm alias default v5.10.1`
- npm install from this dir (with package.json)
- gem install --user-install sass
- then the only commands to run with developing is
    - nvm run build (or to break it apart, `nvm run js` and `nvm run css`)
    - nvm test

