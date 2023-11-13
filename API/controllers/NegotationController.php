<?php

class NegotationController 
{

    public static function list()
    {   
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
       
        $negotations = NegotationModel::where($conditions);
        $lista = array();
        foreach($negotations as $negotation){
            $lead = LeadModel::get($negotation->cliente);
            $user = UserModel::get($lead->agente);
            if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
                $products = $negotation->listProducts($negotation->id);
                $negotationWithProducts = array(
                    "negotiation" => $negotation,
                    "products" => $products
                );
                $lista[] = $negotationWithProducts;
            }
        }
        echo json_encode($lista);
    }

    public static function show(){
        $id = $_GET['id'];
        $negotation = NegotationModel::get($id);
        $lead = LeadModel::get($negotation->cliente);
        $user = UserModel::get($lead->agente);
        if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
            $products = $negotation->listProducts($negotation->id);
            $negotationWithProducts = array(
                "negotiation" => $negotation,
                "products" => $products
            );
            $lista[] = $negotationWithProducts;

        echo json_encode($lista);
        }
    }

    public static function save()
    {
        if (isset($_POST['valore_economico']) && strlen($_POST['valore_economico']) > 0) {
            $valore_economico = floatval($_POST['valore_economico']);
          } else {
            // gestione dell'errore
            $valore_economico = 0;
          }
        
        if(isset($_POST['id'])){
            $qr = NegotationModel::get($_POST['id']);
            if($_POST['stato'] == 2){
                //Se la trattativa esiste già ed è vinta
                $data = array(
                    "id"=>$_POST['id'],
                    "nome_trattativa"=>$_POST['nome_trattativa'],
                    "cliente"=>$_POST['cliente'],
                    "stato"=>$_POST['stato'],
                    "fase"=>$_POST['fase'],
                    "valore_economico"=>$valore_economico,
                    "descrizione"=>$_POST['descrizione'],
                    "referente"=>$_SESSION['referente'],
                    "date_added"=> $qr->date_added,
                    "data_vincita"=> date('Y-m-d'),
                    "motivazione_perdita"=>$qr->motivazione_perdita,
                );
            }else{
                //Se la trattativa esiste già e NON è vinta
                $data = array(
                    "id"=>$_POST['id'],
                    "nome_trattativa"=>$_POST['nome_trattativa'],
                    "cliente"=>$_POST['cliente'],
                    "stato"=>$_POST['stato'],
                    "fase"=>$_POST['fase'],
                    "valore_economico"=>$valore_economico,
                    "descrizione"=>$_POST['descrizione'],
                    "referente"=>$_SESSION['referente'],
                    "date_added"=> $qr->date_added,
                    "data_vincita"=> null,
                    "motivazione_perdita"=>$_POST['motivazione_perdita'],
                );
            }
            
        }else{
            if($_POST['stato'] == 2){
                //Se la trattativa non esiste ed è impostata su vinta
                $data = array(
                    "id"=>$_POST['id'],
                    "nome_trattativa"=>$_POST['nome_trattativa'],
                    "cliente"=>$_POST['cliente'],
                    "stato"=>$_POST['stato'],
                    "fase"=>$_POST['fase'],
                    "valore_economico"=>$valore_economico,
                    "descrizione"=>$_POST['descrizione'],
                    "referente"=>$_SESSION['referente'],
                    "date_added"=> date('Y-m-d'),
                    "data_vincita"=> date('Y-m-d'),
                    "motivazione_perdita"=>null,
                );
            }else{
                //Se la trattativa non esiste e NON è vinta
                $data = array(
                    "id"=>$_POST['id'],
                    "nome_trattativa"=>$_POST['nome_trattativa'],
                    "cliente"=>$_POST['cliente'],
                    "stato"=>$_POST['stato'],
                    "fase"=>$_POST['fase'],
                    "valore_economico"=>$valore_economico,
                    "descrizione"=>$_POST['descrizione'],
                    "referente"=>$_SESSION['referente'],
                    "date_added"=> date('Y-m-d'),
                    "data_vincita"=> null,
                    "motivazione_perdita"=>null,
                );
            }
           
        }
        
        $negotation = new NegotationModel($data);

        if (!$negotation->validate()) {
            $_SESSION["error"] = implode(', ', $negotation->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }

        try {
            $id_neg = $negotation->save();

            $products = $_POST['products'];  //lista id dei nuovi prodotti associati
            $selled = $_POST['selled'];
            foreach ($selled as &$value) {
                $value = (int)$value;
            }
            $qr = array(
                "negotation" => $id_neg,
            );
            $relation_neg = Relationship::where($qr);
            $nuove_relazioni = array();
            $count = 0;
            foreach($products as $product_id){
                $relazione_prodotto = $negotation->showRelation($product_id,$id_neg);
                array_push($nuove_relazioni,$relazione_prodotto);
                $id = $negotation->setProducts($relazione_prodotto,$product_id,$id_neg,$selled[$count]);
                $count++; //uso count per tenere traccia array selled
            }
            $count = 0;        
            //echo json_encode($nuove_relazioni);
            foreach($relation_neg as $rel){
                if(!in_array($rel->id,$nuove_relazioni)){
                    Relationship::delete($rel->id);
                }
            }

            //Decremento prodotti
            if($negotation->stato == 2){
                $relation_neg = Relationship::where($qr);
                foreach($relation_neg as $item){
                    $product = ProductModel::get($item->product);
                    if( ($product->stock -= $item->selled) >= 0){
                        $product->stock -= $item->selled;
                        if($product->stock < 0)
                            $product->stock = 0;
                        $product->save();
                        echo json_encode($product);
                        $error = "";
                    }else{
                        $error = "Attenzione,".$product->nome_prodotto." non ha abbastanza articoli in magazzino per effettuare questa vendita";
                    }
                }
            }
            $_SESSION["message"] = "Salvataggio effettuato con successo";
            
            header('Location: ' . $GLOBALS['url_frontend'].'negotation?id='.$id_neg."&&error=".$error);
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }
    }

    public static function delete()
    {
        $id = (int) $_GET["id"];
        $negotation = NegotationModel::get($id);
        
        $lead = LeadModel::get($negotation->cliente);
        $user = UserModel::get($lead->agente);
        if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
            NegotationModel::delete($id);
            header('Location: ' . $GLOBALS['url_frontend'].'negotations');
        }
    }

    public static function relations() {
        $id = (int) $_GET["neg"];
        $negotation = NegotationModel::get($id);
        $query = array(
            "negotation" => $negotation->id,
        );
        $relations = Relationship::where($query);
        $selledArray = array_map(function($item) {
            return $item->selled;
          }, $relations);
        echo json_encode($selledArray);
    }
}