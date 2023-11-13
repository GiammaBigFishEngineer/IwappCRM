<?php
require dirname(__DIR__)."/vendor/autoload.php";  // includi la libreria PHPExcel
function importExcelToMySQL(PDO $pdo, $fileName, $tableName) {
    // Crea un oggetto Reader per il file Excel
    $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReaderForFile($fileName);

    // Imposta il tipo di file di input come Excel
    $reader->setReadDataOnly(true);
    $spreadsheet = $reader->load($fileName);

    // Seleziona la prima foglio di lavoro del file Excel
    $worksheet = $spreadsheet->getActiveSheet();

    // Ottieni il numero di righe e colonne del foglio di lavoro
    $highestRow = $worksheet->getHighestRow();
    $highestColumn = $worksheet->getHighestColumn();

    // Ottieni l'elenco dei nomi delle colonne dal foglio di lavoro
    $columnNames = [];
    for ($col = 'A'; $col <= $highestColumn; $col++) {
        $columnNames[] = $worksheet->getCell($col . '1')->getValue();
    }

    // Rimuovi l'id dalla lista delle colonne
    unset($columnNames[0]);

    // Prepara la query SQL per l'inserimento dei dati
    $columnList = implode(',', $columnNames);
    $valueList = rtrim(str_repeat('?,', count($columnNames)), ',');
    $query = "INSERT INTO $tableName ($columnList) VALUES ($valueList)";

    // Crea una transazione per l'inserimento dei dati nel database
    $pdo->beginTransaction();

    // Cicla sulle righe del foglio di lavoro e inserisci i dati nel database
    for ($row = 2; $row <= $highestRow; $row++) {
        $rowData = [];
        for ($col = 'A'; $col <= $highestColumn; $col++) {
            $rowData[] = $worksheet->getCell($col . $row)->getValue();
        }

        // Rimuovi l'id dal set di dati
        unset($rowData[0]);

        // Esegui la query preparata con i dati della riga corrente
        $stmt = $pdo->prepare($query);
        $values = array_values($rowData);
        $stmt->execute($values);
    }

    // Conferma la transazione e chiudi la connessione
    $pdo->commit();
    $pdo = null;

    echo "Dati importati correttamente nella tabella '$tableName'";
}