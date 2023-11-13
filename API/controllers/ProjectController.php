<?php


class ProjectController {

    public static function list() {
        $conditions = array(
            "referente" => $_SESSION['referente'],
        );
        $projects = ProjectModel::where($conditions);
        echo json_encode($projects);
    }

    public static function save() {
        $data = $_POST;
        $data = array(
            "id" => $_POST['id'],
            "nome" => $_POST['nome'],
            "descrizione" => $_POST['descrizione'],
            "date_added" => date('Y-m-d'),
            "referente" => $_SESSION['referente'],
            "trattativa" => $_POST['trattativa'],
            "immagine" => $_FILES['file']['full_path'][0],
        );
        $project = new ProjectModel($data);
        if (!$project->validate()) {
            $_SESSION["error"] = implode(', ', $project->errors);
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit();
        }
        try {
            $id = $project->save();

            //creo una cartella per i file del progetto
            $project_folder = "projects_file/" . $id;
            if (!file_exists($project_folder)) {
            mkdir($project_folder, 0777, true);
            }

            $upload = new UploadFiles();
            $path = "projects_file/";
            $upload::upload($path,$id);

            $_SESSION["message"] = "Salvataggio effettuato con successo";
            echo json_encode($project);
            header('Location: ' . $GLOBALS['url_frontend'].'project?id='.$id);
        } catch (Exception $err) {
            $_SESSION["error"] = "Si è verificato un errore";
            echo $err;
        }
    }

    public static function show() {
        $id = $_GET['id'];
        $proj = ProjectModel::get($id);
        echo json_encode($proj);
        
    }

    public static function delete() { //Sistemare permessi
        $id = (int) $_GET["id"];
        $project = ProjectModel::get($id);
        if($project->referente == $_SESSION['referente'] && $_SESSION['priorita'] == 0){
            echo json_encode($project);
            try {
                ProjectModel::delete($id);
                $dir = "projects_file/" . $id;
                if (deleteDirectory($dir)) {
                    echo "Directory removed successfully.";
                } else {
                    echo "Error removing directory.";
                }
                $_SESSION["message"] = "Eliminazione effettuata con successo.";
                header('Location: ' . $GLOBALS['url_frontend'].'projects');
            } catch (Exception $err) {
                $_SESSION["error"] = "Si è verificato un errore";
            }
        }else{
            echo "Non hai i permessi per eliminare questo ruolo";
        }
    }
}