
/*
function MenuController(){
    
    var menu = New("frison.v0/autosig/popupMenu");

    menu.setEnabledButtonBar(false);
    menu.addItem("", "Marcar como Devolução");
    menu.addItem("", "Remover");
    
    this.getMenu = function(){
        return menu;
    }
}*/

var simpleBg = New(UI.Brushes.LinearGradient);
simpleBg.vertical("#ffffff", "#eeeeee");
var pressedBg = New(UI.Brushes.LinearGradient);
pressedBg.vertical("#cccccc", "#e0e0e0");


function RemoveFromArray(vector, item){

    var newV = [];
    vector.forEach(function(i){
        if ( i != item)
            newV.push(i);
    })
    return newV;
    
}


var SimpleButton = {
 
    extends : UI.Text,
    
    implementation: function(public, protected,private){
        
        protected.enabled = true;
        public.use({ Height: 20, Width: 20, FontSize: 12, BackgroundBrush: simpleBg, Align: "center", Border: { width: 1, color : "#d0d0d0"}, BorderRadius: 4  } );
        
        public.onMouseDown(function(){
            if (protected.enabled == false) return;
            public.setBackgroundBrush(pressedBg);
        })
        
        public.onMouseUp(function(){
            if (protected.enabled == false) return;
            public.setBackgroundBrush(simpleBg);
        })
        
        public.onMouseOut(function(){
            //if (protected.enabled == false) return;
            public.setBackgroundBrush(simpleBg);
        })
        
        public.setEnabled = function(b){
            protected.enabled = b;
            if (b == false)
                public.setOpacity(0.2);
            else public.setOpacity(1);
        }
        
        public.isEnabled = function(){
            return protected.enabled;
        }
        
    }
    
}


var Check = {
    
    extends : UI.Text,
    
    implementation :function(public, protected, private){
        public.use({FontFamily: "autosig",Text : "",  FontSize : 10, Width: 14, Align : "center", Height: 14, Border : { width : 2, color: "#cccccc" } } );
        protected.checked = false;
        protected.enabled = true;
        public.setChecked= function(b){
            protected.checked = b;
            if (b== true) {
                public.setText("\ue633");
                public.setBorder({ width : 2, color: "#303030" });
                
            }
            else {
                public.setBackgroundColor(null);
                public.setText("");
                public.setBorder({ width : 2, color: "#cccccc" });
            }
        }
        
        public.onMouseOver(function(){
            if (protected.enabled != true) return;
            public.setBorder({ width : 2, color: "#909090" });
        });
        
        public.onMouseOut(function(){
            if (protected.enabled != true) return;
            if(protected.checked == true){
                public.setBorder({ width : 2, color: "#303030" });
            } else{
                public.setBorder({ width : 2, color: "#cccccc" });
            }
        });
        
        public.onClick(function(){
            if (protected.enabled != true) return;
           public.setChecked(protected.checked == false); 
           if (protected.listener != null)
            protected.listener.didCheckChange(protected.checked);
        });
        
        public.setListener = function(l){
            protected.listener = l;
        }
        
        public.setEnabled = function(b){
            protected.enabled = b;
            if (b == true)
                public.setOpacity(1);
            else public.setOpacity(0.2);
        }
        
    }
    
}

