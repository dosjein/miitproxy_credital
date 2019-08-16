#!/bin/bash
cd /opt/project/
sleep 35
xvfb-run -e /dev/stdout -a node --harmony screening.js
while true; do 
	echo 'Round it goes'
	#xvfb-run -e /dev/stdout -a node --harmony screening.js
	sleep 35
done