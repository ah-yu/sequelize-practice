'use strict'

const config = require('./config');
const Sequelize = require('sequelize');

global.Promise = Promise;

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

const Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

const now = Date.now();

//create
Pet.create({
    id: `dog-${now}`,
    name: 'azan',
    gender: false,
    birth: '2000-01-01',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(p => {
    // console.log('created.' + JSON.stringify(p));
}).then(error => {
    if (error) throw error;
});

//query
Pet.findAll({
    where: {
        name: 'azan'
    }
}).then(pets => {
    console.log(`find ${pets.length} pets:`);
    pets.forEach(p => {
        console.log(JSON.stringify(p));
    });
});

//update
Pet.findAll({
    where: {
        name: 'azan'
    }
}).then(pets => {
    pets.forEach(p => {
        console.log('update pet...');
        p.gender = true;
        p.updatedAt = Date.now();
        p.version++;
        p.save();
    });
});