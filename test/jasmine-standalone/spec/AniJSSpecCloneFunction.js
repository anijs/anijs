YUI().use('node', 'node-event-simulate', function (Y) {
    var AniJSTest = {
        Utils: {
            settingCloneEnviroment: function(dataAnijJS) {
                Y.one('#testzone').appendChild("<div class='cloneNode' > CloneNode </div>");
                Y.one('#testzone').appendChild("<div id='holdCloned' class='classHoldCloned' > </div>");

                var targetNode = Y.one('#testzone .cloneNode');
                targetNode.setAttribute('data-anijs', dataAnijJS);
                return targetNode;
            },
            settingCloneEnviromentWithParams: function(dataAnijJS) {
                Y.one('#testzone').appendChild("<div class='cloneNode' > CloneNode </div>");
                Y.one('#testzone').appendChild("<div id='foo' > III </div>");
                Y.one('#testzone').appendChild("<div id='holdCloned' class='classHoldCloned' > </div>");

                var targetNode = Y.one('#testzone .cloneNode');
                targetNode.setAttribute('data-anijs', dataAnijJS);
                return targetNode;
            }
        }
    },
    AniJSDefaultHelper = null;

    describe("Execute the helper fuction clone", function() {
        afterEach(function() {
            Y.one('body').removeClass('bounce');
            if(Y.all('#testzone .cloneNode') !== null) {
                Y.all('#testzone .cloneNode').remove();
            }
            if(Y.one('#holdCloned') !== null) {
                Y.one('#holdCloned').remove();
            }
            if(Y.one('#foo') !== null) {
                Y.one('#foo').remove();
            }
        });

        describe("on do action without params I ", function() {
            beforeEach(function(done) {
                /**
                 * the wrapper function cloneWrapper is created for execute the
                 * helper function clone on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $cloneWrapper',
                    targetNode = AniJSTest.Utils.settingCloneEnviroment(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.cloneWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.clone(e, animationContext, params);
                    done();
                }

                spyOn(AniJSDefaultHelper, 'cloneWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");
            });

            it("empty function", function() {
                expect(AniJSDefaultHelper.cloneWrapper).toHaveBeenCalled();
                expect(Y.all('#testzone .cloneNode')._nodes.length === 2).toBeTruthy();
            });
        });

        describe("on do action without params II ", function() {
            beforeEach(function(done) {
                /**
                 * the wrapper function cloneWrapper is created for execute the
                 * helper function clone on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $cloneWrapper, to: #holdCloned',
                    targetNode = AniJSTest.Utils.settingCloneEnviroment(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.cloneWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.clone(e, animationContext, params);
                    done();
                }

                spyOn(AniJSDefaultHelper, 'cloneWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");
            });
            it("empty function and 'behavior target to'; html tag ID target", function() {
                expect(AniJSDefaultHelper.cloneWrapper).toHaveBeenCalled();
                expect(Y.all('#holdCloned .cloneNode')._nodes.length === 1).toBeTruthy();
            });
        });

        describe("on do action without params II ", function() {
            beforeEach(function(done) {
                /**
                 * the wrapper function cloneWrapper is created for execute the
                 * helper function clone on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $cloneWrapper, to: .classHoldCloned',
                    targetNode = AniJSTest.Utils.settingCloneEnviroment(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.cloneWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.clone(e, animationContext, params);
                    done();
                }

                spyOn(AniJSDefaultHelper, 'cloneWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");
            });
            it("empty function and 'behavior target to'; css class target", function() {
                expect(AniJSDefaultHelper.cloneWrapper).toHaveBeenCalled();
                expect(Y.all('#holdCloned .cloneNode')._nodes.length === 1).toBeTruthy();
            });
        });

        describe("on do action with params I ", function() {
            beforeEach(function(done) {
                /**
                 * the wrapper function cloneWrapper is created for execute the
                 * helper function clone on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $cloneWrapper #foo, to: #holdCloned',
                    targetNode = AniJSTest.Utils.settingCloneEnviromentWithParams(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.cloneWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.clone(e, animationContext, params);
                    done();
                }

                spyOn(AniJSDefaultHelper, 'cloneWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");
            });

            it("one param without repetition", function() {
                expect(AniJSDefaultHelper.cloneWrapper).toHaveBeenCalled();
                expect(Y.one('#holdCloned')._node.children.length === 1).toBeTruthy();
            });
        });

        describe("on do action with params II ", function() {
            beforeEach(function(done) {
                /**
                 * the wrapper function cloneWrapper is created for execute the
                 * helper function clone on AniJSDefaultHelper object.
                 */
                var dataAnijJS = 'if: click, do: $cloneWrapper #foo | 1000, to: #holdCloned',
                    targetNode = AniJSTest.Utils.settingCloneEnviromentWithParams(dataAnijJS);

                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.cloneWrapper = function(e, animationContext, params) {
                    AniJSDefaultHelper.clone(e, animationContext, params);
                    done();
                }
                spyOn(AniJSDefaultHelper, 'cloneWrapper').and.callThrough();
                AniJS.run();
                targetNode.simulate("click");
            });

            it("one param with repetition", function() {
                expect(AniJSDefaultHelper.cloneWrapper).toHaveBeenCalled();
                expect(Y.one('#holdCloned')._node.children.length === 1000).toBeTruthy();
            });
        });
    });
});