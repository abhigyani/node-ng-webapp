const Policy = require('../models/policy.model')

exports.getPolicy = (req, res, next) => {
    Policy.fetchAll().then((result) => {
        const data = result[0];
        // console.log('Policies: ', data);
        res.send(data);
    }).catch((error) => {
        console.log(`Error while fetching policies ${error}`);
        res.status(500).send('Internal Server Error');
    })
}

exports.getPolicyByRegion = (req, res, next) => {
    const region = req.params.region;
    Policy.fetchByRegion(region).then((result) => {
        const data = result[0];
        // console.log(`Policy in the ${region} `, data);
        return res.send(data);
    }
    ).catch((error) => {
        console.log(`Error while fetching policy by month ${error}`);
        res.status(500).send('Internal Server Error');
    });
}

exports.getPolicyById = (req, res, next) => {
    const id = req.params.id;
    Policy.fetchById(id).then((result) => {
        const data = result[0];
        // console.log(`Policies matching customer id or policy id ${id} `, data);
        res.send(data);
    }).catch((error) => {
        console.log(`Error while fetching policy by id ${error}`);
        res.status(500).send('Internal Server Error');
    });
}

exports.putUpdatePolicy = (req, res, next) => {
    const currentPolicyId = req.params.policyId;
    const data = req.body;
    console.log(req.body);
    Policy.updatePolicy(data, currentPolicyId).then(() => {
        console.log(`Policy ${currentPolicyId} successfully updated`);
        res.send('Update successful');
    }).catch((error) => {
        console.log(`Error while updating policy details ${error}`);
        res.status(500).send('Internal Server Error');
    })
}