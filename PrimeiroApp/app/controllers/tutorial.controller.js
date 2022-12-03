const db = require('../model');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    // validando a requisição
    if (!req.body.title) {
        res.status(400).send( {
            message: 'O Título do tutorial deve ser preenchido'
        });
        return;
    }

    // Criando o Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Salvando o tutorial na base
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Erro ao salvar o tutorial.'
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    Tutorial.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Erro ao recuperar os tutoriais.'
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Não encontramos o Tutorial com o id ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Erro ao recuperar o tutorial com o id ${id}.`
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: 'Tutorial foi atualizado com sucesso.'
            });
        } else {
            res.send({
                message: `Não foi possível atualizar o tutorial com o id ${id} talvez o tutorial não foi encontrado, ou o body está vazio.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro ao atualizar o tutorial com o id ${id}.`
        });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id

    Tutorial.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: `Tutorial removido com sucesso.`
            });
        } else {
            res.send({
                message: `Não foi possível remover o tutorial com id ${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Erro ao remover o tutorial com id ${id}.`
        });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({
            message: `${nums} tutoriais foram deletados com sucesso.`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Houve um erro ao remover todos os tutoriais.`
        });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({
        where: {published: true}
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || `Algum erro ocorreu para recuperar os tutoriais publicados.`
        })
    });
};
