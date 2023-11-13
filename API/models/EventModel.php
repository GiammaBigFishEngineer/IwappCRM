<?php

require_once('BaseModel.php');

class EventModel extends BaseModel
{
    public static string $nome_tabella = 'Events';
    protected array $_fields = [
        "id",
        "nome_evento",
        "tipologia",
        "descrizione",
        "referente",
        "trattativa",
        "date_added",
    ];

}