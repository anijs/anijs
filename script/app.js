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

		//Para cada nodo
		var size  = aniJSNodeCollection.length,
		    i = 0;
		
		for ( i; i < size; i++) {
			item = aniJSNodeCollection[i];
			
			//Le parseo su declaracion
			//IMPROVE: Debe venir por configuracion
			aniJSParsedSentenceCollection = instance._getParsedAniJSSentenceCollection(item.getAttribute('data-anijs'));
			
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
		var definition,
			when = aniJSParsedSentence.when || 'click',
			how = aniJSParsedSentence.how || '',
			what = aniJSParsedSentence.what || element;


		var when = instance._whenHelper(element, aniJSParsedSentence),
			whereList = instance._whereHelper(element, aniJSParsedSentence);
			// what = '',
			// how = '',
			// after = '',
			// helper = '';

		how += ' animated';

		//Es obligatorio definir de where ATTR
		if(when !== ''){

			var size  = whereList.length,
			    i = 0;
			
			for ( i; i < size; i++) {
				whereItem = whereList[i];

				console.log(whereItem);

				whereItem.addEventListener(when, function(event){

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
		}

	}

	/**
	 * Helper to setup the Event that trigger the animation from declaration
	 * 	There 4 basics events:
	 * 	 - input     (click, mouseover, mouseout)
	 *   - browser   (onload)
	 *   - instance  (attrChange)
	 *   - complex	 ()
	 *   
	 *   - default    none
	 *   
	 * @method _whenHelper
	 * @param {} element
	 * @param {} aniJSParsedSentence
	 * @return 
	 */
	instance._whenHelper = function (element, aniJSParsedSentence) {
		var defaultValue = '',
			when = aniJSParsedSentence.when || defaultValue;

		return when;
	}

	/**
	 * Helper to setup the Place from listen the trigger event of the animation
	 * If is not specified one place, se asume que es himself
	 * Take in account that where it's just a selector
	 * @method _whereHelper
	 * @param {} element
	 * @param {} aniJSParsedSentence
	 * @return NodeList
	 */
	instance._whereHelper = function (element, aniJSParsedSentence) {
		var defaultValue = element,
			whereNodeList = [defaultValue],
			rootNode = instance.rootNode;

		//TODO: Cambiar el where por when o parsear ambas

		if(aniJSParsedSentence.where) {
			if (aniJSParsedSentence.where === 'document'){
				whereNodeList = [document];
			} else if(aniJSParsedSentence.where === 'window'){
				whereNodeList = [window];
			}else {
				whereNodeList = rootNode.querySelectorAll( aniJSParsedSentence.where );
			}
			
		}
		//TODO: Para el tema de los eventos onload del DOM hay que meter furrumaya
		//Puede ser crear un evento uno mismo
		return whereNodeList;
	}

	instance._whatHelper = function (element, aniJSParsedSentence) {
		var defaultValue = element,
			whatNodeList = [defaultValue],
			rootNode = instance.rootNode;

		if(aniJSParsedSentence.what) {
			whereNodeList = rootNode.querySelectorAll( aniJSParsedSentence.where );
		}
		return whatNodeList;
	}

	instance._afterHelper = function (element, aniJSParsedSentence) {

	}

	instance._helperHelper = function (element, aniJSParsedSentence) {

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
