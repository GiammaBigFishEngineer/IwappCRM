<?php

require_once('BaseModel.php');

class ProductModel extends BaseModel
{
    public static string $nome_tabella = 'Products';
    protected array $_fields = [
        "id",
        "nome_prodotto",
        "prezzo",
        "immagine",
        "referente",
        "stock"
    ];

}