//Funcionamento do CPF
//Bloqueia Dígito que não seja numérico
var cpf = {
    
    extends : "form/input",
    
    
    implementation: function(public, protected, private){
        protected.maxLength = 11;
        protected.realSize = 11;
        protected.content = "";
        
        public.onKeyDown(function(instance, e){
            var ch = e.keyCode;
            
           
            if ((!(ch >= 48 && ch <= 57)) && (!(ch >= 96 && ch <= 105)) && ch != 8 && ch != 46){
                 e.preventDefault();
            }else if ( ch != 8 && ch != 46){
                //is inserting another char
                var len= protected.content.length;
                if (len == protected.maxLength) {
                    //está no limite. Pode ser feito uma troca caso o carater inicial esteja vazio
                    if (protected.element.value.charAt(0) == " "){
                         protected.content += ch;
                         protected.element.value = protected.format(protected.content);
                     }
                    else
                    e.preventDefault();
                } else{
                    e.preventDefault();
                    protected.content += String.fromCharCode(ch);
                    protected.element.value = protected.format(protected.content);
                }
                
            }
            return false;
            
        })
 
        public.onKeyUp(function(instance, e){
            var ch = e.keyCode;
            if (ch == 8 || ch == 46){
                  public.setText(protected.element.value);
            }
                //public.setText(protected.element.value);
        });
        
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
        
        public.setText = function(str){
           str = cleanText(str);
           if (str == null || str.length == 0) {protected.element.value = ""; return;}
           
           protected.element.value= protected.format(str);
        }
        
        public.getText = function(){        
            return protected.content;
           //return cleanText(protected.element.value);
        }
        
        protected.format = function(str){
            
           var len = str.length;
           if( len < protected.realSize)
               str = "   .    .    -  ".substring(protected.realSize - len)+str;
           
           var res = "";
           
           for (var x = 0; x < str.length; x++)
           {
               if (x == 3) res += ".";
               if (x == 7) res += ".";
               if (x == 11) res += "-";
                var ch = str.charAt(x);
                if ((ch >=  '0' && ch <= '9') || ch == ' ')
                    res += ch;
           } 
           return res;
        }
        public.isValid = function(){
            
            
        }
        
        
    }
    
}


cpf;