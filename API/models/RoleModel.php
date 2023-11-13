<?php

require_once('BaseModel.php');

class RoleModel extends BaseModel
{
    public static string $nome_tabella = 'Roles';
    protected array $_fields = [
        "id",
        "nome_ruolo",
        "priorita",
        "user",
    ];

}