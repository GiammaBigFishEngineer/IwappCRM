<?php


require_once('BaseModel.php');
require dirname(__DIR__)."/models/RelationshipAT.php";

class TaskModel extends BaseModel
{
    public static string $nome_tabella = 'Tasks';
    protected array $_fields = [
        "id",
        "titolo",
        "descrizione",
        "data_inizio",
        "data_scadenza",
        "eseguita",
        "progetto",
    ];

    public function showRelation($agent,$task){
        $qr = "SELECT id FROM TaskAgentRelationship WHERE agent = :agent AND task = :task LIMIT 1";
        $sth = DB::get()->prepare($qr);
        $sth->execute([
            'agent' => $agent,
            'task' => $task,
        ]);
        $obj = $sth->fetch();
        return $obj['id'];
    }

    public function setAgents($relation,$agent,$task): int
    {
        $data = array(
            "id"=>$relation,
            "agent"=>$agent,
            "task"=>$task,
        );
        $relation = new TaskAgentRelationship($data);

        if (!$relation->validate()) {
            $_SESSION["error"] = implode(', ', $relation->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }
        try {
            $id = $relation->save();
            $_SESSION["message"] = "Salvataggio effettuato con successo";
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }

        return $id;
    }
}