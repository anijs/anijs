YUI().use('node', 'node-event-simulate', function (Y) {

    var AniJSTest = {
        Utils: {
            settingEnviroment: function(dataAnijJS) {
                Y.one('#testzone').appendChild("<div class='childrenTest'> " +
                                                    "<div id='dv1' > </div> " +
                                                    "<ul id='ul1'> <li> <p></p> </li> <li> </li> <li> </li> </ul>" +
                                                    "<div id='dv2'> <div > </div>  </div>" +
                                                "</div>");

                var targetNode = Y.one('#testzone .childrenTest');
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

    describe("Execute the selector fuction children", function() {
        afterEach(function() {
            Y.one('body').removeClass('bounce');
            if(Y.one('#testzone .childrenTest') !== null) {
                Y.one('#testzone .childrenTest').remove();
            }
        });

        describe("on do action, without params. ", function() {
            beforeEach(function(done) {
                var dataAnijJS = 'if: click, do: $addClass hiden, to: $children, after: $afterFunction';
                AniJSTest.Utils.settingHelper(dataAnijJS, done, 3)
            });

            it("add hiden class to all children that 'div class=childrenTest' ", function() {
                expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                expect(Y.all('#testzone .hiden')._nodes.length).toEqual(3);
            });
        });

        describe("on do action, with params. ", function() {
            beforeEach(function(done) {
                var dataAnijJS = 'if: click, do: $addClass hiden, to: $children target, after: $afterFunction';
                AniJSTest.Utils.settingHelper(dataAnijJS, done, 3)
            });

            it("add hiden class to all div class='childrenTest' children ", function() {
                expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                expect(Y.all('#testzone .hiden')._nodes.length).toEqual(3);
            });
        });

        describe("on do action, with params. ", function() {
            beforeEach(function(done) {
                var dataAnijJS = 'if: click, do: $addClass hiden, to: $children target | li, after: $afterFunction';
                AniJSTest.Utils.settingHelper(dataAnijJS, done, 0)
                done();
            });

            it("add hiden class to all div children that are li", function() {
                expect(AniJSDefaultHelper.afterFunction).not.toHaveBeenCalled();
                expect(Y.all('#testzone .hiden')._nodes.length).toEqual(0);
            });
        });

        describe("on do action, with params. ", function() {
            beforeEach(function(done) {
                var dataAnijJS = 'if: click, do: $addClass hiden, to: $children div, after: $afterFunction';
                AniJSTest.Utils.settingHelper(dataAnijJS, done, 3)
            });

            it("add hiden class to all div children ", function() {
                expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                Y.all('#testzone .hiden');
                expect(Y.all('#testzone .hiden')._nodes.length).toEqual(3);
            });
        });


    });
});