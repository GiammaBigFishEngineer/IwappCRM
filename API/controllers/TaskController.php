<?php



class TaskController {
    public static function list () {
        $conditions = array(
            "progetto" => $_GET['progetto'],
        );
        $tasks = TaskModel::where($conditions);
        echo json_encode($tasks);
    }
    
    public static function show () {
        $id = $_GET['id'];
        $task = TaskModel::get($id);
        echo json_encode($task);
    }

    public static function save () {
        $data = $_POST;
        $task = new TaskModel($data);
        if (!$task->validate()) {
            $_SESSION["error"] = implode(', ', $task->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }
        try {
            $id = $task->save();
            $qr = array(
                "task" => $id,
            );
            $relation_task = TaskAgentRelationship::where($qr);
            $nuove_relazioni = array();
            //Collego agenti
            $relations = $_POST['relations'];
            foreach($relations as $agent){
                $agent = intval($agent); //trasformo in int perchè il loop itera come stringa
                $relazione_task = $task->showRelation($agent,$id);
                array_push($nuove_relazioni,$relazione_task);
                $id_relazione = $task->setAgents($relazione_task,$agent,$id);
            }
            //Elimino le relazioni con agenti non selezionati
            foreach($relation_task as $rel){
                if(!in_array($rel->id,$nuove_relazioni)){
                    TaskAgentRelationship::delete($rel->id);
                }
            }

            //creo una cartella per i file del task
            $task_folder = "projects_file/".$task->progetto."/taskfile/" . $id;
            if (!file_exists($task_folder)) {
            mkdir($task_folder, 0777, true);
            }

            $_SESSION["message"] = "Salvataggio effettuato con successo";
            echo json_encode($task);
            header('Location: ' . $GLOBALS['url_frontend'].'project?id='.$task->progetto);
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }

    }

    public static function delete () { //Sistemare permessi
        $id = (int) $_GET["id"];
        $task = TaskModel::get($id);
        
            try {
                TaskModel::delete($id);
                $dir = "projects_file/".$task->progetto."/taskfile/" . $id;
                if (deleteDirectory($dir)) {
                    echo "Directory removed successfully.";
                } else {
                    echo "Error removing directory.";
                }

                $_SESSION["message"] = "Eliminazione effettuata con successo.";
                header('Location: ' . $GLOBALS['url_frontend'].'project?id='.$task->progetto);
            } catch (Exception $err) {
                $_SESSION["error"] = "Si è verificato un errore";
            }
    }

    public static function show_tasks () {
        $id = $_GET['id'];
        $task = TaskModel::get($id);
        $file_list = array();
        $file_list['file'] = array();
        $file_list['file_path'] = array();
        // Directory in cui si trovano i file dell'utente corrente
        $user_folder = "projects_file/".$task->progetto."/taskfile/" . $id;
        // Ottenere l'elenco dei file nella cartella dell'utente corrente
        $files = scandir($user_folder);
        // Cicla tutti i file nella cartella dell'utente corrente e crea un link di download per ogni file
        foreach ($files as $file) {
            if ($file != '.' && $file != '..') {
            $file_path = $user_folder . $file;
            array_push($file_list['file_path'],$file_path);
            array_push($file_list['file'],$file);
            }
        }
        if(isset($file_list) && !empty($file_list['file']))  
            echo json_encode($file_list);

    }

    public static function carica_task () {
        $conditions = array(
            "progetto" => $_GET['progetto'],
        );
        $tasks = TaskModel::where($conditions);
        foreach ($tasks as $task) {
            $obj = TaskModel::get($task->id);
            // Verifica se l'ID corrente è presente nell'array degli ID da verificare
            if (isset($_POST[$task->id])) {
              // Se l'ID corrente è presente nell'array degli ID da verificare, fai qualcosa qui
              $obj->eseguita = 1;
              $id = $obj->save();
            }else{
              $obj->eseguita = 0;
              $id = $obj->save();
            }
          }
          header('Location: ' . $GLOBALS['url_frontend'].'project?id='.$_GET['progetto']);
        }
    
    
        public static function list_connection () {
        $conditions = array(
            "task" => $_GET['task_id'],
        );
        $relations = TaskAgentRelationship::where($conditions);
        echo json_encode($relations);
    }
}