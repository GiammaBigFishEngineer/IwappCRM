<?php
require dirname(__DIR__)."/models/CategoryModel.php";

class CategoryController 
{

    public static function list()
    {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
       $categories = CategoryModel::where($conditions);
       echo json_encode($categories);
    }

    public static function save()
    {

        $_POST['referente'] = $_SESSION['userId'];
        $category = new CategoryModel($_POST);

        if (!$category->validate()) {
            $_SESSION["error"] = implode(', ', $category->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }

        try {
            $id = $category->save();
            $_SESSION["message"] = "Salvataggio effettuato con successo";
            header('Location: ' . $GLOBALS['url_frontend'].'categories');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }
    }

    public static function delete()
    {
        $id = (int) $_GET["id"];
        $category = CategoryModel::get($id);
        if($category->referente == $_SESSION['userId'] && $_SESSION['priorita'] == 0){
            echo json_encode($category);
        try {
            CategoryModel::delete($id);
            $_SESSION["message"] = "La scheda optometrica è stata eliminata con successo.";
            header('Location: ' . $GLOBALS['url_frontend'].'categories');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
        }
    }else{
        echo "Non hai i permessi per eliminare questa categoria";
    }
    }
}