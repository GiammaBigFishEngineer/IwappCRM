<?php


class MotivationController 
{

    public static function list()
    {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
       $motivation = MotivationModel::where($conditions);
       echo json_encode($motivation);
    }

    public static function save()
    {
        $data = array(
            "id"=>$_POST['id'],
            "nome_motivazione"=>$_POST['nome_motivazione'],
            "referente"=>$_SESSION['userId'],
        );
        $motivation = new MotivationModel($data);

        if (!$motivation->validate()) {
            $_SESSION["error"] = implode(', ', $motivation->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }

        try {
            $id = $motivation->save();
            $_SESSION["message"] = "Salvataggio effettuato con successo";
            header('Location: ' . $GLOBALS['url_frontend'].'motivations');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }
    }

    public static function delete()
    {
        $id = (int) $_GET["id"];
        $motivation = MotivationModel::get($id);
        if($motivation->referente == $_SESSION['userId'] && $_SESSION['priorita'] == 0){
            echo json_encode($motivation);
        try {
            MotivationModel::delete($id);
            $_SESSION["message"] = "La scheda optometrica è stata eliminata con successo.";
            header('Location: ' . $GLOBALS['url_frontend'].'motivations');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
        }
    }else{
        echo "Non hai i permessi per eliminare questa categoria";
    }
    }
}