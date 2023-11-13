<?php


class RuoloController 
{

    public static function list()
    {
        $conditions = array(
            "user" => $_SESSION['referente'],
        );
       $ruoli = RoleModel::where($conditions);
       echo json_encode($ruoli);
    }


    public static function save()
    {
        $data = array(
            "id"=>$_POST['id'],
            "nome_ruolo"=>$_POST['nome_ruolo'],
            "priorita"=>$_POST['priorita'],
            "user"=>$_SESSION['referente'],
        );
        $ruolo = new RoleModel($data);

        if (!$ruolo->validate()) {
            $_SESSION["error"] = implode(', ', $ruolo->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }

        try {
            $id = $ruolo->save();
            $_SESSION["message"] = "Salvattaggio effettuato con successo";
            header('Location: ' . $GLOBALS['url_frontend'].'roles');
            echo $_SESSION["message"];
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }
    }

    public static function delete()
    {
        $id = (int) $_GET["id"];
        $role = RoleModel::get($id);
        if($role->user == $_SESSION['referente'] && $_SESSION['priorita'] == 0){
            echo json_encode($role);
        try {
            RoleModel::delete($id);
            $_SESSION["message"] = "eliminata con successo.";
            header('Location: ' . $GLOBALS['url_frontend'].'roles');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
        }
    }else{
        echo "Non hai i permessi per eliminare questo ruolo";
    }
    }
}