var tableCol = {
    extends : UI.Text,
    className : "Form.Table.Column",
          
    implementation : function(public, protected, private){
        public.setAlign("center");
        public.setFontSize(11);
        public.setBorderRight({width : 1, color : "#cccccc"});
        public.setHeight(30);
        protected.table = null;
        protected.baseSetWidth = public.setWidth;
        protected.colAlign = 0;
        protected.width = 0;
        protected.dataType = "";// string
        protected.binding = "";
        protected.auxBgColor = "";

        public.setBinding = function(b){
            if (b.constructor == Array) protected.bindMode = 1;
            else protected.bindMode = 0;
            
            protected.binding = b;
        }
        
        public.setTable = function(tb){
            protected.table = tb;
        }
        
        public.setValue = function(v){
            protected.values = v;
        }
        public.setDataType = function(type){
            if (type == null){
                protected.dataType ="";
                return;
            }
            protected.dataType = type.toLowerCase().trim();
        }
        
        public.onMouseOver(function(){
            protected.auxBgColor = protected.element.style.backgroundColor;
            public.setBackgroundColor("rgba(255,255,255,0.3)"); 
        });
        
        public.onMouseOut(function(){
           public.setBackgroundColor(protected.auxBgColor);
        });
              
        public.onMouseDown(function(){
            protected.table.sortByColumn(public);
        });
        
        public.setValues = function(v){
            protected.values = v;
        }
        public.getTextFrom = function(data){
            var cur;
            if (protected.bindMode == 0){
                cur = data[protected.binding];
            } else if (protected.bindMode == 1){
                cur = data;
                protected.binding.forEach(function(field){
                    cur = cur[field];
                    if (cur == null){
                        cur = "";
                        return false;

                    }
                });
                
            }
            
            if (protected.dataType == "" || protected.dataType == "text" || protected.dataType == "string")
                    return cur;
                else {
                    if (protected.dataType == "money")
                        return Format.toMoneyString(cur);
                    else if (protected.dataType == "date"){
                        if (cur != null)
                         return Format.toSimpleDateString(cur);
                        return  "";
                    }else if (protected.dataType == "intdate"){
                        if (cur != null)
                         return Format.toSimpleDateString(new Date(cur));
                        return  "";
                    } 
                    else if (protected.dataType == "datetime"){
                       if (cur != null)
                         return Format.toSimpleDateString(cur)+" "+Format.toSimpleHourString(cur);
                        return  ""; 
                    } else if (protected.dataType == "bool"){
                        if (protected.values != null){
                            if (cur == true) return protected.values.True;
                            else return protected.values.False;
                        } else {
                            if (cur == true) return "Sim";
                            else return "";
                        }
                    } else if (protected.dataType == "name"){
                        return Format.toNameString(cur);
                    }
                }
        }  

        public.setWidth = function(w){
            protected.width = w;
            protected.baseSetWidth(w);
        }

        public.getWidth = function(){
            return protected.width;
        }

        public.createCell = function(row){
            var attrs;
            if (protected.cellAttr != null)
                attrs = protected.cellAttr;
            else attrs= {};
            attrs.Column = public;
            attrs.Row = row;
            attrs.Width = protected.width;
            attrs.Height = 30;
            attrs.Behavior = protected.behavior;
            
            if (protected.colAlign == 0){
                attrs.PaddingLeft = 5;
                attrs.Width = protected.width -5;
            }
            else if (protected.colAlign == 1){
                attrs.PaddingRight = 5;
                attrs.Align = "right";
                attrs.Width = protected.width -5;
            }
            var cell;
            if (protected.customClass != null)
                 cell = New(protected.customClass);
            else cell = New(tableCell, attrs);
            return cell;
           //return "TESTE";
        }
        
        public.setBehavior = function(b){
            protected.behavior = b;
        }

        public.setCell = function(cell){
            protected.cellAttr = cell;
            var al = cell.Align;
            if (al == "right") protected.colAlign = 1;
            else if (al == "center") protected.colAlign = 2;
            else
            protected.colAlign = 0;
            if (cell.Class != null){
                if (cell.Class.constructor == String)
                    protected.customClass = Class.forName(cell.Class.constructor);
                else protected.customClass = cell.Class;
            }
        }
                
        public.isLesser = function(a,b){
            var va, vb;
            if (protected.bindMode == 0){ 
                va = a.getData()[protected.binding];
                vb = b.getData()[protected.binding];
            } else {
                var cur = a.getData();
                protected.binding.forEach(function(field){
                    cur = cur[field];
                });
                va = cur;
                
                var cur = b.getData();
                protected.binding.forEach(function(field){
                    cur = cur[field];
                });
                vb = cur;
            }
            
            if (protected.dataType == "" || protected.dataType == "text" || protected.dataType =="string" || protected.dataType == "integer"){
                if (va < vb) return -1;
                if (va > vb) return 1;
            } else{
                if (va < vb) return -1;
                if (va > vb) return 1;
            }
            return 0;
        }
    }

}


