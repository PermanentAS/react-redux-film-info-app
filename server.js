const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
const app = express();
const port = 8000;
var multipart = require("connect-multiparty");

let data = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multipart());

app.post("/upload", (request, response) => {
  if (!("file" in request.files))
    return response.status(400).send("No files were uploaded.");

  let linesArray = fs
    .readFileSync(request.files.file.path)
    .toString()
    .split("\r\n\r\n");

  let result = [];
  for (let i = 0; i < linesArray.length; i++) {
    let movie = {};
    linesArray[i] = linesArray[i].split("\r\n");
    for (let j = 0; j < linesArray[i].length; j++) {
      linesArray[i][j] = linesArray[i][j].split(": ");
      linesArray[i][1][0] = "ReleaseYear";
      movie[linesArray[i][j][0]] = linesArray[i][j][1];
    }
    result.push(movie);
  }
  result = result.map((item, idx) => {
    return { id: `${uuidv1()}`, ...item };
  });

  result.forEach(isDuplicated => {
    if (data.find(item => item.Title === isDuplicated.Title) === undefined) {
      data.push(isDuplicated);
    }
  });

  fs.writeFile("movies.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });

  response.send(data);
});

app.get("/data", (request, response) => {
  if (fs.existsSync("movies.txt")) {
    let parsed = JSON.parse(fs.readFileSync("movies.txt").toString());
    data = [...parsed];
  }

  response.send(data);
});

app.get("/data/:id", (request, response) => {
  let film = data.find(film => {
    console.log(film.id);
    return film.id === request.params.id;
  });

  response.send(film);
});

app.post("/data", (request, response) => {
  const film = {
    id: request.body.id,
    Title: request.body.Title,
    ReleaseYear: request.body.ReleaseYear,
    Format: request.body.Format,
    Stars: request.body.Stars
  };

  data.unshift(film);

  fs.writeFile("movies.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });

  response.send(data);
});

app.put("/data/:id", (request, response) => {
  let film = data.find(film => {
    return film.id === request.params.id;
  });

  film.Title = request.body.Title;
  film.ReleaseYear = request.body.ReleaseYear;
  film.Stars = request.body.Stars;
  film.Format = request.body.Format;

  fs.writeFile("movies.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });

  response.send(data);
});

app.delete("/data/:id", (request, response) => {
  data = data.filter(film => {
    return film.id !== request.params.id;
  });

  fs.writeFile("movies.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });

  response.send(data);
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
