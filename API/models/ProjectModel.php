<?php


require_once('BaseModel.php');

class ProjectModel extends BaseModel
{
    public static string $nome_tabella = 'Projects';
    protected array $_fields = [
        "id",
        "nome",
        "descrizione",
        "referente",
        "date_added",
        "trattativa",
        "immagine",
    ];
}