var tableRow = {
    
    extends : UI.Container,
            
    implementation : function(public, protected, private){
        public.setOrientation("horizontal");
        public.setHeight(30);
        protected.alternated = false;
        protected.resume = null;
        protected.checked = false;
        protected.prefBg = null;
        public.setBorderBottom({color: "#e0e0e0", width: 1});

        protected.cells = [];
        protected.check = New(Check, {Visible : false, MarginLeft: 4, MarginTop: 6, Listener : protected} );
        protected.icon = New(UI.Text ,{ Width: 30, FontFamily: "Material Icons", FontSize: 22, FontColor: "#b0b0b0", Text : "\ue24d", Align: "center", Height: 30});
        protected.selected = false;

        public.clone = function(){
            return New(tableRow, {Table: protected.table, Data: protected.data} );

        }
        
        public.setData = function(data){
            protected.data = data;
            protected.data._handler = public;
            for (var i = 0; i < protected.cells.length; i++){
                protected.cells[i].bindFrom(data);
            }
            if (data.__prefBackground != null){
                protected.prefBg = data.__prefBackground ;
                public.setBackgroundColor(protected.prefBg)
            }
            if (data.__prefOpacity != null){
                public.setOpacity(data.__prefOpacity);
            }
            if (data.__canCheck != null){
                protected.check.setEnabled(data.__canCheck);
            }
        }
        
        public.toSimpleText = function(){
           
           var r = ""; 
           var cell;
           for(var c = 0 ; c < protected.table.getColumnCount(); c++){
                cell = protected.table.getColumn(c);
                r += cell.getTextFrom(protected.data)+"\t";
            }
            return r;
        }
        
        public.setTable = function(tb){
            protected.table = tb;

           public.add(protected.check);
           public.add(protected.icon);
           for(var c = 0 ; c < protected.table.getColumnCount(); c++){
                var cell = protected.table.getColumn(c).createCell(public);
                protected.cells.push(cell);
                public.add(cell);
            }
        }
        
        public.setCheckbox  = function(b){
            protected.check.setVisible(b);
        }
        
        public.setChecked = function(b){
            protected.checked = b;
            protected.check.setChecked(b);
        }
        
        public.isChecked = function(){
            return protected.checked;
        }
        
        public.setAlternated = function(b){
            
            protected.alternated = b;
            
            if (protected.prefBg == null){
            if (b == true){
                
                protected.prefBg = "#fbfbfb";
                public.setBackgroundColor("#fbfbfb");
            }
            else{
                protected.prefBg = "#ffffff";
                public.setBackgroundColor("#ffffff");
            }
         }
        }
        
        public.setCheckEnabled = function(b){
            protected.check.setEnabled(b);
        }
                    
        
        public.setPreferredBackground = function(b){
           
            if (b == null){
                if (protected.alternated == true)
                    protected.prefBg = "#fbfbfb";
                else
                    protected.prefBg = "#ffffff";
            } else  protected.prefBg = b;
            public.setBackgroundColor(protected.prefBg);
        }
        
        public.isAlternated = function(){
            return  protected.alternated;
        }

        public.setSelected = function(b){
            protected.selected = b;
            if (b == true){
                public.setBackgroundBrush(protected.table.getSelectedRowBrush());
                public.setBorderBottom( { width : 1, color : "#cccce0"} );
            }
            else {
                public.setBackgroundBrush(null);
                public.setBorderBottom( { width : 1, color : "#e0e0e0"} );
                public.setBackgroundColor(protected.prefBg);
                
                /*if (protected.alternated == true)
                    public.setBackgroundColor("#fbfbfb");
                else
                    public.setBackgroundColor("#ffffff");*/
            }
        }

        public.isSelected = function(){
            return protected.selected;
        }

        
        public.onMouseDown(function(e,a){
            protected.table.selectRow(public, e.shiftKey, e.ctrlKey);
        });
        
        public.getData = function(){
            return protected.data;
        }
        
        public.refresh = function(){
            public.setData(protected.data);
        }
        
        public.onDoubleClick(function(){
            protected.table.rowDoubleClick(public);
            
        });
        
        protected.didCheckChange = function(b){
            protected.checked = b;
            protected.table.checkedItem(public, b);  
        }
        
    }
    
}


