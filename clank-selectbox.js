/*
//
/// Clank Selectbox
/// version 0.1  */

(function(){ 'use strict';
  
  /*
  //
  /// Definition */
  
  angular.module('clankSelectbox', [])
    .directive('clankSelectbox', function(){
      
      
    	/*
      //
      /// Functions */
    	
    	function Bind_Offclick_Event(clank_selectbox){
      	      	
      	var page_wrapper = (clank_selectbox === null) ? 'body':clank_selectbox.page_selector;
      	
      	/// Detects when a user clicks off of the selectbox and disables it
      	angular.element(page_wrapper).on('click', function(e){
        	
        	
        	/// Ignore the click unless the selectbox is open
          if(clank_selectbox.custom_select.getAttribute('dropdown') === 'closed') return;
          
          
          /// Find the target
        	var target = e.target.className; 
          
          
          /// Check if they clicked on the select box        	          	          	          	        
        	if(target.indexOf(clank_selectbox.module_classname) === -1){ 
            Toggle_List(clank_selectbox);          	
        	}
      	});      	
    	}
    	
    	function Bind_Dropdown_Open_Event(clank_selectbox){
      	
      	/// If label is set to be clickable bind the list toggle to it
      	if(clank_selectbox.label_clickable){
        	angular.element(clank_selectbox.label).on('click', function(e){          	
          	Toggle_List(clank_selectbox);          	
        	});        	
      	}
      	

      	/// If the button is not disabled, then bind the list toggle event
      	if(!clank_selectbox.button_disabled){
        	angular.element(clank_selectbox.button).on('click', function(e){          	
          	Toggle_List(clank_selectbox);          	
        	});   	        	
      	}
    	}
    	
    	function Toggle_List(clank_selectbox){
        
        
        /// Prevent double clicks
        if(!clank_selectbox.functionality_enabled) return;           
        clank_selectbox.functionality_enabled = false;
        setTimeout(function(e){ clank_selectbox.functionality_enabled = true; }, clank_selectbox.functionality_delay);
        
        
      	/// Toggle the dropdown's status
      	if(clank_selectbox.custom_select.getAttribute('dropdown') === 'closed') clank_selectbox.custom_select.setAttribute('dropdown','opened');
      	else clank_selectbox.custom_select.setAttribute('dropdown','closed');
    	}    	
    	
    	function Bind_Select_New_Item_Event(clank_selectbox, elem){
      	
      	
      	/// Click on item in the dropdown
      	angular.element(clank_selectbox.list).children().on('click', function(e){
        	
        	
        	/// Do not do anything if selected item is already selected
        	if(angular.element(this)[0].hasAttribute('selected')) return; 
        	
        	
        	/// Disable currently selected
        	//angular.element('.'+clank_selectbox.module_classname+'--item[selected]')[0].removeAttribute('selected');
        	angular.element(this).siblings('[selected]')[0].removeAttribute('selected');
        	
        	/// Update label
        	clank_selectbox.label.innerHTML = this.innerHTML;          	
        	
        	
        	/// Set this as selected
        	this.setAttribute('selected', '');
        	
        	
        	/// Close list
        	Toggle_List(clank_selectbox);          	          
        	
        	          	
        	/// Get the key for this item
        	var key = this.getAttribute('key');
        	
        	
        	/// Update the <select> element
          Update_Select_Element(elem, key);         	        	      
      	});      	
    	}
    	
    	function Update_Select_Element(elem, key){
      	      	
      	
        /// Variables
        var option_value = '';
      	
      	
      	/// Update the <select> element
      	elem.children().each(function(e){            	
        	
        	
        	/// Unselect the currently selected item
        	if(this.hasAttribute('selected')) this.removeAttribute('selected');
        	
        	
        	/// If the item has the selected key
        	if(this.value === key){
          	
          	
          	/// Applies the selected attribute to the option
          	this.setAttribute('selected','');
          	
          	
          	/// Updates the value of the select element
          	elem[0].value = key;
        	}
      	});      	      	      	      	   	      	
    	}
    	
    	function Set_Module_Classname(attrs){
      	  
      	  
      	  /// Check whether a custom classname was set or not
          var classname = (attrs.clankSelectbox === '') ? 'clank_select' : attrs.clankSelectbox;
          
          
          /// Remove any spaces and replace them with underscores from the module_classname
          classname = classname.replace(/\s/g, '_');   
          
          
          return classname;
    	}
    	
    	function Create_Custom_Select(scope, elem, clank_selectbox){
        
        
      	/// Variables
      	var container = document.createElement('clank-selectbox'),
      	    list = document.createElement('ul'),
      	    label = document.createElement('label'),
      	    button = (clank_selectbox.button_disabled) ? null:document.createElement('button'),
      	    options = elem.children();
                        
        
        /// Set attributes for the clank-selectbox element  
      	container.className = clank_selectbox.module_classname;
      	container.setAttribute('dropdown', 'closed');
      	
      	
      	/// Set attributes for list element
      	list.className = clank_selectbox.module_classname+'--list';
      	list.setAttribute('id', clank_selectbox.module_classname+'--list');
      	
      	
      	/// Set the attributes for the label element
      	label.className = clank_selectbox.module_classname+'--label';
      	label.setAttribute('id', clank_selectbox.module_classname+'--label');      	      	
      	
      	
      	/// If the button exist set the attributes
      	if(button != null){
        	button.setAttribute('type', 'button');
        	button.className = clank_selectbox.module_classname+'--button';     	        	        	
        	
        	if(clank_selectbox.button_text !== null) button.innerHTML = clank_selectbox.button_text;
        	else button.innerHTML = 'Open';
      	}
      	
      	
      	/// Create each option
      	options.each(function(e){
                    	          	
        	/// Create new item          	
        	var li = document.createElement('li');
        	li.className = clank_selectbox.module_classname+'--item';
        	li.innerHTML = this.innerHTML;
        	li.setAttribute('key', this.value);
        	
        	
          /// Set initial values          	
        	if(e === 0){
          	label.innerHTML = this.innerHTML;
          	li.setAttribute('selected', '');
        	}           	
        	
        	
        	/// Add options to list
        	list.appendChild(li);         	  	
      	});
      	        	
      	
      	/// Add clank_select to form
      	container.appendChild(label);
      	container.appendChild(list);
      	if(button != null) container.appendChild(button);
      	angular.element(container).insertBefore(elem);             	        	
      	
      	
      	/// Hide the <select> element
      	elem[0].setAttribute('hidden', '');
      	
      	
      	return container;   	        	        	        	
    	} 


    	
    	
    	/*
      //
      /// Return */
      
      return{
        restrict:'A',
        link:function(scope, elem, attrs){

      	  
        	/*
          //
          /// Variables */
          
          var clank_selectbox = {
            custom_select: null,
            label: null,
            button: null,
            functionality_enabled: true,
            functionality_delay: 500,
            module_classname: Set_Module_Classname(attrs),
            label_clickable: ('clankSelectboxLabelClickable' in attrs) ? true:false,
            button_disabled: ('clankSelectboxDisableButton' in attrs) ? true:false,
            button_text: ('clankSelectboxButtonText' in attrs) ? attrs.clankSelectboxButtonText:null,
            page_selector: ('clankSelectboxPageSelector' in attrs) ? attrs.clankSelectboxPageSelector:null
          };
          

          
          /*
          //
          /// Run */
          
          /// Create the custom selectbox
        	clank_selectbox.custom_select = Create_Custom_Select(scope, elem, clank_selectbox);
        	
        	
        	/// Cache the children elements
        	clank_selectbox.label = clank_selectbox.custom_select.querySelector('#'+clank_selectbox.module_classname+'--label');
        	clank_selectbox.list = clank_selectbox.custom_select.querySelector('#'+clank_selectbox.module_classname+'--list');
        	clank_selectbox.button = clank_selectbox.custom_select.querySelector('.'+clank_selectbox.module_classname+'--button');
        	        	

        	/// Creates the click event for selecting a new item
          Bind_Select_New_Item_Event(clank_selectbox, elem);   
          
          
        	/// Binds the click events for opening/closing the dropdown
          Bind_Dropdown_Open_Event(clank_selectbox);
        	
        	
          /// Creates the click event for clicking off of the dropdown and closing it
        	Bind_Offclick_Event(clank_selectbox);                     	      	            	           	    
        }
      };
    });    
})();

