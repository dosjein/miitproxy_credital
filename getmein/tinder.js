//https://www.facebook.com/v2.8/dialog/oauth?app_id=464891386855067&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2Fd_vbiawPdxB.js%3Fversion%3D44%23cb%3Df213b0a5a606e94%26domain%3Dtinder.com%26origin%3Dhttps%253A%252F%252Ftinder.com%252Ff14b12c5d35c01c%26relation%3Dopener&client_id=464891386855067&display=popup&domain=tinder.com&e2e=%7B%7D&fallback_redirect_uri=200ee73f-9eb7-9632-4fdb-432ed0c670fa&locale=en_US&origin=1&redirect_uri=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2Fd_vbiawPdxB.js%3Fversion%3D44%23cb%3Df20cfec000032b4%26domain%3Dtinder.com%26origin%3Dhttps%253A%252F%252Ftinder.com%252Ff14b12c5d35c01c%26relation%3Dopener%26frame%3Df2cc4d71cc96f9&response_type=token%2Csigned_request&scope=user_birthday%2Cuser_photos%2Cemail%2Cuser_friends%2Cuser_likes&sdk=joey&version=v2.8&ret=login

var Nightmare = require('nightmare');
var screenRoot = '/storage/';

var startId = 21022;

if (process.env.NIGHT_DEBUG){
  nightmare = new Nightmare({ 
    show: process.env.NIGHT_DEBUG,
    switches: { 
      'proxy-server': 'http://web:8080',
      'ignore-certificate-errors': true
    },
    typeInterval: 20
  });  
}else{
  nightmare = new Nightmare({
    switches: { 
      'proxy-server': 'http://web:8080',
      'ignore-certificate-errors': true
    },
    typeInterval: 20,
  	show: true 
  	//'load_policy': Nightmare.CONTINUE_DOMREADY
  });
  console.log('simple nighmare');
}


function detailsExtract(){
	console.log('init some details ' + new Date().getTime() );
	nightmare.screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png');

	setTimeout(detailsExtract , 10000);
}


nightmare
  .viewport(444, 670)
  .goto('https://www.facebook.com/login/device-based/regular/login/')
  .wait(20)
  .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
  .type("#email", process.env.FB_LOGIN)
  .type("#pass", process.env.FB_PASSWORD)
  .wait(6000)
  .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
  .click("#loginbutton")
  .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
  .wait(6000)
  .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
  .then(function(body){
    console.log('welcome');
    detailsExtract();

  }).catch(error => { console.error(error); return console.log(nightmare); });