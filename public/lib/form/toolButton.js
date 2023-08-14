

var ToolButton = {

    extends : UI.Text,


    implementation: function(public, protected, private){
        

        public.use({ Opacity: 0.6, Align: "center", FontFamily : "Material Icons", FontSize: 18, Width: 27, Height: 27, FontColor : "#454545"} );
        protected.enabled = true;

        public.onMouseOver(function(){
            if (protected.enabled != true) return;
            public.setOpacity(1);
        });

        public.onMouseOut(function(){
            if (protected.enabled != true) return;
            public.setOpacity(0.6);
        });

        /*public.onMouseDown(function(){
            if (protected.enabled != true) return;
            public.setOpacity(0.8);
        })

        public.onMouseUp(function(){
            if (protected.enabled != true) return;
            public.setOpacity(0.9);
        });*/

        public.onClick(function(){
            if (protected.enabled == false) return;

            protected.element.animate([
                { fontSize: 12},
                { fontSize: 20}
            ], {
                duration: 100
            })

            if (protected.clickListener != null) protected.clickListener();
        })

        public.onClick = function(cl){
            protected.clickListener = cl;
        }

        public.setEnabled = function(b){
            protected.enabled = b;
            if (b == true){
                public.setOpacity(0.6);
            } else {
                public.setOpacity(0.2);
            }
        }

        public.isEnabled = function(){
            return protected.enabled;
        }
    }

};

ToolButton;

