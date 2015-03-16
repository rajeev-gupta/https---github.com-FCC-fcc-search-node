 
 var dollar_amounts = {
     
      "FCC_Dollars__R0":"Less than $1,000",
      "FCC_Dollars__R1T":"$1,000 to $10,000",
      "FCC_Dollars__R10T":"$10,000 to $100,000",
      "FCC_Dollars__R100T":"$100,000 to 1 million",
      "FCC_Dollars__R1M":"$1 million to $100 million",
      "FCC_Dollars__R100M":"$100 million to $1 billion",
      "FCC_Dollars__R1B":"Greater than $1 billion"
     
 };
  
 var bureaus = {
        "WTB":"Wireless Telecommunications Bureau",
        "MB":"Media Bureau",
        "EB":"Enforcement Bureau",
        "WCB":"Wireless Telecommunications Bureau",
        "CGB":"Consumer and Governmental Affairs Bureau ",
        "IB":"International Bureau",
        "MMB":"Mass Media Bureau",
        "CCB":"Common Carrier Bureau",
        "CSB":"Cable Services Bureau",
        "OMD":"Office of Managing Director",
        "PSHSB":"Public Safety and Homeland Security Bureau",
        "CMMR":"Commissioner",
        "OET":"Office of Engineering and Technology",
        "OGC":"Office of General Counsel",
        "OPA":"Office of Public Affairs",
        "OCH":"Office of the Chairman",
        "CIB":"Compliance and Information Bureau ",
        "OMR":"Office of Media Relations",
        "OLA":"Office of Legislative Affairs",
        "OCHJG":"Office of Chairman Genachowski",
        "OCBO":"Office of Communications Business Opportunities",
        "NA":"Others",
        "OCMC":"Office of Commissioner McDowell",
        "OCAP":"Office of Commissioner Ajit Pai",
        "OALJ":"Office of Administrative Law Judges",
        "NB":"No Bureau",
        "OCJR":"Office of Commissioner Jessica Rosenworcel",
        "OPP":"Office of Plans and Policy",
        "OCHTW":"Office of Chairman Tom Wheeler",
        "OCRMM":"Office of Commissioner Clyburn",
        "OSP":"Office of Strategic Planning and Policy Analysis",
        "OCMJC":"Office of Commissioner Michael J. Copps ",
        "AU":"Auctions",
        "GEN":"General (Multiple Bureaus)",
        "OIG":"Office of the Inspector General",
        "OCMO":"Office of Commissioner Michael O?Rielly",
        "PR":"Private Radio Bureau",
        "OCMAB":"Office of Commissioner Meredith Attwell Baker",
        "OLIA":"Office of Legislative & Intergovernmental Affairs ",
        "OWPD":"Office of Workplace Diversity"};


var app = angular.module('fcc_gov_search', ['daterangepicker', 'fcc_gov_search.directives', 'fcc_gov_search.services', 'ui.bootstrap', 'angularSpinner']);

