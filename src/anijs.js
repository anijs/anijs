/**
* AniJS is library for write declarative animations in your static html documents
* @class AniJS
* @constructor initializer
* @author @dariel_noel 
*/
var AniJSLib = function(){
	
	var instance = this,
		ANIJS_DATATAG_NAME = 'data-anijs',
		DEFAULT = 'default',
		BODY = 'body';

	/**
	 * Initializer Function
	 * @method initializer
	 * @return 
	 */
	instance.initializer = function(){

		//ATTRS inicialization
		instance.helperCollection = {};

		//AniJS event Collection 
		//TODO: Encapsulate this in another class
		instance.eventCollection = {};
		instance.eventIdCounter = 0;

		//Registering an empty helper
		instance.registerHelper(DEFAULT, {}); 

		//Default Helper Index
		instance.helperDefaultIndex = DEFAULT;

		instance.setRootNode(BODY);
		
		//Initialize the Parser Object
		instance.Parser = instance._createParser();

		//AnimationEnd Correct Prefix Setup
		instance.animationEndEvent = instance._animationEndPrefix();
	}

	/**
	 * You can use these to change the escope to run AniJS
	 * @method setRootNode
	 * @param {} selector
	 * @return 
	 */
	instance.setRootNode = function(selector){
		instance.rootNode = document.querySelector( selector );
	}

	/**
	 * Return a Helper by ID, you can use this to attach callback to the Helper
	 * @method getHelper
	 * @param {} helperID
	 * @return LogicalExpression
	 */
	instance.getHelper = function(helperID) {
		var helperCollection = instance.helperCollection;
		return helperCollection[helperID] || helperCollection[DEFAULT];
	}

	/**
	 * Parse Declarations and setup Anim in a founded elements 
	 * @method run
	 * @return 
	 */
	instance.run = function(){
		var aniJSNodeCollection = [],
			aniJSParsedSentenceCollection = {};

		aniJSNodeCollection = instance._findAniJSNodeCollection(instance.rootNode);

		var size  = aniJSNodeCollection.length,
		    i = 0;
		
		for ( i; i < size; i++) {
			item = aniJSNodeCollection[i];

			//IMPROVE: The datatag name migth come from configuration 
			aniJSParsedSentenceCollection = instance._getParsedAniJSSentenceCollection(item.getAttribute(ANIJS_DATATAG_NAME));
			
			//Le seteo su animacion
			instance._setupElementAnim(item, aniJSParsedSentenceCollection);
		}
	}

	/**
	 * Create a Parser Instance
	 * @method _createParser
	 * @return NewExpression
	 */
	instance._createParser = function(){
		return new Parser();
	}

	instance.createAnimation = function(aniJSParsedSentenceCollection, element){
		var nodeElement = element || '';

		//BEAUTIFY: The params order migth be the same  
		instance._setupElementAnim(element, aniJSParsedSentenceCollection);
			
	}

	/**
	 * Setup the animation of the some element
	 * @method _setupElementAnim
	 * @param {} element
	 * @param {} aniJSParsedSentenceCollection
	 * @return 
	 */
	instance._setupElementAnim = function (element, aniJSParsedSentenceCollection) {
		var size  = aniJSParsedSentenceCollection.length,
		    i = 0;

		for ( i; i < size; i++) {
			item = aniJSParsedSentenceCollection[i];
			instance._setupElementSentenceAnim(element, item);
		}
	}

	/**
	 * Setup the element animation from a AniJS Sentence
	 * @method _setupElementSentenceAnim
	 * @param {} element
	 * @param {} aniJSParsedSentence
	 * @return 
	 */
	instance._setupElementSentenceAnim = function (element, aniJSParsedSentence) {
		var definition,
			when = instance._whenHelper(element, aniJSParsedSentence),
			whereList = instance._whereHelper(element, aniJSParsedSentence),
			whatList = instance._whatHelper(element, aniJSParsedSentence),
			how = instance._howHelper(element, aniJSParsedSentence),
			after = instance._afterHelper(element, aniJSParsedSentence),
			helper = instance._helperHelper(element, aniJSParsedSentence);

		how += ' animated';

		//Es obligatorio definir de where ATTR
		if(when !== ''){

			var size  = whereList.length,
			    i = 0;
			
			for ( i; i < size; i++) {
				whereItem = whereList[i];

				var listener =  function(event){
					//Para cada nodo target se le pone la animacion
					var whatListSize  = whatList.length,
					    j = 0;

					for ( j; j < whatListSize; j++) {
						whatListItem = whatList[j];

						NodeHelper.addClass(whatListItem, how);

					 	// create event
					    whatListItem.addEventListener(instance.animationEndEvent, function(e) {

					        // remove event
					        e.target.removeEventListener(e.type, arguments.callee);

					        //TODO: Could be necesary remove the class after animation finish?
					        //      maybe we can specify this by configuration option
					        NodeHelper.removeClass(e.target, how);

					        // callback handler
					        if (after) {
					        	var helperCollection = instance.helperCollection,
					        		helperInstance = helperCollection[helper];

					        	if (helperInstance && helperInstance[after]) {
					        		return helperInstance[after](e);
					        	}
					        }

					    });

					}
				}

				whereItem.addEventListener(when, listener, false);

				//Register event to feature handle
				instance.registerEventHandle(whereItem, when, listener);
		

			}
		}
	}

	/**
	 * Create a handle to remove the listener when purge it
	 * @method registerEventHandle
	 * @param {} element
	 * @param {} eventType
	 * @param {} listener
	 * @return 
	 */
	instance.registerEventHandle = function(element, eventType, listener){
		var aniJSEventID = element._aniJSEventID,
			eventCollection = instance.eventCollection,
			elementEventHandle = {
				eventType: eventType,
				listener: listener				
			};

		if(aniJSEventID){
			eventCollection[aniJSEventID].handleCollection.push(elementEventHandle);
		} else {
			var tempEventHandle = {
				handleCollection: [elementEventHandle]
			};

			eventCollection[++instance.eventIdCounter] = tempEventHandle;
			element._aniJSEventID = instance.eventIdCounter;
		}		
	}

	/**
	 * Detach all subscription of the selector Nodes
	 * @method purge
	 * @param {} selector
	 * @return 
	 */
	instance.purge = function (selector) {
		var purgeNodeCollection = document.querySelectorAll(selector),
			size  = purgeNodeCollection.length,
		    i = 0;
		
		for ( i; i < size; i++) {
			instance._purgeNode(purgeNodeCollection[i]);
		}
	}	

	/**
	 * Detach all AniJS subscriptions to this element
	 * @method _purgeNode
	 * @param {} element
	 * @return 
	 */
	instance._purgeNode = function (element) {
		var aniJSEventID = element._aniJSEventID,
			elementHandleCollection;

		if(aniJSEventID) {

			//Se le quitan todos los eventos a los que este suscrito
			elementHandleCollection = instance.eventCollection[aniJSEventID].handleCollection;

			var size  = elementHandleCollection.length,
			    i = 0;
			
			for ( i; i < size; i++) {
				item = elementHandleCollection[i];

				//Para cada handle
				element.removeEventListener(item.eventType, item.listener);
				
			}

			instance.eventCollection[aniJSEventID] = null;
			element._aniJSEventID = null;
		}
	}


	/**
	 * Helper to setup the Event that trigger the animation from declaration
	 * https://developer.mozilla.org/en-US/docs/Web/Reference/Events
	 * http://www.w3schools.com/tags/ref_eventattributes.asp
	 * @method _whenHelper
	 * @param {} element
	 * @param {} aniJSParsedSentence
	 * @return when
	 */
	instance._whenHelper = function (element, aniJSParsedSentence) {
		var defaultValue = '',
			when = aniJSParsedSentence.when || defaultValue;

		if(when === 'animationend'){
			when = instance._animationEndPrefix();
		}

		return when;
	}

	/**
	 * Helper to setup the Place from listen the trigger event of the animation
	 * If is not specified one place, se asume que es himself
	 * Take in account that where it's just a selector
	 * @method _whereHelper
	 * @param {} element
	 * @param {} aniJSParsedSentence
	 * @return whereNodeList
	 */
	instance._whereHelper = function (element, aniJSParsedSentence) {
		var defaultValue = element,
			whereNodeList = [defaultValue],
			rootNode = instance.rootNode;

		//TODO: In some context (where) reserved word is not descriptive as (who)
		//We parse 2 ? 

		//TODO: We could add other non direct DOM Objects
		if(aniJSParsedSentence.where) {
			if (aniJSParsedSentence.where === 'document'){
				whereNodeList = [document];
			} else if(aniJSParsedSentence.where === 'window'){
				whereNodeList = [window];
			}else {
				whereNodeList = rootNode.querySelectorAll( aniJSParsedSentence.where );
			}
			
		}
		return whereNodeList;
	}

	/**
	 * Helper to setup the Node can be animated
	 * @method _whatHelper
	 * @param {} element
	 * @param {} aniJSParsedSentence
	 * @return whatNodeList
	 */
	instance._whatHelper = function (element, aniJSParsedSentence) {
		var defaultValue = element,
			whatNodeList = [defaultValue],
			rootNode = instance.rootNode;

		if(aniJSParsedSentence.what) {
			whatNodeList = rootNode.querySelectorAll( aniJSParsedSentence.what );
		}
		return whatNodeList;
	}

	/**
	 * Helper to setup the Animation type 
	 * @method _howHelper
	 * @param {} element
	 * @param {} aniJSParsedSentence
	 * @return defaultValue
	 */
	instance._howHelper = function (element, aniJSParsedSentence) {
		var defaultValue = aniJSParsedSentence.how || '';
		return defaultValue;
	}

	/**
	 * Helper to setup the after callback function
	 * @method _afterHelper
	 * @param {} element
	 * @param {} aniJSParsedSentence
	 * @return defaultValue
	 */
	instance._afterHelper = function (element, aniJSParsedSentence) {
		var defaultValue = aniJSParsedSentence.after || '';
		return defaultValue;	
	}

	/**
	 * Helper to setup the helper of the animation
	 * @method _helperHelper
	 * @param {} element
	 * @param {} aniJSParsedSentence
	 * @return defaultValue
	 */
	instance._helperHelper = function (element, aniJSParsedSentence) {
		var defaultValue = aniJSParsedSentence.helper || instance.helperDefaultIndex;
		return defaultValue;
	}

	/**
	 * Parse an String Declaration
	 * @method _getParsedAniJSSentenceCollection
	 * @param {} stringDeclaration
	 * @return CallExpression
	 */
	instance._getParsedAniJSSentenceCollection = function(stringDeclaration){
		return instance.Parser.parse(stringDeclaration);
	}

	/**
	 * Select all DOM nodes that have a AniJS declaration
	 * @method _findAniJSNodeCollection
	 * @param {} rootNode
	 * @return CallExpression
	 */
	instance._findAniJSNodeCollection = function(rootNode){
		//IMPROVE: Might a configuration option
		var aniJSDataTagName = '[' + ANIJS_DATATAG_NAME + ']';
		return rootNode.querySelectorAll( aniJSDataTagName );
	} 

	/**
	 * A helper it's a callback function container
	 * using this function you can register your custom Helper
	 * @method registerHelper
	 * @param {} helperName
	 * @param {} helperInstance
	 * @return 
	 */
	instance.registerHelper = function(helperName, helperInstance){
		instance.helperCollection[helperName] = helperInstance; 
	}

	/**
	 * Return the correct AnimationEnd Prefix according to the current browser
	 * @method _animationEndPrefix
	 * @return 
	 */
	instance._animationEndPrefix = function(){
	    var el = document.createElement('fakeelement'),
	    	animationBrowserDetection = ['animation', 'OAnimation', 'MozAnimation', 'webkitAnimation'],
	    	animationEndBrowserPrefix = ['animationend', 'oAnimationEnd', 'animationend', 'webkitAnimationEnd'];

	    for (var i = 0; i < animationBrowserDetection.length; i++) {
	        if( el.style[animationBrowserDetection[i]] !== undefined ){
	            return animationEndBrowserPrefix[i];
	        }
	    };
	}

	/**
	* Encapsulate the AnimJS sintax parser
	* @class Parser
	* @author @dariel_noel 
	*/
	var Parser = ( function(){

		var parserInstance = this;

		/**
		 * Parse a aniJSDeclaration
		 * @method parse
		 * @param {} aniJSDeclaration
		 * @return CallExpression
		 */
		parserInstance.parse = function(aniJSDeclaration){
			return parserInstance._parseDeclaration(aniJSDeclaration);
		}

		/**
		 * Declaration parse
		 * 	Sintax: Declaration -> Sentence; | *
		 * 	Example: SentenceA; SentenceB
		 * @method _parseDeclaration
		 * @param {} declaration
		 * @return parsedDeclaration
		 */
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

		/**
		 * Sentence Parse
		 * 	Sintax: Sentence -> when, where, what, how, after, helper
		 *  Example: "when: DOMContentLoaded, where: document, what: .animatecss, how:flip, after: testcallback"
		 *  note: The order it's not important
		 * @method _parseSentence
		 * @param {} sentence
		 * @return parsedSentence
		 */
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
		}

		/**
		 * Parse definition
		 * 	Sintax: Definition -> when | where | what | how | after | helper
		 *  Example: "when: DOMContentLoaded, where: document, what: .animatecss, how:flip, after: testcallback"
		 * @method _parseDefinition
		 * @param {} definition
		 * @return parsedDefinition
		 */
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

	/**
	* Helper to DOM manipulation
	* @class Parser
	*/
	var NodeHelper = {

		/**
		 * Add some classes to a node
		 * @method addClass
		 * @param {} elem
		 * @param {} string
		 * @return 
		 */
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

		/**
		 * Remove class of some DOM element
		 * @method removeClass
		 * @param {} elem
		 * @param {} string
		 * @return 
		 */
		removeClass: function(elem, string) {
		  if (!(string instanceof Array)) {
		    string = string.split(' ');
		  }
		  for(var i = 0, len = string.length; i < len; ++i) {
		    elem.className = elem.className.replace(new RegExp('(\\s+|^)' + string[i] + '(\\s+|$)'), ' ').trim();
		  }
		},

		/**
		 * Toggle Class of the nested element
		 * @method toggleClass
		 * @param {} elem
		 * @param {} string
		 * @return 
		 */
		toggleClass: function(elem, string) {
		  if (string) {
		    if (new RegExp('(\\s+|^)' + string + '(\\s+|$)').test(elem.className)) {
		      elem.className = elem.className.replace(new RegExp('(\\s+|^)' + string + '(\\s+|$)'), ' ').trim();
		    } else {
		      elem.className = elem.className.trim() + ' ' + string;
		    }
		  }
		},

		/**
		 * Test if the nested element has the supply class
		 * @method hasClass
		 * @param {} elem
		 * @param {} string
		 * @return LogicalExpression
		 */
		hasClass: function(elem, string) {
		  return string && new RegExp('(\\s+|^)' + string + '(\\s+|$)').test(elem.className);
		},

	}


	instance.initializer();
	
};


var AniJS = new AniJSLib();

AniJS.run();
