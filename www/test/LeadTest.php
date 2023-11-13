<!DOCTYPE html>
<html>
<head>
	<title>Inserisci 30.000 oggetti nella tabella Leads</title>
</head>
<body>

<?php
// Definire le informazioni di connessione al database
$host = 'localhost';
$dbname = 'CRM';
$username = 'root';
$password = 'topolino03';



// Creare la connessione al database usando PDO
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
} catch(PDOException $e) {
    die("Errore di connessione al database: " . $e->getMessage());
}

// Verificare se il form è stato sottomesso
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Creare la query SQL per l'inserimento dei dati nella tabella Leads
    $query = "INSERT INTO Leads (nome, cognome, referente, agente, categoria, date_added) VALUES (:nome, :cognome, :referente, :agente, :categoria, :date_added)";

    // Preparare la query per l'esecuzione
    $stmt = $pdo->prepare($query);

    // Eseguire l'inserimento dei dati per ogni riga
    for ($i = 1; $i <= 30000; $i++) {
        $nome = "nome".$i;
        $cognome = "cognome".$i;
        $referente = 30;
        $agente = 30;
        $categoria = 21;
        $date_added = date('Y-m-d');
        
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':cognome', $cognome);
        $stmt->bindParam(':referente', $referente);
        $stmt->bindParam(':agente', $agente);
        $stmt->bindParam(':categoria', $categoria);
        $stmt->bindParam(':date_added', $date_added);
        $stmt->execute();
    }

    // Mostrare un messaggio di conferma all'utente
    echo "Inserimento di 30.000 oggetti completato con successo.";

} else {

    // Mostrare il form per l'inserimento dei dati
    ?>
    <h1>Inserisci 30.000 oggetti nella tabella Leads</h1>
    <form method="post">
        <input type="submit" value="Inserisci 30.000 oggetti">
    </form>
    <?php
}
?>

</body>
</html>