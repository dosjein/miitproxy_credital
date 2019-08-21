#!/bin/sh
#watch -n1 netstat -antuplw >> /opt/project/logs/$(date +%F)_netstat.log & /usr/bin/mitmweb --cadir /opt/project/ca --wiface 0.0.0.0 -w /opt/project/logs/$(date +%F).flw --anticache -s /opt/project/mock.py
watch -n1 /usr/bin/mitmweb --cadir /opt/project/ca --wiface 0.0.0.0 --anticache --no-upstream-cert -s /opt/project/mock.py -s  /opt/project/postman.py