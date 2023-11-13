<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  </head>
  <body>
    <h1>Hello, world!</h1>

    <form action="/trattativa" method="post">
    <div class="mb-3">
        <input type="hidden" name="id" value="0"/> 
  <label class="form-label">Nome Trattativa</label>
  <input type="text" name="nome_trattativa" class="form-control" placeholder="">
  <label class="form-label">Cliente</label>
  <input type="number" value="7" name="cliente" class="form-control" placeholder="">
  <label class="form-label">Stato</label>
  <input type="number" name="stato" class="form-control" placeholder="">
  <label class="form-label">Fase</label>
  <input type="number" value="4" name="fase" class="form-control" placeholder="">
  <br>
  <label class="form-label">Prodotti</label>
  <select name="products[]" multiple>
    <option value="1">Prodotto1</option>
    <option value="2">Prodotto2</option>
  </select>
  <br>

  <label class="form-label">Valore Economico</label>
  <input type="number" name="valore_economico" class="form-control" placeholder="">
  <label class="form-label">Descrizione</label>
  <input type="text-area" name="descrizione" class="form-control" placeholder="">
  <label class="form-label">Motivazione Perdita</label>
  <input type="number" name="motivazione_perdita" class="form-control" placeholder="">

  <input type="hidden" name="referente" class="form-control" value="0" placeholder="">

  <input type="hidden" name="data_vincita" class="form-control" value="0" placeholder=""><label class="form-label">Referente</label>
  <input type="hidden" name="date_added" class="form-control" value="0" placeholder="">

</div>
<button type="submit" class="btn btn-primary">Invia</button>
</form>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
  </body>
</html>