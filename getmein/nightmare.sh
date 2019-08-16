#!/bin/bash
cd /opt/project/
xvfb-run -e /dev/stdout -a node --harmony -e "nght = require('./myrun.js'); night = nght().night(); clear=console.clear ; nght().winfild();" -i