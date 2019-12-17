'use strict'

const pgp = require('pg-promise')({
    capSQL: true
});
const axios = require('axios');

const cn = {
    host: 'satao.db.elephantsql.com',
    port: 5432,
    database: 'fchhltfc',
    user: 'fchhltfc',
    password: 'vcyFNRGGWwzAIXdQPiTMXcEXz5nYAYLV'
};

const db = pgp(cn);