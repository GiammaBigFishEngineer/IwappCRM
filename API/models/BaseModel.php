<?php
require dirname(__DIR__)."/config/DB.php";
require dirname(__DIR__)."/utils/ClassUtils.php";

use CodeInc\StripAccents\StripAccents;

class BaseModel implements \JsonSerializable
{
    private $_data;

    public static string $nome_tabella;
    protected array $_fields;

    private array $_values;
    private string $_columns;
    private string $_bind_columns;

    public ?array $errors;

    public function __construct(array $properties = array())
    {
        foreach ($this->_fields as $field)
            $this->_data[$field] = $properties[$field];
    }

    public function __set(string $property, $value)
    {
        if (method_exists($this, $method = 'set' . ucfirst($property))) {
            $this->$method($property, $value);
        }

        return $this->_data[$property] = $value;
    }

    public function __get(string $property)
    {
        if (method_exists($this, $method = 'get' . ucfirst($property))) {
            return $this->$method($property);
        }

        return array_key_exists($property, $this->_data)
            ? $this->_data[$property]
            : null;
    }

    public function __isset(string $property): bool
    {
        return array_key_exists($property, $this->_data);
    }

    private function _prepare()
    {
        $props = non_null_properties($this, $this->_fields);

        $this->_columns = implode(", ", $props);
        $this->_bind_columns = ':' . implode(", :", $props);
        $this->_values = class_to_array($this, $props);
    }

    static function getSafeFieldsName($fields, bool $isPDO = false)
    {
        $res = array();
        foreach ($fields as $field => $val) {
            // $enc_field = $field;

            // if (str_starts_with($enc_field,"Localit"))
            //     $enc_field = "Località";
            // if($isPDO){
            //     $enc_field = replace_accents($enc_field);
            // } 
            $res[str_replace(" ", "_", mb_convert_encoding($field, "ISO-8859-1", "UTF-8"))] = $val;
        }
        return $res;
    }

    public function save(): int
    {
        $this->_prepare();
        $updates = array();
        foreach ($this->_fields as $column) {
        $updates[] = "$column=VALUES($column)";
        }
        $updates_str = implode(',', $updates);
        $sql = "INSERT INTO " . static::$nome_tabella . " ($this->_columns) VALUES ($this->_bind_columns) ON DUPLICATE KEY UPDATE $updates_str";
        $sth = DB::get()->prepare($sql);
        $sth->execute($this->_values);

        if (isset($this->_values["id"]) && $this->_values["id"] != '') {
            return (int) $this->_values["id"];
        } else {
            return (int) DB::get()->lastInsertId();
        }
    }

    public static function all(): array
    {
        $sql = 'SELECT * FROM ' . static::$nome_tabella;
        $list = DB::get()->query($sql)->fetchAll();

        $entities = array();
        foreach ($list as $row) {
            $entities[] = new static($row);
        }

        return $entities;
    }

    public static function where(array $conditions): array
    {
        $sql = 'SELECT * FROM ' . static::$nome_tabella . ' WHERE';

        $where = '';
        foreach ($conditions as $key => $prop) {
            if ($where == '')
                $where .= " $key = :$key";
            else
                $where .= " AND $key = :$key";
        }
        $sql .= $where;
        $sql .= ' LIMIT ' . 200;
        $sth = DB::get()->prepare($sql);
        $sth->execute($conditions);
        $list = $sth->fetchAll();

        $entities = array();
        foreach ($list as $row) {
            $entities[] = new static($row);
        }

        return $entities;
    }

    public static function count(): int
    {
        $sql = "SELECT count(*) FROM  " . static::$nome_tabella;

        $sth = DB::get()->prepare($sql);
        $sth->execute();

        return $sth->fetchColumn();
    }

    public static function countWhere(array $conditions, bool $like = true): int
    {
        $sql = "SELECT count(*) FROM  " . static::$nome_tabella;

        if (is_array($conditions)  && !empty($conditions)) {
            $sql .= ' WHERE';

            $where = '';
            foreach ($conditions as $key => $prop) {
                $safe_key = str_replace(" ", "_", $key);

                if ($where == '')
                    $where .= " `$key` ";
                else
                    $where .= " AND `$key` ";

                if ($like) {
                    $where .= "LIKE ";
                    $conditions[$key] = '%' . $prop . '%';
                } else {
                    $where .= "= ";
                }

                $where .=  ":$safe_key";
            }
            $sql .= $where;
        }

        $sth = DB::get()->prepare($sql);
        $sth->execute(self::getSafeFieldsName($conditions));
        $sth->execute();

        return $sth->fetchColumn();
    }

    public static function get(int $id)
    {
        $query = "SELECT * FROM " . static::$nome_tabella  . " WHERE id=:id";
        $sth = DB::get()->prepare($query);
        $sth->execute([
            'id' => $id,
        ]);
        $row = $sth->fetch();

        return new static($row);
    }

    public static function paginate(string $order, int $page, int $start, int $perPage, array $conditions = NULL, bool $like = true): array
    {
        //Order è la colonna per la quale ordinare in ordine alfabetico
        //Page sono le pagine
        //Start è la pagina di inizio
        //perPAge sono n elementi per pagina
        //conditions è la ricerca

        $sql = 'SELECT * FROM ' . static::$nome_tabella;

        if (is_array($conditions) && !empty($conditions)) {
            $sql .= ' WHERE';

            $where = '';
            foreach ($conditions as $key => $prop) {
                $safe_key = str_replace(" ", "_", $key);

                if ($where == '')
                    $where .= " `$key` ";
                else
                    $where .= " AND `$key` ";

                if ($like) {
                    $where .= "LIKE ";
                    $conditions[$key] = '%' . $prop . '%';
                } else {
                    $where .= "= ";
                }

                $where .=  ":$safe_key";
            }
            $sql .= $where;
        }

        $sql .= " ORDER BY ".$order." DESC";

        $sql .= " LIMIT $perPage";
        if ($start > 0)
            $sql .= " OFFSET $start";

        $sth = DB::get()->prepare($sql);
        $sth->execute(self::getSafeFieldsName($conditions));
        $list = $sth->fetchAll();

        $entities = array();
        foreach ($list as $row) {
            $entities[] = new static($row);
        }

        $count = self::count();
        $filtered = (is_array($conditions) && !empty($conditions)) ? self::countWhere($conditions) : $count;

        return [
            "draw" => $page,
            "recordsTotal" => self::count(),
            "recordsFiltered" => $filtered,
            "data" => $entities,
        ];
    }

    public static function delete(int $id): void
    {
        $query = "DELETE FROM " . static::$nome_tabella  . " WHERE id = :id;";
        $sth = DB::get()->prepare($query);
        $sth->execute([
            'id' => $id,
        ]);
    }

    public function validate(): bool
    {
        return true;
    }
    public function jsonSerialize(): mixed
    {
        $data = $this->_data;

        /* add also null value fields */
        foreach ($this->_fields as $field)
            if (!isset($data[StripAccents::strip($field)]))
                $data[StripAccents::strip($field)] = "";

        return $data;
    }
}
