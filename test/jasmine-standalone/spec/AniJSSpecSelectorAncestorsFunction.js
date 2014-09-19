YUI().use('node', 'node-event-simulate', function (Y) {

    var AniJSTest = {
        Utils: {
            settingEnviroment: function(dataAnijJS) {
                Y.one('#testzone').appendChild("<div class='ancestorsTest red-ancestors'> " +
                                                    "<div id='dv1' > </div> " +
                                                    "<ul class='ul1'> <li> <p></p> </li> <li> </li> <li> </li> </ul>" +
                                                    "<div id='dv2'> </div>" +
                                                "</div>");

                var targetNode = Y.one('#testzone .ul1');
                targetNode.setAttribute('data-anijs', dataAnijJS);
                return targetNode;
            },
            settingHelper: function(dataAnijJS, done, count) {
                var targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);
                AniJSDefaultHelper = AniJS.getHelper();
                AniJSDefaultHelper.afterFunction = function(e, animationContext, params) {
                    count--;
                    if(count == 0)
                        done();
                };
                spyOn(AniJSDefaultHelper, 'afterFunction').and.callThrough();

                AniJS.run();
                targetNode.simulate("click");
            }
        }
    },
    AniJSDefaultHelper = null;

    describe("Execute the selector fuction ancestor", function() {
        afterEach(function() {
            Y.all('.hidden').removeClass('hidden');
            if(Y.one('#testzone .ancestorsTest') !== null) {
                Y.one('#testzone .ancestorsTest').remove();
            }

        });

        describe("on do action, without params. ", function() {
            beforeEach(function(done) {
                var dataAnijJS = 'if: click, do: $addClass hidden, to: $ancestors, after: $afterFunction';
                AniJSTest.Utils.settingHelper(dataAnijJS, done, 3)
            });

            it("add hidden class to all ancestors that 'ul class=ul1' ", function() {
                expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                expect(Y.all('.hidden')._nodes.length).toEqual(3);
            });
        });
        describe("on do action, without params. ", function() {
            beforeEach(function(done) {
                var dataAnijJS = 'if: click, do: $addClass hidden, to: $ancestors target | .red-ancestors, after: $afterFunction';
                AniJSTest.Utils.settingHelper(dataAnijJS, done, 1)
            });

            it("add hidden class to all ancestors that css class is .red-ancestors", function() {
                expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                expect(Y.all('.hidden')._nodes.length).toEqual(1);
            });
        });

        describe("on do action, without params. ", function() {
            beforeEach(function(done) {
                var dataAnijJS = 'if: click, do: $addClass hidden, to: $ancestors .red-ancestors, after: $afterFunction';
                AniJSTest.Utils.settingHelper(dataAnijJS, done, 3)
            });

            it("add hidden css class to all ancestors of elements that  contains css class .red-ancestors", function() {
                expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                expect(Y.all('.hidden')._nodes.length).toEqual(3);
            });
        });
    });
});