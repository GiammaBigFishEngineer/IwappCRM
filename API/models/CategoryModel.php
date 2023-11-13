<?php

require_once('BaseModel.php');

class CategoryModel extends BaseModel
{
    public static string $nome_tabella = 'Categories';
    protected array $_fields = [
        "id",
        "nome_categoria",
        "colore",
        "referente",
    ];

}