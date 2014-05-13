/*!
AniJS - http://anijs.github.io
Licensed under the MIT license

Copyright (c) 2014 Dariel Noel <darielnoel@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function (root, factory) { "use strict";
    if (typeof module == "object" && typeof module.exports == "object") {
        module.exports = root.document ?
                factory(root, true) :
                function (w) {
                    if (!w.document) {
                        throw new Error("AniJS requires a window with a document");
                    }
                    return factory(w);
                };
    } else {
        factory(root);
    }

})(typeof window !== "undefined"? window : this, function(window, noGlobal) {
    /**
     * AniJS is library for write declarative animations in your static html documents
     * @class AniJSit
     * @constructor initializer
     * @author @dariel_noel
     */
    var AniJSLib = function() {

        var instance = this,
            ANIJS_DATATAG_NAME = 'data-anijs',
            DEFAULT = 'default',
            BODY = 'body',
            MULTIPLE_CLASS_SEPARATOR = '$',
            EVENT_RESERVED_WORD = 'if',
            EVENT_TARGET_RESERVED_WORD = 'on',
            BEHAVIOR_RESERVED_WORD = 'do',
            BEHAVIOR_TARGET_RESERVED_WORD = 'to';

        /**
         * Initializer Function
         * @method initializer
         * @return
         */
        instance._initializer = function() {

            //ATTRS inicialization
            instance.helperCollection = {};

            instance.eventProviderCollection = {};

            //AniJS event Collection
            //TODO: Encapsulate this in another class
            // instance.eventCollection = {};

            // instance.eventIdCounter = 0;
            
            //Using with Custom Event Systems
            if(!window.EventSystem){
                instance.eventSystem = new AniJSLib.EventSystem();    
            } else{
                instance.eventSystem = new EventSystem();
            }
            
            var defaultHelper = instance._createDefaultHelper();

            //Registering an empty helper
            instance.registerHelper(DEFAULT, defaultHelper);

            //Default Helper Index
            instance.helperDefaultIndex = DEFAULT;

            instance.rootDOMTravelScope = document;

            //Initialize the Parser Object
            instance.Parser = instance._createParser();

            //AnimationEnd Correct Prefix Setup
            instance.animationEndEvent = instance._animationEndPrefix();

            //Add this class names when anim
            instance.classNamesWhenAnim = '';
        };

        /**
         * You can use these to change the escope to run AniJS
         * @method setDOMRootTravelScope
         * @param {} selector
         * @return
         */
        instance.setDOMRootTravelScope = function(selector) {
            var rootDOMTravelScope;
            try{
                if(selector === 'document'){
                    rootDOMTravelScope = document;
                } else{
                    rootDOMTravelScope = document.querySelector(selector);
                    if(!rootDOMTravelScope){
                        rootDOMTravelScope = document;
                    }
                }

            } catch(e){
                rootDOMTravelScope = document;
            }
            instance.rootDOMTravelScope = rootDOMTravelScope;
        };

        /**
         * Parse Declarations and setup Anim in a founded elements
         * @method run
         * @return
         */
        instance.run = function() {
            var aniJSNodeCollection = [],
                aniJSParsedSentenceCollection = {};

            //Clear all node listener
            instance.purgeAll();

            aniJSNodeCollection = instance._findAniJSNodeCollection(instance.rootDOMTravelScope);

            var size = aniJSNodeCollection.length,
                i = 0,
                item;

            for (i; i < size; i++) {
                item = aniJSNodeCollection[i];

                //IMPROVE: The datatag name migth come from configuration
                aniJSParsedSentenceCollection = instance._getParsedAniJSSentenceCollection(item.getAttribute(ANIJS_DATATAG_NAME));

                //Le seteo su animacion
                instance._setupElementAnim(item, aniJSParsedSentenceCollection);
            }
        };

        /**
         * Create an animation from a aniJSParsedSentenceCollection
         * @method createAnimation
         * @param {} aniJSParsedSentenceCollection
         * @param {} element
         * @return
         */
        instance.createAnimation = function(aniJSParsedSentenceCollection, element) {
            var nodeElement = element || '';

            //BEAUTIFY: The params order migth be the same
            instance._setupElementAnim(nodeElement, aniJSParsedSentenceCollection);
        };

        /**
         * Return a Helper by ID, you can use this to attach callback to the Helper
         * @method getHelper
         * @param {} helperID
         * @return LogicalExpression
         */
        instance.getHelper = function(helperID) {
            var helperCollection = instance.helperCollection;
            return helperCollection[helperID] || helperCollection[DEFAULT];
        };

        /**
         * A helper it's a callback function container
         * using this function you can register your custom Helper
         * @method registerHelper
         * @param {} helperName
         * @param {} helperInstance
         * @return
         */
        instance.registerHelper = function(helperName, helperInstance) {
            instance.helperCollection[helperName] = helperInstance;
        };

        /**
         * Detach all subscription of the selector Nodes
         * @method purge
         * @param {} selector
         * @return
         */
        instance.purge = function(selector) {

            //TODO: Search a regular expression for test a valid CSS selector
            if (selector && selector !== '' && selector !== ' ') {
                var purgeNodeCollection = document.querySelectorAll(selector),
                    size = purgeNodeCollection.length,
                    i = 0;

                for (i; i < size; i++) {
                    instance.eventSystem.purgeEventTarget(purgeNodeCollection[i]);
                }
            }
        };

        /**
         * Purge all register elements handle
         * you can use this when you run AniJS again
         * @method purgeAll
         * @return
         */
        instance.purgeAll = function() {
            instance.eventSystem.purgeAll();
        };

        instance.purgeEventTarget = function(element) {
            instance.eventSystem.purgeEventTarget(element);
        };
        

        /**
         * Add default class names while Anim
         * @method setClassNamesWhenAnim
         * @param {} defaultClasses
         * @return 
         */
        instance.setClassNamesWhenAnim = function(defaultClasses) {
            instance.classNamesWhenAnim = ' ' + defaultClasses;
        };

        /**
         * Create an EventTarget
         * @method createEventProvider
         * @return EventTarget
         */
        instance.createEventProvider = function(){
            return instance.eventSystem.createEventTarget();
        };

        /**
         * Put an event provider in the eventProviderCollection
         * @method registerEventProvider
         * @param {} eventProvider
         * @return Literal
         */
        instance.registerEventProvider = function(eventProvider) {
            var eventProviderCollection = instance.eventProviderCollection;

            if(eventProvider.id && eventProvider.value && instance.eventSystem.isEventTarget(eventProvider.value)){
                eventProviderCollection[eventProvider.id] = eventProvider.value;
                return 1;
            }
            return '';
        };

        /**
         * Return an eventProvider instance
         * @method getEventProvider
         * @param {} eventProviderID
         * @return eventProvider
         */
        instance.getEventProvider = function(eventProviderID) {
            return instance.eventProviderCollection[eventProviderID];
        };

        /**
         * Description
         * @method _createDefaultHelper
         * @return defaultHelper
         */
        instance._createDefaultHelper = function() {
            var defaultHelper = {
                /**
                 * Remove the animation class added when animation is created
                 * @method removeAnim
                 * @param {} e
                 * @param {} animationContext
                 * @return
                 */
                removeAnim: function(e, animationContext) {
                    animationContext.nodeHelper.removeClass(e.target, animationContext.behavior);
                }
            };

            return defaultHelper;
        };

        /**
         * Create a Parser Instance
         * @method _createParser
         * @return NewExpression
         */
        instance._createParser = function() {
            return new Parser();
        };

        /**
         * Setup the animation of the some element
         * @method _setupElementAnim
         * @param {} element
         * @param {} aniJSParsedSentenceCollection
         * @return
         */
        instance._setupElementAnim = function(element, aniJSParsedSentenceCollection) {
            var size = aniJSParsedSentenceCollection.length,
                i = 0,
                item;

            for (i; i < size; i++) {
                item = aniJSParsedSentenceCollection[i];
                instance._setupElementSentenceAnim(element, item);
            }
        };

        /**
         * Setup the element animation from a AniJS Sentence
         * @method _setupElementSentenceAnim
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return
         */
        instance._setupElementSentenceAnim = function(element, aniJSParsedSentence) {
            //TODO: If the user use animationend or transitionend names to custom events the eventdispach will be not executed
            var event = instance._eventHelper(aniJSParsedSentence),
                eventTargetList = instance._eventTargetHelper(element, aniJSParsedSentence);

            //Es obligatorio definir de eventTarget ATTR
            if (event !== '') {

                var size = eventTargetList.length,
                    i = 0,
                    eventTargetItem;

                for (i; i < size; i++) {
                    eventTargetItem = eventTargetList[i];

                    if(instance.eventSystem.isEventTarget(eventTargetItem)){
                        var listener = function(event) {

                            //Si cambia algun parametro dinamicamente entonces hay que enterarse
                            var behaviorTargetList = instance._behaviorTargetHelper(element, aniJSParsedSentence),
                                behavior = instance._behaviorHelper(aniJSParsedSentence),
                                before = instance._beforeHelper(element, aniJSParsedSentence),
                                after = instance._afterHelper(element, aniJSParsedSentence);

                            if (instance.classNamesWhenAnim !== '') {
                                behavior += instance.classNamesWhenAnim;
                            }

                            //Creo un nuevo animation context
                            var animationContextConfig = {
                                behaviorTargetList: behaviorTargetList,
                                nodeHelper: NodeHelper,
                                animationEndEvent: instance.animationEndEvent,
                                behavior: behavior,
                                after: after,
                                eventSystem: instance.eventSystem
                            },

                                animationContextInstance = new AnimationContext(animationContextConfig);

                            //Si before, le paso el animation context
                            if (before && instance._isFunction(before)) {
                                before(event, animationContextInstance);
                            } else {
                                animationContextInstance.run();
                            }
                        };

                        instance.eventSystem.addEventListenerHelper(eventTargetItem, event, listener, false);

                        //Register event to feature handle
                        instance.eventSystem.registerEventHandle(eventTargetItem, event, listener);
                    }



                }
            } else {
                console.log('You must define some event');
            }
        };

        /**
         * Helper to setup the Event that trigger the animation from declaration
         * https://developer.mozilla.org/en-US/docs/Web/Reference/Events
         * http://www.w3schools.com/tags/ref_eventattributes.asp
         * @method _eventHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return event
         */
        instance._eventHelper = function(aniJSParsedSentence) {
            var defaultValue = '',
                event = aniJSParsedSentence.event || defaultValue;

            if (event === 'animationend') {
                event = instance._animationEndPrefix();
            } else if(event === 'transitionend'){
                event = instance._transitionEndPrefix();
            }

            return event;
        };

        /**
         * Helper to setup the Place from listen the trigger event of the animation
         * If is not specified one place, se asume que es himself
         * Take in account that where it's just a selector
         * @method _eventTargetHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return eventTargetList
         */
        instance._eventTargetHelper = function(element, aniJSParsedSentence) {
            var defaultValue = element,
                eventTargetList = [defaultValue],
                rootDOMTravelScope = instance.rootDOMTravelScope,
                eventProviderList;

            //TODO: We could add other non direct DOM Objects
            if (aniJSParsedSentence.eventTarget) {

                eventProviderList = instance._eventProviderHelper(aniJSParsedSentence.eventTarget);

                if(eventProviderList.length > 0){
                    eventTargetList = eventProviderList;
                } else if (aniJSParsedSentence.eventTarget === 'document') {
                    eventTargetList = [document];
                } else if (aniJSParsedSentence.eventTarget === 'window') {
                    eventTargetList = [window];
                } else if(aniJSParsedSentence.eventTarget.split){
                    try {
                       eventTargetList = rootDOMTravelScope.querySelectorAll(aniJSParsedSentence.eventTarget);
                    }
                    catch (e) {
                        console.log('Ugly Selector Here');
                        eventTargetList = [];
                    }
                }
            }
            //It's not a nodeList any more
            return eventTargetList;
        };

        /**
         * Helper to setup the Node can be animated
         * @method _behaviorTargetHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return behaviorTargetNodeList
         */
        instance._behaviorTargetHelper = function(element, aniJSParsedSentence) {
            var defaultValue = element,
                behaviorTargetNodeList = [defaultValue],
                rootDOMTravelScope = instance.rootDOMTravelScope,
                behaviorTarget = aniJSParsedSentence.behaviorTarget;

            if (behaviorTarget) {
                //Expression regular remplazar caracteres $ por comas
                //TODO: Estudiar si este caracter no esta agarrado
                behaviorTarget = behaviorTarget.split(MULTIPLE_CLASS_SEPARATOR).join(',');
                try{
                    behaviorTargetNodeList = rootDOMTravelScope.querySelectorAll(behaviorTarget);
                } catch(e){
                    behaviorTargetNodeList = [];
                    console.log('there are an ugly selector here');
                }

            }
            return behaviorTargetNodeList;
        };

        /**
         * Helper to setup the Animation type
         * @method _behaviorHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return defaultValue
         */
        instance._behaviorHelper = function(aniJSParsedSentence) {
            var defaultValue = aniJSParsedSentence.behavior || '';
            return defaultValue;
        };

        /**
         * Helper to setup the after callback function
         * @method _afterHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return defaultValue
         */
        instance._afterHelper = function(element, aniJSParsedSentence) {
            var defaultValue = instance._callbackHelper(element, aniJSParsedSentence, aniJSParsedSentence.after);
            return defaultValue;
        };
        /**
         * Helper to setup the after callback function
         * @method _afterHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return defaultValue
         */
        instance._beforeHelper = function(element, aniJSParsedSentence) {
            var defaultValue = instance._callbackHelper(element, aniJSParsedSentence, aniJSParsedSentence.before);
            return defaultValue;
        };

        /**
         * Helper for before and after helpers refactoring
         * @method _callbackHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @param {} callbackFunction
         * @return defaultValue
         */
        instance._callbackHelper = function(element, aniJSParsedSentence, callbackFunction) {
            var defaultValue = callbackFunction || '',
                helper = instance._helperHelper(aniJSParsedSentence);

            if (defaultValue) {
                if (!instance._isFunction(defaultValue)) {
                    var helperCollection = instance.helperCollection,
                        helperInstance = helperCollection[helper];

                    if (helperInstance && helperInstance[defaultValue]) {
                        defaultValue = helperInstance[defaultValue];
                    } else {
                        defaultValue = false;
                    }
                }
            }

            return defaultValue;
        };

        /**
         * Helper to setup the helper of the animation
         * @method _helperHelper
         * @param {} element
         * @param {} aniJSParsedSentence
         * @return defaultValue
         */
        instance._helperHelper = function(aniJSParsedSentence) {
            var defaultValue = aniJSParsedSentence.helper || instance.helperDefaultIndex;
            return defaultValue;
        };

        /**
         * Helper to setup the eventProvider
         * @method _eventProviderHelper
         * @param {} eventTargetDefinition
         * @return defaultValue
         */
        instance._eventProviderHelper = function(eventTargetDefinition) {
            var defaultValue = [],
                eventProviderCollection = instance.eventProviderCollection;

            if(eventTargetDefinition) {
                //{id: eventProviderID, value:eventProviderObject}
                if( eventTargetDefinition.id && instance.eventSystem.isEventTarget(eventTargetDefinition.value)){
                    //TODO: In the near future could be an object list
                    
                    defaultValue.push(eventTargetDefinition.value);

                    instance.registerEventProvider(eventTargetDefinition);

                } else if(eventTargetDefinition.split){
                    //Picar por signo de peso y obtener la lista de id de events providers
                    eventProviderIDList = eventTargetDefinition.split('$');
                    var size  = eventProviderIDList.length,
                        i = 1,
                        eventProviderID;

                    for ( i; i < size; i++) {
                        eventProviderID = eventProviderIDList[i];
                        if(eventProviderID && eventProviderID !== ' ') {
                            //limpiarle los espacios alante y atras (trim)
                            eventProviderID = eventProviderID.trim();

                            //TODO: Big Refactoring here
                            var value = instance.getEventProvider(eventProviderID);
                            if(!value){
                                value = instance.eventSystem.createEventTarget();
                                instance.registerEventProvider({
                                    id: eventProviderID,
                                    value: value
                                });
                            }
                            defaultValue.push(value);  
                        }
                    }
                }
            }

            return defaultValue;
        };  

        /**
         * Parse an String Declaration
         * @method _getParsedAniJSSentenceCollection
         * @param {} stringDeclaration
         * @return CallExpression
         */
        instance._getParsedAniJSSentenceCollection = function(stringDeclaration) {
            return instance.Parser.parse(stringDeclaration);
        };

        /**
         * Select all DOM nodes that have a AniJS declaration
         * @method _findAniJSNodeCollection
         * @param {} rootDOMTravelScope
         * @return CallExpression
         */
        instance._findAniJSNodeCollection = function(rootDOMTravelScope) {
            //IMPROVE: Might a configuration option
            var aniJSDataTagName = '[' + ANIJS_DATATAG_NAME + ']';
            return rootDOMTravelScope.querySelectorAll(aniJSDataTagName);
        };

        /**
         * Return the correct AnimationEnd Prefix according to the current browser
         * @method _animationEndPrefix
         * @return
         */
        instance._animationEndPrefix = function() {
            var endPrefixBrowserDetectionIndex = instance._endPrefixBrowserDetectionIndex(),
                animationEndBrowserPrefix = ['animationend', 'oAnimationEnd', 'animationend', 'webkitAnimationEnd'];

            return animationEndBrowserPrefix[endPrefixBrowserDetectionIndex];
        };

        /**
         * Return the correct TransitionEnd Prefix according to the current browser
         * @method _transitionEndPrefix
         * @return
         */
        instance._transitionEndPrefix = function() {
            var endPrefixBrowserDetectionIndex = instance._endPrefixBrowserDetectionIndex(),
                transitionEndBrowserPrefix = ['transitionend', 'oTransitionEnd', 'transitionend', 'webkitTransitionEnd'];

            return transitionEndBrowserPrefix[endPrefixBrowserDetectionIndex];
        };

        /**
         * Return the correct Transition and  Animation End Prefix helper according to the current browser
         * @method _transitionEndPrefix
         * @return index of the prefix acording to the browser
         */
        instance._endPrefixBrowserDetectionIndex = function() {
            var el = document.createElement('fakeelement'),
                animationBrowserDetection = ['animation', 'OAnimation', 'MozAnimation', 'webkitAnimation'];

            for (var i = 0; i < animationBrowserDetection.length; i++) {
                if (el.style[animationBrowserDetection[i]] !== undefined) {
                    return i;
                }
            }
        };

        /**
         * Thanks a lot to underscore guys
         * @method isFunction
         * @param {} obj
         * @return UnaryExpression
         */
        instance._isFunction = function(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        };

        /**
         * Encapsulate the animation Context
         * @class animationContext
         * @author @dariel_noel
         */
        var AnimationContext = (function(config) {

            var animationContextInstance = this;

            /**
             * Class constructor
             * @method initializer
             * @param {} config
             * @return
             */
            animationContextInstance.initializer = function(config) {

                //TODO: Valorar la idea de usar prototype por performance reasons
                //ATTRS
                animationContextInstance.behaviorTargetList = config.behaviorTargetList || [];

                animationContextInstance.nodeHelper = config.nodeHelper;

                animationContextInstance.animationEndEvent = config.animationEndEvent;

                animationContextInstance.behavior = config.behavior;

                animationContextInstance.after = config.after;

                animationContextInstance.eventSystem = config.eventSystem;

            },

            /**
             * Execute an animation context instance
             * @method run
             * @return
             */
            animationContextInstance.run = function() {
                var instance = animationContextInstance,
                    behaviorTargetList = instance.behaviorTargetList,
                    behaviorTargetListSize = behaviorTargetList.length,
                    nodeHelper = instance.nodeHelper,
                    behavior = instance.behavior,
                    animationEndEvent = instance.animationEndEvent,
                    after = instance.after,
                    j = 0,
                    behaviorTargetListItem;

                for (j; j < behaviorTargetListSize; j++) {
                    behaviorTargetListItem = behaviorTargetList[j];

                    nodeHelper.addClass(behaviorTargetListItem, behavior);

                    //create event
                    instance.eventSystem.addEventListenerHelper(behaviorTargetListItem, animationEndEvent, function(e) {

                        //remove event
                        instance.eventSystem.removeEventListenerHelper(e, arguments);

                        // callback handler
                        if (Util.isFunction(after)) {
                            after(e, animationContextInstance);
                        }

                    });
                }
            };

            animationContextInstance.initializer(config);


        });

        
        var Util = {
            isFunction : function(obj){
                return !!(obj && obj.constructor && obj.call && obj.apply);
            }
        }


        /**
         * Encapsulate the AnimJS sintax parser
         * @class Parser
         * @author @dariel_noel
         */
        var Parser = (function() {

            var parserInstance = this;

            /**
             * Parse a aniJSDeclaration
             * @method parse
             * @param {} aniJSDeclaration
             * @return CallExpression
             */
            parserInstance.parse = function(aniJSDeclaration) {
                return parserInstance._parseDeclaration(aniJSDeclaration);
            };

            /**
             * Declaration parse
             *  Sintax: Declaration -> Sentence; | *
             *  Example: SentenceA; SentenceB
             * @method _parseDeclaration
             * @param {} declaration
             * @return parsedDeclaration
             */
            parserInstance._parseDeclaration = function(declaration) {
                var parsedDeclaration = [],
                    sentenceCollection,
                    parsedSentence;

                sentenceCollection = declaration.split(';');

                var size = sentenceCollection.length,
                    i = 0;

                for (i; i < size; i++) {
                    parsedSentence = parserInstance._parseSentence(sentenceCollection[i]);
                    parsedDeclaration.push(parsedSentence);
                }

                return parsedDeclaration;
            };

            /**
             * Sentence Parse
             *  Sintax: Sentence -> if, on, do, to, after, helper
             *  Example: "if: DOMContentLoaded, on: document, do:flip, to: .animatecss, after: testcallback"
             *  note: The order it's not important
             * @method _parseSentence
             * @param {} sentence
             * @return parsedSentence
             */
            parserInstance._parseSentence = function(sentence) {
                var parsedSentence = {},
                    definitionCollection,
                    parsedDefinition;

                definitionCollection = sentence.split(',');

                var size = definitionCollection.length,
                    i = 0;

                for (i; i < size; i++) {
                    parsedDefinition = parserInstance._parseDefinition(definitionCollection[i]);
                    parsedSentence[parsedDefinition.key] = parsedDefinition.value;
                }

                return parsedSentence;
            };

            /**
             * Parse definition
             *  Sintax: Definition -> if | on | do | to | after | helper
             *  Example: "if: DOMContentLoaded, on: document, do:flip, to: .animatecss,  after: testcallback"
             * @method _parseDefinition
             * @param {} definition
             * @return parsedDefinition
             */
            parserInstance._parseDefinition = function(definition) {
                var parsedDefinition = {},
                    definitionBody,
                    definitionKey,
                    definitionValue,
                    EVENT_KEY = 'event',
                    EVENT_TARGET_KEY = 'eventTarget',
                    BEHAVIOR_KEY = 'behavior',
                    BEHAVIOR_TARGET_KEY = 'behaviorTarget';

                //Performance reasons

                definitionBody = definition.split(':');

                if (definitionBody.length > 1) {
                    definitionKey = definitionBody[0].trim();
                    definitionValue = definitionBody[1].trim();

                    //Change by reserved words
                    if (definitionKey === EVENT_RESERVED_WORD) {
                        definitionKey = EVENT_KEY;
                    } else if (definitionKey === EVENT_TARGET_RESERVED_WORD) {
                        definitionKey = EVENT_TARGET_KEY;
                    } else if (definitionKey === BEHAVIOR_RESERVED_WORD) {
                        definitionKey = BEHAVIOR_KEY;
                    } else if (definitionKey === BEHAVIOR_TARGET_RESERVED_WORD) {
                        definitionKey = BEHAVIOR_TARGET_KEY;
                    }

                    parsedDefinition.key = definitionKey;
                    parsedDefinition.value = definitionValue;
                }

                return parsedDefinition;
            };

        });

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
                for (var i = 0, len = string.length; i < len; ++i) {
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
                for (var i = 0, len = string.length; i < len; ++i) {
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

        };

        /**
         * Event System Interface (AniJS Current Implementation)
         * @class EventSystem
         */
        AniJSLib.EventSystem =  function EventSystem(){

            var instance = this;
            //ATTRS
            instance.eventCollection = {};

            instance.eventIdCounter = 0;
        }

        AniJSLib.EventSystem.prototype = {

            constructor: AniJSLib.EventSystem,

            isEventTarget: function(element){
                //TODO: simplify with ternary operator
                if(element.addEventListener){
                    return true;
                }
                return false; 
            },

            createEventTarget: function(){
                return new EventTarget();
            },

            addEventListenerHelper: function(eventTargetItem, event, listener, other){
                eventTargetItem.addEventListener(event, listener, false);
            },

            removeEventListenerHelper: function(e, arguments){
                // remove event
                e.target.removeEventListener(e.type, arguments.callee);
            },
               

            purgeAll: function() {
                var instance = this,
                    eventCollection = instance.eventCollection,
                    eventCollectionKeyList = Object.keys(eventCollection),
                    size = eventCollectionKeyList.length,
                    i = 0,
                    key,
                    eventObject;

                for (i; i < size; i++) {
                    key = eventCollectionKeyList[i];
                    eventObject = eventCollection[key];

                    if (eventObject && eventObject.handleCollection && eventObject.handleCollection.length > 0) {
                        instance.purgeEventTarget(eventObject.handleCollection[0].element);
                    }

                    delete eventCollection[key];
                }
            },

            /**
             * Detach all AniJS subscriptions to this element
             * @method purgeEventTarget
             * @param {} element
             * @return
             */
            purgeEventTarget: function(element) {
                var instance = this,
                    aniJSEventID = element._aniJSEventID,
                    elementHandleCollection;
                if (aniJSEventID) {

                    //Se le quitan todos los eventos a los que este suscrito
                    elementHandleCollection = instance.eventCollection[aniJSEventID].handleCollection;

                    var size = elementHandleCollection.length,
                        i = 0,
                        item;

                    for (i; i < size; i++) {
                        item = elementHandleCollection[i];

                        //Para cada handle
                        element.removeEventListener(item.eventType, item.listener);

                    }
                    instance.eventCollection[aniJSEventID] = null;
                    delete instance.eventCollection[aniJSEventID];
                    element._aniJSEventID = null;
                    delete element._aniJSEventID;
                }
            },

            /**
             * Create a handle to remove the listener when purge it
             * @method registerEventHandle
             * @param {} element
             * @param {} eventType
             * @param {} listener
             * @return
             */
            registerEventHandle: function(element, eventType, listener) {
                var instance = this,
                    aniJSEventID = element._aniJSEventID,
                    eventCollection = instance.eventCollection,
                    elementEventHandle = {
                        eventType: eventType,
                        listener: listener,
                        element: element
                    };

                if (aniJSEventID) {
                    eventCollection[aniJSEventID].handleCollection.push(elementEventHandle);
                } else {
                    var tempEventHandle = {
                        handleCollection: [elementEventHandle]
                    };

                    eventCollection[++instance.eventIdCounter] = tempEventHandle;
                    element._aniJSEventID = instance.eventIdCounter;
                }
            },


            dispatchEvent: function(event){
                var instance = this;
                if (typeof event == "string"){
                    event = { type: event };
                }
                if (!event.target){
                    event.target = instance;
                }

                if (!event.type){  //falsy
                    throw new Error("Event object missing 'type' property.");
                }

                if (this._listeners[event.type] instanceof Array){
                    var listeners = instance._listeners[event.type];

                    for (var i=0, len=listeners.length; i < len; i++){
                        listeners[i].call(instance, event);
                    }
                }
            },

            removeEventListener: function(type, listener){
                var instance = this;
                if (instance._listeners[type] instanceof Array){
                    var listeners = instance._listeners[type];
                    for (var i=0, len=listeners.length; i < len; i++){
                        if (listeners[i] === listener){
                            listeners.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        };

        /**
         * Helper the custom EventTarget
         * Copyright (c) 2010 Nicholas C. Zakas. All rights reserved.
         * MIT License
         * http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/
         * @class EventTarget
         */
        function EventTarget(){
            this._listeners = {};
        }

        EventTarget.prototype = {

            constructor: EventTarget,

            /**
             * Registers the specified listener on the EventTarget it's called on
             * Similar to the native implementation
             * @method addEventListener
             * @param {} type
             * @param {} listener
             * @param {} other
             * @return 
             */
            addEventListener: function(type, listener, other){
                var instance = this;
                if (typeof instance._listeners[type] == "undefined"){
                    instance._listeners[type] = [];
                }

                instance._listeners[type].push(listener);
            },

            /**
             * Dispatches an Event at the specified EventTarget
             * Similar to the native implementation
             * @method dispatchEvent
             * @param {} event
             * @return 
             */
            dispatchEvent: function(event){
                var instance = this;
                if (typeof event == "string"){
                    event = { type: event };
                }
                if (!event.target){
                    event.target = instance;
                }

                if (!event.type){  //falsy
                    throw new Error("Event object missing 'type' property.");
                }

                if (this._listeners[event.type] instanceof Array){
                    var listeners = instance._listeners[event.type];

                    for (var i=0, len=listeners.length; i < len; i++){
                        listeners[i].call(instance, event);
                    }
                }
            },

            /**
             * Removes the event listener previously registered with EventTarget.addEventListener.
             * Similar to the native implementation
             * @method removeEventListener
             * @param {} type
             * @param {} listener
             * @return 
             */
            removeEventListener: function(type, listener){
                var instance = this;
                if (instance._listeners[type] instanceof Array){
                    var listeners = instance._listeners[type];
                    for (var i=0, len=listeners.length; i < len; i++){
                        if (listeners[i] === listener){
                            listeners.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        };

            instance._initializer();

    };

    var AniJS = new AniJSLib();
    AniJS.run();

    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
    // AMD Support
    if ( typeof define === "function" && define.amd ) {
        define( "anijs", [], function() {
            return AniJS;
        });
    }
    if (typeof noGlobal == typeof undefined) {
        window.AniJS = AniJS;
    }

    return AniJS;
});

