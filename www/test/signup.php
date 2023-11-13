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

    <form action="/signup" method="post">

    <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Nome e Cognome</label>
  <input type="text" name="fullname" class="form-control" id="exampleFormControlInput1" placeholder="">

  <label for="exampleFormControlInput1" class="form-label">Email</label>
  <input type="email" name="email" class="form-control" id="exampleFormControlInput1" placeholder="">

  <label for="exampleFormControlInput1" class="form-label">password</label>
  <input type="password" name="password" class="form-control" id="exampleFormControlInput1" placeholder="">

  <label for="exampleFormControlInput1" class="form-label">Ripeti Password</label>
  <input type="password" name="password2" class="form-control" id="exampleFormControlInput1" placeholder="">
  
  <button type="submit" class="btn btn-primary">Invia</button>
</div>

</form>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
  </body>
</html>