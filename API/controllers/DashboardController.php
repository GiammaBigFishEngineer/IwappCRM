<?php   




class DashboardController {
    public static function year_update () {
        $user = UserModel::get($_SESSION['userId']);
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            if (!$user->validate()) {
                $_SESSION["error"] = implode(', ', $user->errors);
                header('Location: ' . $_SERVER['HTTP_REFERER']);
                exit();
            }
            try {
                $id = $user->save();
                $_SESSION['year_seen'] = $_POST['year_seen'];
                $_SESSION["message"] = "Salvataggio effettuato con successo";
                echo json_encode($user);
                header('Location: ' . $GLOBALS['url_frontend'].'dashboard');
            } catch (Exception $err) {
                $_SESSION["error"] = "Si è verificato un errore";
                echo $err;
            }            
        }else{
            echo json_encode($user);
        }
    }
    
    //Incasso mensile per agente, filtrare tutte
    public static function mensile_agente () {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        $agenti = UserModel::where($conditions);
        // Inizializza l'array vuoto
        $data = array();
        for ($i = 0; $i < count($agenti); $i++) {
            $sale_gen = 0;
            $sale_feb = 0;
            $sale_mar = 0;
            $sale_apr = 0;
            $sale_mag = 0;
            $sale_giu = 0;
            $sale_lug = 0;
            $sale_ago = 0;
            $sale_set = 0;
            $sale_ott = 0;
            $sale_nov = 0;
            $sale_dic = 0;
            //Scorro la lista agenti
            if($agenti[$i]->priorita >= $_SESSION['priorita']){
                $agente = $agenti[$i]->fullname;
                $cliente_query = array(
                    'agente'=> $agenti[$i]->id,
                );       
                //Scorro la lista clienti per ogni agente
                $clienti = LeadModel::where($cliente_query);
                foreach($clienti as $cliente){
                    $date_object = new DateTime($cliente->date_added);
                    if($date_object->format("Y") == $_SESSION['year_seen']){
                    $trattativa_query = array(
                        "cliente"=> $cliente->id,
                        "stato" => 2
                    );
                    
                    $trattative_cliente = NegotationModel::where($trattativa_query);
                    foreach($trattative_cliente as $trattativa){
                        $data_vincita = new DateTime($trattativa->data_vincita);
                        switch ($data_vincita->format("m")){
                            case "01":
                                $sale_gen += $trattativa->valore_economico;
                                break;
                            case "02":
                                $sale_feb += $trattativa->valore_economico;
                                break;
                            case "03":
                                $sale_mar += $trattativa->valore_economico;
                                break;
                            case "04":
                                $sale_apr += $trattativa->valore_economico;
                                break;
                            case "05":
                                $sale_mag += $trattativa->valore_economico;
                                break;
                            case "06":
                                $sale_giu += $trattativa->valore_economico;
                                break;
                            case "07":
                                $sale_lug += $trattativa->valore_economico;
                                break;
                            case "08":
                                $sale_ago += $trattativa->valore_economico;
                                break;
                            case "09":
                                $sale_set += $trattativa->valore_economico;
                                break;
                            case "10":
                                $sale_ott += $trattativa->valore_economico;
                                break;
                            case "11":
                                $sale_nov += $trattativa->valore_economico;
                                break;
                            case "12":
                                $sale_dic += $trattativa->valore_economico;
                                break;
                        }
                    } 
                    }//end if data == year seen
                }
                $data[] = array(
                    "agent" => $agente,
                    "sales" => [$sale_gen, $sale_feb, $sale_mar, $sale_apr, $sale_mag, $sale_giu, $sale_lug, $sale_ago, $sale_set, $sale_ott, $sale_nov, $sale_dic]
                );
            }
        }
        echo json_encode($data);
    }

    public static function totale_agenti () {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        $sale_gen = 0;
        $sale_feb = 0;
        $sale_mar = 0;
        $sale_apr = 0;
        $sale_mag = 0;
        $sale_giu = 0;
        $sale_lug = 0;
        $sale_ago = 0;
        $sale_set = 0;
        $sale_ott = 0;
        $sale_nov = 0;
        $sale_dic = 0;
            //Scorro la lista agenti
            
        $clienti = LeadModel::where($conditions);
        foreach($clienti as $cliente){
            $user = UserModel::get($cliente->agente);
            $date_object = new DateTime($cliente->date_added);
            if($date_object->format("Y") == $_SESSION['year_seen']){
            
            if($user->priorita > $_SESSION['priorita'] || $cliente->agente == $_SESSION['userId']){
            $trattativa_query = array(
                "cliente"=> $cliente->id,
                "stato"=>2
            );
            $trattative_cliente = NegotationModel::where($trattativa_query);
            foreach($trattative_cliente as $trattativa){
                $data_vincita = new DateTime($trattativa->data_vincita);
                switch ($data_vincita->format("m")){
                    case "01":
                        $sale_gen += $trattativa->valore_economico;
                        break;
                    case "02":
                        $sale_feb += $trattativa->valore_economico;
                        break;
                    case "03":
                        $sale_mar += $trattativa->valore_economico;
                        break;
                    case "04":
                        $sale_apr += $trattativa->valore_economico;
                        break;
                    case "05":
                        $sale_mag += $trattativa->valore_economico;
                        break;
                    case "06":
                        $sale_giu += $trattativa->valore_economico;
                        break;
                    case "07":
                        $sale_lug += $trattativa->valore_economico;
                        break;
                    case "08":
                        $sale_ago += $trattativa->valore_economico;
                        break;
                    case "09":
                        $sale_set += $trattativa->valore_economico;
                        break;
                    case "10":
                        $sale_ott += $trattativa->valore_economico;
                        break;
                    case "11":
                        $sale_nov += $trattativa->valore_economico;
                        break;
                    case "12":
                        $sale_dic += $trattativa->valore_economico;
                        break;
                }
            } 
           }
          }
        }
        $data = [$sale_gen, $sale_feb, $sale_mar, $sale_apr, $sale_mag, $sale_giu, $sale_lug, $sale_ago, $sale_set, $sale_ott, $sale_nov, $sale_dic];
        echo json_encode($data);
    }

    public static function clienti_categoria () {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        $categories = CategoryModel::where($conditions);
        
        $nomi_categorie = array();
        $clienti_categorie = array();
        

        foreach ($categories as $cat) {
            $numero_clienti = array();
            $qr = array(
                "categoria" => $cat->id,
            );
            $leads = LeadModel::where($qr);
            foreach($leads as $lead){
                $user = UserModel::get($lead->agente);
                if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
                    $numero_clienti[] = $lead;
                }
               }
            $anno = $_SESSION['year_seen'];
            $nomi_categorie[] = $cat->nome_categoria;
            $clienti_categorie[] = count(
                array_filter($numero_clienti, function ($cliente) use ($anno) {
                    return date('Y', strtotime($cliente->date_added)) == $anno;
                })
            );
        }

        $data = array(
            "values" => $clienti_categorie,
            "names" => $nomi_categorie
        );

        
        echo json_encode($data);
    }

    public static function trattativa_stato () {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        $negotations = NegotationModel::where($conditions);
        
        $stati = [3,2,1];
        $trattative_stato = array();
        $names = ['aperta','vinta','persa'];
        foreach ($stati as $stato) {
            $numero_trattative = array();
            $qr = array(
                "stato" => $stato,
                "referente" => $_SESSION['referente'],
            );
            
            $negotations = NegotationModel::where($qr);
            foreach($negotations as $negotation){
                $lead = LeadModel::get($negotation->cliente);
                $user = UserModel::get($lead->agente);
                if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){                    
                    $numero_trattative[] = $negotation;
                }
            }
            $anno = $_SESSION['year_seen'];
            array_push($trattative_stato, count(
                array_filter($numero_trattative, function($trattativa) use ($anno) {
                return date('Y', strtotime($trattativa->date_added)) == $anno;
                })
              ) );
        }
        $data = array(
            "values" => $trattative_stato,
            "names" => $names
        );

        echo json_encode($data);
    }

    public static function trattativa_fase () {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        $fases = FaseModel::where($conditions);
        
        $nomi_fasi = array();
        $clienti_fase = array();

        foreach ($fases as $fase) {
            $numero_neg = array();
            $qr = array(
                "fase" => $fase->id,
                "referente"=> $_SESSION['referente'],
            );
            $negotations = NegotationModel::where($qr);
            foreach($negotations as $negotation){
                $lead = LeadModel::get($negotation->cliente);
                $user = UserModel::get($lead->agente);
                if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){                    
                    $numero_neg[] = $negotation;
                }
            }
            $anno = $_SESSION['year_seen'];
            array_push($nomi_fasi, $fase->nome_fase);
            array_push($clienti_fase, count(
                array_filter($numero_neg, function($trattativa) use ($anno) {
                    return date('Y', strtotime($trattativa->date_added)) == $anno;
                  })
            ) );
        }

        $data = array(
            "values" => $clienti_fase,
            "names" => $nomi_fasi
        );

        
        echo json_encode($data);
    }

    public static function motivation_neg () {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        $motivations = MotivationModel::where($conditions);
        $nome_mot = array();
        $neg_mot = array();
        foreach($motivations as $mot){
            $negotations_count = array();
            $qr = array(
                "motivazione_perdita"=>$mot->id,
                "stato"=>3,
            );
            $negotations = NegotationModel::where($qr);
            foreach($negotations as $negotation){
                $lead = LeadModel::get($negotation->cliente);
                $user = UserModel::get($lead->agente);
                if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){                    
                    $negotations_count[] = $negotation;
                }
            }
            $anno = $_SESSION['year_seen'];
            $nome_mot[] = $mot->nome_motivazione;
            $neg_mot[] = count(
                array_filter($negotations_count, function ($trattativa) use ($anno) {
                    return date('Y', strtotime($trattativa->date_added)) == $anno;
                })
            );
        }
        $data = array(
            "values" => $neg_mot,
            "names" => $nome_mot
        );
        echo json_encode($data);
    }
    
    public static function prodotti_venduti () {
        $sale_gen = 0;
        $sale_feb = 0;
        $sale_mar = 0;
        $sale_apr = 0;
        $sale_mag = 0;
        $sale_giu = 0;
        $sale_lug = 0;
        $sale_ago = 0;
        $sale_set = 0;
        $sale_ott = 0;
        $sale_nov = 0;
        $sale_dic = 0;

        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        $leads = LeadModel::where($conditions);
        foreach ($leads as $lead) {
            $user = UserModel::get($lead->agente);
            $date_object = new DateTime($lead->date_added);
            if($date_object->format("Y") == $_SESSION['year_seen'] ){
            if ($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']) {
                $qr1 = array(
                    "cliente" => $lead->id,
                    "stato" => 2,
                );
                $trattative_vinte = NegotationModel::where($qr1);
                foreach ($trattative_vinte as $trattativa){
                    $products = $trattativa->listProducts($trattativa->id);
                    $data_vincita = new DateTime($trattativa->data_vincita);
                    switch ($data_vincita->format("m")){
                        case "01":
                            $sale_gen += count($products);
                            break;
                        case "02":
                            $sale_feb += count($products);
                            break;
                        case "03":
                            $sale_mar += count($products);
                            break;
                        case "04":
                            $sale_apr += count($products);
                            break;
                        case "05":
                            $sale_mag += count($products);
                            break;
                        case "06":
                            $sale_giu += count($products);
                            break;
                        case "07":
                            $sale_lug += count($products);
                            break;
                        case "08":
                            $sale_ago += count($products);
                            break;
                        case "09":
                            $sale_set += count($products);
                            break;
                        case "10":
                            $sale_ott += count($products);
                            break;
                        case "11":
                            $sale_nov += count($products);
                            break;
                        case "12":
                            $sale_dic += count($products);
                            break;
                    }
                }
            }
            }
        }
        $data = [$sale_gen, $sale_feb, $sale_mar, $sale_apr, $sale_mag, $sale_giu, $sale_lug, $sale_ago, $sale_set, $sale_ott, $sale_nov, $sale_dic];
        echo json_encode($data);
    }

    public static function redemption () {
        $vinte = 0;
        $totali = 0;
            
            $qr1 = array(
                "referente" => $_SESSION['referente'],
                "stato" => 2,
            );
            $qr2 = array(
                "referente" => $_SESSION['referente'],
            );
            $neg1 = NegotationModel::where($qr1);
            $neg2 = NegotationModel::where($qr2);

            $trattative_vinte = array();
            $trattative = array();
            //Filtro trattative vinte in base alla priorità dell'utente
            foreach($neg1 as $negotation){
                $lead = LeadModel::get($negotation->cliente);
                $user = UserModel::get($lead->agente);
                if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
                    
                    $trattative_vinte[] = $negotation;
                }
            }
            //Filtro trattative in base alla priorità dell'utente
            foreach($neg2 as $negotation){
                $lead = LeadModel::get($negotation->cliente);
                $user = UserModel::get($lead->agente);
                if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
                    
                    $trattative[] = $negotation;
                }
            }
            //Filtro in base all' anno visualizzato
            $anno = $_SESSION['year_seen'];
            $trattative_vinte = array_filter($trattative_vinte, function ($trattativa) use ($anno) {
                return date('Y', strtotime($trattativa->date_added)) == $anno;
            });
            $trattative = array_filter($trattative, function ($trattativa) use ($anno) {
                return date('Y', strtotime($trattativa->date_added)) == $anno;
            });
            
            $vinte = count($trattative_vinte);
            
            $totali = count($trattative);
        if($totali != 0)
            $redemption = round ( ($vinte * 100)/$totali, 1 );
        else
            $redemption = 0;

        echo json_encode($redemption);
    }

    public static function redemption_agents () {
        $list = array();
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        
        $agents = UserModel::where($conditions);
        $filteredAgenti = array_filter($agents, function($user) {
            return $user->priorita >= $_SESSION['priorita'];
        });
        foreach ($filteredAgenti as $agent) {
            //Filtrato per priorità
            $qr = array(
                "referente" => $_SESSION['referente'],
                "agente" => $agent->id
            );
            $leads = LeadModel::where($qr);
            $vinte = 0;
            $totali = 0;
            //Se il cliente.agente.priorità < Sessione_priorità oppure cliente.agente == Session UserId
            foreach($leads as $lead){
                $user = UserModel::get($lead->agente);
                if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
                    $qr1 = array(
                        "cliente" => $lead->id,
                        "stato" => 2,
                    );
                    $qr2 = array(
                        "cliente" => $lead->id,
                    );
                    $trattative_vinte = NegotationModel::where($qr1);
                    $trattative = NegotationModel::where($qr2);
                    //Filtro in base all' anno visualizzato
                    $anno = $_SESSION['year_seen'];
                    $trattative_vinte = array_filter($trattative_vinte, function ($trattativa) use ($anno) {
                        return date('Y', strtotime($trattativa->date_added)) == $anno;
                    });
                    $trattative = array_filter($trattative, function ($trattativa) use ($anno) {
                        return date('Y', strtotime($trattativa->date_added)) == $anno;
                    });
                    
                    $vinte = count($trattative_vinte);
                    
                    $totali = count($trattative);

                }
            }
            //sistemare calcolo errato
            if($totali != 0)
                $redemption = round ( ($vinte * 100)/$totali, 1 );
            else
                $redemption = 0;
            array_push($list,$redemption);
        }
        //sistemare calcolo errato

        echo json_encode($list);
    }

    public static function redemption_categories () {
        $list = array();
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        $categories = CategoryModel::where($conditions);
        foreach ($categories as $category) {
            //Filtrato per priorità
            $qr = array(
                "referente" => $_SESSION['referente'],
                "categoria" => $category->id
            );
            $leads = LeadModel::where($qr);
            $vinte = 0;
            $totali = 0;
            //Se il cliente.agente.priorità < Sessione_priorità oppure cliente.agente == Session UserId
            foreach($leads as $lead){
                $user = UserModel::get($lead->agente);
                if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
                    $qr1 = array(
                        "cliente" => $lead->id,
                        "stato" => 2,
                    );
                    $qr2 = array(
                        "cliente" => $lead->id,
                    );
                    $trattative_vinte = NegotationModel::where($qr1);
                    $trattative = NegotationModel::where($qr2);
                    //Filtro in base all' anno visualizzato
                    $anno = $_SESSION['year_seen'];
                    $trattative_vinte = array_filter($trattative_vinte, function ($trattativa) use ($anno) {
                        return date('Y', strtotime($trattativa->date_added)) == $anno;
                    });
                    $trattative = array_filter($trattative, function ($trattativa) use ($anno) {
                        return date('Y', strtotime($trattativa->date_added)) == $anno;
                    });
                    if(count($trattative_vinte) > 0)
                        $vinte += count($trattative_vinte);
                    if(count($trattative_vinte) > 0)
                        $totali += count($trattative);
                }
            }
            //sistemare calcolo errato
            if($totali != 0)
                $redemption = round ( ($vinte * 100)/$totali, 1 );
            else
                $redemption = 0;

            array_push($list,$redemption);
        }
        //sistemare calcolo errato

        echo json_encode($list);
    }
}

//2bc9d9030f72