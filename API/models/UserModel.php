<?php

require_once('BaseModel.php');

class UserModel extends BaseModel
{
    public static string $nome_tabella = 'Users';
    protected array $_fields = [
        "id",
        "fullname",
        "email",
        "password",
        "loggedIn",
        "ruolo",
        "priorita",
        "referente",
        "stallo",
        "year_seen",
        "validated"
    ];


    public static function login($password,$email) {
        // Query per recuperare l'hash della password dal database
        $stmt = DB::get()->prepare("SELECT * FROM Users WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        // Verifica se è stata trovata una corrispondenza nella tabella degli utenti
        echo json_encode($user);
        

        if ($user) {
            if($user['validated'] == 1){
            $password_hash = $user["password"];

            // Verifica se la password immessa corrisponde all'hash memorizzato
            if (password_verify($password, $password_hash)) {
                // Autenticazione riuscita
                // Crea una sessione o imposta un cookie per mantenere l'autenticazione
                    $_SESSION["loggedIn"] = true;
                    $_SESSION["email"] = $email;
                    $_SESSION["userId"] = $user['id'];
                    $_SESSION["fullname"] = $user['fullname'];
                    $_SESSION["ruolo"] = $user['ruolo'];
                    $_SESSION["priorita"] = $user['priorita'];
                    $_SESSION["referente"] = $user['referente'];
                    $_SESSION["stallo"] = $user['stallo'];
                    $_SESSION["year_seen"] = $user['year_seen'];
                    
                    //aggiorno db
                    $query = "UPDATE Users SET loggedIn = :loggedIn  WHERE email = :email";
                    $sth = DB::get()->prepare($query);
                    $sth->execute([
                        'email' => $email,
                        'loggedIn'=> 1,
                    ]);
                    
                    echo json_encode(array("message" => "Autenticazione riuscita", "email" => $email));
                    header('Location: ' . $GLOBALS['url_frontend'].'leads');
                
                } else {
                    // Autenticazione non riuscita
                    // Risponde con un codice di errore
                    http_response_code(401);
                    $message = "Password non corretta";
                    header('Location: ' . $GLOBALS['url_frontend'].'login?message='.$message);
                }
            }else{
                $message = "Devvi attivare il tuo account";
                header('Location: ' . $GLOBALS['url_frontend'].'login?message='.$message);
            }
            
        } else {
            // Autenticazione non riuscita
            // Risponde con un codice di errore
            http_response_code(401);
            $message = "Email non esistente";
            $_SESSION['message_error'] = $message;
            header('Location: ' . $GLOBALS['url_frontend'].'login?message='.$message);
        }
    }  

    public static function signup_control ($email): int
    {
        
        $control_qr = "SELECT * FROM Users WHERE email = :email";
        $stmt = DB::get()->prepare($control_qr);
        $stmt->execute([
            'email'=>$email,
        ]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if($row){
            $message = "Questa email é già utilizzata";
            echo $message;
            header('Location: ' . $GLOBALS['url_frontend'].'signup?message='.$message);
            return 1;
        }
        return 0;
    }
}