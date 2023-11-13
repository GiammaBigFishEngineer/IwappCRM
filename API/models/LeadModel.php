<?php

require_once('BaseModel.php');

class LeadModel extends BaseModel
{
    public static string $nome_tabella = 'Leads';
    protected array $_fields = [
        "id",
        "nome",
        "cognome",
        "azienda",
        "via",
        "citta",
        "email",
        "provincia",
        "partita_iva",
        "cellulare",
        "telefono_fisso",
        "referente",
        "agente",
        "categoria",
        "converted_date",
        "date_added",
        "preferiti",
        "sitoweb",
        "latitude",
        "longitude",
    ];


    
    public function CalcolaCordinate($indirizzo,$citta,$provincia) 
    {
    //$indirizzo = "Via Roma, 1, Milano, Italia";
    $API_KEY = "AIzaSyBhjarX7Sv1a9w7hFlj8hN2b-IlBt7MGpo";
    $address = $indirizzo.' '.$citta.' '.$provincia;
    // Costruisce l'URL per la richiesta all'API di Geocoding di Google Maps
    $url = "https://maps.googleapis.com/maps/api/geocode/json?address=" . urlencode($address)."&key=".$API_KEY;

    // Effettua la richiesta HTTP all'API e decodifica la risposta JSON
    $response = file_get_contents($url);
    $json = json_decode($response);

    // Verifica se la richiesta ha restituito un risultato valido
    if ($json->status !== 'OK') {
        // La richiesta ha restituito un errore, gestiscilo di conseguenza
        return false;
    }

    // Estrae le coordinate dal campo geometry.location dell'oggetto result
    $latitude = $json->results[0]->geometry->location->lat;
    $longitude = $json->results[0]->geometry->location->lng;

    // Restituisce le coordinate come un array associativo
    return [$latitude,$longitude];
    }
}