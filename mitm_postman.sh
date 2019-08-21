#!/usr/bin/env sh

mitmdump --cadir /opt/project/ca --no-upstream-cert -p 8080 -q -s "postman.py"
