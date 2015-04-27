module.exports = function(app) {

    var OpenStates = require('openstates');

    var apikeys = require('./apikeys');
    var openstates = new OpenStates(apiKey);

    //legislature search
    openstates.legSearch({
        state: 'ok'
    }, legCallback)

    //bill search
    openstates.billSearch({
        state: 'ok',
        search_window: 'session:2015-2016'
    }, billCallback)

    function legCallback(err, json) {
        if (err) throw err;

        legislators = [];
        legislator = {};

        for(object in json) {

            legislator = {
                last_name: json[object].last_name,
                full_name: json[object].full_name,
                party: json[object].party,
                district: json[object].district,
                chamber: json[object].chamber,
                photo_url: json[object].photo_url,
                url: json[object].url,
                openstateid: json[object].leg_id
            }

            legislators.push(legislator);
        }

        app.dataSources.postgres.automigrate('legislator', function(err) {
          if (err) throw err

          app.models.legislator.create(legislators, function(err, legislators) {
            if (err) throw err

            console.log('Legislator models created.')
          })
        })

    }

    function billCallback(err, json) {
        if (err) throw err;

        app.dataSources.postgres.automigrate('bill', function(err) {
            if (err) throw err

            for (object in json) {

                    openstates.billDetail(
                        'ok',
                        '2015-2016',
                        json[object].bill_id
                    , billDetailCallback)

            }

            console.log('Bill models created.');

        })

    }

    function billDetailCallback(err, json) {
        if (err) throw err;

        bills = [];
        bill = {};

        bill = {
            title: json.title,
            openstateid: json.id,
            chamber: json.chamber,
            bill_id: json.bill_id,
            session: json.session,
            subjects: json.subjects,
            votes: json.votes,
            actions: json.actions,
            sponsors: json.sponsors,
            sources: json.sources,
            documents: json.documents,
            versions: json.versions
        }

        bills.push(bill);

        app.models.bill.create(bills, function(err, bills) {
          if (err) throw err

        })

    }
}
