# Some notes for Future me , who will think `WTF` ... postMe - please don't hate pastYou o_O

# request types to internal (used by mock and nighmare)
- http://internal/lido.asp?asking=www.lursoft.lv : dump cookies saved as string
- http://internal/lido.asp?asking=www.lursoft.lv&dd  : dump cookies saved + test response in root
- http://internal/lido.asp?asking=www.lursoft.lv&array  : dump cookies saved as array
- http://internal/lido.asp?dd&asking=www.lursoft.lv&asis&alt_holder=facekeeys
- http://internal/lido.asp?dd&asking=www.lursoft.lv&asisdd&alt_holder=facekeeys

# mockRequests
- [POST/GET] : https://www.lursoft.lv/lido.asp : save logs
- [GET] https://www.lursoft.lv/lidcookies : save cookies in storage/cache
- [GET] https://www.lursoft.lv/lidc : dump cookies saved + test response in root

# MockFunction - if Internal is up 
- inject http://internal/js/welcome.js

# Urls
- http://web:8081/ <-- mitmweb , if is in local mode
- http://ngrok:4040/api/tunnels <-- active tunnel


# Alias to add !?
- alias metasploit='docker exec -it {foldername}_android_1 msfconsole'


- alias nightmare='docker exec -it {foldername}_scraper_1 /opt/project/nightmare.sh'

# NighMare Interactive Shell :
- Has commands

- goto(link) - nightmare goes to page - does some console log on load
- hasfield(selector) - checks does element exists
- fillField(selector , value) - fills element with value
- fillFieldJs(selector , value) - fills element with value using execute + javascript
- tinder() - tinder is tinder... no comments on that now
- cookieTake(siteName) - takes cookie from saved ones (with was done using #mockRequests) + open page to see test

night - initilized instance of nigtmare


Some stuff is understandable from docker-compose file

Used MitmProxy , NightmareJs , Laravel 5.* , Docker , MSF ... 


# Interesting

https://serveo.net/

- Stop Internal : docker stop $(docker ps -a -q --filter="name={foldername}_internal_1")

- Create WebSockets for Controlling

socket= new WebSocket('ws://www.example.com:8000/somesocket');
socket.onopen= function() {
    socket.send('hello');
};
socket.onmessage= function(s) {
    alert('got reply '+s);
};
