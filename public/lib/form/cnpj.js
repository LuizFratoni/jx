//Funcionamento do Cnpj
//Bloqueia Dígito que não seja numérico


var cnpj = {
    
    extends : "form/input",
    
    
    implementation: function(public, protected, private){
        protected.maxLength = 18;
        
        public.onKeyDown(function(instance, e){
            var ch = e.keyCode;
            
            if ((!(ch >= 48 && ch <= 57)) && (!(ch >= 96 && ch <= 105)) && ch != 8 && ch != 46){
                e.preventDefault();
            } else if ( ch != 8 && ch != 46){
                //is inserting another char
                var len= protected.element.value.length;
                if (len == protected.maxLength) {
                    e.preventDefault();
                } else{
                    if (len == 2 || len == 6)
                        protected.element.value += ".";
                    else if (len == 10)
                        protected.element.value += "/";
                    else if (len == 15)
                        protected.element.value += "-";
                }
                
            }
            return false;
            
        });
        
        public.onKeyUp(function(instance, e){
            var ch = e.keyCode;
            if (ch == 8 || ch == 46){
                public.setText(protected.element.value);
            }           
        });
 
        public.setText = function(str){
           var res = "";
           var y = 0;
           for (var x = 0; x < str.length; x++)
           {
               if (y == 2) res += ".";
               if (y == 6) res += ".";
               if (y == 10) res += "/';"
               if (y == 12) res += "-";
                var ch = str.charAt(x);
                if (ch >=  '0' && ch <= '9'){
                    y++;
                    res += ch;
                }
           } 
           protected.element.value= res;
        }
        
        public.getText = function(){
           return cleanText(protected.element.value);
        }
        
        public.isValid = function(){
            
            
        }
        
        function cleanText(str){
           var res = "";
            for (var x = 0; x < str.length; x++)
           {
                var ch = str.charAt(x);
                if (ch >=  '0' && ch <= '9')
                    res += ch;
           } 
           return res;   
        }
        
        
    }
    
}


cnpj;/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


