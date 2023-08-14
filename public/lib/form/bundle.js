

window.Form = Class.forName("form/handler");


Form.Handler = Class.forName("form/handler");

Form.CpfCnpj = Class.forName("form/cpfCnpj");
Form.Name = Class.forName("form/name");
Form.Money = Class.forName("form/money");
Form.Telefone = Class.forName("form/telefone");

Form.Check = Class.forName("form/check");
Form.Text = Class.forName("form/text");
Form.Table = Class.forName("form/table");
Form.Combo = Class.forName("form/combo");
Form.List = Class.forName("form/list");
Form.Password = Class.forName("form/password");
Form.Date = Class.forName("form/date");
Form.DateField = Class.forName("form/dateField");
Form.Popup = Class.forName("form/popup");
Form.PopupButton = Class.forName("form/popupButton");
Form.Submit = Class.forName("form/submit");
Form.MultilineText = Class.forName("form/multilineText");
Form.SimpleCombo = Class.forName("form/simpleCombo");
Form.SimpleButton = Class.forName("form/simpleButton");
Form.GlyphButton = Class.forName("form/glyphButton");
Form.Tabs = Class.forName("form/tabs")
Form.ToolButton = Class.forName("form/toolButton");
Form.SimpleTable = Form.Table;
Form.FileInput = Class.forName("form/fileInput");
Form.Button = Class.forName("form/button");

Form.Autocomplete = Class.forName("form/autocomplete");
Form.AutocompleteCombo = Class.forName("form/autocompleteCombo");


Class.register("form/handler", Form);
Class.register("form/cpfCnpj", Form.CpfCnpj);
Class.register("form/check", Form.Check);
Class.register("form/text", Form.Text);
Class.register("form/combo", Form.Combo);
Class.register("form/list", Form.List);
Class.register("form/password", Form.Password);
Class.register("form/submit", Form.Submit);
Class.register("form/simpleCombo", Form.SimpleCombo);
Class.register("form/multilineText", Form.MultilineText);
Class.register("form/fileInput", Form.FileInput);
Class.register("form/button", Form.Button);
Class.register("form/simpleButton", Form.SimpleButton);
Class.register("form/table", Form.Table);
Class.register("form/tabs", Form.Tabs);
Class.register("form/toolButton", Form.ToolButton);
Class.register("form/popupButton", Form.PopupButton);
Class.register("form/popup", Form.Popup);
Class.register("form/dateField", Form.DateField);
Class.register("form/name", Form.Name);
Class.register("form/money", Form.Money)
Class.register("form/telefone", Form.Telefone)
Class.register("form/simpleTable", Form.SimpleTable);
Class.register("form/autocomplete", Form.Autocomplete);
Class.register("form/autocompleteCombo", Form.AutocompleteCombo);

window.Form = Form;


Class.load([ "form/monthYear","form/dateEdit", "form/smallDatePicker", "form/smallDatePicker/month", "form/smallDatePicker/year", "form/submit", "form/handler", "form/table", "form/datePicker/month", "form/datePicker/year", "form/datePicker/day", "form/datePicker", "form/date", "form/bigCheck", "form/glyphButton", "form/popup", "form/popupButton", "form/toolButton"]);


({
     
    

});
            
            