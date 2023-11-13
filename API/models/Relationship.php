<?php

require_once('BaseModel.php');

class Relationship extends BaseModel
{
    public static string $nome_tabella = 'NegProdRelationship';
    protected array $_fields = [
        "id",
        "product",
        "negotation",
        "selled",
    ];
}