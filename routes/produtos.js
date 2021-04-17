const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');
const mongoose = require('mongoose');

//recuperando todos os produtos
router.get('/', (req, res) => {
    Produto.find()
    .exec()
    .then(doc => {
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(500).json({
            erro:err
        })
    });
    
});


//recuperando um único produto
router.get('/:produtoId', (req, res) => {
    const id = req.params.produtoId;
    Produto.findById(id)
    .then(id => {
        res.status(200).json({
            message: 'Produto encontrado',
            id: id
        })
    })
    .catch(err => {
        res.status(500).json({
            erro: err
        })
    });            
});

//salvando um produto
router.post('/', (req, res, next) => {

    const produto = new Produto({
            _id: new mongoose.Types.ObjectId(),
            nome:  req.body.nome,
            preco: req.body.preco
    });

    produto.save()
    .then(result => {
        res.status(201).json({
            message: 'Produto salvo',
            produto: produto
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    });

    
});

//atualizando um produto
router.put('/:produtoId', (req, res, next) =>{
    const id = req.params.produtoId;
    Produto.findByIdAndUpdate(id, req.body)    
    
    .then(id => {        
        res.status(200).json({
            message: 'Produto encontrado e atualizado',
            id: id
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
});

//deletando um produto
router.delete('/:produtoId', (req, res, next) =>{
    const id = req.params.produtoId;
    Produto.findByIdAndDelete(id)

    .then(id => {
        res.status(200).json({
            message: 'Produto encontrado e deletado',
            id:id
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
});

module.exports = router;