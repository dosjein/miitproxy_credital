module.exports = function (mongoose) {
  model ={};
  model.properties = {};

  	 /** nighMare init **/
	 model.night = function(){


			Nightmare = require('nightmare');
			screenRoot = '/storage/';

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
		
			return nightmare;

	 };

	 /** goto page **/
	 model.goto = function(page){

	 	if (page.indexOf("http") == -1){
	 		page = 'http://' + page;
	 	}

	 	night.goto(page)
		.evaluate(function() {
			return document.title;
		  })
	 	.then(function (result) {
	 		console.log(result);
	    });
	 }


	/** field existance check **/
	model.hasfield = function(field){
	 	night.exists(field)
	    .then(function (result) {
	        if (result) {
	            console.log("Yes Exists !~")
	        } else {
	            console.log("Could not find selector")
	        }
	    });
	 }

	 /** field fill Classic **/
	 model.fillField = function(field , value){
	 	night.type(field, value)
		.evaluate(
			field => {
			    // now we're executing inside the browser scope.
			    return document.querySelector(field).parentElement.innerHTML
			  }, field)
	 	.then(function (result) {
	 		console.log(result);
	    });
	 }

	 /** field fill using Javascript **/
	 model.fillFieldJs = function(field , value){

	 	details = [ field , value ];

	 	night.evaluate(
			details => {
			    // now we're executing inside the browser scope.
			    return document.querySelector(details[0]).value = details[1];
			  }, details)
		.evaluate(
			field => {
			    // now we're executing inside the browser scope.
			    return document.querySelector(field).parentElement.innerHTML
			  }, field)
	 	.then(function (result) {
	 		console.log(result);
	    });
	 }

	 /** tinder Auth Key extract method **/
	 model.tinder = function(){

	 	details = [ "#email" , process.env.FB_LOGIN ];
	 	details2 =[ "#pass"  , process.env.FB_PASSWORD ];
	 	 
		night
		  .viewport(444, 670)
		  .goto('https://www.facebook.com/')
		  .wait(6000)
		  .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
		  .evaluate(
			details => {
			    // now we're executing inside the browser scope.
			    return document.querySelector(details[0]).value = details[1];
			  }, details)
		  .evaluate(
			details2 => {
			    // now we're executing inside the browser scope.
			    return document.querySelector(details2[0]).value = details2[1];
			  }, details2)
		  .wait(6000)
		  .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
		  .exists("#loginbutton")
		  .then(function (result) {

	        if (result) {
	            night.click("#loginbutton");
	            night.click("#u_0_2");

	            console.log('loginbutton Exists');

		        setTimeout(function(){
					  night.screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
					  .wait(6000)
					  .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
					  .then(function(body){
					    console.log('Can try next Step [!!!]');

						nght().tinder();

					  }).catch(error => { console.error(error); nght().tinder(); return console.log(nightmare); });	
		        } , 10000);

	        } else {
	            console.log("Could not find selector");
	            night.exists("#u_0_2")
	            .then(
	            	function(result){
				        if (result) {
				            night.click("#u_0_2");

				           	console.log('u_0_2');

					        setTimeout(function(){
								  night.screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
								  .wait(6000)
								  .screenshot('/opt/storage/screenshots/'+ new Date().getTime() + '.png')
								  .then(function(body){
								    console.log('Can try next Step');

								    nght().tinder();

								  }).catch(error => { console.error(error); nght().tinder() ; return console.log(nightmare); });	
					        } , 10000);

				        } else {
				        	console.log('Logged IN');
				        }
	            	}
	            );
	        }

		  }).catch(error => {
				console.error(error); 

				//fcked up -- we are doing auth

				var d = new Date();

				const Tail = require('nodejs-tail');

				month = parseInt(d.getMonth()) + 1;

				if (month < 10){
					month = '0' + month;
				}
				 
				const filename = '/opt/storage/logs/' + d.getFullYear() + '-' + month + '-' + d.getDate() + '.flw' ;
					
				console.log(filename);

				const tail = new Tail(filename);
				 
				tail.on('line', (line) => {
				  process.stdout.write(line);

				  /**
						<script type="text/javascript">var closeURI = "https:\/\/www.facebook.com\/dialog\/close_window\/?app_id=464891386855067&connect=0";var fallbackRedirectURI = "200ee73f-9eb7-9632-4fdb-432ed0c670fa";var message = "cb=f20cfec000032b4&domain=tinder.com&origin=https\u00253A\u00252F\u00252Ftinder.com\u00252Ff14b12c5d35c01c&relation=opener&frame=f2cc4d71cc96f9&signed_request=WPakIfuLP3jC0Aup7RY-UhpjMlPzqA9XGEprQr1RpWE.eyJ1c2VyX2lkIjoiNjA0MTEyMjM2MzY4MDMzIiwiY29kZSI6IkFRREk0Q0lkc3R3M2I5eWQzSzMzUmJFM2o4bkZ4eVhmRFAwak1IS2M5aExVQzBzWlZpUjE1d0dkMGdZN3I3V1U2cHA1bFRrNWphbkIwQzRNYmJwT3h0SG1qbmc0ZHFZRkM1TGJWU3o4bndNSF9ULUhJYkdZNmJxTTI3M2xJcTItSEtFQkh0N25NeFE4RkpuMFgxaEJaTjlGSjlwMjJrcUg4eUJMbTNZWE55RHlNc0cyN1NFMW0yNTFCM2JQZlhQYVIxc0dsemE2Ml9zNDZwUTRGUGhzUDhMeFFFaFYzbkk2MzctdmN4cFRVaFd1WTQtTHh2SkxvWHBRbjFUR2R0b0JpdWNtRUZfc3VRQUlvYTYwb0J6NTlveFRWMlNhWG84X0pIbVpwenVmS1lNaDlxZ1lQbWlvRmg2RzhvQllQS21YN1AxZW9CbjU3dEFyYWVWNnRxZDJrejl5IiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE1NjU4OTQ2NjF9&access_token=EAAGm0PX4ZCpsBAOH5qSuQJtotHhZBdZB5oa1VgHRlVD5w37ZBWwWxjhWwIZA4grCCgbXSolB83y6SwG2jdKzHkZBUQ6b8ZCaiGFOIJXJoeA01RgNaLT9ibQ0D5yWnAdLh0tduk2UYgjuq7mbeqCL7NRsxOXtdZAQKXWr49lNWsSZCQiGTOGTrYfFUmwbuvu6y68ZCa8MeKFiPC2QZDZD&data_access_expiration_time=1573670660&expires_in=4539&base_domain=tinder.com&enforce_https=1", origin = "https:\/\/tinder.com", domain = "tinder.com"; (function(){var a=window.parent;window.opener!=null&&typeof window.opener.postMessage==="function"&&(a=window.opener);var b=!0;function c(a,b){a=window.location.hostname.match(/\.(facebook\.sg|facebookcorewwwi\.onion)$/);a=a?a[1]:"facebook.com";new Image().src="https://www."+a+"/common/scribe_endpoint.php?c=jssdk_error&m="+encodeURIComponent(JSON.stringify(b))}function d(){if(a===window)closeURI&&window.location.replace(closeURI);else try{a.postMessage(message,origin)}catch(a){b?(b=!1,window.setTimeout(d,200)):c("jssdk_error",{error:"POST_MESSAGE",extra:{message:a.message+", html/js/connect/XDDialogResponsePurePostMessage.js:53"}})}}function e(){__fbNative.postMessage(message,origin)}window==top&&/FBAN\/\w+;/i.test(navigator.userAgent)&&!/FBAN\/mLite;/.test(navigator.userAgent)?window.__fbNative&&__fbNative.postMessage?e():window.addEventListener("fbNativeReady",e):d()})();</script>
				  **/

				})
				 
				tail.on('close', () => {
				  console.log('watching stopped');
				})
				

				tail.watch();

				nght().goto('https://www.facebook.com/v2.8/dialog/oauth?app_id=464891386855067&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2Fd_vbiawPdxB.js%3Fversion%3D44%23cb%3Df213b0a5a606e94%26domain%3Dtinder.com%26origin%3Dhttps%253A%252F%252Ftinder.com%252Ff14b12c5d35c01c%26relation%3Dopener&client_id=464891386855067&display=popup&domain=tinder.com&e2e=%7B%7D&fallback_redirect_uri=200ee73f-9eb7-9632-4fdb-432ed0c670fa&locale=en_US&origin=1&redirect_uri=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2Fd_vbiawPdxB.js%3Fversion%3D44%23cb%3Df20cfec000032b4%26domain%3Dtinder.com%26origin%3Dhttps%253A%252F%252Ftinder.com%252Ff14b12c5d35c01c%26relation%3Dopener%26frame%3Df2cc4d71cc96f9&response_type=token%2Csigned_request&scope=user_birthday%2Cuser_photos%2Cemail%2Cuser_friends%2Cuser_likes&sdk=joey&version=v2.8&ret=login');
				 
				setTimeout(() => {
				  tail.close();
				}, 20000);

				return console.log(nightmare); 
		});


	 };

	 /** winfield - initalize all **/
	 model.winfild = function(){

	 	//allfields = ["goto" , "hasfield" , "fillField" , "fillFieldJs"];

	 	extractObject = nght();

	 	allfields = nght().meth(nght());

	 	for (i = 0; i < allfields.length; i++) { 
		  global[allfields[i]] = model[allfields[i]];
		}
	 }


	 model.meth = function() {
	    return Object.getOwnPropertyNames(extractObject).filter(function(property) {
	        return typeof extractObject[property] == 'function';
	    });
	}

  return model;
};