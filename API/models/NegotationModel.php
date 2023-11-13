<?php

require_once('BaseModel.php');
require_once('Relationship.php');
require_once('ProductModel.php');

class NegotationModel extends BaseModel
{
    public static string $nome_tabella = 'Negotations';
    protected array $_fields = [
        "id",
        "nome_trattativa",
        "cliente",
        "stato",
        "fase",
        "valore_economico",
        "descrizione",
        "referente",
        "date_added",
        "data_vincita",
        "motivazione_perdita",
    ];
    
    public function setProducts($relation, $product,$negotation,$selled): int
    {
        $data = array(
            "id"=>$relation,
            "product"=>$product,
            "negotation"=>$negotation,
            "selled"=>$selled,
        );
        $relation = new Relationship($data);

        if (!$relation->validate()) {
            $_SESSION["error"] = implode(', ', $relation->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }
        try {
            $id = $relation->save();
            $_SESSION["message"] = "Salvataggio effettuato con successo";
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }

        return $id;
    }

    public function listProducts($id): array
    {
        $conditions = array(
            "negotation" => $id,
        );
        $list = Relationship::where($conditions);
        return $list;
    }

    public function showRelation($product,$negotation){
        $qr = "SELECT id FROM NegProdRelationship WHERE product = :product AND negotation = :negotation LIMIT 1";
        $sth = DB::get()->prepare($qr);
        $sth->execute([
            'negotation' => $negotation,
            'product' => $product,
        ]);
        $obj = $sth->fetch();
        return $obj['id'];
    }
    
}