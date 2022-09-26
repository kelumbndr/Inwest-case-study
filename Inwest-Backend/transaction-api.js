const express = require('express');
const Joi = require('joi').extend(require('@joi/date'));
var IBAN = require('iban');
const { randomUUID } = require('crypto');

const app = express();

app.use(express.json());

const transfers = [];

app.get('/', (req, res)=>{
    res.send('API is up and running')
});

/**
 * get all transfers
 */
app.get('/api/tranfers', (req, res)=>{
    res.send(transfers);
});

/**
 * get transfer by id
 */
app.get('/api/tranfers/:id', (req, res)=>{
    console.log(transfers);
    console.log(req.params.id);
    const tranfer = transfers.find(t => t.id === req.params.id);
    if(!tranfer){
        res.status(404).send('Transfer with given id was not found')
    }
    res.send(tranfer);
});

/**
 * create new transfer
 */
app.post('/api/tranfers', (req, res)=>{

    const validation = validateTransfer(req.body); 
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    const transfer = {
        id: randomUUID(),
        iban: req.body.iban,
        accountHolder: req.body.accountHolder,
        date: req.body.date,
        note: req.body.note,
        amount: req.body.amount,
    }
    transfers.push(transfer);
    res.send(transfer);
});

/**
 * update existing transfer
 */
app.put('/api/tranfers/:id', (req, res)=>{
    const transfer = transfers.find(t => t.id === req.params.id);
    if(!transfer){
        res.status(404).send('Transfer with given id was not found')
    }

    const validation = validateTransfer(req.body); 
    if(validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }
    
    transfer.iban = req.body.iban;
    transfer.accountHolder = req.body.accountHolder;
    transfer.date = req.body.date;
    transfer.note = req.body.note;
    transfer.amount = req.body.amount;
    transfers.push(transfer);

    res.send(transfer);
});

/**
 * delete transfer by id
 */
app.delete('/api/tranfers/:id', (req, res)=>{
    const tranferIndex = transfers.findIndex(t => t.id === req.params.id);
    if(tranferIndex === -1){
        res.status(404).send('Transfer with given id was not found')
    }
    transfers.splice(tranferIndex, 1);
    res.send('Successfully deleted');
});

/**
 * Validates a transfer object
 * validation done using Joi npm library
 * @param {*} transfer 
 * @returns 
 */
function validateTransfer(transfer){
    const schema = Joi.object({
        id: Joi.string(),
        accountHolder: Joi.string().min(3).required(),
        iban: Joi.string().required().custom((value, helper) => {
            if (!IBAN.isValid(value)) {
                return helper.message("Invalid IBAN value is provided")
            } else {
                return true
            }
        }),
        date: Joi.date().format('YYYY-MM-DD'),
        note: Joi.string().max(200),
        amount: Joi.string().required(),
     });

    return schema.validate(transfer);
}

app.listen(3000, ()=> console.log('Listening on port 3000...'))