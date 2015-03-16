var app = angular.module('fcc_gov_search.services', []);

app.factory('SearchFactory', function($http) {
    
    var factory = {};

     factory.get_radio_frequencies = function () {
        
        return $http.get('data/radio_frequencies.json').then(function (response) {
           return response.data;
        });
    };
    
    factory.get_tooltips = function () {
        
        return $http.get('data/tooltips.json').then(function (response) {
           return response.data;
        });
    };
    
    factory.get_filters = function (val) {
        
        return $http.get(val).then(function (response) {
           return response.data;
        });
    };
  
    factory.get_suggestions = function (val) {
       
        var url = "/search?source=suggest&query=" + val;
        
        return $http.get(url).then(function (response) {
            var values = response.data.facet_counts.facet_fields.text;
            var total_values = values.length;
            
            var value_array = [];
            
            for ( var i = 0; i < total_values; i+=2)
            {
                value_array.push(values[i]);
            }
            
            return value_array;
        });
    };
    
    factory.check_spelling = function(term) {
      
        
    	var url = '/search?source=spell&query=' + term;
         
         var output = {};
    return $http.get(url).then(function(result) {
    	
      var suggestions = result.data.spellcheck.suggestions[1];
      output.numFound = suggestions.numFound;
      if (output.numFound > 0){
        output.word = suggestions.suggestion[0].word;
      }
      else{
          output.word = "";
      }
      return output;
    },    
    function(data) {
        output.error = "ERROR";
        return output;
    });
  };
  
  factory.changeTab = function(name, term, start){
      
      if (start)
      {
          
      }
      else
      {
          start = 0;
      }
      var output = {};
      
      var url = '/search?source=' + name + "&query=" + term + "&start=" + start;
       
       return $http.get(url).then(function(result) {
    	   
      output = result.data;
    
      return output;
    },
    function(data) {
         output.error = "ERROR";
         return output;
    });   
     
    };
    
    factory.input_facet_query = function(name, term, fq, start){

      if (start)
      {
          
      }
      else
      {
          start = 0;
      }
      var output = {};
      
      var url = '/search?source=' + name + "&query=" + term + "&start=" + start + "&fq=" + JSON.stringify(fq) + "&query_type=input";
      
       return $http.get(url).then(function(result) {
        

      output = result.data;
 
      return output;
    },
    function(data) {
         output.error = "ERROR";
         return output;
    });   
     
    };
    
     factory.facet_query = function(name, term, fq, start){

    	if ( typeof start !== 'undefined' && start )
	    {
	    }
    	else
		{
    		start = 0;
		}
	   
      var output = {};
   
      var url = '/search?source=' + name + "&query=" + term + "&start=" + start + "&fq=" + JSON.stringify(fq) + "&query_type=facet";

       return $http.get(url).then(function(result) {
        

      output = result.data;
 
      return output;
    },
    function(data) {
         output.error = "ERROR";
         return output;
    });   
     
    };
   
    return factory;
  });