<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;


class CollectMakeModelTrims extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'collect:makemodeltrims';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
//     {
//                toyota: {
//                    name: "Toyota",
//                    models: {
//                        camry: {name: "Camry", trims: ['CE', 'LE']},
//                        corolla: {name: "Corolla", trims: ['CE', 'LE', 'XLE']}
//                    },
//                },
//                honda: {
//                    name: "Honda",
//                    models: {
//                        accord: {name: "Accord", trims: ['LX', 'EX']},
//                        civic: {name: "Civic", trims: ['LX', 'EX', 'EX-L']}
//                    }
//                }
//            };
        //


        $result = [];

        //get all makes which created a model in the year in the US
        $response = Http::withHeaders(['content-type' => 'application/json'])->get('https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=2022&sold_in_us=1');
        $makesResponse = preg_replace('/^\?\(/', '', $response->body());
        $makesResponse = preg_replace('/\);$/', '', $makesResponse);

        dd($makesResponse);

        $makes = json_decode($makesResponse, true)['Makes'];

        foreach($makes as $make) {
            $result[$make['make_id']] = ['name' => $make['make_display'], 'models' => []];

            $modelsForMake = [];
            for($i = 2010; $i< 2024; $i++) {
                $modelsResponse = Http::get('https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=' . $make['make_id'] .'&year='. $i .'&sold_in_us=1');
                $modelsResponse = preg_replace('/^\?\(/', '', $modelsResponse->body());
                $modelsResponse = preg_replace('/\);$/', '', $modelsResponse);

                $models = json_decode($modelsResponse, true)['Models'];

                dd($models);

                foreach($models as $model) {
                    $modelsForMake[$model['model_name']] = ['name' => $model['model_name']];
                }
            }

            $result[$make['make_id']]['models'] = $modelsForMake;

            //TODO: loop over all models and get trims
        }



        dd($result);

    }

}
