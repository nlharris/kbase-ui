[![Build Status](https://travis-ci.org/kbase/kbase-ui.svg?branch=master)](https://travis-ci.org/kbase/kbase-ui)

| Branch | Status |
| :--- | :--- |
| master | [![Build Status](https://travis-ci.org/kbase/kbase-ui.svg?branch=master)](https://travis-ci.org/kbase/kbase-ui) [![Coverage Status](https://coveralls.io/repos/kbase/kbase-ui/badge.svg?branch=master)](https://coveralls.io/r/kbase/kbase-ui?branch=master) |


# KBase User Interface

## Contents

- Prerequisites
- Installation


## Prerequisites

In general:

- git
- nodejs
- bower
- karma

### Macintosh

can probably just use installable nodejs and git, but these instructions are for macports or homebrew

#### Macports

##### 1) install macports: 

Download and follow the instructions at https://www.macports.org/install.php.

As part of the macports install, you will need to also install xcode and/or xcode command line utils. This can take up to an hour.

##### 2) Use the terminal to install the dependencies using Macports.

open terminal and issue the following commands:

> ```
sudo port install npm phantomjs
sudo npm install -g bower
sudo npm install -g grunt-cli
sudo npm install -g karma-cli
> ```


### Windows

I (Erik) performed an install, from scratch (starting with no dev tools whatsoever) on Windows 10, in about 15 minutes, which includes looking for and finding the appropriate windows installers.

You need to install the Windows packages for Git and Nodejs, and use the Git bash shell for command line stuff. Also, phantomjs is distributed as a simple binary, so I elected to install it via npm (npm install -g phantomjs) I seem to recall that phantomjs does not play well when installed via npm, but I may be mistaken because it works fine on Windows -- although it is a little behind the official latest version (2.0.0), which may be a good thing since issues have been reported. On the other hand, there are js compatability issues reported for < 2.0.0 which will not be fixed.)

Occasionally you may be prompted for an admin account authorization if you are using a standard account. Other than that, the process was surprisingly smooth.

### Linux

### Vagrant on Mac

> ```
vagrant init ubuntu/trusty64
vagrant up
vagrant ssh
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
exit
vagrant reload
vagrant ssh
sudo apt-get -y install git npm nodejs-legacy phantomjs
# weird I had to do the following - must be a vagrant thing.
sudo chown vagrant /home/vagrant/tmp 
sudo npm install -g bower
sudo npm install -g grunt-cli
sudo npm install -g karma-cli
> ```

## Installation


#### 1) Clone the kbase-ui repo

Make yourself a nice cozy home in which to place kbase-ui. For testing and development you just need a single directory owned by you.

> ```
mkdir -p work/kbase-ui-work
cd work/kbase-ui-work
git clone https://github.com/kbase/kbase-ui.git
cd kbase-ui
> ```

##### 2) Build it

The kbase-ui can build with a couple of lines typed at the console, or a single invocation of ```make```.

By default, this builds the package to use the services on ci.kbase.us. You can change this in either the `Gruntfile.js` (modify the servicesTarget variable), or the Makefile (in the TARGET variable).

> ```
npm install
grunt build
> ```

or 

> ```
make
> ```

Note: Depending on your platform and installed browsers, you may need to hand-tweak the browsers used for testing; phantomjs is by default the sole browser tested.

##### 3) Run tests

The tests can be run directly with karma, or through the make process

> ```
karma start test/karma.conf.js
> ```

or

> ```
make test
> ```

or 

> ```
grunt test
> ```

##### 4) Local Deploy for development and testing

The build process creates build directory which can be used directly as a web site root. 

You may use the server of your choice, or use the built-in mini-web-server via

> ```
grunt preview
> ```

##### 5) Production Deploy

The production deploy just copies the build directory to the appropriate location.
