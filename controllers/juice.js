var juice = require('../models/juice');
// List of all juice
exports.juice_list = function (req, res) {
    res.send('NOT IMPLEMENTED: juice list');
};

// Handle juice create on POST.
//for a specific juice.
exports.juice_detail = async function(req, res) {
console.log("detail" + req.params.id)
try {
result = await juice.findById( req.params.id)
res.send(result)
} catch (error) {
res.status(500)
res.send(`{"error": document for id ${req.params.id} not found`);
}
};
// Handle juice delete on DELETE.
exports.juice_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await juice.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
    
// Handle juice update form on PUT.
exports.juice_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await juice.findById( req.params.id)
// Do updates of properties
if(req.body.juice_type)
toUpdate.juice_flavor = req.body.juice_flavor;
if(req.body.juice_brand) toUpdate.juice_brand = req.body.juice_brand;
if(req.body.juice_price) toUpdate.juice_price= req.body.juice_price;
let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
};


// List of all juice
exports.juice_list = async function (req, res) {
    try {
        thedress = await juice.find();
        res.send(thedress);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.juice_view_all_Page = async function (req, res) {
    try {
        thejuice = await juice.find();
        res.render('juice', { title: 'juice Search Results', results: thejuice });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle juice create on POST.
exports.juice_create_post = async function(req, res) {
    console.log(req.body)
    let document = new juice();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    document.juice_flavor = req.body.juice_flavor;
    document.juice_brand = req.body.juice_brand;
    document.juice_price = req.body.juice_price;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

    // Handle a show one view with id specified by query
exports.juice_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await juice.findById( req.query.id)
    res.render('juicedetail',
    { title: 'juice Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

    // Handle building the view for creating a juice.
    // No body, no in path parameter, no query.
    // Does not need to be async
    exports.juice_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('juicecreate', { title: 'juice Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a juice.
// query provides the id
exports.juice_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await juice.findById(req.query.id)
    res.render('juiceupdate', { title: 'juice Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
    
    // Handle a delete one view with id from query
exports.juice_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await juice.findById(req.query.id)
    res.render('juicedelete', { title: 'juice Delete', toShow:
    result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
    
    