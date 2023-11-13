<?php


class ProductController 
{

    public static function list()
    {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
       $product = ProductModel::where($conditions);
       echo json_encode($product);
    }

    public static function save()
    {
        $_POST['referente'] = $_SESSION['userId'];
        
        $product = new ProductModel($_POST);

        if (!$product->validate()) {
            $_SESSION["error"] = implode(', ', $product->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }

        try {
            $id = $product->save();
            $_SESSION["message"] = "Salvataggio effettuato con successo";
            header('Location: ' . $GLOBALS['url_frontend'].'products');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }
    }

    public static function delete()
    {
        $id = (int) $_GET["id"];
        $product = ProductModel::get($id);
        if($product->referente == $_SESSION['userId'] && $_SESSION['priorita'] == 0){
            echo json_encode($product);
        try {
            ProductModel::delete($id);
            $_SESSION["message"] = "La scheda optometrica è stata eliminata con successo.";
            header('Location: ' . $GLOBALS['url_frontend'].'products');
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
        }
    }else{
        echo "Non hai i permessi per eliminare questo ruolo";
    }
    }
}