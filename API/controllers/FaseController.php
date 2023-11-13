<?php


class FaseController 
{

    public static function list()
    {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
       $fases = FaseModel::where($conditions);
       echo json_encode($fases);
    }

    public static function save()
    {
        $_POST['referente'] = $_SESSION['userId'];
        $fase = new FaseModel($_POST);

        if (!$fase->validate()) {
            $_SESSION["error"] = implode(', ', $fase->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }

        try {
            $id = $fase->save();
            $_SESSION["message"] = "Salvataggio effettuato con successo";
            header('Location: ' . $GLOBALS['url_frontend'].'fases');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }
    }

    public static function delete()
    {
        $id = (int) $_GET["id"];
        $fase = FaseModel::get($id);
        if($fase->referente == $_SESSION['userId'] && $_SESSION['priorita'] == 0){
            echo json_encode($fase);
        try {
            FaseModel::delete($id);
            $_SESSION["message"] = "La scheda optometrica è stata eliminata con successo.";
            header('Location: ' . $GLOBALS['url_frontend'].'fases');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
        }
    }else{
        echo "Non hai i permessi per eliminare questo ruolo";
    }
    }
}