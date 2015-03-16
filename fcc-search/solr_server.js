var config = require('./client/data/config.json');

var dollar_facet_amounts = {
	     
	      "FCC_Dollars__R0":"[0 TO 1000]",
	      "FCC_Dollars__R1T":"[1000 TO 10000]",
	      "FCC_Dollars__R10T":"[10000 TO 100000]",
	      "FCC_Dollars__R100T":"[100000 TO 1000000]",
	      "FCC_Dollars__R1M":"[1000000 TO 10000000]",
	      "FCC_Dollars__R100M":"[10000000 TO 100000000]",
	      "FCC_Dollars__R1B":"[100000000 TO 1000000000]"
	     
	 };
	 
	 var frequency_ranges = {
	     
	      "FCC_Frequencies__TLF":"[0 TO 3]",
	      "FCC_Frequencies__ELF":"[3 TO 30]",
	      "FCC_Frequencies__SLF":"[30 TO 300]",
	      "FCC_Frequencies__ULF":"[300 TO 3000]",
	      "FCC_Frequencies__VLF":"[3000 TO 30000]",
	      "FCC_Frequencies__LF":"[30000 TO 300000]",
	      "FCC_Frequencies__MF":"[3000000 TO 30000000]",
	      "FCC_Frequencies__HF":"[30000000 TO 300000000]",
	      "FCC_Frequencies__VHF":"[300000000 TO 3000000000]",
	      "FCC_Frequencies__UHF":"[3000000000 TO 30000000000]",
	      "FCC_Frequencies__SHF":"[30000000000 TO 300000000000]",
	      "FCC_Frequencies__EHF":"[300000000000 TO 3000000000000]",
	      "FCC_Frequencies__THF":"[3000000000000 TO 30000000000000]"
	     
	 };
	 
     function get_range_queries(value, fct)
     {
         var query = "";
         var tos = value.indexOf("-") > -1;

         if (tos)
         {
             var res = value.split("-");

             if (res)
             {
                 var from = Number(res[0].trim());
                 var to = Number(res[1].trim());

                 query = "&fq=(" + fct + ":[" + from + " TO " + to + "])";
             }
         }
             return query;
     }
     
	 
function create_facet_prefix_query(facets_string){
	
var facets_array = JSON.parse(facets_string);
	
	var facet_string = "";
	
	var facet_array_length = facets_array.length;
	
	for (var i = 0; i < facet_array_length; i++) {
		
		var facet_object = facets_array[i];
		var str = "";
		
		var facet_part = facet_object.facet;
		var value = facet_object.value;
        
     switch (facet_part)
     {
         case "topics":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "FCC_Dockets":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "dockets":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "daNo":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "fccNo":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "fccRecord":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "fileNumber":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "reportNumber":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "federalRegisterCitation":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "FCC_Rules":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "FCC_Codes":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "FCC_Records":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "FCC_Forms":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "FCC_CallSigns":
             str = str +"&f." + facet_part + ".facet.prefix=" + value;
             break;
         case "taxonomies":
             str = str +"&fq=" + facet_part + "_index:(" + value + ")";
             break;
          case "authors":
             str = str +"&fq=" + facet_part + "_index:(" + value + ")";
             break;
          case "FCC_CaseCitations":
             str = str +"&fq=" + facet_part + "_index:(" + value + ")";
             break;
           case "FCC_Dollars":
        	   str = str +get_range_queries(value, facet_part);
             break;
           case "FCC_Frequencies":
        	   str = str +get_range_queries(value, facet_part);
                 break;
         }
     facet_string = facet_string + str + "&facet.limit=25&facet.mincount=1&facet=true&facet.sort=index&facet.field=" + facet_part;
	}
         return facet_string;
      }
      


