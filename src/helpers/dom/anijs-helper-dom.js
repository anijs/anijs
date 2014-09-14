/*!
AniJS - http://anijs.github.io
Licensed under the MIT license

Copyright (c) 2014 Dariel Noel <darielnoel@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * AniJS DOM Helper
 */
(function() {

    //Obtaining  the default helper
    var AniJSDefaultHelper = AniJS.getHelper();

    /**
     * Add class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.addClass = function(e, animationContext, params) {
        AniJSDefaultHelper.makeAction(e, animationContext, params, 0, e.target);
    };

    /**
     * Remove class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]                   [description]
     */
    AniJSDefaultHelper.removeClass = function(e, animationContext, params) {
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 1, e.target);
    };

    /**
     * Toggle class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.toggleClass = function(e, animationContext, params) {
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 2, e.target);
    };

    /**
     * Add class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.addClassToParent = function(e, animationContext, params) {
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 0, e.target.parentNode);
    };

    /**
     * Remove class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]                   [description]
     */
    AniJSDefaultHelper.removeClassToParent = function(e, animationContext, params) {
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 1, e.target.parentNode);
    };

    /**
     * Toggle class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.toggleClassToParent = function(e, animationContext, params) {
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 2, e.target.parentNode);
    };

    /**
     * Add class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.addClassToClosest = function(e, animationContext, params) {
        var closestNode = e.target.parentNode;
        if(params.length > 1){
            closestNode = closest(e.target.parentNode, params[1]);
        }
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 0, closestNode);
    };

    /**
     * Remove class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]                   [description]
     */
    AniJSDefaultHelper.removeClassToClosest = function(e, animationContext, params) {
        var closestNode = e.target.parentNode;
        if(params.length > 1){
            closestNode = closest(e.target.parentNode, params[1]);
        }
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 1, closestNode);
    };

    /**
     * Toggle class to the elements
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.toggleClassToClosest = function(e, animationContext, params) {
        var closestNode = e.target.parentNode;
        if(params.length > 1){
            closestNode = closest(e.target.parentNode, params[1]);
        }
        AniJSDefaultHelper.makeClassAction(e, animationContext, params, 2, closestNode);
    };


    /**
     * Make toggle, remove or addActions
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-03
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.makeClassAction = function(e, animationContext, params, actionID, target){
        if(actionID === 0){
            animationContext.nodeHelper.addClass(target, params[0]);
        } else if(actionID === 1){
            animationContext.nodeHelper.removeClass(target, params[0]);
        } else{
            if(animationContext.nodeHelper.hasClass(target, params[0])){
               animationContext.nodeHelper.removeClass(target, params[0]);
            }else {
               animationContext.nodeHelper.addClass(target, params[0]);
            }
        }
        //Run the animation
        if(!animationContext.hasRunned){
            animationContext.run();
        }
    };

    /**
     * Remove element or elements from html
     * Examples:
     *  Remove current element.
     *   if: click, do: $remove
     *  Remove HTML elements with class name .remove
     *   if: click, do: $remove .remove
     *  Remove HTML element with id remove
     *   if: click, do: $remove #remove
     *  Remove HTML elements with tag name p
     *   if: click, do: $remove p
     *  Remove all HTML elements that contain class name remove or id remove o tag name p
     *   if: click, do: $remove .remove & #remove & p
     *
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-11
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.remove = function(e, animationContext, params) {
        var paramsLength = params.length,
            target = e.target,
            elements = null;
        if(paramsLength === 0) {
            AniJS.purgeEventTarget(target);
            target.remove();
        } else {
            while(paramsLength-- > 0) {
                elements = document.querySelectorAll(params[paramsLength]) || [];
                var i = elements.length;
                while (i-- > 0) {
                    elements[i].remove();
                }
            }
        }

        return true;
    };

    /**
     * Remove element or elements from html
     * Examples:
     *  Remove current element parent.
     *   if: click, do: $remove
     *  Remove the parents of HTML elements with class name .remove
     *   if: click, do: $remove .remove
     *  Remove HTML element with id remove
     *   if: click, do: $remove #remove
     *  Remove the parents of HTML elements with tag name p
     *   if: click, do: $remove p
     *  Remove the parents of all HTML elements that contain class name remove or id remove o tag name p
     *   if: click, do: $remove .remove & #remove & p
     *
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-11
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.removeParent = function(e, animationContext, params) {
        var paramsLength = params.length,
            target = e.target,
            elements = null,
            parent;
        if(paramsLength === 0) {
            removeParent(target);
        } else {
            while(paramsLength-- > 0) {
                elements = all(params[paramsLength]) || [];
                var i = elements.length;
                while (i-- > 0) {
                    removeParent(elements[i]);
                }
            }
        }

        return true;
    };

    /**
     * Remove the most closest father Node
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-14
     * @param  {[type]}   e                [description]
     * @param  {[type]}   animationContext [description]
     * @param  {[type]}   params           [description]
     * @return {[type]}                    [description]
     */
    AniJSDefaultHelper.removeClosest = function(e, animationContext, params) {
        var paramsLength = params.length,
            target = e.target,
            elements = null,
            parent;
        if(paramsLength === 0) {
            removeParent(target);
        } else {
            removeClosest(target, params[0]);
        }

        return true;
    };

    /**
     * Clone HTML element
     * Examples:
     *  Clone current HTML element and append in same parent.
     *   if: click, do: $clone
     *  Clone current HTML element and append other parent.
     *   if: click, do: $clone, to: #otherParent
     *  Clone HTML element and append other parent.
     *   if: click, do: $clone #clone, to: #otherParent
     *  Clone HTML element and append in same parent.
     *   if: click, do: $clone #clone
     *
     * @author Yolier Galan Tasse <gallegogt@gmail.com>
     * @since  2014-09-11
     * @param  {object}   e                The event handler
     * @param  {object}   animationContext AniJS Animation Context Object
     * @param  {[string]}   params           [description]
     */
    AniJSDefaultHelper.clone = function(e, animationContext, params) {
        var paramsLength = params.length,
            target = e.target, // para donde va el elemento
            eventTarget = animationContext.eventTarget, //quien origina el evento
            elements = null,
            fnCloneNode = animationContext.nodeHelper.cloneNode,
            repeats = 0;

        function cloneAux(el, parent, repeats) {
            var i = 0;
            while(repeats > i++) {
                if(parent === el) {                             //Whitout to
                    fnCloneNode(parent, parent.parentNode);
                } else {                                        //With to
                    fnCloneNode(el, parent);
                }
            }
        }
        if(paramsLength == 0 ) {                //$clone
            cloneAux(eventTarget, target, 1);
        } else {
            if(paramsLength == 1) {             //$clone 3, to: #clone
                repeats = parseInt(params[0]) || null;
                if(repeats !== null) {
                    cloneAux(eventTarget, target, repeats);
                    return true;
                } else {
                    repeats = 1;
                }
            } else {                            //$clone selectror & 3, to: #clone
                repeats = parseInt(params[1]) || 1;
            }
            elements = all(params[0]);
            var i = 0;
            for (; i < elements.length; i++) {
                cloneAux(elements[i], target, repeats);
            }
        }

        return true;
    };

    /**
     * Return all nodes that match witch selector
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-09-14
     * @return {[type]}   [description]
     */
    function all(selector){
        return document.querySelectorAll(selector);
    }

    function removeParent(element){
        var parent = element.parentNode;
        AniJS.EventSystem.purgeAllNodes(parent);
        parent.remove();
    }

    function removeClosest(element, selector){
        var parent = closest(element.parentNode, selector);
        if(parent){
            AniJS.EventSystem.purgeAllNodes(parent);
            parent.remove();
        }
    }

    //http://stackoverflow.com/questions/15329167/closest-ancestor-matching-selector-using-native-dom
    //by Paul Irish
    function closest(elem, selector) {
       var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
        while (elem) {
            if (matchesSelector.bind(elem)(selector)) {
                return elem;
            } else {
                elem = elem.parentElement;
            }
        }
        return false;
    }

}(window));
