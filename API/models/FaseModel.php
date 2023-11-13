<?php

require_once('BaseModel.php');

class FaseModel extends BaseModel
{
    public static string $nome_tabella = 'Fases';
    protected array $_fields = [
        "id",
        "nome_fase",
        "step",
        "referente",
    ];

}