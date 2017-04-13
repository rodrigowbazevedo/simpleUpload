(function(scope, $){

	var simpleUpload      = [],
		simpleUploadCount = 0;

	$.fn.simpleUpload = function(options){

		var def = {
			url          : null,
			change       : null,
			error        : null,
			types        : null,
			fields       : null,
			size         : 5120
		};

		return this.each(function(){

			var $this = $(this),
				id    = ++simpleUploadCount;

			$this.data('simpleUpload', id);

			options = options || {};

			$.each( $this.data(), function(name, value){
				if('simpleUpload' == name) return;
				options[name] = (typeof window[value] == 'function')? window[value] : value;
			});

			var params = $.extend({}, def, options);

			if(typeof params.change == 'function') $this.change(function(){
				params.change($this[0].files);
			});

			if(params.trigger){
				if(params.trigger instanceof jQuery){
					params.trigger.click(send);
				}else{
					$(document).on('click', params.trigger, send);
				}
			}else{
				$this.change(send);
			}

			simpleUpload[id] = params;

			function send(event){
				event.preventDefault();
				$this.simpleUploadSend();
			}

		});

	};

	$.fn.simpleUploadSend = function(fields){
		return this.each(function(){
			var $this = $(this),
				id    = $this.data('simpleUpload'),
				name  = $this.attr('name'),
				data  = new FormData();

			params = simpleUpload[id];

			for(var i in $this[0].files){
				if(typeof $this[0].files[i] == 'object'){

					var file = $this[0].files[i];
					if(!$.typeCheck(file.name, params.types)){
						if(typeof params.error == 'function') params.error({ type: 'fileType' });
						$this.val('');
						return false;
					}

					if((file.size/params.size) > params.size){
						if(typeof params.error == 'function') params.error({ type:'size' });
						$this.val('');
						return false;
					}

					data.append(name+'['+i+']', file);
				}
			}

			if(typeof params.fields == 'object'){
				for( i in params.fields){
					if($.isArray(params.fields[i])){
						for(var k in params.fields[i]) data.append(i+'['+k+']', params.fields[i][k]);
					}else{
						data.append(i, params.fields[i]);
					}
				}
			}

			var ajax = {
				url         : params.url,
				data        : data,
				cache       : false,
				contentType : false,
				processData : false,
				type        : 'POST',
				complete: function(){
					$this.val('');
					if(params.complete) params.complete(arguments);
				}
			};

			if(params.error != null ) ajax.error         = params.error;
			if(params.success)        ajax.success       = params.success;
			if(params.async)          ajax.async         = params.async;
			if(params.beforeSend)     ajax.beforeSend    = params.beforeSend;
			if(params.global)         ajax.global        = params.global;
			if(params.dataType)       ajax.dataType      = params.dataType;
			if(params.contents)       ajax.contents      = params.contents;
			if(params.jsonp)          ajax.jsonp         = params.jsonp;
			if(params.jsonpCallback)  ajax.jsonpCallback = params.jsonpCallback;
			if(params.password)       ajax.password      = params.password;
			if(params.username)       ajax.username      = params.username;
			if(params.statusCode)     ajax.statusCode    = params.statusCode;

			$.ajax(ajax);

		});
	};

	$.extend(true, {
		typeCheck: function(name, types){
			if($.isArray(types)){
				if(types.indexOf($.getExt(name)) > -1) return true;
				return false;
			}
			return true;
		},
		getExt: function(name){
			return name.substr(name.lastIndexOf(".") + 1).toLowerCase();
		}
	});

})(window, window.jQuery);