function get_edocs_web_facets()
{
    var edocs_web_facet_string = "";
    
    
    var edocs_web_fcc_dockets_facet = "&facet.field=FCC_Dockets";       
    var edocs_web_fcc_dockets_facet_sort = "&f.FCC_Dockets.facet.sort=count";
    
    edocs_web_facet_string = edocs_web_fcc_dockets_facet + edocs_web_fcc_dockets_facet_sort;
    
    var edocs_web_fcc_rules_facet = "&facet.field=FCC_Rules";
    var edocs_web_fcc_rules_facet_sort = "&f.FCC_Rules.facet.sort=count";
    
    edocs_web_facet_string = edocs_web_facet_string + edocs_web_fcc_rules_facet + edocs_web_fcc_rules_facet_sort;
    
    
    var edocs_web_fcc_records_facet = "&facet.field=FCC_Records";
    var edocs_web_fcc_records_facet_sort = "&f.FCC_Records.facet.sort=count";
    
    edocs_web_facet_string = edocs_web_facet_string + edocs_web_fcc_records_facet + edocs_web_fcc_records_facet_sort;


    var edocs_web_fcc_forms_facet = "&facet.field=FCC_Forms";
    var edocs_web_fcc_forms_facet_sort = "&f.FCC_Forms.facet.sort=count";
    
    edocs_web_facet_string = edocs_web_facet_string + edocs_web_fcc_forms_facet + edocs_web_fcc_forms_facet_sort;
    
    
    var edocs_web_fcc_callsigns_facet = "&facet.field=FCC_CallSigns";
    var edocs_web_fcc_callsigns_facet_sort = "&f.FCC_CallSigns.facet.sort=count";
    
    edocs_web_facet_string = edocs_web_facet_string + edocs_web_fcc_callsigns_facet + edocs_web_fcc_callsigns_facet_sort;

    var edocs_web_topics_facet = "&facet.field=topics";
    var edocs_web_topics_facet_sort = "&f.topics.facet.sort=count";
    
    edocs_web_facet_string = edocs_web_facet_string + edocs_web_topics_facet + edocs_web_topics_facet_sort;
    
    var edocs_web_fcc_codes_facet = "&facet.field=FCC_Codes";
    var edocs_web_fcc_codes_facet_sort = "&f.FCC_Codes.facet.sort=count";
    
    edocs_web_facet_string = edocs_web_facet_string + edocs_web_fcc_codes_facet + edocs_web_fcc_codes_facet_sort;
    
    var edocs_web_fcc_casecitations_facet = "&facet.field=FCC_CaseCitations";
    var edocs_web_fcc_casecitations_facet_sort = "&f.FCC_CaseCitations.facet.sort=count";
    
    edocs_web_facet_string = edocs_web_facet_string + edocs_web_fcc_casecitations_facet + edocs_web_fcc_casecitations_facet_sort;
    
    
    var edocs_web_fcc_dollars_facet = "&facet.field=FCC_Dollars";
    var edocs_web_fcc_dollars_facet_limit = "&f.FCC_Dollars.facet.limit=7";
    
    var edocs_web_fcc_dollars_facet_query = new Array();
    
    edocs_web_fcc_dollars_facet_query[0] = "&facet.query={!key=FCC_Dollars__R0}FCC_Dollars:[0+TO+1000}";
    edocs_web_fcc_dollars_facet_query[1] = "&facet.query={!key=FCC_Dollars__R1T}FCC_Dollars:[1000+TO+10000}";
    edocs_web_fcc_dollars_facet_query[2] = "&facet.query={!key=FCC_Dollars__R10T}FCC_Dollars:[10000+TO+100000}";
    edocs_web_fcc_dollars_facet_query[3] = "&facet.query={!key=FCC_Dollars__R100T}FCC_Dollars:[100000+TO+1000000}";
    edocs_web_fcc_dollars_facet_query[4] = "&facet.query={!key=FCC_Dollars__R1M}FCC_Dollars:[1000000+TO+100000000}";
    edocs_web_fcc_dollars_facet_query[5] = "&facet.query={!key=FCC_Dollars__R100M}FCC_Dollars:[100000000+TO+100000000000}";
    edocs_web_fcc_dollars_facet_query[6] = "&facet.query={!key=FCC_Dollars__R1B}FCC_Dollars:[100000000000+TO+*}";
    
    edocs_web_facet_string = edocs_web_facet_string + edocs_web_fcc_dollars_facet + edocs_web_fcc_dollars_facet_limit;
     
    for(var dollar_idx in edocs_web_fcc_dollars_facet_query){
    	edocs_web_facet_string = edocs_web_facet_string + edocs_web_fcc_dollars_facet_query[dollar_idx];
    }
  
    var edocs_web_fcc_frequencies_facet = "&facet.field=FCC_Frequencies";
    var edocs_web_fcc_frequencies_facet_interval = "&facet.interval.set=FCC_Frequencies";
    var edocs_web_fcc_frequencies_facet_limit = "&f.FCC_Frequencies.facet.limit=14";
    
    var edocs_web_fcc_frequencies_facet_query = new Array();
    
    edocs_web_fcc_frequencies_facet_query[0] = "&facet.query={!key=FCC_Frequencies__TLF}FCC_Frequencies:[0+TO+3}";
    edocs_web_fcc_frequencies_facet_query[1] = "&facet.query={!key=FCC_Frequencies__ELF}FCC_Frequencies:[3+TO+30}";
    edocs_web_fcc_frequencies_facet_query[2] = "&facet.query={!key=FCC_Frequencies__SLF}FCC_Frequencies:[30+TO+300}";
    edocs_web_fcc_frequencies_facet_query[3] = "&facet.query={!key=FCC_Frequencies__ULF}FCC_Frequencies:[300+TO+3000}";
    edocs_web_fcc_frequencies_facet_query[4] = "&facet.query={!key=FCC_Frequencies__VLF}FCC_Frequencies:[3000+TO+30000}";
    edocs_web_fcc_frequencies_facet_query[5] = "&facet.query={!key=FCC_Frequencies__LF}FCC_Frequencies:[30000+TO+300000}";
    edocs_web_fcc_frequencies_facet_query[6] = "&facet.query={!key=FCC_Frequencies__MF}FCC_Frequencies:[300000+TO+3000000}";
    edocs_web_fcc_frequencies_facet_query[7] = "&facet.query={!key=FCC_Frequencies__HF}FCC_Frequencies:[3000000+TO+30000000}";
    edocs_web_fcc_frequencies_facet_query[8] = "&facet.query={!key=FCC_Frequencies__VHF}FCC_Frequencies:[30000000+TO+300000000}";
    edocs_web_fcc_frequencies_facet_query[9] = "&facet.query={!key=FCC_Frequencies__UHF}FCC_Frequencies:[300000000+TO+3000000000}";
    edocs_web_fcc_frequencies_facet_query[10] = "&facet.query={!key=FCC_Frequencies__SHF}FCC_Frequencies:[3000000000+TO+30000000000}";
    edocs_web_fcc_frequencies_facet_query[11] = "&facet.query={!key=FCC_Frequencies__EHF}FCC_Frequencies:[30000000000+TO+300000000000}";
    edocs_web_fcc_frequencies_facet_query[12] = "&facet.query={!key=FCC_Frequencies__THF}FCC_Frequencies:[300000000000+TO+3000000000000}";
    edocs_web_fcc_frequencies_facet_query[13] = "&facet.query={!key=FCC_Frequencies__Greater}FCC_Frequencies:[3000000000000+TO+*}";
     
    
    var edocs_web_fcc_frequencies = edocs_web_fcc_frequencies_facet;
    
    for(var freq_idx in edocs_web_fcc_frequencies_facet_query){
    	edocs_web_fcc_frequencies = edocs_web_fcc_frequencies + edocs_web_fcc_frequencies_facet_query[freq_idx];
    }
    
    console.log("FREQ: " + edocs_web_fcc_frequencies);
    
    edocs_web_fcc_frequencies = edocs_web_fcc_frequencies + edocs_web_fcc_frequencies_facet_interval + edocs_web_fcc_frequencies_facet_limit;
    
    edocs_web_facet_string = edocs_web_facet_string + edocs_web_fcc_frequencies;
    
    
    return edocs_web_facet_string;
}

