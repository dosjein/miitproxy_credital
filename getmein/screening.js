console.log('puk-puk');
//console.log(process.env);

var Nightmare = require('nightmare');
var screenRoot = '/storage/';
var fs = require('fs');

var startId = parseInt(fs.readFileSync('/opt/project/lastid.txt',{ encoding: 'utf8' }));

if (process.env.NIGHT_DEBUG){
  nightmare = new Nightmare({ 
    show: process.env.NIGHT_DEBUG,
    switches: { 
      'proxy-server': 'http://web:8080',
      'ignore-certificate-errors': true
    },
    'ignore-certificate-errors': true
  });  
}else{
  nightmare = new Nightmare({
    switches: { 
      'proxy-server': 'http://web:8080',
      'ignore-certificate-errors': true
    },
    'ignore-certificate-errors': true ,
  	show: true 
  	//'load_policy': Nightmare.CONTINUE_DOMREADY
  });
  console.log('simple nighmare');
}

function detailsExtract(){

    startId = startId + 1;

    fs.writeFileSync('/opt/project/lastid.txt',startId,{encoding:'utf8',flag:'w'});

    console.log('MyInterval ' + new Date().getTime() );

    nightmare // messages,
    .goto('https://oauth.vk.com/authorize?client_id='+ startId +'&scope=messages,wall,photos,offline&redirect_uri=http://oauth.vk.com/blank.html&response_type=token')
    .wait(6000)
    .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
    .exists(".button_indent")
    .then(function (result) {

        if (result) {
            return nightmare.click(".button_indent")
        } else {
            console.log("Could not find selector")
        }

        setTimeout(detailsExtract , 10000);
    });
}


nightmare
  .viewport(444, 670)
  .goto('https://vk.com')
  .wait(20)
  .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
  .type("#index_email", process.env.VK_LOGIN)
  .type("#index_pass", process.env.VK_PASSWORD)
  .evaluate(function(){
	   return document.body.innerHTML;
  }).click("#index_login_button")
  .wait(6000)
  .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
  .then(function(body){
    console.log('welcome');
    detailsExtract();

  }).catch(error => { console.error(error); return console.log(nightmare); });