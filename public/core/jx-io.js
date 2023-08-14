

var charEncodings = {
    "\t": "&nbsp;&nbsp;&nbsp;&nbsp;",
    " ": "&nbsp;",
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\n": "<br />",
    "\r": "<br />"
};

var space = /[\t ]/;
var noWidthSpace = "&#8203;";

var Format = {

textToHtml : function(text){
    text = text.replace(/\r\n/g, "\n");  // avoid adding two <br /> tags
    var html = "";
    var lastChar = "";
    for (var i in text)
    {
        var char = text[i];
        var charCode = text.charCodeAt(i);
        if (space.test(char) && !space.test(lastChar) && space.test(text[i + 1] || ""))
        {
            html += noWidthSpace;
        }
        html += char in charEncodings ? charEncodings[char] :
        charCode > 127 ? "&#" + charCode + ";" : char;
        lastChar = char;
    }
    return html;
},


toMoneyString : function(num){
   if ( num == null) return "0,00";
   x = 0;

   if(num<0) {
      num = Math.abs(num);
      x = 1;
   }
   if(isNaN(num)) num = "0";
      cents = Math.floor((num*100+0.5)%100);

   num = Math.floor((num*100+0.5)/100).toString();

   if(cents < 10) cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
         num = num.substring(0,num.length-(4*i+3))+'.'
               +num.substring(num.length-(4*i+3));
   ret = num + ',' + cents;
   if (x == 1) ret = ' - ' + ret;return ret;


},

/*
toSimpleDateString : function(dt){

   if (dt.constructor != Date)
       dt= new Date(dt);

   var result = "";
   var aux = dt.getDate();
   if (aux < 9)
       result = "0"+aux+"/";
   else result = aux+"/";

   aux = dt.getMonth()+1;
   if (aux < 9)
       result += "0"+aux+"/";
   else result += aux+"/";

   result += dt.getFullYear();
   return result;


},
*/
//2005-06-01T00:00:00.000Z

toSimpleDateString : function(dt){

   if (dt.constructor != Date){

              try{

       var y,M,d, h,m,s, z;

       y = dt.substring(0, 4);
       M = parseInt(dt.substring(5, 7), '10')-1;
       d = dt.substring(8, 10);

       if (dt.length > 23){
          h = parseInt(dt.substring(11, 13));
          m = parseInt(dt.substring(14, 16));
          s = parseInt(dt.substring(17, 19));
          z = parseInt(dt.substring(20, 23));
          if (h == 0 && m == 0 && s == 0 && z == 0 )
              dt = new Date(y, M, d);
          else dt = new Date(y, M, d, h, m, s, z);
       } else{
           h = 0; m = 0; z = 0;
           dt = new Date(y, M, d);
       }

       //console.warn(y+ "|"+ M + "|" + d + " - "+ h + "|" + m + "|" + s + "|" +  z);


      /// dt = new Date(dt);


       } catch (error){
        var i = parseInt(dt);
        if (isNaN(dt) == false){
           dt = new Date(dt)
        } else {
           console.error("**Erro convertendo data "+dt+": "+error);
           return null;
        }
       }



   }

   var result = "";
   var aux = dt.getDate();

    if (aux <= 9)
       result = "0"+aux+"/";
   else result = aux+"/";

   aux = dt.getMonth()+1;
   if (aux <= 9)
       result += "0"+aux+"/";
   else result += aux+"/";

   result += dt.getFullYear();
   return result;


},

toSimpleHourString : function(dt){

   if (dt.constructor != Date)
       dt= new Date(dt);

   var result = "";
   var aux = dt.getHours()+2;
   if (aux <= 9)
       result = "0"+aux+":";
   else result = aux+":";

   aux = dt.getMinutes();
   if (aux <= 9)
       result += "0"+aux;
   else result += aux;

  return result;


},



dateFromString : function(str){
    str = str.substr(0, 10);
    //return Date.parse(str);

    var nodes = str.split("-");
    var y,m,d;
    y = parseInt(nodes[0]);
    var sm = nodes[1];
    if (sm.charAt(0) == '0') m = parseInt(sm.charAt(1));
    else m = parseInt(nodes[1]);

    var sd = nodes[2];
    if (sd.charAt(0) == '0') d = parseInt(sd.charAt(1));
    else d = parseInt(nodes[2]);

    m = m-1;

    var dt = new Date(y, m, d);
    return dt;
},

floatFromString : function(str){
    if (str == null || str == "") return 0;
    str = str.replace(".", "");
    str = str.replace(",",".");
    return parseFloat(str);
},


toNameString : function(s){
    if (s == null) return "";
    s = s.trim();
    var nodes = s.split(' ');

    var result = "";
    var aux;
    var first = true;
    nodes.forEach(function(node){
        aux = node.toLowerCase();
        if (aux != ""){
         if (!(aux == "de" || aux == "da" || aux == "do" || aux == "ou" || aux == "com" || aux == "sem" )){

                if (aux.length > 2 && (aux.charAt(1) == '\'' || aux.charAt(1) == '´'))
                    aux = aux.charAt(0)+aux.charAt(1)+ aux.charAt(2).toUpperCase() + aux.slice(3);
                else aux = aux.charAt(0).toUpperCase() + aux.slice(1);
            }

         if (first == true) { result += aux; first = false; }
             else result += " "+aux;
             
        }
    });
 
    return result;

}

}




