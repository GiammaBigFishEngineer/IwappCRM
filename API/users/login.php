<?php
require dirname(__DIR__)."/models/UserModel.php";

class Login {

    public function send () {
        
        // Verifica se è stata inviata una richiesta POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Recupera i valori dell'utente dalla richiesta
        $email = $_POST["email"];
        $password = $_POST["password"];
        UserModel::login($password,$email);
        
    } else {
        
        } 
}


}