var tableCell = {
    
    extends : UI.Text,
    
    implementation : function(public, protected, private){
          public.setBorderRight({width: 1, color : "#e0e0e0"}); 
          public.setHeight(30);
          public.setFontSize(11);
          public.setColumn = function(col){
              protected.col = col;
          }  
          
          public.setRow = function(row){
              protected.row = row;
          }
          
          public.setBehavior = function(beh){
              protected.behavior = beh;
          }
          public.bindFrom = function(data){
              var dt = protected.col.getTextFrom(data);
              public.setText( protected.col.getTextFrom(data) ); 
              if (protected.behavior != null){
                  protected.behavior(public, dt, data, protected.row);
              }
          }
          
          public.getRow = function(){
              protected.row;
          }
    }   
    
}

/////

Class.register("form/table/row", tableRow);
Class.register("form/table/column", tableCol);
Class.register("form/table/cell", tableCell);

////

var Table = {
    
    extends : UI.Container,
            
    implementation : function(public, protected, private){
        public.setBackgroundColor("#ffffff");
        var header_brush = New(UI.Brushes.LinearGradient);
        header_brush.vertical("#cccccc", "#eeeeee");
        
        protected.minWidth = 0;
        protected.resume = null; protected.resumeH = 0;
        protected.checkboxes = false;


        var headerHost = New(UI.Container, { RelativeRect : { left: 0, top: 0, right: 0}, Height: 30, Orientation: "vertical", BackgroundBrush : header_brush});
        var gridHost   = New(UI.Container, { RelativeRect: { left: 0, top: 30, bottom: 0, right: 0} });
        var grid       = New(UI.Container, { Orientation : "vertical", MarginTop:0, RelativeRect :{ left: 0, right: 0}, Shadow : {left:0, top: 0, size: 4, color : "rgba(0,0,0,0.5)"}});
        

        protected.nextRowAlternated = false;
        protected.cols = [];
        protected.rows = [];
        protected.footers = [];
        protected.footerOffset = 0;
        protected.selection = { count : 0, first : null, last : null};

        var header   = New(UI.Container, { Orientation: "horizontal", Height: 30});
        
        gridHost.enableScroll(true);
        gridHost.getDOMElement().style.width = "100%";
        //////////////////////////////////////////////////////
        var brush = New(UI.Brushes.LinearGradient);
        brush.vertical("#606060", "#d0d0d0");
        
        var br2 = New(UI.Brushes.LinearGradient);
        br2.vertical("#eecccccc", "ffeeeeee");
        
        protected.defIcon = "\ue24d";
        headerHost.add(header);
        gridHost.add(grid);
        protected.grid = grid; 
        protected.gridHost = gridHost;
        protected.headerHost = headerHost;
        protected.header = header;
        protected.headerHost.setBorderBottom({width: 1, color :"#cccccc"});
        protected.check = New(Check, { MarginTop: 6, MarginLeft: 4, Visible: false, Listener : public });
        protected.icon =  New(UI.View, { Width: 29, Height: 30, BorderRight: { width: 1, color: "#cccccc"} });
        public.didCheckChange = function(b){
            protected.rows.forEach((function(row){
                row.setChecked(b);
            }));
            public.checkedAllItems(b);
        }
      //  protected.headerHost.setShadow({left:0, top: 2, size: 4, color : "#cccccc"});
      //  protected.headerHost.setInnerShadow({left:0, top: 5, size: 8, color : "#aaaaaa"});
        protected.gridHost.onScroll(function(e, top, left){
            protected.headerHost.getDOMElement().scrollLeft = left;
            if (protected.resume != null){
                protected.resume.getDOMElement().scrollLeft = left;
            }
            if (protected.scrollListener != null)
                protected.scrollListener( left, top);
        });


        public.addMultiple([gridHost, headerHost]);
   
        //////////////////////////////////////////////////

        public.setDefaultIcon = function(icon){
            protected.defIcon = icon;
        }

        public.setCheckboxes = function(b){
            protected.checkboxes = b;
            protected.check.setVisible(b);
        }
        
        public.setScrollListener = function(l){
            protected.scrollListener = l;
        }
        
        public.addColumn = function(attr){
            var col = New(tableCol, attr);
            col.setTable(public);
            protected.minWidth += col.getWidth()+1;
            protected.header.add(col);
            protected.cols.push(col);
            protected.header.setMinWidth(protected.minWidth+protected.cols.length+3);
            protected.grid.setMinWidth(protected.minWidth+protected.cols.length+3);
            return col;
        }
        
        public.addButton = function(btn){
            var col = New(SimpleButton, btn);
            col.setMargin({left: 2, top: 4} );
            protected.header.add(col);
            return col;
        }
        
        public.setColumns = function(cols){
            var col;
            protected.header.clear();
            protected.grid.clear();
            protected.cols = [];
            protected.rows = [];
            protected.minWidth = 0;
            protected.header.add(protected.check);
            protected.header.add(protected.icon)
            cols.forEach(function(attr){
                col = New(tableCol, attr);
                col.setTable(public);
                protected.cols.push(col);
                protected.minWidth += col.getWidth();
                protected.header.add(col);
            });
            protected.header.setMinWidth(protected.minWidth+5);
            protected.grid.setMinWidth(protected.minWidth+5);
        }
        
        public.getColumns = function(){
            return protected.cols;
        }
        
        public.bind = function(data){
            console.log("Binding data");
            protected.grid.clear();
            
            protected.rows = [];
            if (data == null) return;
            data.forEach(function(item){
                public.addRow(item);
            });
        }
        
        public.append = function(data){
            protected.rows = [];
            if (data == null) return;
            data.forEach(function(item){
                public.addRow(item);
            }); 
        }
        
        public.clearRows = function(){
            protected.grid.clear();
            
            protected.rows = [];
        }
        
        public.addRow = function(data){
            var row = New(tableRow, {Table : public, RelativeRect: {left: 0, right: 0}, Checkbox : protected.checkboxes});
            row.setData(data);
            protected.rows.push(row);
            protected.grid.add(row);
            row.setAlternated(protected.nextRowAlternated);
            protected.nextRowAlternated = protected.nextRowAlternated == false;
            return row;
        }

        public.insertFirstRow = function(data){
            var row = New(tableRow, {Table : public, RelativeRect: {left: 0, right: 0}, Checkbox : protected.checkboxes});
            row.setData(data);
            protected.grid.insertFirst(row);
            row.setAlternated(protected.nextRowAlternated);
            protected.nextRowAlternated = protected.nextRowAlternated == false;
            return row;
        }
        
      
        public.removeRow = function(row){
            protected.grid.remove(row);
            protected.rows = RemoveFromArray(protected.rows, row);
            if (protected.selectedRow = row){
                protected.selectedRow = null;
                protected.selectedItem = null;
            }
        }
        
        public.removeRows = function(rows){
            if (rows.length == null) rows = [rows];
            rows.forEach(function(row){
                protected.grid.remove(row);
                protected.rows = RemoveFromArray(protected.rows, row);
                if (protected.selectedRow = row){
                    protected.selectedRow = null;
                    protected.selectedItem = null;
                }
            });
        }
        
        public.addResumeRow = function(data){
            if (protected.resume == null){
                protected.resume = New(UI.Container, { RelativeRect : { left : 0, bottom: 0, right: 0}, Height: 31, BorderTop : { width : 1, color : "#909090"} } );   
                protected.resumeData = New(UI.Container, { RelativeRect : {left: 0, right :0 }, Orientation: "vertical", MinWidth: protected.minWidth });
                protected.resume.add(protected.resumeData);
                public.add(protected.resume);
                protected.resumeH = 31;   
            } else{
                protected.resumeH += 31;
                protected.resume.setHeight(protected.resumeH);
                
            }
            protected.gridHost.setRelativeRect({bottom: protected.resumeH});
            
            var row = New(tableRow, {Table : public, RelativeRect: {left: 0, right: 0}});
            row.setData(data);
            protected.resumeData.add(row);    
            return row;
        }
        
        public.getColumn = function(i){
            return protected.cols[i];
        }
        
        public.getRows = function(){
            return protected.rows;
        }
        
        public.getRowsCount = function(){
            return protected.rows.length;
        }
        
        public.getColumnCount = function(){
            return protected.cols.length;
        }
        
        public.removeColumn = function(id){
            var col = protected.cols[i];
            protected.header.remove(col);
        }
        
        public.sortByColumn = function(col){
            protected.grid.clear();
            try{
                protected.rows.sort(function(a,b){
                    return col.isLesser(a,b);
                });
            } finally {
                    var par = true;
                    protected.rows.forEach(function(row){
                    row.setAlternated(par);
                    par = par == false;
                    protected.grid.add(row); 
            });
            }
        }
        
        public.toSimpleText = function(){
            var r = "";
            var row;
            for( var i =0; i < protected.rows.length; i++ ){
                row = protected.rows[i];
                r += row.toSimpleText()+"\n";
            }
            
            return r;
        }
        
        public.refreshItems = function(i){
            if (i == null){
                protected.rows.forEach(function(row){
                    row.refresh();
                })
            } else{
                protected.rows.forEach(function(row){
                    i(row.getData());
                    row.refresh();
                })
            }
        }

        ////////////////////////////////////////////////////////////////////
        
        public.getSelectedRowBrush = function(){
            if (protected.selectedRowBrush == null){
                protected.selectedRowBrush = New(UI.Brushes.LinearGradient);
                protected.selectedRowBrush.vertical("#cccce0", "#eeeeff");
            }
            return protected.selectedRowBrush;
        }

        protected.getRowNumber = function(row){
            var num = 0;
            protected.grid.forEach(function(r){
                if (row == r){
                    return false;
                }  else {
                    num++
                    return true;
                }
      
            })
            return num;
        }
        
        protected.applySelection= function(){
            var rnum = 0;
            
            protected.selection.items = [];
            protected.grid.forEach(function(r){
                if (rnum >= protected.selection.first && rnum <= protected.selection.last){
                    protected.selection.items.push(r);
                    r.setSelected(true);
                } else r.setSelected(false);
                rnum++;
            })

            protected.selection.count = protected.selection.last - protected.selection.first;
        }

        protected.resetSelection = function(){
            protected.grid.forEach(function(r){
                 r.setSelected(false);
            })
            protected.selection.count = 0;
            protected.selection.last = 0; protected.selection.first = 0;
            protected.selection.items = [];
        }
        
        public.onBeforeSelect = function(l){
            protected.beforeSelect = l;
        }

        protected.realSelectRow = function(row, shiftPressed, ctrlPressed, notifyCallback){
            protected.sameRowClick = null;
            var rnum = protected.getRowNumber(row);

            

            if (ctrlPressed){
                if (protected.selectedRow != null){
                    protected.selection.count++;
                    protected.selection.items.add(row);
                    row.setSelected(true);
                    return;
                }
            } else 
            if (shiftPressed){
                if (protected.selectedRow != null) {

                    
                    if (rnum < protected.selection.first){
                        protected.selection.last = protected.selection.first;
                        protected.selection.first = rnum;
                    } else {
                        protected.selection.last = rnum;
                    }

                    protected.applySelection();
                    return;
                }
            } else {
                if (protected.selection.count > 0){
                    protected.resetSelection();
                }
            }

            if (protected.selectedRow != null){
                protected.selectedRow.setSelected(false);
            }
            protected.selectedRow = row;
            protected.selection.first = rnum;

            //TODO: retirar returns
            if (row != null){ 
                protected.selection.count = 1;
                protected.selection.items = [ row ];
                row.setSelected(true);
                if (notifyCallback == false) return;
                if (protected.rowSelectLister != null)
                     protected.rowSelectLister(row);
                if (protected.selectItemListener != null)
                    protected.selectItemListener(row.getData());
                protected.selectedItem = row.getData();
            } else {
                if (notifyCallback == false) return;
                if (protected.rowSelectLister != null)
                     protected.rowSelectLister(null);
                if (protected.selectItemListener != null)
                    protected.selectItemListener(null);
                protected.selectedItem = null;
            }
        }

        public.selectRow = function(row, shiftPressed, ctrlPressed, notifyCallback){

            if (row.isSelected()== true) {
                protected.sameRowClick = row;
                return;
            }

            if (protected.beforeSelect != null){
                protected.beforeSelect(row, function(b){
                    if (b == true) protected.realSelectRow(row, shiftPressed, ctrlPressed, notifyCallback);
                });
            } else protected.realSelectRow(row, shiftPressed, ctrlPressed, notifyCallback);
        }

        
        public.setSelectedRow = function(row){
            if (protected.selectedRow != null){
                protected.selectedRow.setSelected(false);
            }
            protected.selectedRow = row;
            if (row != null){ row.setSelected(true);
                
                protected.selectedItem = row.getData();
            } else {

                protected.selectedItem = null;
            }
        }
        
        
        public.checkedItem = function(row, check){
            
        }
        
        public.checkedAllItems = function(check){
            
        }
        
        public.getSelectedItems = function(){
            return protected.selection.items;
        }
        
        public.rowDoubleClick = function(row){
            if (protected.rowDoubleClick != null)
                protected.rowDoubleClick(row);
        }
        
        public.setOnRowDoubleClick = function(f){
            protected.rowDoubleClick = f;
        }
        
        public.setRowSelectListener = function(f){
            protected.rowSelectLister = f;
        }
        
        public.getSelectedRow = function(){
            return protected.selectedRow;
        }
        public.getSelectedItem= function(){
            return protected.selectedItem;
        }
        
        public.setSelectItemListener = function(f){
            protected.selectItemListener = f;
        }
        
        public.addFooter = function(view){
            if (view.constructor == String)
                view = New(view);
                        
            view.setRelativeRect({left: 0, bottom: protected.footerOffset, right: 0});
            protected.footerOffset += parseInt(view.getHeight());
            protected.gridHost.setRelativeRect({ bottom : protected.footerOffset+1 });
            public.add(view);
            protected.footers.push(view);
        }
           
        public.selectFirst = function(){
            var row = protected.rows[0];
                public.selectRow(row);
        }   


        public.copyToClipboard = function(){
             var text = "";
            
        }



        /*
        *
        *       Movimento de Arrasto
        * *
        */
        
        if (window.MxUI == null)
            window.MxUI = New("frison.v1/ui/Manager");
        public.onMouseOut(function(){

            if (protected.dragPressed == true){
                protected.dragPressed = false;
            } else {

            }
        })


        protected.element.onmouseup = function(){

            if (protected.dragging== false){
                if (protected.sameRowClick != null){
                    protected.resetSelection();
                    public.selectRow(protected.sameRowClick, false, false);
                }
            }
            protected.dragging = false;
            protected.dragPressed = false;



        }

        public.onMouseDown(function(e){

            protected.dragPressed  = true;
            protected.lastClick = e;

        });
        
        protected.element.onmousemove = 
        function(e){
            if (protected.dragPressed == true){
                
                if ( (e.clientX > protected.lastClick.clientX + 12 || e.clientX < protected.lastClick.clientX - 12)
                 ||  (e.clientY > protected.lastClick.clientY + 12 || e.clientY << protected.lastClick.clientY - 12)){
                    console.warn("DRAGGING");
                    protected.dragging = true;
                    protected.dragPressed = false;

                    var row = protected.selectedRow.clone();
                    if (protected.selection.count > 1){
                        var txt = row.add(New(UI.Text, { BackgroundColor : "red", FontColor : "white", FontWeight : "bold" , FontSize: 12, Float : "right", BorderRadius: 6, Padding: 4}))
                        txt.setText(protected.selection.count+1);
                    }
                    row.setBackgroundColor("white");
                    row.setBorder({width: 1, color : "#000000"});
                    row.setShadow({left: 2, top: 2, size: 6, color : "rgba(0,0,0,0.6)"});
                    row.setOpacity(0.8);
                    var r = protected.selectedRow.getDOMElement().getBoundingClientRect();
                    var x =  r.left - protected.lastClick.clientX;

                    MxUI.drag(row, { x: x, y: -12});
                } 
                //console.log(e);
            } else {

            }
        }
        

       // public.setTools(protected.toolBar);   
        
       // var buttons = protected.toolbar.addDefaultUIButtons();
        //protected.loader = buttons.loader;
        /*
        protected.loader = protected.toolBar.addSimpleButton({Image : "docui_01/smlst.gif", Float : "left", MarginRight: 5, BorderRight: {width: 1, color : "#909090"}});
 
        protected.toolBar.addSimpleButton({Icon : "export"});
        protected.toolBar.addSimpleButton({Icon : "print"});
        protected.toolBar.addSimpleButton({Icon : "new", Float : "left"});
        var remove = protected.toolBar.addSimpleButton({Icon : "remove", Float : "left"});*/
        //protected.toolBar.setUIManager(public);
        
       /* remove.onMouseDown(function(){
            var dlg = New("frison.v0/autosig/dialogs/questionDlg", {Text : "Deseja realmente remover este fornecedor?"});
            public.showDialog(dlg);
            dlg.setListener(function(b){
                if (b == true) alert("VAI REMOVER");
                else alert("Não removido");
            });
        });*/
        
        /*public.setEnabledToolButtons = function(d){
            //protected.toolBar  = New("docui/01/smallToolBar");
            protected.toolbar = New("docui/01/smallToolBar", {UIManager: public});
            var buttons = protected.toolbar.addDefaultUIButtons();
            public.addFooter(protected.toolbar);
            protected.toolbar.setActionListener(function(act, btn){
                if (act == "print") {
                    var printView = New("docui/01/UIPrintView");
                    printView.show(function(doc){
                        public.printTo(doc);
                    });
                } else if (act == "remove"){
                    protected.removeSingleItem();
                } else if (act == "export"){
                    alert("Exportando dados");
                    var doc = New("xls/document");
                    
                } else if (act == "new"){
                    if (protected.createListener != null)
                        protected.createListener(function(data){
                            alert("RETORNOU INFORMAÇÔES");
                        });
                }
            });
            
            if (d == null || d.constructor == null || d.constructor != Object) return;
            
            if (d.remove != null){
                if (d.remove.Text != null)
                    protected.removeSingleItemText = d.remove.Text;
                if (d.remove.uri != null)
                    protected.removeSingleItemUri = d.remove.uri;
                if (d.remove.binding != null)
                    protected.removeItemBinding = d.remove.binding;
            }
            
            if (d.create != null){
                protected.createListener = d.create.listener;
            }
            
        }*/
        
        public.showDialog = function(view){
            view.setUIManager(public);
            view.setRelativeRect({left:0, bottom:  protected.footerOffset+1, right: 0});
            DOCUI_01.anims.fadeIn.play(view,300);
            public.add(view);
        }
        
        public.closeDialog = function(view){
            DOCUI_01.anims.fadeOut.play(view,300, function(){
                public.remove(view);
            });
        }
        
        
        /////////////////////////////////////////
        
        public.printTo = function(doc){
            doc.setFontSize(12);    
            doc.text(20,20, "Teste de Impressão em PDF ");
            
            doc.setProperties({
                title: 'PDF Title',
                subject: 'This is the subject',     
                author: 'Ravishanker Kusuma',
                keywords: 'pdf, javascript,geenerated',
                creator: 'KRS'
            });
        }
        
        protected.removeSingleItem = function(){
                
            var row = protected.selectedRow;
            if (row == null) return;
            row = row.getData();
            if (row == null) return;
            if (protected.removeItemBinding != null )
                row = row[protected.removeItemBinding];
            else row = row.id;
            
             var uibox = New("frison.v0/autosig/dialogs/questionDlg");
             if (protected.removeSingleItemText == null)
                 uibox.setText("Deseja realmente remover este Item?");
             else 
                 uibox.setText(protected.removeSingleItemText);
             
             uibox.setListener(function(b, dlg){
                if (b == true){
                    if (protected.removeSinleItemListener != null){
                        protected.removeSinleItemListener(protected.selectedRow.getData());
                        return;
                    }
                        
                    Autosig.delete(protected.removeSingleItemUri+"/"+row, function(err, result){

                    });
                }
                public.closeDialog(dlg); 
             });
             public.showDialog(uibox);
        }
        
        //////////\
        
        public.setHeaderBackgroundBrush = function(bg){
            protected.headerHost.setBackgroundBrush(bg);
        }
        
        public.setHeaderBackgroundColor = function(bg){
            protected.headerHost.setBackgroundBrush(null);
            protected.headerHost.setBackgroundColor(bg);
        }
    }
    
}


////
Table;
