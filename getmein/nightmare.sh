#!/bin/bash
cd /opt/project/
xvfb-run -e /dev/stdout -a node --harmony -e "nght = require('./myrun.js'); clear=console.clear ; nght().winfild(); night = nght().night();" -i