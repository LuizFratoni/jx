

var FileInput = {
    

    implementation: function(public, protected, private){
         protected.element = document.createElement("input");
         protected.element.type= "file";
         Class.extends(UI.Text, public, protected);
         
       //  protected.element.value = "Selecionar Arquivo";
       //  protected.element.style.placeholder = "Selecionar Arquivo";
         protected.element.addEventListener("change",function(e){
                        var file = protected.element.files;
                        if (protected.onselect != null){
                          if (protected.multiple == true)
                            protected.onselect(file);
                          else
                            protected.onselect(file[0]);
                        }
           });
           
         public.onSelect = function(l){
               protected.onselect = l;
         }
                 

        public.setMultiple = function(){
          protected.multiple = true;
          protected.element.multiple = "multiple";
        }
    }
    
 }
 
 FileInput;