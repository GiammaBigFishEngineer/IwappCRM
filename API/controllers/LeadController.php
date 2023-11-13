<?php
require dirname(__DIR__)."/models/LeadModel.php";

require dirname(__DIR__)."/models/NegotationModel.php";

class LeadController 
{

    public static function apiList()
    {
        $draw = $_GET['draw'] ?? 0;
        $start = $_GET['start'] ?? 0;
        $length = $_GET['length'] ?? 10;

        $search = array();
        if (isset($_GET['search']['value']) && $_GET['search']['value'] != '')
            $search["cognome"] = $_GET['search']['value'];


        $search["referente"] = $_SESSION['referente'];
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        $categorie = CategoryModel::where($conditions);
        $data = LeadModel::paginate("date_added",$draw, $start, $length, $search, true);

          // Sostituzione del campo "categoria" con il campo "nome" dalla mappa delle categorie
          foreach ($data['data'] as &$item) {
              foreach ($categorie as $cat) {
                  if ($item->categoria == $cat->id) {
                      $item->categoria = $cat->nome_categoria;
                      break;
                  }
              }

          }

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data);
    }

    public static function general_page(){
        $draw = $_GET['draw'] ?? 0;
        $start = $_GET['start'] ?? 0;
        $length = $_GET['length'] ?? 10;

        $search = array();
        if (isset($_GET['search']['value']) && $_GET['search']['value'] != '')
            $search["nome"] = $_GET['search']['value'];


        $search["referente"] = $_SESSION['referente'];
        $data = LeadModel::paginate("date_added",$draw, $start, $length, $search, true);

       //Se il cliente.agente.priorità < Sessione_priorità oppure cliente.agente == Session UserId

       foreach($data['data'] as &$lead){
        $user = UserModel::get($lead->agente);
        if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
            $conditions_neg = array(
                "cliente" => $lead->id,
            );
            $negotations = NegotationModel::where($conditions_neg);
            $nomi_trattative = array();
            $stato = array();
            $fase = array();
            $valore_economico = array();
            $date_added = array();
            $data_vincita = array();
            foreach($negotations as $negotation){
                $nomi_trattative[] =  $negotation->nome_trattativa;
                $stato[] =  $negotation->stato;
                $fase[] =  $negotation->fase;
                $valore_economico[] =  $negotation->valore_economico;
                $date_added[] =  $negotation->date_added;
                $data_vincita[] =  $negotation->data_vincita;
            }
            $lead->nome_trattative = $nomi_trattative;
            $lead->stato = $stato;
            $lead->fase = $fase;
            $lead->valore_economico = $valore_economico;
            $lead->date_added_neg = $date_added;
            $lead->data_vincita = $data_vincita;
        }
       }
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data);
    }

    public static function list()
    {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
       $leads = LeadModel::where($conditions);
       //Se il cliente.agente.priorità < Sessione_priorità oppure cliente.agente == Session UserId
       $lista = array();
       foreach($leads as $lead){
        $user = UserModel::get($lead->agente);
        if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
            $lista[] = $lead;
        }
       }
       
       echo json_encode($lista);
    }

    public static function show(){
        $id = $_GET['id'];
        $lead = LeadModel::get($id);
        $user = UserModel::get($lead->agente);
        if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
            echo json_encode($lead);
        }   
    }

    public static function save()
    {
        if(isset($_POST['id'])){
            echo "ID SETTATO";
            $qr = LeadModel::get($_POST['id']);
            $data = array(
                "id"=>$_POST['id'],
                "nome"=>$_POST['nome'],
                "cognome"=>$_POST['cognome'],
                "azienda"=>$_POST['azienda'],
                "via"=>$_POST['via'],
                "citta"=>$_POST['citta'],
                "email"=>$_POST['email'],
                "provincia"=>$_POST['provincia'],
                "partita_iva"=>$_POST['partita_iva'],
                "cellulare"=>$_POST['cellulare'],
                "telefono_fisso"=>$_POST['telefono_fisso'],
                "referente"=>$_SESSION['referente'],
                "agente"=>$_POST['agente'],
                "categoria"=>$_POST['categoria'],
                "converted_date"=>date('Y-m-d'),
                "date_added"=> $qr->date_added,
                "preferiti"=> isset($_POST['preferiti']) ? $_POST['preferiti'] : 0,
                "sitoweb"=>$_POST['sitoweb'],
                "latitude" => null,
                "longitude" => null,
            );
            
        }else{
            echo "ID NON SETTATO";
            $data = array(
                "id"=>null,
                "nome"=>$_POST['nome'],
                "cognome"=>$_POST['cognome'],
                "azienda"=>$_POST['azienda'],
                "via"=>$_POST['via'],
                "citta"=>$_POST['citta'],
                "email"=>$_POST['email'],
                "provincia"=>$_POST['provincia'],
                "partita_iva"=>$_POST['partita_iva'],
                "cellulare"=>$_POST['cellulare'],
                "telefono_fisso"=>$_POST['telefono_fisso'],
                "referente"=>$_SESSION['referente'],
                "agente"=>$_POST['agente'],
                "categoria"=>$_POST['categoria'],
                "converted_date"=>null,
                "date_added"=> date('Y-m-d'),
                "preferiti"=> isset($_POST['preferiti']) ? $_POST['preferiti'] : 0,
                "sitoweb"=>$_POST['sitoweb'],
                "latitude" => null,
                "longitude" => null,
            );
        }
        
        $lead = new LeadModel($data);
        $coordinate = $lead->CalcolaCordinate($_POST['via'],$_POST['citta'],$_POST['provincia']);
        $lead->latitude = $coordinate[0];
        $lead->longitude = $coordinate[1];
        

        if (!$lead->validate()) {
            $_SESSION["error"] = implode(', ', $lead->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }

        try {
            $id = $lead->save();
            $_SESSION["message"] = "Salvataggio effettuato con successo";
            echo json_encode($lead);
            header('Location: ' . $GLOBALS['url_frontend'].'leads');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }
    }

    public static function delete() //Sistemare permessi
    {
        $id = (int) $_GET["id"];
        $lead = LeadModel::get($id);
        $user = UserModel::get($lead->agente);
        if($user->priorita > $_SESSION['priorita'] || $lead->agente == $_SESSION['userId']){
            echo json_encode($lead);
        try {
            LeadModel::delete($id);
            $_SESSION["message"] = "Eliminazione effettuata con successo.";
            header('Location: ' . $GLOBALS['url_frontend'].'leads');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
        }
    }else{
        echo "Non hai i permessi per eliminare questo ruolo";
    }
    }
}