function JXGatewayRestRequest(uri, method, params, ret, cred, t){

    var req = new XMLHttpRequest();

    if (t != null)
        req.timeout = 5000;
    else req.timeout = t;
 
    req.open(method,uri, true);
    if (cred != null){
       req.setRequestHeader("Authentication", cred);
       req.setRequestHeader("Authorization", cred);
    }

    
    req.setRequestHeader('Accept', 'application/json');
    if (params != null){
        if (params instanceof FormData){
         //   req.setRequestHeader('Content-Type', 'multipart/form-data');
            console.warn("ENVIANDO FormData");
        } else {
            params = JSON.stringify(params);
            req.setRequestHeader('Content-Type', 'application/json');
        } 
    }

    req.onload = function(){
        try{
            var result = JSON.parse(req.responseText);

            if (result != null && (result.success == true || result.error == null) ) {
                if (result.result != null)
                    ret(result.result);
                else ret(null);
            } else {
                if (ret != null){
                    console.error("MX ERROR: "+result.error.id);
                    ret(null, result.error)
                } else {
                    console.error("MX ERROR: Erro nao especificado");
                    ret(null, null);
                }
            }

        } catch(err){
            console.error("MERX: Error Requesting Data "+uri+": "+err);
            console.warn(req.responseText);
        }
    }
    req.onerror = function(e){
        console.warn(JSON.stringify(e));
        console.error("Erro em requisição "+e);
        if (ret != null) ret(null, e);
    }

    console.log("MX "+method+": "+uri);
    console.log(params);
    req.send(params);

}


function JXGateway(restPath, token){
    var timeout = 5000;
    console.warn("New Service to "+restPath)

    this.setToken = function(tk){
        token = tk;
    }

    this.get = function(uri, onReturn){
        console.warn("Service GET "+restPath+uri);
        JXGatewayRestRequest(restPath+uri, "GET",null, onReturn, token, timeout);
    }

    this.delete = function(uri, onReturn){
        JXGatewayRestRequest(restPath+uri, "DELETE",null, onReturn, token, timeout);
    }

    this.post = function(uri,params, onReturn){
        JXGatewayRestRequest(restPath+uri, "POST", params, onReturn, token, timeout);
    }

    this.put = function(uri,params, onReturn){
        JXGatewayRestRequest(restPath+uri, "PUT", params, onReturn, token, timeout);
    }

    this.url = function(value){
        return restPath+value;
    }

    this.setTimeout = function(t){
        timeout = t;
    }

}