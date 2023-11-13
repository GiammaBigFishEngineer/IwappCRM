<?php


class StalloController 
{

    
    public static function save()
    {
        $stallo = $_POST['stallo'];
        $sql = "UPDATE Users SET stallo=:stallo WHERE id=:id";
        $sth = DB::get()->prepare($sql);
        $sth->execute([
            'id'=>$_SESSION['userId'],
            'stallo'=>$stallo,
        ]);
        $_SESSION['stallo'] = $stallo;
        header('Location: ' . $GLOBALS['url_frontend'].'stallo');
    }

}