function get_all_facets()
{
    var facet_string = "";
    
    var facet_range = "&facet.range=date";
    var facet_field = "&facet.field=source_type";
    var f_source_type_limit = "&f.source_type.facet.limit=2";
    var f_source_type_count = "&f.source_type.facet.sort=count";
    var date_facet_limit = "&f.date.facet.limit=5";
    var date_facet_range_other = "&f.date.facet.range.other=after";
    var date_facet_range_gap = "&f.date.facet.range.gap=%2B1YEAR";
    var date_facet_range_start = "&f.date.facet.range.start=2010-02-01T00:00:00.784Z";
    var date_facet_range_end = "&f.date.facet.range.end=2016-02-01T00:00:00.784Z";
    
    facet_string = facet_range + facet_field;
    facet_string = facet_string +  f_source_type_limit + f_source_type_count + date_facet_limit;
    facet_string = facet_string +  date_facet_range_other + date_facet_range_gap;
    facet_string = facet_string +  date_facet_range_start + date_facet_range_end;
    
    return facet_string;
}


function get_edocs_facets()
{
    var facet_string = "";
    
    var edocs_dockets_facet = "&facet.field=dockets";
    var edocs_dockets_facet_sort = "&f.dockets.facet.sort=count";
    
    facet_string = edocs_dockets_facet + edocs_dockets_facet_sort;
    
    var edocs_federal_registration_citation_facet = "&facet.field=federalRegisterCitation";
    var edocs_federal_registration_citation_facet_sort = "&f.federalRegisterCitation.facet.sort=count";
    
    facet_string = facet_string + edocs_federal_registration_citation_facet + edocs_federal_registration_citation_facet_sort;
    
    var edocs_file_number_facet = "&facet.field=fileNumber";
    var edocs_file_number_facet_count = "&f.fileNumber.facet.sort=count";
    
    facet_string = facet_string +edocs_file_number_facet + edocs_file_number_facet_count;
    
     var edocs_fcc_number_facet = "&facet.field=fccNo";
     var edocs_fcc_number_facet_sort = "&f.fccNo.facet.sort=count";
     
     facet_string = facet_string +edocs_fcc_number_facet + edocs_fcc_number_facet_sort;
     
    var edocs_da_number_facet = "&facet.field=daNo";
    var edocs_da_number_facet_sort = "&f.daNo.facet.sort=count";
    
    facet_string = facet_string +edocs_da_number_facet + edocs_da_number_facet_sort;
      
    var edocs_report_number_facet = "&facet.field=reportNumber";
    var edocs_report_number_facet_sort = "&f.reportNumber.facet.sort=count";
    
    facet_string = facet_string +edocs_report_number_facet +edocs_report_number_facet_sort;
    
   var edocs_fcc_record_facet = "&facet.field=fccRecord";
   var edocs_fcc_record_facet_sort = "&f.fccRecord.facet.sort=count";
   
   facet_string = facet_string +edocs_fcc_record_facet + edocs_fcc_record_facet_sort;
  
    var edocs_document_category_facet = "&facet.field=documentCategory";
    var edocs_document_category_facet_sort = "&f.documentCategory.facet.sort=count";
    var edocs_document_category_facet_limit = "&f.documentCategory.facet.limit=200";
    
     facet_string = facet_string +edocs_document_category_facet + edocs_document_category_facet_sort + edocs_document_category_facet_limit;
    
    var edocs_doc_types_facet = "&facet.field=docTypes";
    var edocs_doc_types_facet_sort = "&f.docTypes.facet.sort=count";
    var edocs_doc_types_facet_limit = "&f.docTypes.facet.limit=66";
    
    facet_string = facet_string +edocs_doc_types_facet +  edocs_doc_types_facet_sort + edocs_doc_types_facet_limit;
    
    var edocs_bureaus_facet = "&facet.field=bureaus";
     var edocs_bureaus_facet_sort = "&f.bureaus.facet.sort=count";
     var edocs_bureaus_facet_limit = "f.bureaus.facet.limit=40";
     
    facet_string = facet_string +edocs_bureaus_facet + edocs_bureaus_facet_sort + edocs_bureaus_facet_limit;
    
    var edocs_released_date_facet = "&facet.range=releasedDate";
    var edocs_released_date_limit = "&f.releasedDate.facet.limit=5";
    var edocs_released_date_range_start = "&f.releasedDate.facet.range.start=2010-02-01T00:00:00.774Z";
    var edocs_released_date_range_end = "&f.releasedDate.facet.range.end=2016-02-01T00:00:00.774Z";
    var edocs_released_date_range_other = "&f.releasedDate.facet.range.other=after";
    var edocs_released_date_range_gap = "&f.releasedDate.facet.range.gap=%2B1YEAR";
    
    facet_string = facet_string + edocs_released_date_facet + edocs_released_date_limit + edocs_released_date_range_start;
    facet_string = facet_string + edocs_released_date_range_end + edocs_released_date_range_other + edocs_released_date_range_gap;
    
     var edocs_last_modified_date_facet = "&facet.range=lastModifiedDate";
    var edocs_last_modified_date_limit = "&f.lastModifiedDate.facet.limit=5";
    var edocs_last_modified_date_range_start = "&f.lastModifiedDate.facet.range.start=2010-02-01T00:00:00.775Z";
    var edocs_last_modified_date_range_end = "&f.lastModifiedDate.facet.range.end=2016-02-01T00:00:00.775Z";
    var edocs_last_modified_date_range_oher = "&f.lastModifiedDate.facet.range.other=after";
    var edocs_last_modified_date_range_gap = "&f.lastModifiedDate.facet.range.gap=%2B1YEAR";
    
    facet_string = facet_string + edocs_last_modified_date_facet + edocs_last_modified_date_limit + edocs_last_modified_date_range_start;
    facet_string = facet_string + edocs_last_modified_date_range_end + edocs_last_modified_date_range_oher + edocs_last_modified_date_range_gap;
    
     var edocs_adopted_date_facet = "&facet.range=adoptedDate";
    var edocs_adopted_date_limit = "&f.adoptedDate.facet.limit=5";
    var edocs_adopted_date_range_start = "&f.adoptedDate.facet.range.start=2010-02-01T00:00:00.775Z";
    var edocs_adopted_date_raneg_end = "&f.adoptedDate.facet.range.end=2016-02-01T00:00:00.775Z";
    var edocs_adopted_date_range_other = "&f.adoptedDate.facet.range.other=after";
    var edocs_adopted_date_range_gap = "&f.adoptedDate.facet.range.gap=%2B1YEAR";
    
    facet_string = facet_string + edocs_adopted_date_facet + edocs_adopted_date_limit + edocs_adopted_date_range_start;
    facet_string = facet_string + edocs_adopted_date_raneg_end + edocs_adopted_date_range_other + edocs_adopted_date_range_gap;
    
    var edocs_reply_comment_date_facet = "&facet.range=replyCommentDate";
    var edocs_reply_comment_date_limit = "&f.replyCommentDate.facet.limit=5";
     var edocs_reply_comment_date_range_start = "&f.replyCommentDate.facet.range.start=2010-02-01T00:00:00.775Z";
    var edocs_reply_comment_date_range_end = "&f.replyCommentDate.facet.range.end=2016-02-01T00:00:00.775Z";
    var edocs_reply_comment_date_range_other = "&f.replyCommentDate.facet.range.other=after";
    var edocs_reply_comment_date_range_gap = "&f.replyCommentDate.facet.range.gap=%2B1YEAR";
    
    facet_string = facet_string + edocs_reply_comment_date_facet + edocs_reply_comment_date_limit + edocs_reply_comment_date_range_start;
    facet_string = facet_string + edocs_reply_comment_date_range_end + edocs_reply_comment_date_range_other + edocs_reply_comment_date_range_gap;
    
    var edocs_issued_date_facet = "&facet.range=issuedDate";
    var edocs_issued_date_limit = "&f.issuedDate.facet.limit=5";
    var edocs_issued_date_range_start = "&f.issuedDate.facet.range.start=2010-02-01T00:00:00.775Z";
    var edocs_issued_date_raneg_end = "&f.issuedDate.facet.range.end=2016-02-01T00:00:00.775Z";
    var edocs_issued_date_range_other = "&f.issuedDate.facet.range.other=after";
    var edocs_issued_date_range_gap = "&f.issuedDate.facet.range.gap=%2B1YEAR";
    
    facet_string = facet_string + edocs_issued_date_facet + edocs_issued_date_limit + edocs_issued_date_range_start;
    facet_string = facet_string + edocs_issued_date_raneg_end + edocs_issued_date_range_other + edocs_issued_date_range_gap;
    
    var edocs_comment_date_facet = "&facet.range=commentDate";
    var edocs_comment_date_limit = "&f.commentDate.facet.limit=5";
    var edocs_comment_date_range_start = "&f.commentDate.facet.range.start=2010-02-01T00:00:00.775Z";
    var edocs_comment_date_raneg_end = "&f.commentDate.facet.range.end=2016-02-01T00:00:00.775Z";
    var edocs_comment_date_range_other = "&f.commentDate.facet.range.other=after";
    var edocs_comment_date_range_gap = "&f.commentDate.facet.range.gap=%2B1YEAR";
    
    facet_string = facet_string + edocs_comment_date_facet + edocs_comment_date_limit + edocs_comment_date_range_start;
    facet_string = facet_string + edocs_comment_date_raneg_end + edocs_comment_date_range_other + edocs_comment_date_range_gap;

    return facet_string;
}

