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

    <form action="/fase" method="post">
    <div class="mb-3">
        <!--<input type="hidden" name="id" value=""/> INSERIMENTO ID PER MODIFICA-->
  <label for="exampleFormControlInput1" class="form-label">Nome Fase</label>
  <input type="text" name="nome_fase" class="form-control" placeholder="">
  <label for="exampleFormControlInput1" class="form-label">Step</label>
  <input type="number" name="step" class="form-control" placeholder="">
</div>
<button type="submit" class="btn btn-primary">Invia</button>
</form>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
  </body>
</html>