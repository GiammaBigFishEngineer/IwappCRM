<?php

require_once('BaseModel.php');

class TaskAgentRelationship extends BaseModel {

        public static string $nome_tabella = 'TaskAgentRelationship';
        protected array $_fields = [
            "id",
            "task",
            "agent",
        ];

    
}