function get_web_facets()
{
     var facet_string = "";
     
    var has_images_facet = "&facet.field=hasImages";
    var has_images_facet_limit = "&f.hasImages.facet.limit=2";

    facet_string = has_images_facet + has_images_facet_limit;
    
    var web_doc_types_facet = "&facet.field=type";
    var web_doc_types_facet_sort = "&f.type.facet.sort=count";
    var web_doc_types_facet_limit = "&f.type.facet.limit=66";
    
    facet_string = facet_string +web_doc_types_facet +  web_doc_types_facet_sort + web_doc_types_facet_limit;

    var taxonomies_facet = "&facet.field=taxonomies";
    var taxonomies_facet_sort = "&f.taxonomies.facet.sort=count";

    facet_string = facet_string + taxonomies_facet + taxonomies_facet_sort;

    var authors_facet = "&facet.field=authors";
    var authors_facet_sort = "&f.authors.facet.sort=count";

   facet_string = facet_string + authors_facet + authors_facet_sort;

    var created_facet = "&facet.range=created";
    var created_facet_limit="&f.created.facet.limit=5";
    var created_facet_range_start = "&f.created.facet.range.start=2010-02-01T00:00:00.057Z";
    var created_facet_range_end = "&f.created.facet.range.end=2016-02-01T00:00:00.057Z";
    var created_facet_range_gap = "&f.created.facet.range.gap=%2B1YEAR";
    var created_facet_range_other = "&f.created.facet.range.other=after";
    var created_facet_sort = "&f.created.facet.sort=count";

    facet_string = facet_string + created_facet + created_facet_limit;
    facet_string = facet_string + created_facet_range_start + created_facet_range_end;
    facet_string = facet_string + created_facet_range_gap + created_facet_range_other;

    var changed_facet="&facet.range=changed";
    var changed_facet_gap_range = "&f.changed.facet.range.gap=%2B1YEAR";
    var changed_facet_range_start = "&f.changed.facet.range.start=2012-02-01T00:00:00.058Z";
    var changed_facet_range_end = "&f.changed.facet.range.end=2016-02-01T00:00:00.058Z";
    var changed_facet_limit = "&f.changed.facet.limit=3";
    var changed_facet_range_other = "&f.changed.facet.range.other=after";

    facet_string = facet_string + changed_facet + changed_facet_gap_range;
    facet_string = facet_string + changed_facet_range_start + changed_facet_range_end;
    facet_string = facet_string + changed_facet_limit + changed_facet_range_other;
    
    return facet_string;
}


