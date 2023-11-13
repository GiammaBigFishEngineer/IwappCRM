<?php

require dirname(__DIR__)."/models/RoleModel.php";

class AgentController 
{

    public static function list()
    {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );

       $agents = UserModel::where($conditions);
        $filteredAgenti = array_filter($agents, function($user) {
            return $user->priorita >= $_SESSION['priorita'];
        });

        echo json_encode(array_values($filteredAgenti));
    }


    public static function save()
    {
        // Genera una password casuale di 12 caratteri
        $password = bin2hex(random_bytes(6));
        echo $password;
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        // Prendo il ruolo selezionato per assegnare la stessa priprità
        $ruolo = RoleModel::get($_POST['ruolo']);
        // Ottieni il risultato
        $data = array(
            "id"=>null,
            "fullname" => $_POST['fullname'],
            "email" => $_POST['email'],
            "password" => $hashedPassword,
            "loggedIn" => 0,
            "ruolo" => $_POST['ruolo'],
            "priorita" => $ruolo->priorita,
            "referente" => $_SESSION['userId'],
            "stallo" => 180, //giorni
            'year_seen' => date('Y'),
        );
        $user = new UserModel($data);

        if (!$user->validate()) {
            $_SESSION["error"] = implode(', ', $user->errors);
            echo $_SESSION["error"];
            exit();
        }

        try {
            $id = $user->save();
            //Invio email con link generato per autenticazione
            if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
                send_auth_link($id,$_POST['email']);
                echo "Email di autenticazione inviata a " . $_POST['email'];
            }
            $_SESSION["message"] = "User salvato.";
            echo $_SESSION["message"];
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }
    }

    public static function delete()
    {
        $id = (int) $_GET["id"];
        $agent = UserModel::get($id);
        if($agent->referente == $_SESSION['userId'] && $_SESSION['priorita'] == 0){
            echo json_encode($agent);
        try {
            UserModel::delete($id);
            $_SESSION["message"] = "Eliminazione andata buon fine";
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
        }
    }else{
        echo "Non hai i permessi per eliminare questo cliente";
    }
    }
}