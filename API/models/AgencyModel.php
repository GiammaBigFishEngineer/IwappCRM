<?php

require_once('BaseModel.php');

class AgencyModel extends BaseModel
{
    public static string $nome_tabella = 'Agency';
    protected array $_fields = [
        "id",
        "ragione_sociale",
        "partita_iva",
        "codice_fiscale",
        "Indirizzo",
        "referente",
        "date_added",
    ];

    //$indirizzo = "Via Roma, 1, Milano, Italia";
    public function setIndirizzo($indirizzo) {
        $this->indirizzo = $indirizzo;
        // Utilizza la Geocodifica degli indirizzi per ottenere le coordinate geografiche
        $geocodifica = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($indirizzo) . '&key=API_KEY');
        $risposta = json_decode($geocodifica);
        // Salva le coordinate geografiche se la Geocodifica ha avuto successo
        $coordinate = array();
        if ($risposta->status == 'OK') {
            $coordinate = array(
                "latitudine"=>$risposta->results[0]->geometry->location->lat,
                "longitudine"=>$risposta->results[0]->geometry->location->lng,
            );
          
        }else{
            echo "Errore";
        }
    }
}