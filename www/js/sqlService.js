angular.module('starter').factory('SQLService', function ($q) {

	var db;
	var task='';
	var deltask;
	
	function createDB() {
		try {
			db = window.openDatabase("quoteDB", "1.0", "IndiaStock", 10*1024*1024);
			db.transaction(function(tx){
				tx.executeSql("CREATE TABLE IF NOT EXISTS quotes (quoteId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, quoteName VARCHAR(100) )",[]);
			});
		} catch (err) {
			alert("Error processing SQL: " + err);
    	}
		console.log('database created');
	}

	function setQuotes(tname){
		return promisedQuery("INSERT INTO quotes(quoteName) VALUES ('" + tname + "')", defaultResultHandler, defaultErrorHandler);
	}
	
	function delQuotes(tid){
		return promisedQuery("DELETE FROM quotes where quoteId = " + tid, defaultResultHandler, defaultErrorHandler);
	}
	
	function UpdateTasks(tname, tid){
		return promisedQuery("UPDATE quotes SET quoteName='" + tname + "' WHERE quoteId = " + tid, defaultResultHandler, defaultErrorHandler);
	}

	function getQuotes(){
		return promisedQuery('SELECT * FROM quotes', defaultResultHandler, defaultErrorHandler);
	}
	
	function defaultResultHandler(deferred) {
	  return function(tx, results) {
		var len = results.rows.length;
		var output_results = [];
		
		for (var i=0; i<len; i++){
			var t = {'quoteId':results.rows.item(i).quoteId,'quoteName':results.rows.item(i).quoteName};
			output_results.push(t);				
		}
		
		deferred.resolve(output_results);  
	  }  
	}
	
	function defaultErrorHandler(deferred) {
	  return function(tx, results) {
		var len = 0;
		var output_results = ''; 
		deferred.resolve(output_results);
	  } 
	}
	
	function promisedQuery(query, successCB, errorCB) {
	  var deferred = $q.defer();
	  db.transaction(function(tx){
		tx.executeSql(query, [], successCB(deferred), errorCB(deferred));      
	  }, errorCB);
	  return deferred.promise;  
	}
	
	return {
		setup: function() {
		  return createDB();
		},
		set: function(t_name) {
			return setQuotes(t_name);
		},
		del: function(taskid) {
			return delQuotes(taskid);
		},
		edit: function(t_name,taskid) {
			return UpdateQuotes(t_name, taskid);
		},
		all: function() {
		  return getQuotes();
		}
	}
});

