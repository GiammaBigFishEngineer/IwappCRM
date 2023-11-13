<?php


header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$GLOBALS['url_frontend'] = 'http://localhost:3000/';

/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/

require dirname(__DIR__)."/API/users/login.php";
require dirname(__DIR__)."/API/users/signup.php";
require dirname(__DIR__)."/API/users/profile.php";
require dirname(__DIR__)."/API/users/auth.php";
require dirname(__DIR__)."/API/users/forgot_password.php";
require dirname(__DIR__)."/API/controllers/RuoloController.php";
require dirname(__DIR__)."/API/controllers/AgentController.php";
require dirname(__DIR__)."/API/controllers/CategoryController.php";
require dirname(__DIR__)."/API/controllers/LeadController.php";
require dirname(__DIR__)."/API/controllers/FaseController.php";
require dirname(__DIR__)."/API/controllers/ProductController.php";
require dirname(__DIR__)."/API/controllers/StalloController.php";
require dirname(__DIR__)."/API/controllers/MotivationController.php";
require dirname(__DIR__)."/API/controllers/EventController.php";
require dirname(__DIR__)."/API/controllers/NegotationController.php";
require dirname(__DIR__)."/API/controllers/DashboardController.php";
require dirname(__DIR__)."/API/controllers/ProjectController.php";
require dirname(__DIR__)."/API/controllers/TaskController.php";
require dirname(__DIR__)."/API/utils/UploadFiles.php";
require dirname(__DIR__)."/API/utils/DeleteDirectory.php";
require dirname(__DIR__)."/API/utils/ImportExcel.php";
require dirname(__DIR__)."/API/utils/SendAuthLink.php";
require dirname(__DIR__)."/API/utils/SendAuthPass.php";


session_start();

class Dispatcher
{
    private $method;
    private $path;

    public function __construct()
    {
        $this->method = $_SERVER["REQUEST_METHOD"];
        $this->path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
    }

