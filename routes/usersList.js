const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let result = await userOps.getResults();
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let result = await userOps.getResults(req.params.id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }    
});

router.put('/', async (req, res) => {
    try {
        let result = await userOps.updateUser(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.send(error);
    }
});


module.exports = router;