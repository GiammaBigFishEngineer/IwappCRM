<?php

global $url_frontend;




class Profile {

    public static function statistiche() {
        $conditions = array(
            "referente" => $_SESSION['referente'],
            "agente" => $_SESSION['userId'],
        );
        $leads = LeadModel::where($conditions);
        $vinte = 0;
        $perse = 0;

        foreach($leads as $lead){
            $query1 = array(
                "cliente" => $lead->id,
                "stato" => 2,
            );
            $query2 = array(
                "cliente" => $lead->id,
                "stato" => 3,
            );
            $negotations_vinte = NegotationModel::where($query1);
            $negotations_perse = NegotationModel::where($query2);
            $vinte += count($negotations_vinte);
            $perse += count($negotations_perse);
        }
        $array = [$vinte,$perse];
        echo json_encode($array);
    }

}