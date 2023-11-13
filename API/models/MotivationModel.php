<?php

require_once('BaseModel.php');

class MotivationModel extends BaseModel
{
    public static string $nome_tabella = 'Motivations';
    protected array $_fields = [
        "id",
        "nome_motivazione",
        "referente",
    ];

}