function add_facets(current_selection)
{
    var common_facet_string = "";
    
    var facet_string = "";
    
    var facet = "&facet=true";
    var facet_sort = "&facet.sort=index";
    var facet_min_count = "&facet.mincount=1";
    var facet_limit = "&facet.limit=5";
    
    common_facet_string = facet + facet_sort + facet_min_count + facet_limit;
    
    switch(current_selection)
    {
        case "all":
            facet_string = common_facet_string + get_all_facets();
            break;
        case "edocs":
           facet_string =  common_facet_string + get_edocs_web_facets() + get_edocs_facets();
            break;
        case "web":
            facet_string =  common_facet_string + get_edocs_web_facets() + get_web_facets();
            break;
    }
    
    return facet_string;
}


function create_query(url, current_selection, term, start, facet)
{
      var solr_url = url;
      var repository = current_selection;
      var query_type = "/select?";
      var query_term = "q=" + term;
      var result_type = "&wt=json&indent=true";
      
      
      var qop = "&q.op=AND";
      var tie = "&tie=1.0";
      var def_type = "&defType=edismax";
      var mm = "&mm=100%";
      var start = "&start=" + start;
      var rows = "&rows=10";
      var q_alt = "&q.alt=*:*";
      
      var pf = '&pf=titleText^2000+titleText_stem^1950+importantText^1500+importantText_stem^1450+allText^1100+allText_stem^1050';
      var pf2 = '&pf2=titleText^1800+titleText_stem^1750++importantText^1300+importantText_stem^1250+allText^900+allText_stem^850';
      var pf3 = '&pf3=titleText^1900+titleText_stem^1850+importantText^1400+importantText_stem^1350+allText^1000+allText_stem^950';
      
      var qf = "&qf=titleText^1700+titleText_stem^1650+importantText^1200+importantText_stem^1150+allText^800+allText_stem^750";
  
   var path = solr_url + current_selection + query_type + query_term + result_type;
      
   path = path  + qop + tie + def_type + mm + start + rows + q_alt;
   
    var fl = "";
    var boost = "";
    switch(current_selection)
    {
        case "all":
            boost = '&boost=sum(product(field("source_type_int"),+25),+sum(product(recip(ms(NOW,"date"),3.16e-11,1,1),10),product(recip(field("titleLength"),3.16e-11,1,1))))';
            fl = "&fl=title,blurb,weburl,date,source_type,source_id";
            path = path + pf + pf2 + pf3 + qf;
            
            break;
        case "edocs":
            var edocs_pf = "&pf=titleText^2000+titleText_stem^1950+importantText^1500+importantText_stem^1450+allText^1100+allText_stem^1050";
            var edocs_pf2 = "&pf3=titleText^1900+titleText_stem^1850+importantText^1400+importantText_stem^1350+allText^1000+allText_stem^950";
            var edocs_pf3 = "&pf2=titleText^1800+titleText_stem^1750++importantText^1300+importantText_stem^1250+allText^900+allText_stem^850";
            var edocs_uf = "&uf=-*+Company,+Person,+City,++%0a%09%09FCC_Dockets,+FCC_Rules,+FCC_Records,+FCC_Codes,+FCC_Forms,+FCC_CaseCitations,+FCC_CallSigns,%0a%09%09documentType,+documentCategory,+federalRegisterCitation,+fccNo,+daNo,+fccRecord,+++++%0a%09%09fileNumber,+reportNumber,+dockets,+bureaus,+topics,+docTypes";
            boost = '&boost=recip(ms(NOW,"releasedDate"),3.16e-11,1,1)';
            path = path + edocs_pf + edocs_pf2 + edocs_pf3 + qf;
            path = path + edocs_uf;
            fl = "&fl=title,blurb,releasedDate,links,attachmentLabels,source_type,source_id";
            break;
        case "web":
            var web_uf = "&uf=-*+Company,+IndustryTerm,+Person,+City,++%0a%09%09%09FCC_Dockets,+FCC_Rules,+FCC_Records,+FCC_Codes,+FCC_Forms,+FCC_CaseCitations,+FCC_CallSigns,+%0a%09%09%09topics,+taxonomies,+authors";
            boost = '&boost=sum(product(recip(ms(NOW,"changed"),3.16e-11,1,1),10),product(recip(field("titleLength"),3.16e-11,1,1)))';
            path = path + pf + pf2 + pf3 + qf;
            path = path + web_uf;
            fl = "&fl=title,blurb,weburl,changed,source_type,source_id";
            break;
    }
    
    path = path + boost + fl;
    
    if (facet)
    {
    }
    else
    {
        path = path + add_facets(current_selection);
    }
   
    return path;
}

