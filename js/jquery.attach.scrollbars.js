(function($) {
	
	window.scrollbars = [];
	
	var scrollbarsClass = function(ins,options){
		this._name = ($(ins).attr('id'))?$(ins).attr('id') : $(ins).attr('class').replace(/ /g,"_");
		this.pos = window.scrollbars.length;
		this._instance = ins;
		this.settings = options;
		this.methods = $.scrollbars.methods;
		this.dragger = {sHeight:'', iHeight:'', indice:'', percent:'',_instance:''};
		$.extend(this.settings,options); 
		return name;
	}
	
	$.scrollbars = {};
	$.scrollbars.settings = {
		update:function(){},
		goTo:['#top']
	};
	$.scrollbars.services = {}
	
	$.scrollbars.methods = {
		init : function(instance) {
			$(instance._instance).addClass('sq'+instance.settings.cols);
			
			instance.isObject = $('<div class="ui-container-scrollbars" id="ui-scrollbar-'+instance.pos+'"><a name="top-sbar-'+instance.pos+'"></div>');
			if($(instance._instance).prev().length > 0){
				$(instance._instance).prev().append(isObject);
			}else{
				$(instance._instance).parent().prepend(instance.isObject);
			}
			
			instance.isObject.append($(instance._instance));
			instance.isObject.append('<div class="ui-scrollbars ui-dgr-round" id="containment-wrapper"><div class="ui-sb-dragger ui-dgr-round"></div></div>')
			
			instance.dragger._container = instance.isObject;
			instance.dragger._parent = instance.isObject.find('.ui-scrollbars');
			instance.dragger._instance = instance.isObject.find('.ui-sb-dragger');
			
			instance.dragger._parent.css('overflow','hidden');
			
			var wScroll = instance.dragger._parent.css('width');
			$(instance._instance).parent().css('padding-right',wScroll);
			
			var updatedScroll = instance.methods.updateDragger(instance);
			
			instance.isObject.find('.ui-sb-dragger').css('height',updatedScroll.percent+'%');
			instance.isObject.find('.ui-sb-dragger').draggable({axis: "y", containment: "parent", scroll: false ,drag:function(e,ui){
					instance.methods.responseDrag(ui,instance);
			}});
			
		},
		responseDrag:function(ui,instance){
			var objectUpadted = instance.dragger;
			
			if(instance.dragger.iHeight != parseFloat($(instance.dragger._parent).innerHeight())){
				objectUpadted = instance.methods.updateDragger(instance);
			}
			ui.position.top += $(document).scrollTop();
			$(instance._instance).scrollTop(ui.position.top * instance.dragger.indice);
		},
		updateDragger:function(instance){
			instance.dragger.sHeight = parseFloat($(instance._instance)[0].scrollHeight) + 10;			
			instance.dragger.iHeight = parseFloat($(instance.dragger._parent).innerHeight());
			instance.dragger.indice = parseFloat(instance.dragger.sHeight/instance.dragger.iHeight);
			instance.dragger.percent = parseFloat(instance.dragger.iHeight*100)/instance.dragger.sHeight;
			
			$(instance.dragger._instance).css('height',instance.dragger.percent+'%');
			$(instance._instance).scrollTop(parseFloat($(instance.dragger._instance).css('top')) * instance.dragger.indice);
			
			var objectParam =  new Object();
			$.extend(objectParam, instance.dragger);
			
			instance.settings.update(instance);
			
			instance.dragger._parent.show();
			
			return objectParam;
		},
		jumpTop:function(instance){
			$(instance._instance).scrollTop(0);
			$(instance.dragger._instance).css('top',0);
		},
		hide:function(instance){
			$(instance.dragger._parent).hide();
		},
		show:function(instance){
			$(instance.dragger._parent).show();
		}
	};
	
	
	$.fn.scrollbars = function(options) {
	
		if(typeof options != 'string'){
			var instOptions = $.extend({},$.scrollbars.settings,options);
			return this.each(function () {
				var instance = new scrollbarsClass($(this), instOptions);
				window.scrollbars.push(instance);
				instance.methods.init(instance);
			});
		}else if(typeof options === 'object'){
			return $.scrollbars.methods.init.apply(this, arguments);
		}else if(typeof options == 'string'){
			
			var instance = this;
			
			$.each(window.scrollbars,function(item,value){
				var id  = $(this).attr('id');
				if(id == value.name){
					instance = value;	
				}
			})
			return instance.methods[options].apply(this, [instance]);
		}else{
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
		
	};
})(jQuery);

var attachScrollbars = (function() {
});
window.attachScrollbars = window.$attachScrollbars = attachScrollbars;