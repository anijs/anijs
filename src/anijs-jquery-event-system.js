/*!
AniJS - http://anijs.github.io
Licensed under the MIT license

Copyright (c) 2014 Dariel Noel <darielnoel@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Event System Interface (AniJS Current Implementation)
 * @class EventSystem
 */
EventSystem =  function EventSystem(){

    var instance = this;
    //ATTRS
    instance.eventCollection = {};

    instance.eventIdCounter = 0;
}

EventSystem.prototype = {

    constructor: EventSystem,

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
        $(eventTargetItem).on(event, listener);
    },

    removeEventListenerHelper: function(e, arguments){
        $(e.target).off(e.type, arguments.callee);
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
                $(element).off(item.eventType, item.listener);

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