function create_facet_query(facets_string){
	
	var facets_array = JSON.parse(facets_string);
	
	var facet_string = "";
	
	var facet_array_length = facets_array.length;
	
	for (var i = 0; i < facet_array_length; i++) {
		
		var facet_object = facets_array[i];
		var str = "";
		 switch(facet_object.facet)
	      {
	          case "adoptedDate":
	              str = get_year_end_date_query(facet_object.value, facet_object.facet);
	              break;
	           case "lastModifiedDate":
	              str = get_year_end_date_query(facet_object.value, facet_object.facet);
	              break;
	          case "issuedDate":
	              str = get_year_end_date_query(facet_object.value, facet_object.facet);
	              break;
	           case "commentDate":
	              str = get_year_end_date_query(facet_object.value, facet_object.facet);
	              break;
	            case "created":
	              str = get_year_end_date_query(facet_object.value, facet_object.facet);
	              break;
	          case "replyCommentDate":
	              str = get_year_end_date_query(facet_object.value, facet_object.facet);
	              break;
	          case "changed":
	              str = get_year_end_date_query(facet_object.value, facet_object.facet);
	              break;
	          case "FCC_Frequencies":
	              str = '&fq=' + facet_object.facet + ':' + frequency_ranges[facet_object.value];
	              break;    
	          case "FCC_Dollars":
	              str = '&fq=' + facet_object.facet + ':' + dollar_facet_amounts[facet_object.value];
	              break;
	          default:
	              str = '&fq=' + facet_object.facet + ':"' + facet_object.value.replace('&', '%26') + '"';
	               break;
	      }
		 facet_string = facet_string + str;
	}
	
	return facet_string;
}

