YUI().use('node', 'node-event-simulate', function (Y) {

    var AniJSTest = {
        Utils: {
            settingEnviroment: function(dataAnijJS) {
                Y.one('#testzone').appendChild("<div class='testRemove' > Test Remove </div>");
                Y.one('#testzone').appendChild("<div class='classRemove' > Class to Remove </div>");
                Y.one('#testzone').appendChild("<div id='idRemove' > ID to Remove </div>");

                var targetNode = Y.one('#testzone .testRemove');
                targetNode.setAttribute('data-anijs', dataAnijJS);
                return targetNode;
            },
            settingManyHtmlItems: function(dataAnijJS) {
                Y.one('#testzone').appendChild("<div class='testRemove'> Test Remove </div>");
                var i = 100;
                while(i-- > 0) {
                    Y.one('#testzone').appendChild("<div class='classRemove'> Class to Remove </div>");
                }
                Y.one('#testzone').appendChild("<div id='idRemove'> ID to Remove </div>");
                var targetNode = Y.one('#testzone .testRemove');
                targetNode.setAttribute('data-anijs', dataAnijJS);
                return targetNode;
            }
        }
    },
    AniJSDefaultHelper = null;

    describe("Execute the helper fuction remove", function() {
        afterEach(function() {
            Y.one('body').removeClass('bounce');
            if(Y.one('#testzone .testRemove') !== null) {
                Y.one('#testzone .testRemove').remove();
            }
            if(Y.one('#testzone .classRemove') !== null) {
                Y.one('#testzone .classRemove').remove();
            }
            if(Y.one('#idRemove') !== null) {
                Y.one('#idRemove').remove();
            }
        });

        describe("on do action, without params ", function() {
            beforeEach(function(done) {
                /**
                 * the wrapper function removeWrapper is created for execute the
                 * helper function remove on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $removeWrapper',
                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.removeWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.remove(e, animationContext, params);
                    done();
                };

                spyOn(AniJSDefaultHelper, 'removeWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");
            });

            it("enotonces la funcion remove es llamada sin parametros y es eliminado el elemento target", function() {
                expect(AniJSDefaultHelper.removeWrapper).toHaveBeenCalled();
                expect(AniJSDefaultHelper.removeWrapper.calls.argsFor(0)[2].length).toEqual(0);
                expect(Y.one('#testzone .testRemove')).toBeNull();
            });
        });

        describe("on do action, without params and 'to' behavior ", function() {
            beforeEach(function(done) {
                /**
                 * the wrapper function removeWrapper is created for execute the
                 * helper function remove on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $removeWrapper, to: #idRemove',
                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.removeWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.remove(e, animationContext, params);
                    done();
                }

                spyOn(AniJSDefaultHelper, 'removeWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");
            });
            it("and html tag ID target as selector", function() {
                expect(AniJSDefaultHelper.removeWrapper).toHaveBeenCalled();
                expect(Y.one('#idRemove')).toBeNull();
            });
        });

        describe("on do action with one param, ", function() {
            beforeEach(function(done) {
                  /**
                 * the wrapper function removeWrapper is created for execute the
                 * helper function remove on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $removeWrapper .classRemove',
                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.removeWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.remove(e, animationContext, params);
                    done();
                }
                spyOn(AniJSDefaultHelper, 'removeWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");
            });

            it("css class param", function() {
                expect(AniJSDefaultHelper.removeWrapper).toHaveBeenCalled();
                expect(Y.one('#testzone .classRemove')).toBeNull();
            });
        });

        describe("on do action with one param tagID, ", function() {
            beforeEach(function(done) {
                /**
                 * the wrapper function removeWrapper is created for execute the
                 * helper function remove on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $removeWrapper #idRemove',
                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.removeWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.remove(e, animationContext, params);
                    done();
                }
                spyOn(AniJSDefaultHelper, 'removeWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");
            });

            it("HTML tag id", function() {
                expect(AniJSDefaultHelper.removeWrapper).toHaveBeenCalled();
                expect(Y.one('#idRemove')).toBeNull();
            });
        });

        describe("on do action with many params I", function() {
            beforeEach(function(done) {
                /**
                 * the wrapper function removeWrapper is created for execute the
                 * helper function remove on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $removeWrapper .classRemove | #idRemove',
                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.removeWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.remove(e, animationContext, params);
                    done();
                }
                spyOn(AniJSDefaultHelper, 'removeWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");

            });

            it("differents params types", function() {
                expect(AniJSDefaultHelper.removeWrapper).toHaveBeenCalled();
                expect(Y.one('#testzone .classRemove')).toBeNull();
                expect(Y.one('#idRemove')).toBeNull();
            });
        });

        describe("on do action with many params II", function() {
            beforeEach(function(done) {
                /**
                 * the wrapper function removeWrapper is created for execute the
                 * helper function remove on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $removeWrapper div.classRemove',
                    targetNode = AniJSTest.Utils.settingManyHtmlItems(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.removeWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.remove(e, animationContext, params);
                    done();
                }
                spyOn(AniJSDefaultHelper, 'removeWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");
            });

            it("remove all elements that css class name are .classRemove ", function() {
                expect(AniJSDefaultHelper.removeWrapper).toHaveBeenCalled();
                expect(Y.one('#testzone div.classRemove')).toBeNull();
            });
        });
    });
});