    public function dispatch()
    {
        switch ($this->path) {
            //ADMIN SECTION ----------------------------------------
            case '/import_excel':
                
                    // Ottieni il percorso temporaneo del file caricato
                    $fileName = $_FILES['file']['tmp_name'];
                
                    // Specifica il nome della tabella del database
                    $tableName = $_POST['tabella'];
                
                    // Esegui la funzione per importare il file Excel nel database MySQL
                    if($_SESSION['userId'] == 1){
                        importExcelToMySQL(DB::get(), $fileName, $tableName);
                    }else{
                        echo "Non hai i permessi per farlo";
                    }
                    
                
                break;
            // USER SECTION ------------------------------------------
            case '/auth':
                $controller = new AuthLinkController();
                $controller->verify();
                break;
            case '/forgot_password':
                $controller = new ForgotPassword();
                $controller::send();
                break;
            case '/change_password':
                $controller = new ForgotPassword();
                $controller::change();
                break;
            case '/login':
                $controller = new login();
                $controller->send();
                break;
            case '/signup':
                $controller = new signup();
                $controller->send();
                break;
            case '/logout':
                session_destroy();
                header('Location: ' . $GLOBALS['url_frontend'].'login');
                break;
            case '/ruoli':
                $controller = new RuoloController();
                $controller::list();
                break;
            case '/ruolo':
                $controller = new RuoloController();
                if ($this->method == "GET") {
                    $controller::show();
                } else if ($this->method == "POST") {
                    $controller::save();
                } else {
                    echo "Unsupported method";
                }
                break;
            case '/elimina_ruolo':
                $controller = new RuoloController();
                $controller::delete();
                break;
            case '/stallo':
                $controller = new StalloController();
                $controller::save();
                break;
            case '/profilo':
                $controller= new Profile();
                $controller::statistiche();
                break;

            case '/session_data':
                if(isset($_SESSION['ruolo']))
                $ruolo = RoleModel::get($_SESSION['ruolo']);
                if(isset($_SESSION['referente']))
                $referente = UserModel::get($_SESSION['referente']);

                $sessionData = [
                    'userId' => $_SESSION['userId'] ?? null,
                    'fullname' => $_SESSION['fullname'] ?? null,
                    'email' => $_SESSION['email'] ?? null,
                    'loggedIn' => $_SESSION['loggedIn'] ?? null,
                    'ruolo' => $_SESSION['ruolo'] ?? null,
                    'nome_ruolo' => $ruolo->nome_ruolo ?? null,
                    'priorita' => $_SESSION['priorita'] ?? null,
                    'referente' => $_SESSION['referente'] ?? null,
                    'nome_referente' => $referente->fullname ?? null,
                    'stallo' => $_SESSION['stallo'] ?? null,
                    'year_seen' => $_SESSION['year_seen'] ?? null,
                ];
                header('Content-Type: application/json');
                echo json_encode($sessionData);
                break;

            // AGENTI SECTION --------------------------------
            case '/agenti':
                $controller = new AgentController();
                $controller::list();
                break;
            case '/agente':
                $controller = new AgentController();
                if ($this->method == "GET") {
                    $controller::show();
                } else if ($this->method == "POST") {
                    $controller::save();
                } else {
                    echo "Unsupported method";
                }
                break;
            case '/elimina_agente':
                $controller = new AgentController();
                $controller::delete();
                break;
            //CATEGORIE SECTION ------------------------
            case '/categorie':
                $controller = new CategoryController();
                $controller::list();
                break;
            case '/categoria':
                $controller = new CategoryController();
                if ($this->method == "GET") {
                    $controller::show();
                } else if ($this->method == "POST") {
                    $controller::save();
                } else {
                    echo "Unsupported method";
                }
                break;
            case '/elimina_categoria':
                $controller = new CategoryController();
                $controller::delete();
                break;    
            //CLIENTI SECTION -------------------------
            case '/general':
                $controller = new LeadController();
                $controller::general_page();
                break;
            case '/api/clients/list':
                $controller = new LeadController();
                $controller->apiList();
                break;
            case '/clienti':
                $controller = new LeadController();
                $controller::list();
                break;
            case '/cliente':
                $controller = new LeadController();
                if ($this->method == "GET") {
                    $controller::show();
                } else if ($this->method == "POST") {
                    $controller::save();
                } else {
                    echo "Unsupported method";
                }
                break;
            case '/elimina_cliente':
                $controller = new LeadController();
                $controller::delete();
                break; 
            //FASES SECTION -------------------------
            case '/fasi':
                $controller = new FaseController();
                $controller::list();
                break;
            case '/fase':
                $controller = new FaseController();
                if ($this->method == "GET") {
                    $controller::show();
                } else if ($this->method == "POST") {
                    $controller::save();
                } else {
                    echo "Unsupported method";
                }
                break;
            case '/elimina_fase':
                $controller = new FaseController();
                $controller::delete();
                break; 

            //PRODOTTI SECTION -------------------------
            case '/prodotti':
                $controller = new ProductController();
                $controller::list();
                break;
            case '/prodotto':
                $controller = new ProductController();
                if ($this->method == "GET") {
                    $controller::show();
                } else if ($this->method == "POST") {
                    $controller::save();
                } else {
                    echo "Unsupported method";
                }
                break;
            case '/elimina_prodotto':
                $controller = new ProductController();
                $controller::delete();
                break; 
    
            //MOTIVAZIONI SECTION -------------------------
            case '/motivazioni':
                $controller = new MotivationController();
                $controller::list();
                break;
            case '/motivazione':
                $controller = new MotivationController();
                if ($this->method == "GET") {
                    $controller::show();
                } else if ($this->method == "POST") {
                    $controller::save();
                } else {
                    echo "Unsupported method";
                }
                break;
            case '/elimina_motivazione':
                $controller = new MotivationController();
                $controller::delete();
                break; 

            //EVENTI SECTION -------------------------
            case '/eventi':
                $controller = new EventController();
                $controller::list();
                break;
            case '/evento':
                $controller = new EventController();
                if ($this->method == "GET") {
                    $controller::show();
                } else if ($this->method == "POST") {
                    $controller::save();
                } else {
                    echo "Unsupported method";
                }
                break;
            case '/elimina_evento':
                $controller = new EventController();
                $controller::delete();
                break; 

            // TRATTATIVE SECTION ---------------------
            case '/trattative':
                $controller = new NegotationController();
                $controller::list();
                break;
            case '/trattativa':
                $controller = new NegotationController();
                if ($this->method == "GET") {
                    $controller::show();
                } else if ($this->method == "POST") {
                    $controller::save();
                } else {
                    echo "Unsupported method";
                }
                break;
            case '/elimina_trattativa':
                $controller = new NegotationController();
                $controller::delete();
                break;
             case '/relations':
                $controller = new NegotationController();
                $controller::relations();
                break;
                
            // DASHBOARD SECTION ---------------------
            case '/data_visualizzata':
                $controller = new DashboardController();
                $controller::year_update();
                break;
            case '/mensile_agente':
                $controller = new DashboardController();
                $controller::mensile_agente();
                break;
            case '/totale_agenti':
                $controller = new DashboardController();
                $controller::totale_agenti();
                break; 
            case '/categorie_clienti':
                $controller = new DashboardController();
                $controller::clienti_categoria();
                break;
            case '/prodotti_venduti':
                $controller = new DashboardController();
                $controller::prodotti_venduti();
                break;
            case '/trattative_stato':
                $controller = new DashboardController();
                $controller::trattativa_stato();
                break;
            case '/trattative_fase':
                $controller = new DashboardController();
                $controller::trattativa_fase();
                break;
            case '/motivazioni_perdita':
                $controller = new DashboardController();
                $controller::motivation_neg();
                break;
            case '/redemption':
                $controller = new DashboardController();
                $controller::redemption();
                break;
            case '/redemption_agents':
                $controller = new DashboardController();
                $controller::redemption_agents();
                break;
            case '/redemption_categories':
                $controller = new DashboardController();
                $controller::redemption_categories();
                break;
            // PROGETTI SECTION ---------------------
            case '/progetti':
                $controller = new ProjectController();
                $controller::list();
                break;
            case '/crea_progetto':
                $controller = new ProjectController();
                if ($this->method == "GET") {
                    $controller::show();
                } else if ($this->method == "POST") {
                    $controller::save();
                } else {
                    echo "Unsupported method";
                }
                break;
            case '/progetto':
                $controller = new ProjectController();
                $controller::show();
                break;
            case '/elimina_progetto':
                $controller = new ProjectController();
                $controller::delete();
                break; 
            case '/lista_task';
                $controller = new TaskController();
                $controller::list();
                break;
            case '/task';
                $controller = new TaskController();
                $controller::show();
                break;
            case '/crea_task';
                $controller = new TaskController();
                $controller::save();
                break;
            case '/task_file':
                $id = $_GET['id'];
                $progetto = $_GET['progetto'];
                $controller = new UploadFiles();
                $path = "projects_file/".$progetto."/taskfile/";
                $controller::upload($path,$id);
                header('Location: ' . $GLOBALS['url_frontend'].'project?id='.$progetto);
                break;
            case '/show_files':
                $controller = new TaskController();
                $controller::show_tasks();
                break;
            case '/carica_task' :
                $controller = new TaskController();
                $controller::carica_task();
            case '/lista_agenti_task':
                $controller = new TaskController();
                $controller::list_connection();
                break;
            case '/elimina_task':
                $controller = new TaskController();
                $controller::delete();
                break;
            default:
                //lista clienti
                echo "404 HTML<br>";
                echo $this->path;
                //$controller = new LeadController();
                //$controller->show();
                break;
        }
    }
}

$dispatcher = new Dispatcher();
$dispatcher->dispatch();
