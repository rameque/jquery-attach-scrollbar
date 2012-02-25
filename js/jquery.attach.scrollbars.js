(function($) {
	
	window.scrollbars = [];
	
	var scrollbarsClass = function(ins,options){
		this._name = ($(ins).attr('id'))?$(ins).attr('id') : $(ins).attr('class').replace(/ /g,"_");
		

		this._instance = ins;
		this.settings = options;
		this.methods = $.scrollbars.methods;
		this.dragger = {sHeight:'', iHeight:'', indice:'', percent:'',_instance:''};
		this.position = window.scrollbars.length;

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

			$(instance._instance).addClass('scrollbars-'+instance.position);
			$(instance._instance).wrap('<div class="ui-container-scrollbars" id="ui-scrollbar-'+instance.position+'"/>');
			$(instance._instance).prepend('<a name="top-sbar-'+instance.position+'"></a>');
			$(instance._instance).prepend('<div class="ui-scrollbars ui-dgr-round" id="containment-wrapper"><div class="ui-sb-dragger ui-dgr-round"></div></div>');
			
			instance.isObject = $('#ui-scrollbar-'+instance.position);

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
			
			
			instance.isObject.mouseenter(function(){
				instance.methods.updateDragger(instance);
			}).mouseleave(function(){
				instance.methods.updateDragger(instance);
			});

			window.scrollbars.push(instance);

		},
		responseDrag:function(ui,instance){
			var objectUpadted = instance.dragger;
			ui.position.top += $(document).scrollTop();
			$(instance._instance).scrollTop(ui.position.top * instance.dragger.indice);
		},
		updateDragger:function(instance){
			$(instance.dragger._instance).parent().hide();
			
			instance.dragger.sHeight = parseFloat($(instance._instance)[0].scrollHeight);			
			instance.dragger.iHeight = parseFloat($(instance.dragger._parent).height());
			instance.dragger.indice = parseFloat(instance.dragger.sHeight/instance.dragger.iHeight);
			instance.dragger.percent = Math.round(parseFloat(instance.dragger.iHeight*100)/instance.dragger.sHeight);
			
			$(instance.dragger._instance).css('height',instance.dragger.percent+'%');
			$(instance._instance).scrollTop(parseFloat($(instance.dragger._instance).css('top')) * instance.dragger.indice);
			
			if(instance.dragger.percent < 100){
				$(instance.dragger._instance).parent().show();
			}
			
			var objectParam =  new Object();
			$.extend(objectParam, instance.dragger);
			
			instance.settings.update(instance);
			
			return objectParam;
		},
		jumpTop:function(instance){
			$(instance._instance).scrollTop(0);
			$(instance.dragger._instance).css('top',0);
		},
		hideScroll:function(instance){
			$(instance.dragger._parent).hide();
		},
		showScroll:function(instance){
			$(instance.dragger._parent).show();
		}
	};
	
	
	$.fn.scrollbars = function(options) {
	
		var __instance = this;
		
		__instance.existScrollbars = function(){
			var $this = $(__instance);
			var instance = $this;
			$.each(window.scrollbars,function(item,value){
				var id  = ($this.attr('id'))?$this.attr('id') : $this.attr('class').replace(/ /g,"_");
				if(id == value._name){
					instance = value;	
				}
			});
			return instance;
		};
	
		if(typeof options != 'string'){
			var instOptions = $.extend({},$.scrollbars.settings,options);
			var instance = this;
			
			return this.each(function () {
				var $this = $(this);
				if($this.attr('scrollbars') == 'created'){
					instance = __instance.existScrollbars();
					$.extend(instance.settings,options); 
				}else{
					instance = new scrollbarsClass(this, instOptions);
					$this.attr('scrollbars','created');
					instance.methods.init(instance);
				}
			});
		}else if(typeof options == 'string'){
			instance = __instance.existScrollbars();
			var objectParams = {};
			objectParams.instance = instance;
			objectParams.options = options;
			return instance.methods[options].apply(instance, [instance]);
		}else{
			$.error('Method ' + method + ' does not exist on jQuery.scrollbars');
		}
		
		return false;
		
	};
})(jQuery);

var attachScrollbars = (function() {});
window.attachScrollbars = window.$attachScrollbars = attachScrollbars;