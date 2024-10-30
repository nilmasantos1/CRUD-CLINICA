const express = require('express');
const router = express.Router();
const sequelize = require('../models/db');
const Paciente = require('../models/paciente');

// Sincroniza o modelo com o banco de dados
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});

// Rota para a página inicial
router.get('/', (req, res) => {
  res.render('layout', { title: '', body: '', showBodyImage: true }); 
});

// Rota para listar pacientes
router.get('/pacientes', async (req, res) => {
  try {
    let pacientes = await Paciente.findAll();

    
    pacientes = pacientes.map(paciente => {
      paciente.diaMarcado = new Date(paciente.diaMarcado);
      return paciente;
    });

    res.render('pacientes', {
      title: 'Lista de Pacientes',
      body: 'pacientes',
      pacientes: pacientes,
      showBodyImage: false // Imagem não deve ser exibida nas outras páginas
    });
  } catch (error) {
    res.status(500).render('error', { title: 'Erro', message: error.message, error: error });
  }
});

// Rota para exibir o formulário de adição de paciente
router.get('/paciente/add', (req, res) => {
  res.render('addpaciente', { title: 'Adicionar Paciente', showBodyImage: false });
});

// Rota para adicionar um novo paciente
router.post('/paciente/add', async (req, res) => {
  try {
    const { cpf, nome, idade, diaMarcado, horaMarcada } = req.body;
    if (!/^[0-9]{11}$/.test(cpf)) {
      throw new Error('Digite seu CPF');
    }
    await Paciente.create({ cpf, nome, idade, diaMarcado, horaMarcada });
    res.redirect('/pacientes');
  } catch (error) {
    res.status(400).render('error', { title: 'Erro', message: error.message, error: error });
  }
});

// Rota para exibir o formulário de atualização de paciente
router.get('/paciente/update', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.render('updatepaciente', { pacientes: pacientes, title: 'Atualizar Paciente', showBodyImage: false });
  } catch (error) {
    res.status(500).render('error', { title: 'Erro', message: error.message, error: error });
  }
});

// Rota para buscar um paciente específico para atualizar
router.get('/paciente/update/:cpf', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.cpf);
    if (!paciente) {
      return res.status(404).render('error', { title: 'Erro', message: 'Paciente não encontrado', error: '' });
    }
    res.json(paciente);
  } catch (error) {
    res.status(500).render('error', { title: 'Erro', message: error.message, error: error });
  }
});



router.post('/paciente/update', async (req, res) => {
  const { cpf, nome, idade, diaMarcado, horaMarcada } = req.body;
  try {
    await Paciente.update({ nome, idade, diaMarcado, horaMarcada }, { where: { cpf: cpf } });
    res.redirect('/pacientes');
  } catch (error) {
    res.status(500).render('error', { title: 'Erro', message: error.message, error: error });
  }
});

router.get('/paciente/delete', (req, res) => {
  res.render('deletepaciente', { title: 'Apagar Paciente', showBodyImage: false });
});


router.post('/paciente/delete', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.body.cpf);
    if (!paciente) {
      return res.status(404).render('error', { title: 'Erro', message: 'Paciente não encontrado', error: '' });
    }
    await paciente.destroy();
    res.redirect('/pacientes');
  } catch (error) {
    res.status(500).render('error', { title: 'Erro', message: error.message, error: error });
  }
});

module.exports = router;
