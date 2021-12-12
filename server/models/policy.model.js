const db = require('../utils/database');

class Policy {
    constructor() {

    }

    static fetchAll() {
        const query = `SELECT * FROM policy;`;
        const promise = db.execute(query);
        return promise;
    }

    static fetchByMonth(month) {
        // MM-DD-YYYY;
        const query = `SELECT * FROM policy WHERE MONTH(date_of_purchase)='${month}';`;
        const promise = db.execute(query);
        return promise
    }

    static fetchByRegion(region) {
        if (region === 'All') {
            return this.fetchAll();
        }
        const query = `SELECT * FROM policy WHERE customer_region='${region}';`;
        const promise = db.execute(query);
        return promise;
    }

    static fetchById(id) {
        const query = `SELECT * FROM policy WHERE policy_id = ${id} OR customer_id = ${id};`
        const promise = db.execute(query);
        return promise;
    }

    static updatePolicy(data, currentId) {
        const query = `UPDATE policy 
        SET 
            policy_id='${data.policy_id}',
            customer_id='${data.customer_id}',
            fuel='${data.fuel}',
            vehicle_segment='${data.vehicle_segment}',
            premium='${data.premium}',
            bodily_injury_liability='${data.bodily_injury_liability}',
            personal_injury_protection='${data.personal_injury_protection}',
            property_damage_liability='${data.property_damage_liability}',
            collision='${data.collision}',
            comprehensive='${data.comprehensive}',
            customer_gender='${data.customer_gender}',
            customer_income_group='${data.customer_income_group}',
            customer_region='${data.customer_region}',
            customer_marital_status='${data.customer_marital_status}'
        WHERE policy_id='${currentId}';`

        console.log(query);
        
        const promise = db.execute(query);
        return promise;
    }
}

module.exports = Policy;