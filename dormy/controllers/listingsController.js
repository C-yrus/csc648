const db = require('../config/database');

// controller for route; GET `/listings`
module.exports.list = (req, res) => {
    // express populates value in req.query from URL; `/listings?type=TYPE&query=SEARCH_QUERY`
    let type = req.query.type;
    let query = req.query.query;
    let filter = req.query.filter;
    let filterAS = req.query.filterAS;

    let q = `SELECT * FROM listings WHERE approved='true'`;

    if (type && query) {
        q = `SELECT * FROM listings WHERE type = '${type}' AND approved='true' AND (LOWER(title) LIKE '%${query}%' OR LOWER(address) LIKE '%${query}%')`;
    } else if (!type && query ) {
        q = `SELECT * FROM listings WHERE approved='true' AND LOWER(title) LIKE '%${query}%' OR LOWER(address) LIKE '%${query}%'`;
    } else if (type && !query ) {
        q = `SELECT * FROM listings WHERE approved='true' AND type = '${type}'`;
    }

    if (filter) {
        q = `SELECT * FROM listings WHERE approved='true' ORDER BY ${filter.valueOf()} DESC`;
        if(type && !query) {
            q = `SELECT * FROM listings WHERE approved='true' AND (type = '${type}') ORDER BY ${filter.valueOf()} DESC`;
        } else if(!type && query) {
            q = `SELECT * FROM listings WHERE approved='true' AND (LOWER(title) LIKE '%${query}%' OR LOWER(address) LIKE '%${query}%) ORDER BY ${filter.valueOf()} DESC`;
        }else if(type && query){
            q = `SELECT * FROM listings WHERE type = '${type}' AND LOWER(title) LIKE '%${query}%' OR LOWER(address) LIKE '%${query}%' ORDER BY ${filter.valueOf()} DESC`;
        }
    }

    if (filterAS) {
        q = `SELECT * FROM listings WHERE approved='true' ORDER BY ${filterAS.valueOf()} ASC`;
        if(type && !query) {
            q = `SELECT * FROM listings WHERE (type = '${type}') ORDER BY ${filterAS.valueOf()} ASC`;
        } else if(!type && query) {
            q = `SELECT * FROM listings WHERE (LOWER(title) LIKE '%${query}%' OR LOWER(address) LIKE '%${query}%) ORDER BY ${filterAS.valueOf()} ASC`;
        }else if(type && query){
            q = `SELECT * FROM listings WHERE type = '${type}' AND LOWER(title) LIKE '%${query}%' OR LOWER(address) LIKE '%${query}%' ORDER BY ${filterAS.valueOf()} ASC`;
        }
    }
    db.any(q)
        .then(data => {
            res.render('listings/list', {
                listings: data,
                qCount: data.length,
                type: type,
                query: query,
                filter: filter,
                filterAS: filterAS,
                q: q
            });
        })
        .catch(err => console.error(`Error fetching listings; ${err}`));
};


// controller for route: GET `/listings/:id`
// `:id` is populated from the listing detail route in /routes/
module.exports.detail = (req, res) => {
    db.one(`SELECT * FROM listings WHERE id = '${req.params.id}' AND approved = 'true'`)
        .then(data => {
            res.render('listings/detail', {
                listing: data,
            });
        })
        .catch(() => res.redirect('/account'));
};

// controller for route; GET `/listings/add`
module.exports.add = (req, res) => {
    res.render('add', {});
};

// controller for route; GET `/listings/distance`
module.exports.distance = (req, res) => {
    db.one(`SELECT * FROM listings WHERE id = '${req.params.id}' AND approved = 'true'`)
        .then(data => {
            res.render('distance', {
                listing: data
            });
        })
        .catch(() => res.redirect('/account'));
};

// controller for route; POST `/listings/add`
// thumbnail upload is stored locally in /public/thumbnails/
// faster than BLOB and much smaller size
module.exports.addNew = (req, res) => {
    db.one(`INSERT INTO listings(title, address, beds, baths, rent, distance, 
            type, created, user_id, thumbnail, description) 
            VALUES($1, $2, $3, $4, $5, $6, $7, now(), $8, $9, $10) RETURNING id`,
        [req.body.title, req.body.address, req.body.beds, req.body.baths,
            req.body.rent, req.body.distance, req.body.type, req.user.id,
            req.file.filename, req.body.description])
        .then(() => {
            res.redirect('/account');
        })
        .catch(err => res.send(`Error creating listing; ${err}`));
};

module.exports.addMessage = (req, res) => {
    db.one(`SELECT * FROM listings WHERE id = '${req.params.id}'`)
        .then(listing => {
            db.one(`INSERT INTO messages(from_name, from_email, message, listing_id, created, user_id)
            VALUES($1, $2, $3, $4, now(), $5) RETURNING id`,
                [req.body.from_name, req.body.from_email, req.body.message, req.params.id, listing.user_id])
                .then(() => {
                    res.render('listings/detail', {
                        listing: listing,
                        message: `Message successfully sent!`
                    });
                })
                .catch(err => res.send(`Error sending message...Try again: ${err}`));
        })
        .catch(err => res.send(`Error retrieving listing detail; ${err}`));
};