app.controller('fcc_gov_search_controller', ['$location', "$scope","SearchFactory", "$modal", "usSpinnerService", function ($location, $scope, SearchFactory, $modal, usSpinnerService){
        
        $scope.date = {
        startDate: moment().subtract("days", 1),
        endDate: moment()
    };

    $scope.opts = {
       ranges: {
                       'Today': [moment(), moment()],
                       'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                       'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                       'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                       'This Month': [moment().startOf('month'), moment().endOf('month')],
                       'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    opens: 'right',
                    buttonClasses: ['btn btn-default'],
                    applyClass: 'btn-sm btn-primary',
                    cancelClass: 'btn-sm',
                    format: 'MM/DD/YYYY',
                    separator: ' to ',
                    locale: {
                        applyLabel: 'Submit',
                        cancelLabel: 'Clear',
                        fromLabel: 'From',
                        toLabel: 'To',
                        customRangeLabel: 'Custom',
                        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
                        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        firstDay: 1
                    }
    };

    $scope.search_facets =  !$scope.search_facets;
    $scope.search_wrong_spell = !$scope.search_wrong_spell;
    $scope.search_spell = !$scope.search_spell;
    $scope.search_pagination = !$scope.search_pagination;
    $scope.theValue =  'Add more values';
    var current_selection = "all";
    
    $scope.maxSize = 5;
    $scope.bigCurrentPage = 1;
    $scope.selected = undefined;
    
     $("#tab_all").addClass('pressed');
    
    $scope.startSpin = function(){
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function(){
        usSpinnerService.stop('spinner-1');
    }
    
    var searchObject = $location.search();
    
    var search_keyword = searchObject.keyword;
    
    $scope.asyncSelected = search_keyword;

    init_setup();

    check_spelling(search_keyword);
     
        
    $scope.get_suggestions = function (val) 
    {
        return SearchFactory.get_suggestions(val);
    };
    
    var facet_filters;
    
    function init_setup(name)
    {
        $scope.items = "" ;
        $scope.source_type =  !$scope.source_type;
        $scope.date_facet =  !$scope.date_facet;
        if (angular.isDefined( name ))
        {
            current_selection = name;
        }
        
        switch (current_selection)
        {
            case "all":
                break;
            case "edocs":
                SearchFactory.get_filters('data/edocs_facets.json').then(function(data)
                {
                   facet_filters = angular.copy(data);
                });
                break;
            case "web":
                SearchFactory.get_filters('data/web_facets.json').then(function(data)
                {
                   facet_filters = angular.copy(data);
                });
                break;
        }
    }
    
    $scope.searchBtn = function(name){
        
      init_setup(name);
        
        var term = $scope.asyncSelected;
        
        check_spelling(term);
     };
     
     function check_spelling(term)
     {
        
         if (term)
         {
        	 $scope.search_spell = true;
             get_search_results(current_selection, term);
        	 /*
             SearchFactory.check_spelling(term).then(function(data)
             {
                 if (data.error)
                 {
                    $scope.modal_open("sm");
                }
                else
                {
                    if (data.numFound > 0)
                    {
                        $scope.search_spell = false;
                        $scope.word = data.word;
                        get_search_results(current_selection, data.word);
                    }
                    else
                    {
                          $scope.search_spell = true;
                        get_search_results(current_selection, term);
                    }
                }
             });
             */
        }
        else
        {
            
                $scope.search_spell = true;
                get_search_results(current_selection, "*:*");
        }
        
        $scope.bigCurrentPage = 1;
          
     };
     
     
    $scope.get_results = function (){
        $scope.search_spell = true;
        $scope.search_wrong_spell = true;
        var term = $scope.word;
        get_search_results(current_selection, term);
    };
    
    $scope.get_wrong_results = function (){
        $scope.search_spell = true;
        $scope.search_wrong_spell = false;
        var term = $scope.asyncSelected;
        get_search_results(current_selection, term);
    };
    
    $scope.pageChanged = function() {
         var term = $scope.asyncSelected;
         
         if ($scope.bigCurrentPage > 1)
        {
            var n = ($scope.bigCurrentPage - 1)*10 +1;
            if (term)
            {
                get_search_results(current_selection, term, n); 
            }
            else
            {
                get_search_results(current_selection, "*:*", n);
            }
        }
        else
        {
             if (term)
            {
                get_search_results(current_selection, term); 
            }
            else
            {
                get_search_results(current_selection, "*:*");
            }
        }
    };
    
    $scope.dateHandler = function(parent, child, event){
        
        if(event.which === 13) {
            
            var value = event.target.value;
            var facet_part = $scope.data[parent].children[child].facet;
            var facet_prefix_query = "";
            event.preventDefault();
            var tos = value.indexOf("to") > -1;
            
            var res = "";

            if (tos)
            {
                res = value.split("to");
            }
            
            if (res)
            {
                var from = new Date(res[0].trim());
                var to = new Date(res[1].trim());
                
                facet_prefix_query = "&fq=(" + facet_part + ":[" + from.toISOString() + " TO " + to.toISOString() + "])";
                
                 if (facet_prefix_query)
                {

                    facet_prefix_query = facet_prefix_query + "&facet.limit=25&facet.mincount=1&facet=true&facet.sort=index&facet.field=" + facet_part;

                    var term = $scope.asyncSelected;
                    if (term)
                    {
                        get_input_facet_results(current_selection, term, facet_prefix_query, facet_part);
                    }
                   else
                   {
                         get_input_facet_results(current_selection, "*:*", facet_prefix_query, facet_part);
                   }


                }
            }
        }

     };
    
     $scope.inputHandler = function(parent, child, event){
        if(event.which === 13) {
            var exists = false;
            var value = event.target.value;
            var facet_part = $scope.data[parent].children[child].facet;
            var facet_filter = [];
            event.preventDefault();
            if (value)
            {
                 _.each($scope.data[parent].children[child].children, function(obj){ 
                        if (obj.name.toLowerCase() == value.toLowerCase())
                        {
                            exists = true;
                            $scope.modal_open ("sm", "Facet already exists");
                        }
                    });
                    
                   if (!exists)
                   {
                	   var facet_object = {"facet": facet_part, "value":value};
                   		facet_filter.push(facet_object);
                   }

                    if (facet_filter.length > 0)
                    {
                    	var term = $scope.asyncSelected;
                        if (term)
                        {
                            get_input_facet_results(current_selection, term, facet_filter, facet_part);
                        }
                       else
                       {
                             get_input_facet_results(current_selection, "*:*", facet_filter, facet_part);
                       }
                                                                     
                       
                    }
            }
            else
            {
            	$scope.modal_open("sm", "Please type something");
            }

        }
        
     };
     
    
     $scope.toggleSelection = function(a, b, c, obj_name){
         
        _.find($scope.data[a].children[b].children, function(obj){ 
            if (obj.name == obj_name)
            {
                obj.selected = !obj.selected;
            }
        });

        var term = $scope.asyncSelected;
        
        var facet_filter = [];

        _.map($scope.data, 
            function(item)
            { 
                var c = item.children;

                _.each(c,

                function(ch)
                { 

                    var d = ch.children;

                    _.find(d, function(num){ 
                        if (num.selected == true)
                        {
                        	var facet_object = {"facet": ch.facet, "value":num.value};
                        	facet_filter.push(facet_object);
                            
                        }
                    });

                }
                );
            }
         );
        
         if (term)
         {
             get_faceted_search_results(current_selection, term, facet_filter);
         }
        else
        {
                get_faceted_search_results(current_selection, "*:*", facet_filter);
        }
        
        $scope.bigCurrentPage = 1;

    };
    
    var search_tooltips;
    
    SearchFactory.get_tooltips().then(function(data)
    {
        $scope.search_button_tooltip= data.search_button_hi;
        $scope.tab_all_tooltip= data.tab_all;
        $scope.tab_edocs_tooltip= data.tab_edocs;
        $scope.tab_web_tooltip= data.tab_web;
        $scope.filters_header_tooltip= data.filters_header;
        
        search_tooltips = angular.copy(data);
        
    });
    
    var radio_frequencies = {};
    
    SearchFactory.get_radio_frequencies().then(function(data)
    {
        _.each(data, function (val) {
           radio_frequencies[val.abbreviation] = val.frequency_range;
        }
            );
      
    });
    
    $scope.show_tooltip = function(p,c){
        
        var nm = $scope.data[p].children[c].facet;
        var tnm = "facethelp_" + nm;
       
        $scope.dynamic_tooltip = search_tooltips[tnm];
};

 $scope.show_tooltip_inputbox = function(p,c){
        
        var nm = $scope.data[p].children[c].facet;
       
         switch(nm)
        {
            case "adoptedDate":
                $scope.inputbox_tooltip = search_tooltips.facetval_daterange;
                break;
             case "lastModifiedDate":
                $scope.inputbox_tooltip = search_tooltips.facetval_daterange;
                break;
              case "commentDate":
                $scope.inputbox_tooltip = search_tooltips.facetval_daterange;
                break;
             case "isuedDate":
                $scope.inputbox_tooltip = search_tooltips.facetval_daterange;
                break;
              case "created":
                $scope.inputbox_tooltip = search_tooltips.facetval_daterange;
                break;
            case "replyCommentDate":
                $scope.inputbox_tooltip = search_tooltips.facetval_daterange;
                break;
            case "changed":
                $scope.inputbox_tooltip = search_tooltips.facetval_daterange;
                break;
            case "FCC_Dollars":
                $scope.inputbox_tooltip = search_tooltips.facetval_FCC_Dollars;
                break;
            case "FCC_Frequencies":
                $scope.inputbox_tooltip = search_tooltips.facetval_FCC_Frequencies;
                break;
            default:
                 $scope.inputbox_tooltip = search_tooltips.facetval_string1;
                 break;
        }
       
       
};
    
    $scope.hide_inputbox= function(p, c){
          
           var nm = $scope.data[p].children[c].facet;
          
          switch(nm)
          {
              case "bureaus":
                  return true;
                  break;
              case "documentCategory":
                  return true;
                  break;
              case "docTypes":
                  return true;
                  break;
              case "type":
                  return true;
                  break;
              case "adoptedDate":
                 return true;
                break;
             case "lastModifiedDate":
                 return true;
                break;
              case "issuedDate":
                 return true;
                break;
             case "commentDate":
                 return true;
                break;
              case "created":
                 return true;
                break;
            case "replyCommentDate":
                 return true;
                break;
            case "changed":
                 return true;
                break;  
          }

           return false;
       };
       
        $scope.hide_datebox= function(p, c){
          
           var nm = $scope.data[p].children[c].facet;

          switch(nm)
          {
              case "adoptedDate":
                 return false;
                break;
             case "lastModifiedDate":
                 return false;
                break;
             case "issuedDate":
                 return false;
                break;
             case "commentDate":
                 return false;
                break;
              case "created":
                 return false;
                break;
            case "replyCommentDate":
                 return false;
                break;
            case "changed":
                 return false;
                break;  
          }

           return true;
       };
       
    $scope.hide_parent= function(p, c){
          
           var l = $scope.data[p].children[c].children.length;
           for ( var i = 0; i < l ; i++)
           {
               if ($scope.data[p].children[c].children[i].selected)
               {
                   return true;
               }
           }

           return false;
       };
       
    function get_input_facet_results(type, term, fq, facet_field)
    {
         $scope.startSpin();
         
         SearchFactory.input_facet_query(type, term, fq).then(function(data)
        {
            $scope.stopSpin();
             if (data.error)
             {
                 $scope.modal_open("sm", "Error. Please try again later.");
             }
             else
             {
                 var result = data.facet_counts.facet_fields[facet_field];
                 
                 if (result)
                 {
                 
                 if (result.length > 0)
                 {
                     var total_facets = result.length;
                    var facets_array = [];

                    for (var i = 0; i < total_facets; i +=2)
                    {
                        facets_array.push({ name: data.facet_counts.facet_fields[facet_field][i], count: data.facet_counts.facet_fields[facet_field][i+1], value: data.facet_counts.facet_fields[facet_field][i], selected:false});
                    }
                                    
                     var filter_headers = facet_filters.headers;
                                
                    for (var i = 0; i < filter_headers.length; i++)
                    {
                       for (var j = 0; j < filter_headers[i].children.length; j++)
                       {
                           switch(filter_headers[i].children[j].facet)
                           {
                               case facet_field:
                                   
                                   var ts = filter_headers[i].children[j].children;
                                   _.each(facets_array, function(obj)
                                   {
                                       ts.push(obj);
                                   });

                                   break;
                               
                           }
                       }
                    }

                    $scope.data = filter_headers;
                 }
                 else
                 {
                	 $scope.modal_open("sm", "No Results were found");
                 }
                 }
                 else
                 {
                	 $scope.modal_open("sm", "No Results were found");
                 }
             }
        });
    }
       
    function get_faceted_search_results(type, term, fq, start)
    {
         $scope.startSpin();
         
         SearchFactory.facet_query(type, term, fq, start).then(function(data)
        {
            $scope.stopSpin();
             if (data.error)
             {
            	 $scope.modal_open("sm", "Error. Please try again later.");
             }
             else
             {
                 if (current_selection == "edocs")
                 {
                     var doc_url = "https://apps.fcc.gov/edocs_public/attachmatch/";
                     var docs = data.response.docs;
                     
                     _.each(docs, function(doc) { 
                         var links = doc.links;
                         _.each(links, function(link) { 
                             
                             var ext = link.split('.').pop();
                             if (ext == "pdf")
                             {
                                 doc['weburl'] = doc_url + link;
                             }
                         });
                         
                         
                     });
                     
                 }
                $scope.searches = data.response.docs;
                $scope.bigTotalItems = data.response.numFound;
                search_pagination(type, term);
            }
        });
    }
    
    function search_pagination(type, term){
       
          if($scope.bigTotalItems < 11){
              $scope.search_pagination = true;
         }else{
            $scope.search_pagination = false;
         }
        
    }
    
      function get_search_results(type, term, start)
    {
         $scope.startSpin();
         
         SearchFactory.changeTab(type, term, start).then(function(data)
        {
            $scope.stopSpin();
            
         //   console.log(JSON.stringify(data));
             if (data.error)
             {
            	 $scope.modal_open("sm", "Error. Please try again later.");
             }
             else
             {  
            	 var docs = data.response.docs;
                 
                 _.each(docs, function(doc) { 
                     var src_type = doc.source_type;
                     if( src_type == "web")
                     {
                    	 doc['source_type'] = "FCC.gov";
                    }
                    
                 });
            	 
                 if (current_selection == "edocs")
                 {
                     var doc_url = "https://apps.fcc.gov/edocs_public/attachmatch/";
                     var docs = data.response.docs;
                     
                     _.each(docs, function(doc) { 
                         var links = doc.links;
                         _.each(links, function(link) { 
                             
                             var ext = link.split('.').pop();
                             if (ext == "pdf")
                             {
                                 doc['weburl'] = doc_url + link;
                             }
                         });
                         
                         
                     });
                     
                 }
                $scope.searches = data.response.docs;
                $scope.bigTotalItems = data.response.numFound;
                search_pagination(type, term);
                
                switch(current_selection){
                       case "all":  $("#tab_all").addClass('pressed');
                                    $("#tab_web").removeClass('pressed');
                                    $("#tab_edocs").removeClass('pressed');
                                    $scope.search_facets = true;
                                    $scope.search_docs = true;
                                    $scope.search_weburl = false;
                            var   all_data = [{
                                   name: 'Categories',
                                   children: [
                                       {
                                       name: 'Source Type',
                                       children: [
                                           { name: 'FCC.gov content (' + data.facet_counts.facet_fields.source_type[3] + ')'}, 
                                           {name: 'Commission Documents (' + data.facet_counts.facet_fields.source_type[1] + ')'}]}

                                   ]}
                           ]; 

                         $scope.data = all_data;                      
                           break;
                       case "edocs": 
                                    $("#tab_edocs").addClass('pressed');
                                    $("#tab_web").removeClass('pressed');
                                    $("#tab_all").removeClass('pressed');
                                    $scope.search_facets = false;
                                    $scope.search_docs = false;
                                    $scope.search_weburl = true;
                                    
                                    var total_edocs_call_signs = data.facet_counts.facet_fields.FCC_CallSigns.length;
                                    var edocs_call_signs_array = [];
                                    
                                    for (var i = 0; i < total_edocs_call_signs; i +=2)
                                    {
                                        edocs_call_signs_array.push({ name: data.facet_counts.facet_fields.FCC_CallSigns[i], count: data.facet_counts.facet_fields.FCC_CallSigns[i+1], value: data.facet_counts.facet_fields.FCC_CallSigns[i], selected:false});
                                    }
                                    
                                    var total_edocs_bureaus = data.facet_counts.facet_fields.bureaus.length;
                                    var edocs_bureaus_array = [];
                                    
                                    for (var i = 0; i < total_edocs_bureaus; i +=2)
                                    {
                                        edocs_bureaus_array.push({ name: bureaus[data.facet_counts.facet_fields.bureaus[i]], count: data.facet_counts.facet_fields.bureaus[i+1], value: data.facet_counts.facet_fields.bureaus[i], selected:false});
                                    }
                                    
                                    var total_edocs_dockets = data.facet_counts.facet_fields.dockets.length;
                                    var edocs_dockets_array = [];
                                    
                                    for (var i = 0; i < total_edocs_dockets; i +=2)
                                    {
                                        edocs_dockets_array.push({ name: data.facet_counts.facet_fields.dockets[i], count: data.facet_counts.facet_fields.dockets[i+1], value: data.facet_counts.facet_fields.dockets[i], selected:false});
                                    }
                                   
                                    var total_edocs_documentCategory = data.facet_counts.facet_fields.documentCategory.length;
                                    var edocs_documentCategory_array = [];
                                    
                                    for (var i = 0; i < total_edocs_documentCategory; i +=2)
                                    {
                                        edocs_documentCategory_array.push({ name: data.facet_counts.facet_fields.documentCategory[i], count: data.facet_counts.facet_fields.documentCategory[i+1], value: data.facet_counts.facet_fields.documentCategory[i], selected:false});
                                    }
                                    
                                    var total_edocs_docTypes = data.facet_counts.facet_fields.docTypes.length;
                                    var edocs_docTypes_array = [];
                                    
                                    for (var i = 0; i < total_edocs_docTypes; i +=2)
                                    {
                                        edocs_docTypes_array.push({ name: data.facet_counts.facet_fields.docTypes[i], count: data.facet_counts.facet_fields.docTypes[i+1], value: data.facet_counts.facet_fields.docTypes[i], selected:false});
                                    }
                                    
                                    var total_edocs_federalRegisterCitation = data.facet_counts.facet_fields.federalRegisterCitation.length;
                                    var edocs_federalRegisterCitation_array = [];
                                    
                                    for (var i = 0; i < total_edocs_federalRegisterCitation; i +=2)
                                    {
                                        edocs_federalRegisterCitation_array.push({ name: data.facet_counts.facet_fields.federalRegisterCitation[i], count: data.facet_counts.facet_fields.federalRegisterCitation[i+1], value: data.facet_counts.facet_fields.federalRegisterCitation[i], selected:false});
                                    }
                                    
                                    var total_edocs_fccNo = data.facet_counts.facet_fields.fccNo.length;
                                    var edocs_fccNo_array = [];
                                    
                                    for (var i = 0; i < total_edocs_fccNo; i +=2)
                                    {
                                        edocs_fccNo_array.push({ name: data.facet_counts.facet_fields.fccNo[i], count: data.facet_counts.facet_fields.fccNo[i+1], value: data.facet_counts.facet_fields.fccNo[i], selected:false});
                                    }
                                    
                                    var total_edocs_daNo = data.facet_counts.facet_fields.daNo.length;
                                    var edocs_daNo_array = [];
                                    
                                    for (var i = 0; i < total_edocs_daNo; i +=2)
                                    {
                                        edocs_daNo_array.push({ name: data.facet_counts.facet_fields.daNo[i], count: data.facet_counts.facet_fields.daNo[i+1], value: data.facet_counts.facet_fields.daNo[i], selected:false});
                                    }
                                    
                                    var total_edocs_fccRecord = data.facet_counts.facet_fields.fccRecord.length;
                                    var edocs_fccRecord_array = [];
                                    
                                    for (var i = 0; i < total_edocs_fccRecord; i +=2)
                                    {
                                        edocs_fccRecord_array.push({ name: data.facet_counts.facet_fields.fccRecord[i], count: data.facet_counts.facet_fields.fccRecord[i+1], value: data.facet_counts.facet_fields.fccRecord[i], selected:false});
                                    }
                                    
                                    var total_edocs_fileNumber= data.facet_counts.facet_fields.fileNumber.length;
                                    var edocs_fileNumber_array = [];
                                    
                                    for (var i = 0; i < total_edocs_fileNumber; i +=2)
                                    {
                                        edocs_fileNumber_array.push({ name: data.facet_counts.facet_fields.fileNumber[i], count: data.facet_counts.facet_fields.fileNumber[i+1], value: data.facet_counts.facet_fields.fileNumber[i], selected:false});
                                    }
                                    
                                    var total_edocs_reportNumber= data.facet_counts.facet_fields.reportNumber.length;
                                    var edocs_reportNumber_array = [];
                                    
                                    for (var i = 0; i < total_edocs_reportNumber; i +=2)
                                    {
                                        edocs_reportNumber_array.push({ name: data.facet_counts.facet_fields.reportNumber[i], count: data.facet_counts.facet_fields.reportNumber[i+1], value: data.facet_counts.facet_fields.reportNumber[i], selected:false});
                                    }
                                    
                                     var total_edocs_FCC_CaseCitations = data.facet_counts.facet_fields.FCC_CaseCitations.length;
                                    var edocs_FCC_CaseCitations_array = [];
                                    
                                    for (var i = 0; i < total_edocs_FCC_CaseCitations; i +=2)
                                    {
                                        edocs_FCC_CaseCitations_array.push({ name: data.facet_counts.facet_fields.FCC_CaseCitations[i], count: data.facet_counts.facet_fields.FCC_CaseCitations[i+1], value: data.facet_counts.facet_fields.FCC_CaseCitations[i], selected:false});
                                    }
                                    
                                     var total_edocs_FCC_Dollars = data.facet_counts.facet_fields.FCC_Dollars.length;
                                    var edocs_FCC_Dollars_array = [];
                                    
                                    $.each(data['facet_counts']['facet_queries'], function(key, element){
                                        if (key.indexOf("Dollars") > -1)
                                        {
                                            if (element > 0)
                                                edocs_FCC_Dollars_array.push({ name: dollar_amounts[key], count: element, value: key, selected:false});
                                        }
                                    });
                         
                                    var total_edocs_FCC_Frequencies = data.facet_counts.facet_fields.FCC_Frequencies.length;
                                    var edocs_FCC_Frequencies_array = [];
                                    
                                     $.each(data['facet_counts']['facet_queries'], function(key, element){
                                        if (key.indexOf("Frequencies") > -1)
                                        {
                                            if (element > 0)
                                            {
                                                var k = key.substring(key.lastIndexOf("_")+1);
                                                if (radio_frequencies[k])
                                                {
                                                    edocs_FCC_Frequencies_array.push({ name: k + " (" + radio_frequencies[k] + ")", count: element, value: key, selected:false});
                                                }
                                                if (!radio_frequencies[k])
                                                {
                                                    edocs_FCC_Frequencies_array.push({ name: k + " Than THF" , count: element, value: key, selected:false});
                                                }
                                            }
                                        }
                                    });
                                    
                                    var total_edocs_FCC_Rules = data.facet_counts.facet_fields.FCC_Rules.length;
                                    var edocs_FCC_Rules_array = [];
                                    
                                    for (var i = 0; i < total_edocs_FCC_Rules; i +=2)
                                    {
                                        edocs_FCC_Rules_array.push({ name: "47 C.F.R. Section " + data.facet_counts.facet_fields.FCC_Rules[i], count: data.facet_counts.facet_fields.FCC_Rules[i+1], value: data.facet_counts.facet_fields.FCC_Rules[i], selected:false});
                                    }
                                    
                                    var total_edocs_FCC_Codes = data.facet_counts.facet_fields.FCC_Codes.length;
                                    var edocs_FCC_Codes_array = [];
                                    
                                    for (var i = 0; i < total_edocs_FCC_Codes; i +=2)
                                    {
                                        edocs_FCC_Codes_array.push({ name: "47 U.S.C Section " + data.facet_counts.facet_fields.FCC_Codes[i], count: data.facet_counts.facet_fields.FCC_Codes[i+1], value: data.facet_counts.facet_fields.FCC_Codes[i], selected:false});
                                    }
                                    
                                    var total_edocs_FCC_Records = data.facet_counts.facet_fields.FCC_Records.length;
                                    var edocs_FCC_Records_array = [];
                                    
                                    for (var i = 0; i < total_edocs_FCC_Records; i +=2)
                                    {
                                        edocs_FCC_Records_array.push({ name: data.facet_counts.facet_fields.FCC_Records[i], count: data.facet_counts.facet_fields.FCC_Records[i+1], value: data.facet_counts.facet_fields.FCC_Records[i], selected:false});
                                    }
                                    
                                    var total_edocs_FCC_Forms = data.facet_counts.facet_fields.FCC_Forms.length;
                                    var edocs_FCC_Forms_array = [];
                                    
                                    for (var i = 0; i < total_edocs_FCC_Forms; i +=2)
                                    {
                                        edocs_FCC_Forms_array.push({ name: "Forms " + data.facet_counts.facet_fields.FCC_Forms[i], count: data.facet_counts.facet_fields.FCC_Forms[i+1], value: data.facet_counts.facet_fields.FCC_Forms[i], selected:false});
                                    }
                                    
                                    var total_edocs_topics = data.facet_counts.facet_fields.topics.length;
                                    var edocs_topics_array = [];
                                    
                                    for (var i = 0; i < total_edocs_topics; i +=2)
                                    {
                                        edocs_topics_array.push({ name: data.facet_counts.facet_fields.topics[i], count: data.facet_counts.facet_fields.topics[i+1], value: data.facet_counts.facet_fields.topics[i], selected:false});
                                    }
                                  
                                  var total_edocs_issuedDates = data.facet_counts.facet_ranges.issuedDate.counts.length;
                                    var edocs_issuedDate_array = [];
                                    
                                    for (var i = 0; i < total_edocs_issuedDates; i +=2)
                                    {
                                        edocs_issuedDate_array.push({ name: data.facet_counts.facet_ranges.issuedDate.counts[i].substring(0,4), count: data.facet_counts.facet_ranges.issuedDate.counts[i+1], value: data.facet_counts.facet_ranges.issuedDate.counts[i], selected:false});
                                    }
                                   
                                    var total_edocs_lastModifiedDates = data.facet_counts.facet_ranges.lastModifiedDate.counts.length;
                                    var edocs_lastModifiedDate_array = [];
                                    
                                    for (var i = 0; i < total_edocs_lastModifiedDates; i +=2)
                                    {
                                        edocs_lastModifiedDate_array.push({ name: data.facet_counts.facet_ranges.lastModifiedDate.counts[i].substring(0,4), count: data.facet_counts.facet_ranges.lastModifiedDate.counts[i+1], value: data.facet_counts.facet_ranges.lastModifiedDate.counts[i], selected:false});
                                    }
                                    
                                    var total_edocs_commentDates = data.facet_counts.facet_ranges.commentDate.counts.length;
                                    var edocs_commentDate_array = [];
                                    
                                    for (var i = 0; i < total_edocs_commentDates; i +=2)
                                    {
                                        edocs_commentDate_array.push({ name: data.facet_counts.facet_ranges.commentDate.counts[i].substring(0,4), count: data.facet_counts.facet_ranges.commentDate.counts[i+1], value: data.facet_counts.facet_ranges.commentDate.counts[i], selected:false});
                                    }
                                    
                                   var total_edocs_adoptedDates = data.facet_counts.facet_ranges.adoptedDate.counts.length;
                                    var edocs_adoptedDate_array = [];
                                    
                                    for (var i = 0; i < total_edocs_adoptedDates; i +=2)
                                    {
                                        edocs_adoptedDate_array.push({ name: data.facet_counts.facet_ranges.adoptedDate.counts[i].substring(0,4), count: data.facet_counts.facet_ranges.adoptedDate.counts[i+1], value: data.facet_counts.facet_ranges.adoptedDate.counts[i], selected:false});
                                    }
                                    
                                    var total_edocs_replyCommentDates = data.facet_counts.facet_ranges.replyCommentDate.counts.length;
                                    var edocs_replyCommentDate_array = [];
                                    
                                    for (var i = 0; i < total_edocs_replyCommentDates; i +=2)
                                    {
                                        edocs_replyCommentDate_array.push({ name: data.facet_counts.facet_ranges.replyCommentDate.counts[i].substring(0,4), count: data.facet_counts.facet_ranges.replyCommentDate.counts[i+1], value: data.facet_counts.facet_ranges.replyCommentDate.counts[i], selected:false});
                                    }
                                    
                              var total_edocs_fcc_docket_citations = data.facet_counts.facet_fields.FCC_Dockets.length;
                                    var edocs_fcc_docket_citations_array = [];
                                    
                                    for (var i = 0; i < total_edocs_fcc_docket_citations; i +=2)
                                    {
                                        edocs_fcc_docket_citations_array.push({ name: data.facet_counts.facet_fields.FCC_Dockets[i], count: data.facet_counts.facet_fields.FCC_Dockets[i+1], value: data.facet_counts.facet_fields.FCC_Dockets[i], selected:false});
                                    }      

                             var filter_headers = facet_filters.headers;
                                
                             for (var i = 0; i < filter_headers.length; i++)
                             {
                                for (var j = 0; j < filter_headers[i].children.length; j++)
                                {
                                    switch(filter_headers[i].children[j].facet)
                                    {
                                        
                                         case "adoptedDate":
                                            filter_headers[i].children[j].children = edocs_adoptedDate_array.reverse();;
                                            break;
                                        case "replyCommentDate":
                                            filter_headers[i].children[j].children = edocs_replyCommentDate_array.reverse();;
                                            break;
                                        case "lastModifiedDate":
                                            filter_headers[i].children[j].children =  edocs_lastModifiedDate_array.reverse();;
                                            break;
                                         case "commentDate":
                                            filter_headers[i].children[j].children = edocs_commentDate_array.reverse();;
                                            break;
                                        case "issuedDate":
                                            filter_headers[i].children[j].children =  edocs_issuedDate_array.reverse();;
                                            break;
                                        
                                        case "FCC_Rules":
                                            filter_headers[i].children[j].children = edocs_FCC_Rules_array;
                                            break;
                                        case "FCC_Codes":
                                            filter_headers[i].children[j].children = edocs_FCC_Codes_array;
                                            break;
                                        case "FCC_Records":
                                            filter_headers[i].children[j].children = edocs_FCC_Records_array;
                                            break;
                                        case "fccRecord":
                                            filter_headers[i].children[j].children = edocs_fccRecord_array;
                                            break;
                                        case "FCC_Forms":
                                            filter_headers[i].children[j].children = edocs_FCC_Forms_array;
                                            break;
                                            
                                         case "FCC_CaseCitations":
                                            filter_headers[i].children[j].children = edocs_FCC_CaseCitations_array;
                                            break;
                                        case "FCC_Dollars":
                                            filter_headers[i].children[j].children = edocs_FCC_Dollars_array;
                                            break;
                                        case "FCC_Frequencies":
                                            filter_headers[i].children[j].children = edocs_FCC_Frequencies_array;
                                            break;
                                        case "FCC_CallSigns":
                                            filter_headers[i].children[j].children = edocs_call_signs_array;
                                            break;
                                            
                                            
                                        case "topics":
                                            filter_headers[i].children[j].children = edocs_topics_array;
                                            break;
                                        case "bureaus":
                                            filter_headers[i].children[j].children = edocs_bureaus_array;
                                            break;
                                        case "documentCategory":
                                            filter_headers[i].children[j].children = edocs_documentCategory_array;
                                            break;
                                        case "docTypes":
                                            filter_headers[i].children[j].children = edocs_docTypes_array;
                                            break;
                                            
                                         case "dockets":
                                            filter_headers[i].children[j].children = edocs_dockets_array;
                                            break;
                                        case "fccNo":
                                            filter_headers[i].children[j].children = edocs_fccNo_array;
                                            break;
                                        case "daNo":
                                            filter_headers[i].children[j].children = edocs_daNo_array;
                                            break;
                                        
                                         case "fileNumber":
                                            filter_headers[i].children[j].children = edocs_fileNumber_array;
                                            break;
                                        case "reportNumber":
                                            filter_headers[i].children[j].children = edocs_reportNumber_array;
                                            break;
                                        case "federalRegisterCitation":
                                            filter_headers[i].children[j].children = edocs_federalRegisterCitation_array;
                                            break;
                                        case "FCC_Dockets":
                                            filter_headers[i].children[j].children = edocs_fcc_docket_citations_array;
                                            break;
                                    }
                                }
                             }

                           $scope.data = filter_headers;
                           break;
                       case "web": 
                                   $("#tab_web").addClass('pressed');
                                    $("#tab_all").removeClass('pressed');
                                    $("#tab_edocs").removeClass('pressed');
                                    $scope.search_facets = false;
                                    $scope.search_docs = true;
                                    $scope.search_weburl = false;
                                    
                                    var total_web_fcc_docket_citations = data.facet_counts.facet_fields.FCC_Dockets.length;
                                    var web_fcc_docket_citations_array = [];
                                    
                                    for (var i = 0; i < total_web_fcc_docket_citations; i +=2)
                                    {
                                        web_fcc_docket_citations_array.push({ name: data.facet_counts.facet_fields.FCC_Dockets[i], count: data.facet_counts.facet_fields.FCC_Dockets[i+1], value: data.facet_counts.facet_fields.FCC_Dockets[i], selected:false});
                                    }
                                    
                                    var total_web_docTypes = data.facet_counts.facet_fields.type.length;
                                    var web_docTypes_array = [];
                                    
                                    for (var i = 0; i < total_web_docTypes; i +=2)
                                    {
                                        web_docTypes_array.push({ name: data.facet_counts.facet_fields.type[i], count: data.facet_counts.facet_fields.type[i+1], value: data.facet_counts.facet_fields.type[i], selected:false});
                                    }
                                    
                                    var total_web_call_signs = data.facet_counts.facet_fields.FCC_CallSigns.length;
                                    var web_call_signs_array = [];
                                    
                                    for (var i = 0; i < total_web_call_signs; i +=2)
                                    {
                                        web_call_signs_array.push({ name: data.facet_counts.facet_fields.FCC_CallSigns[i], count: data.facet_counts.facet_fields.FCC_CallSigns[i+1], value: data.facet_counts.facet_fields.FCC_CallSigns[i], selected:false});
                                    }
                                    
                                    var total_web_topics = data.facet_counts.facet_fields.topics.length;
                                    var web_topics_array = [];
                                    
                                    for (var i = 0; i < total_web_topics; i +=2)
                                    {
                                        web_topics_array.push({ name: data.facet_counts.facet_fields.topics[i], count: data.facet_counts.facet_fields.topics[i+1], value: data.facet_counts.facet_fields.topics[i], selected:false});
                                    }
                                    
                                     var total_web_authors = data.facet_counts.facet_fields.authors.length;
                                    var web_authors_array = [];
                                    
                                    for (var i = 0; i < total_web_authors; i +=2)
                                    {
                                        web_authors_array.push({ name: data.facet_counts.facet_fields.authors[i], count: data.facet_counts.facet_fields.authors[i+1], value: data.facet_counts.facet_fields.authors[i], selected:false});
                                    }
                                    
                                    var total_web_taxonomies = data.facet_counts.facet_fields.taxonomies.length;
                                    var web_taxonomies_array = [];
                                    
                                    for (var i = 0; i < total_web_taxonomies; i +=2)
                                    {
                                        web_taxonomies_array.push({ name: data.facet_counts.facet_fields.taxonomies[i], count: data.facet_counts.facet_fields.taxonomies[i+1], value: data.facet_counts.facet_fields.taxonomies[i], selected:false});
                                    }
                                    
                                    var total_web_FCC_CaseCitations = data.facet_counts.facet_fields.FCC_CaseCitations.length;
                                    var web_FCC_CaseCitations_array = [];
                                    
                                    for (var i = 0; i < total_web_FCC_CaseCitations; i +=2)
                                    {
                                        web_FCC_CaseCitations_array.push({ name: data.facet_counts.facet_fields.FCC_CaseCitations[i], count: data.facet_counts.facet_fields.FCC_CaseCitations[i+1], value: data.facet_counts.facet_fields.FCC_CaseCitations[i], selected:false});
                                    }
                                     
                                    var total_web_FCC_Rules = data.facet_counts.facet_fields.FCC_Rules.length;
                                    var web_FCC_Rules_array = [];
                                    
                                    for (var i = 0; i < total_web_FCC_Rules; i +=2)
                                    {
                                        web_FCC_Rules_array.push({ name: "47 C.F.R. Section " + data.facet_counts.facet_fields.FCC_Rules[i], count: data.facet_counts.facet_fields.FCC_Rules[i+1], value: data.facet_counts.facet_fields.FCC_Rules[i], selected:false});
                                    }
                                    
                                    var total_web_FCC_Codes = data.facet_counts.facet_fields.FCC_Codes.length;
                                    var web_FCC_Codes_array = [];
                                    
                                    for (var i = 0; i < total_web_FCC_Codes; i +=2)
                                    {
                                        web_FCC_Codes_array.push({ name: "47 U.S.C Section " + data.facet_counts.facet_fields.FCC_Codes[i], count: data.facet_counts.facet_fields.FCC_Codes[i+1], value: data.facet_counts.facet_fields.FCC_Codes[i], selected:false});
                                    }
                                    
                                    var total_web_FCC_Records = data.facet_counts.facet_fields.FCC_Records.length;
                                    var web_FCC_Records_array = [];
                                    
                                    for (var i = 0; i < total_web_FCC_Records; i +=2)
                                    {
                                        web_FCC_Records_array.push({ name: data.facet_counts.facet_fields.FCC_Records[i], count: data.facet_counts.facet_fields.FCC_Records[i+1], value: data.facet_counts.facet_fields.FCC_Records[i], selected:false});
                                    }
                                    
                                    var total_web_FCC_Forms = data.facet_counts.facet_fields.FCC_Forms.length;
                                    var web_FCC_Forms_array = [];
                                    
                                    for (var i = 0; i < total_web_FCC_Forms; i +=2)
                                    {
                                        web_FCC_Forms_array.push({ name: "Form " + data.facet_counts.facet_fields.FCC_Forms[i], count: data.facet_counts.facet_fields.FCC_Forms[i+1], value: data.facet_counts.facet_fields.FCC_Forms[i], selected:false});
                                    }
                                    
                                    var total_web_releasedates = data.facet_counts.facet_ranges.created.counts.length;
                                    var web_releasedDate_array = [];
                                    
                                    for (var i = 0; i < total_web_releasedates; i +=2)
                                    {
                                        web_releasedDate_array.push({ name: data.facet_counts.facet_ranges.created.counts[i].substring(0,4), count: data.facet_counts.facet_ranges.created.counts[i+1], value: data.facet_counts.facet_ranges.created.counts[i], selected:false});
                                    }
                                    
                                    var total_web_lastChangedDates = data.facet_counts.facet_ranges.changed.counts.length;
                                    var web_lastChangedDate_array = [];
                                    
                                    for (var i = 0; i < total_web_lastChangedDates; i +=2)
                                    {
                                        web_lastChangedDate_array.push({ name: data.facet_counts.facet_ranges.changed.counts[i].substring(0,4), count: data.facet_counts.facet_ranges.changed.counts[i+1], value: data.facet_counts.facet_ranges.changed.counts[i], selected:false});
                                    }
                                    
                                    var total_web_FCC_Dollars = data.facet_counts.facet_fields.FCC_Dollars.length;
                                    var web_FCC_Dollars_array = [];
                                    
                                    $.each(data['facet_counts']['facet_queries'], function(key, element){
                                        if (key.indexOf("Dollars") > -1)
                                        {
                                            if (element > 0)
                                                web_FCC_Dollars_array.push({ name: dollar_amounts[key], count: element, value: key, selected:false});
                                        }
                                    });
                         
                                    var total_web_FCC_Frequencies = data.facet_counts.facet_fields.FCC_Frequencies.length;
                                    var web_FCC_Frequencies_array = [];
                                    
                                     $.each(data['facet_counts']['facet_queries'], function(key, element){
                                        if (key.indexOf("Frequencies") > -1)
                                        {
                                             if (element > 0)
                                             {
                                                var k = key.substring(key.lastIndexOf("_")+1);
                                                 if (radio_frequencies[k])
                                                 {
                                                     web_FCC_Frequencies_array.push({ name: k + " (" + radio_frequencies[k] + ")", count: element, value: key, selected:false});
                                                 }
                                                 if (!radio_frequencies[k])
                                                 {
                                                     web_FCC_Frequencies_array.push({ name: k + " Than THF" , count: element, value: key, selected:false});
                                                 }
                                            }
                                        }
                                    });
                                    
                                   
                                    
                       var filter_headers = facet_filters.headers;
                                
                             for (var i = 0; i < filter_headers.length; i++)
                             {
                                for (var j = 0; j < filter_headers[i].children.length; j++)
                                {
                                    switch(filter_headers[i].children[j].facet)
                                    {
	                                    case "type":
	                                        filter_headers[i].children[j].children = web_docTypes_array;
	                                        break;
	                                        
                                         case "FCC_Dockets":
                                            filter_headers[i].children[j].children = web_fcc_docket_citations_array;
                                            break;
                                            
                                         case "created":
                                            filter_headers[i].children[j].children = web_releasedDate_array.reverse();
                                            break;
                                        case "changed":
                                            filter_headers[i].children[j].children =  web_lastChangedDate_array.reverse();
                                            break;
                                        
                                        case "FCC_Rules":
                                            filter_headers[i].children[j].children = web_FCC_Rules_array;
                                            break;
                                        case "FCC_Codes":
                                            filter_headers[i].children[j].children = web_FCC_Codes_array;
                                            break;
                                        case "FCC_Records":
                                            filter_headers[i].children[j].children = web_FCC_Records_array;
                                            break;
                                        case "FCC_Forms":
                                            filter_headers[i].children[j].children = web_FCC_Forms_array;
                                            break;
                                            
                                         case "FCC_CaseCitations":
                                            filter_headers[i].children[j].children = web_FCC_CaseCitations_array;
                                            break;
                                        case "FCC_Dollars":
                                            filter_headers[i].children[j].children = web_FCC_Dollars_array;
                                            break;
                                        case "FCC_Frequencies":
                                            filter_headers[i].children[j].children = web_FCC_Frequencies_array;
                                            break;
                                        case "FCC_CallSigns":
                                            filter_headers[i].children[j].children = web_call_signs_array;
                                            break;
                                            
                                            
                                        case "topics":
                                            filter_headers[i].children[j].children = web_topics_array;
                                            break;
                                        case "taxonomies":
                                            filter_headers[i].children[j].children = web_taxonomies_array;
                                            break;
                                        case "authors":
                                            filter_headers[i].children[j].children = web_authors_array;
                                            break;
                                    }
                                }
                             }
                            $scope.data = filter_headers;
                           break;
                   }
            }
        });
        
    }
 
 
 
  //////////////////// Modal ///////////////
  
   $scope.modal_open = function (size, msg) {
	   

    var modalInstance = $modal.open({
      templateUrl: 'modal.html',
      controller: 'modalInstanceController',
      size: size,
      resolve: {
    	  
    	  message: function () {
    	        return msg;
    	      }
      }
    });

    modalInstance.result.then(function () {
    }, function () {
    });
  };

  
}]);


app.controller('modalInstanceController', function ($scope, $modalInstance, message) {

	$scope.msg = message;
	
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});



//////////////// End Modal //////////////

   
 app.filter('isArray', function() {
    return function (input) {
        if(input)
        {
            if (angular.isArray(input))
            {
                return input[0];
            }
            else
            {
                return input;
            }
        }
        else
        {
           // return new Date();
           
           return "";
        }
    };
 });
 
