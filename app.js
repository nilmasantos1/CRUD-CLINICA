var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importa o roteador para a nova rota de pacientes
const pacientesRouter = require('./routes/pacientes'); 

var app = express();

// Configuração do motor de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configura middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Utiliza o roteador de pacientes
app.use('/', pacientesRouter);

// Captura 404 e encaminha para o manipulador de erros
app.use(function(req, res, next) {
  next(createError(404));
});

// Manipulador de erros
app.use((err, req, res, next) => {
  // Configura mensagem e erro para renderizar
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza a página de erro
  res.status(err.status || 500);
  res.render('error', {
    title: 'Erro',       // Define o título da página de erro
    message: err.message,
    error: err
  });
});

module.exports = app;
