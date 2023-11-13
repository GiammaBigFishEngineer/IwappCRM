<?php


class EventController 
{

    public static function list()
    {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
       $event = EventModel::where($conditions);
       echo json_encode($event);
    }

    public static function save()
    {

        $data = array(
            "id"=>$_POST['id'],
            "nome_evento"=>$_POST['nome_evento'],
            "tipologia"=>$_POST['tipologia'],
            "descrizione"=>$_POST['descrizione'],
            "referente"=> $_SESSION['userId'],
            "trattativa"=>$_POST['trattativa'],
            "date_added"=> date('d-m-Y'),
        );
        $event = new EventModel($data);

        if (!$event->validate()) {
            $_SESSION["error"] = implode(', ', $event->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }

        try {
            $id = $event->save();
            $_SESSION["message"] = "Salvataggio effettuato con successo";
            header('Location: ' . $GLOBALS['url_frontend'].'negotation?id='.$event->trattativa);
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }
    }

    public static function delete()
    {
        $id = (int) $_GET["id"];
        $event = EventModel::get($id);
        if($event->referente == $_SESSION['userId'] && $_SESSION['priorita'] == 0){
            echo json_encode($event);
        try {
            EventModel::delete($id);
            $_SESSION["message"] = "La scheda optometrica è stata eliminata con successo.";
            header('Location: ' . $GLOBALS['url_frontend'].'negotation?id='.$event->trattativa);
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
        }
    }else{
        echo "Non hai i permessi per eliminare questo ruolo";
    }
    }
}