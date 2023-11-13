<?php
global $url_frontend;
require dirname(__DIR__)."/models/AuthLink.php";


class Signup {

    public function send () {

        // Verifica se è stata inviata una richiesta POST

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        if(!$_POST['email'] || !$_POST['fullname'] || !$_POST['password'] || !$_POST['password2'] ){
           $message = "Tutti i campi sono obbligatori";
           header("Location: ".$GLOBALS['url_frontend']."/signup?message=".$message);
        }
        
        // Recupera i valori dell'utente dalla richiesta
        $fullname = $_POST["fullname"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        $password2 = $_POST["password2"];
        if($password == $password2){
            $password_hash = password_hash($password, PASSWORD_DEFAULT);
            $error = UserModel::signup_control($email);
            $data = array(
                "id"=>null,
                "fullname" => $fullname,
                "email" => $email,
                "password" => $password_hash,
                "loggedIn" => 0,
                "ruolo" => null,
                "priorita" => 0,
                "referente" => 0,
                "stallo" => 180, //giorni
                'year_seen' => date('Y'),
            );
            if($error == 0){
                $user = new UserModel($data);
                $id = $user->save();
                $data = array(
                    "id"=>$id,
                    "fullname" => $fullname,
                    "email" => $email,
                    "password" => $password_hash,
                    "loggedIn" => 0,
                    "ruolo" => null,
                    "priorita" => 0,
                    "referente" => $id,
                    "stallo" => 180, //giorni
                    'year_seen' => date('Y'),
                );
                $user = new UserModel($data);
                $id = $user->save();
                //creo una cartella per i file del profilo
                $user_folder = "userprofile/" . $id;
                if (!file_exists($user_folder)) {
                mkdir($user_folder, 0777, true);
                }

                //Invio email con link generato per autenticazione
                if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
                    send_auth_link($id,$_POST['email']);
                    echo "Email di autenticazione inviata a " . $_POST['email'];
                }

                //header('Location: ' . $GLOBALS['url_frontend'].'login');
            }
            
        }else{
            $message = "le due password non coincidono";
            echo $message;
            header('Location: ' . $GLOBALS['url_frontend'].'signup?message='.$message);
        }
        
    } else {
        $message = "la tua richiesta non é andata a buon fine";
        echo $message;
           header("Location: ".$GLOBALS['url_frontend']."/signup?message=".$message);
        } 
}

}