function get_year_end_date_query(first_day_iso_date, facet)
{
    var year_digit =  first_day_iso_date.charAt(3);
   
    var y = Number(year_digit) + 1;
   
    var last_day_iso_date = first_day_iso_date.substring(0, 3) + y + first_day_iso_date.substring(4, first_day_iso_date.length);
    
    var date_facet = "&fq=" + facet + ":[" + first_day_iso_date + " TO " + last_day_iso_date + "]";
    
    return date_facet;
}

var solr_request = function(req, res){
	
	var http = require("http");
	
	var req_query = "";
	var query = "";
	switch(req.query.source)
	{
		case "suggest":
			query = "/solr/fcc.oet.kdb/select?q=*:*&wt=json&indent=true&facet=true&facet.field=text&facet.mincount=1&facet.prefix=" + req.query.query;
			req_query = encodeURI(query);
			break;
		case "spell":
			query = "/solr/fcc.oet.kdb/spell?q=" + req.query.query + "&spellcheck=true&spellcheck.collate=true&spellcheck.build=true&wt=json&indent=true";
			req_query = encodeURI(query);
			break;
		default:
			var fq = req.query.fq;
			var facet_string = "";
		
			console.log("REQUEST: " + JSON.stringify(req.query));
			
			var num = parseInt( req.query.start) || 0;
			if (fq)
			{
				query = create_query("/solr/", req.query.source, req.query.query, num, fq);
				
				switch(req.query.query_type)
				{
					case "input":
						facet_string = create_facet_prefix_query(fq);
						break;
					case "facet":
						facet_string = create_facet_query(fq);
						break;
				}
				
				console.log("FACET_STRING: " + facet_string);
				
				query = query + facet_string;
			}
			else
			{
				query = create_query("/solr/", req.query.source, req.query.query, num);
			}
        	
			var q1 = encodeURI(query);
			
			var find = "%252B";
			var re = new RegExp(find, 'g');

			req_query = q1.replace(re, "%2B");
			break;
	}
	
	
//	console.log("PATH: " + req_query);
	var options = 
	{
		host : config.search_host,
		port : config.search_port,
	    path : req_query, // the rest of the url with parameters if needed
	    method : 'GET' // do GET
	};

	
http.get(options, function (http_res) {
    // initialize the container for our data
    var data = "";

    // this event fires many times, each time collecting another piece of the response
    http_res.on("data", function (chunk) {
        // append this chunk to our growing `data` var
        data += chunk;
    });

    // this event fires *one* time, after all the `data` events/chunks have been gathered
    http_res.on("end", function () {
    
        // you can use res.send instead of console.log to output via express
    	res.send(data);
    });
}).on("error", function(err){
	res.status(404)        // HTTP status 404: NotFound
   .send('Not found');
});
};

exports.solr_request = solr_request;
