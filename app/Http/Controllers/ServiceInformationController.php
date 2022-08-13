<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceInformationController extends Controller
{
    public function getAPIHost()
    {
        return env('REACT_APP_API_HOST');
    }

    public function getGQLHost()
    {
        return env('REACT_APP_GQL_HOST');
    }
}
