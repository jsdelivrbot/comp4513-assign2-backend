var path = require('path');
module.exports = {
    
    defineRouting: function(app, mongoose, uristring) 
    {
        mongoose.connect(uristring, function (err, res) {
            if (err) { console.log ('ERROR connecting to: ' + uristring + '. ' + err); } 
            else { console.log ('Succeeded connected to: ' + uristring); }
        });
        
        var priceSchema = new mongoose.Schema({
           id: Number,
            date: String,
            open: Number,
            high: Number,
            low: Number,
            close: Number,
            volume: Number,
            symbol: String
        });
        
        var prce = mongoose.model('prices', priceSchema);
        app.route('/api/prices/:mnth/:sym')
            .get(function(req, resp){
            prce.find({symbol : req.params.sym, date : new RegExp('^'+req.params.mnth+'$', "i")}, function(err, data) {
                if (err) { resp.json({ message : 'Unable to find prices' }); } 
                else { resp.json(data); }
            });
    }
}