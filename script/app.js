var AniJS = ( function(config){
	var instance = this;

	instance.initializer = function(){

		//ATTRS inicialization
		instance.helperCollection = config.helperCollection || [];

		var rootNodeSelector = config.rootNodeSelector || 'body'; 
		instance.rootNode = document.querySelector( rootNodeSelector );

		instance.Parser = instance._createParser();

		//instance.animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		
		//TODO: Ver como saber cual es el apropiado de acuerdo al browser?
		instance.animationEndEvent = 'webkitAnimationEnd';
	}

	instance._createParser = function(){
		return new Parser();
	}

	instance.run = function(){
		var aniJSNodeCollection = [],
			aniJSParsedSentenceCollection = {};

		aniJSNodeCollection = instance._findAniJSNodeCollection(instance.rootNode);
		console.log(aniJSNodeCollection);

		//Para cada nodo
		var size  = aniJSNodeCollection.length,
		    i = 0;
		
		for ( i; i < size; i++) {
			item = aniJSNodeCollection[i];
			console.log(item.getAttribute('data-anijs'));
			
			//Le parseo su declaracion
			//IMPROVE: Debe venir por configuracion
			aniJSParsedSentenceCollection = instance._getParsedAniJSSentenceCollection(item.getAttribute('data-anijs'));
			console.log(aniJSParsedSentenceCollection);
			
			//Le seteo su animacion
			instance._setupElementAnim(item, aniJSParsedSentenceCollection);
		}

	}

	instance._setupElementAnim = function (element, aniJSParsedSentenceCollection) {
		var size  = aniJSParsedSentenceCollection.length,
		    i = 0;
		
		//Para cada una de las sentencias que componen la collecion
		for ( i; i < size; i++) {
			item = aniJSParsedSentenceCollection[i];
			instance._setupElementSentenceAnim(element, item);
		}
	}

	instance._setupElementSentenceAnim = function (element, aniJSParsedSentence) {
		console.log('_setupElementSentenceAnim');
		console.log(aniJSParsedSentence);
		var definition,
			when = aniJSParsedSentence.when || 'click',
			how = aniJSParsedSentence.how || '',
			what = aniJSParsedSentence.what || element;


		how += ' animated';

		element.addEventListener(when, function(event){

			NodeHelper.addClass(element, how);

		 	// create event
		    element.addEventListener(instance.animationEndEvent, function(e) {
		        console.log('Se ejecuta el callback');

		        // remove event
		        e.target.removeEventListener(e.type, arguments.callee);

		        NodeHelper.removeClass(element, how);
		        // call handler
		        //return callback(e);
		    });


		}, false); 

	}


	instance._getParsedAniJSSentenceCollection = function(stringDeclaration){

		return instance.Parser.parse(stringDeclaration);
	
	}

	instance._findAniJSNodeCollection = function(rootNode){
		//IMPROVE: Might a configuration option
		var aniJSDataTagName = "[data-anijs]"

		return rootNode.querySelectorAll( aniJSDataTagName );
	} 

	instance._registerHelper = function(){

	}

	//Parser Class
	var Parser = ( function(){

		var parserInstance = this;

		parserInstance.parse = function(aniJSDeclaration){

			return parserInstance._parseDeclaration(aniJSDeclaration);

		}

		//Declaration = (Sentence)*
		//Ejemp "when: click, how: bounceOutLeft; when: hover, how: bounceIn"
		parserInstance._parseDeclaration = function(declaration){
			var parsedDeclaration = [],
				sentenceCollection,
				parsedSentence;

			sentenceCollection = declaration.split(';');

			var size  = sentenceCollection.length,
			    i = 0;
			
			for ( i; i < size; i++) {
				parsedSentence = parserInstance._parseSentence(sentenceCollection[i]);
				parsedDeclaration.push(parsedSentence);
			}

			return parsedDeclaration;
		}

		//Sentence = Event | Behavior | Target
		//Ejemp "when: click, how: bounceOutLeft"
		parserInstance._parseSentence = function(sentence){
			var parsedSentence = {},
				definitionCollection,
				parsedDefinition;

			definitionCollection = sentence.split(',');

			var size  = definitionCollection.length,
			    i = 0;
			
			for ( i; i < size; i++) {
			  	parsedDefinition = parserInstance._parseDefinition(definitionCollection[i]);
				parsedSentence[parsedDefinition.key] = parsedDefinition.value;
			}

			return parsedSentence;
		},

		parserInstance._parseDefinition = function(definition){
			var parsedDefinition = {},
				definitionBody,
				definitionKey,
				definitionValue;

			definitionBody = definition.split(':');

			if(definitionBody.length > 1){
				definitionKey = definitionBody[0].trim();
				definitionValue = definitionBody[1].trim();
				parsedDefinition.key = definitionKey;
				parsedDefinition.value = definitionValue;
			}

			return parsedDefinition;
		}
	} );

	//Node Helper
	var NodeHelper = {

		addClass: function(elem, string) {
		  if (!(string instanceof Array)) {
		    string = string.split(' ');
		  }
		  for(var i = 0, len = string.length; i < len; ++i) {
		    if (string[i] && !new RegExp('(\\s+|^)' + string[i] + '(\\s+|$)').test(elem.className)) {
		      elem.className = elem.className.trim() + ' ' + string[i];
		    }
		  }
		},

		removeClass: function(elem, string) {
		  if (!(string instanceof Array)) {
		    string = string.split(' ');
		  }
		  for(var i = 0, len = string.length; i < len; ++i) {
		    elem.className = elem.className.replace(new RegExp('(\\s+|^)' + string[i] + '(\\s+|$)'), ' ').trim();
		  }
		},

		toggleClass: function(elem, string) {
		  if (string) {
		    if (new RegExp('(\\s+|^)' + string + '(\\s+|$)').test(elem.className)) {
		      elem.className = elem.className.replace(new RegExp('(\\s+|^)' + string + '(\\s+|$)'), ' ').trim();
		    } else {
		      elem.className = elem.className.trim() + ' ' + string;
		    }
		  }
		},

		hasClass: function(elem, string) {
		  return string && new RegExp('(\\s+|^)' + string + '(\\s+|$)').test(elem.className);
		}
	}


	instance.initializer();
	
} );

AniJS.setupParser = function(){

}

var MyAniJS = new AniJS({});

MyAniJS.run();
