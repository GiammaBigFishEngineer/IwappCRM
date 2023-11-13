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

    <form action="/cliente" method="post">
    <div class="mb-3">
        <input type="hidden" name="id" value="0"/> 
  <label class="form-label">Nome</label>
  <input type="text" name="nome" class="form-control" placeholder="">
  <label class="form-label">Cognome</label>
  <input type="text" name="cognome" class="form-control" placeholder="">
  <label class="form-label">Azienda</label>
  <input type="text" name="azienda" class="form-control" placeholder="">
  <label class="form-label">Via</label>
  <input type="text" name="via" class="form-control" placeholder="">
  <label class="form-label">Città</label>
  <input type="text" name="citta" class="form-control" placeholder="">
  <label class="form-label">Email</label>
  <input type="text" name="email" class="form-control" placeholder="">
  <label class="form-label">Provincia</label>
  <input type="text" name="provincia" class="form-control" placeholder="">
  <label class="form-label">Partita IVA</label>
  <input type="text" name="partita_iva" class="form-control" placeholder="">
  <label class="form-label">Cellulare</label>
  <input type="text" name="cellulare" class="form-control" placeholder="">
  <label class="form-label">Telefono Fisso</label>
  <input type="text" name="telefono_fisso" class="form-control" placeholder="">

  <input type="hidden" name="referente" class="form-control" value="0" placeholder="">

  <label class="form-label">Agente</label>
  <select class="form-select" name="agente" aria-label="Default select example">
    <option selected>Scegli un agente</option>
    <option value="3">Agente1</option><!--  Filtrare opzioni  -->
    </select>

    <label class="form-label">Categoria</label>
  <select class="form-select" name="categoria" aria-label="Default select example">
    <option selected>Scegli una categoria</option>
    <option value="3">Categoria1</option><!--  Filtrare opzioni  -->
    </select>

  <input type="hidden" name="converted_date" class="form-control" value="0" placeholder=""><label class="form-label">Referente</label>
  <input type="hidden" name="date_added" class="form-control" value="0" placeholder="">
  <input type="hidden" name="preferiti" class="form-control" value="0" placeholder="">

  <label class="form-label">Sito Web</label>
  <input type="text" name="sitoweb" class="form-control" placeholder="">
</div>
<button type="submit" class="btn btn-primary">Invia</button>
</form>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
  </body>
</html>