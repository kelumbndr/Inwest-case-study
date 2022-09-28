const express = require('express');
const cors = require('cors');
const Joi = require('joi').extend(require('@joi/date'));
const IBAN = require('iban');
const { randomUUID } = require('crypto');

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*'
}));

// using inmemory store since the lack of time
// I have added five dummy records
const transfers = [
    {
        "id": "a9b2a41c-1d0c-42c3-a047-4d12a1ff7ca9",
        "iban": "DE91100000000123456789",
        "accountHolder": "Kelum Bandara",
        "date": "2022-09-26",
        "note": "first transaction",
        "amount": "1000.99"
    },
    {
        "id": "d9269afd-818c-4965-ada6-eceb3bc7b2af",
        "iban": "DE89370400440532013000",
        "accountHolder": "John Conner",
        "date": "2022-09-26",
        "note": "party spent amount",
        "amount": "1009.99"
    },
    {
        "id": "53e94fac-917e-4711-8584-764145db619e",
        "iban": "DE65500105179518162243",
        "accountHolder": "Sara Conner",
        "date": "2022-09-25",
        "note": "fuel amount",
        "amount": "59.99"
    },
    {
        "id": "0feb54c1-57e3-4d49-8b54-dcabd29b8c52",
        "iban": "DE14500105176245329617",
        "accountHolder": "Kyle Reese",
        "date": "2022-09-24",
        "note": "new iphone 14",
        "amount": "1099.99"
    },
    {
        "id": "38a9090c-eecd-4441-ad86-d1e51ef8264c",
        "iban": "DE43500105171498982131",
        "accountHolder": "Terminator",
        "date": "2022-08-24",
        "note": "new iphone 13",
        "amount": "799.99"
    }
];

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