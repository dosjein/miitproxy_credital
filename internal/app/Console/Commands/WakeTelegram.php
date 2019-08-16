<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Telegram;
use Config;

use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class WakeTelegram extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'wake:tele';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Wake Up on Telegram';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    function get_xml_from_url($url){
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');

        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

        $xmlstr = curl_exec($ch);
        curl_close($ch);

        return $xmlstr;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Wake up SunShit");

        try {
            $response = Telegram::getMe();


            $botId = $response->getId();
            $firstName = $response->getFirstName();
            $username = $response->getUsername();

            $response = Telegram::getUpdates();

            $this->line(json_encode($response));


            $url = "http://ngrok:4040/api/tunnels";
            $xml = file_get_contents($url);//$this->get_xml_from_url($url);

            $tunnelData = json_decode($xml , true);

            $chuckData = file_get_contents("https://api.chucknorris.io/jokes/random");
            $chuckData = json_decode($chuckData , true);

            if (!json_last_error() && isset($tunnelData['tunnels']) && isset($tunnelData['tunnels'][0])){

                $expiresAt = Carbon::now()->addMinutes(600);
                Cache::put('tunnel', json_encode($tunnelData['tunnels'][0]['public_url']), $expiresAt); 

                $response = Telegram::sendMessage([
                  'chat_id' => -1001349230746 ,//Config::get('app.tele_port'), 
                  'text' => "Tunnel : ".base64_encode($tunnelData['tunnels'][0]['public_url']).' + Telegram please do not open my links with POST + '.(isset($chuckData["value"]) ? $chuckData["value"] : "Nothing")
                ]); 

                $this->info($tunnelData['tunnels'][0]['public_url']);
            }

        } catch (Exception $e) {
            
        }


    }
}
