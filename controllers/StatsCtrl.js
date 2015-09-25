var Customer = require('../models/Customer.js'); 
var statsService = require('../services/statsService.js');
var _und = require('../node_modules/underscore/underscore.js');
var moment = require('../node_modules/moment/moment.js')

//declare moment
moment().format(); 

module.exports = {

    getStats: function(req, res){
        statsService.getCustomers().then(function(stats){

            //create array for all stat objects to go into 
            var newStats = [];
            var length = stats.length-1;
            var WaitTimes = [];
            var helpedAt = []; 
            var allCustomersByDate = [];

            /* GET AVERAGES **************************************/ 
            var sum = 0;
            stats.map(function(i){
              WaitTimes.push(i.helpedAt - i.joined);
              helpedAt.push(i.helpedAt - i.joined);
              allCustomersByDate.push(JSON.stringify(i.helpedAt));
              sum += (+i.helpedAt - +i.joined);
            })
            var average = sum / length;

            // sort wait times to find shortest and longest times 
            WaitTimes.sort();

            /* GET NUMBER OF TOTAL CUSTOMERS ******************************/
            var arrLength = WaitTimes.length-1; 

            /* GET WAIT TIMES SHORTEST AND LONGEST  ***********************/
            var shortestWait = WaitTimes[0];
            var longestWait = WaitTimes[arrLength];

            /* GET NUMBER OF DAILY CUSTOMERS *****************************/

            /* GET AVERAGE NUMBER OF DAILY CUSTOMERS ********************/
            var map = {};
            var sequence = [];
            var averageDailyUsers = allCustomersByDate.map(function(i) {
                console.log("SUBSTRING ", i.substring(0, 11)); 
            return i.substring(0, 11).trim();
                })

           console.log("AVERAGE DAILY USERS", averageDailyUsers); 

           for (var i = 0; i < averageDailyUsers.length; i++) {
                var item = averageDailyUsers[i];
                if (map[item]) {
                    map[item]++;
                } else {
                    map[item] = 1;
                    sequence.push(item);
                }
                console.log("MAP", map);
            }


            var output = [];
            for (i = 0; i < sequence.length; i++) {
                output.push(map[sequence[i]]);
            }
            var sumAverageDaily = 0;
            var lengthAverageDaily = output.length;
            
            output.map(function(i) {
                sumAverageDaily += Number(i);
            });

            var avgDaily = sumAverageDaily / lengthAverageDaily;

            console.log("average daily users", avgDaily);

            /* GET AVERAGE CUSTOMERS BY DAY OF WEEK *********************/
            var dayOfWeek = {
                M:0,
                T:0,
                W:0,
                Th:0,
                F:0,
                S:0,
                Su:0,
            }; 

            var today = moment().format(); 
            console.log("Date now", today);

             for (var i = 0; i < averageDailyUsers.length; i++) {
                var item = averageDailyUsers[i];
                if (map[item]) {
                    map[item]++;
                } else {
                    map[item] = 1;
                    sequence.push(item);
                }
                console.log("MAP", map);
            }


            /*  CREATE STATS OBJECT *************************************/
            newStats.push({
                "average": average,
                "shortestWait":shortestWait, 
                "longestWait":longestWait, 
                "totalCustomers":arrLength,
                "averageDailyCust":avgDaily
            })

            console.log("stats object ", newStats); 
            //send back new stats
            res.status(200).send(newStats);

        });

    }



}
