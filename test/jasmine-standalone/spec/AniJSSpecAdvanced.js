YUI().use('node', 'node-event-simulate', function (Y) {
    describe("AniJS Advanced", function() {

        //Aqui se pueden poner variables para tener acceso globalmente


        //Funcion que se ejecuta antes de empezar
        beforeEach(function() {

        });

        afterEach(function() {

        });

        //---------------------------------------------------------------------
        // Change the root DOM scope.
        //---------------------------------------------------------------------
        describe("Change the root DOM scope.", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
            });

            it("dont existed DOM Scope", function() {
                AniJS.setDOMRootTravelScope('.dontExisted');
                expect(AniJS.rootDOMTravelScope == document).toBeTruthy();
            });

            it("empty DOM selector Scope", function() {
                AniJS.setDOMRootTravelScope('');
                expect(AniJS.rootDOMTravelScope == document).toBeTruthy();
            });

            it("new DOM selector Scope", function() {
                AniJS.setDOMRootTravelScope('.test');
                expect(AniJS.rootDOMTravelScope == document).toBeFalsy();

                Y.one('body').appendChild('<div class="outsideselector">Outside Selector</div>');
                var dataAnijJS = 'do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('.outsideselector');
                targetNode.setAttribute('data-anijs', dataAnijJS);

                   targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                    AniJS.setDOMRootTravelScope('document');
                },this, true);

                targetNode.simulate("click");
            });

            //TODO:
            it("//TODO", function() {

            });
        });

        //---------------------------------------------------------------------
        // Running AniJS repeatedly.
        //---------------------------------------------------------------------
        describe("Running AniJS repeatedly.", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
            });

            it("ten times", function() {
                for (var i = 1; i < 10; i++) {
                    var dataAnijJS = 'if: click, do: bounce, to: body',
                        targetNode;

                    targetNode = Y.one('#testzone .test');
                    targetNode.setAttribute('data-anijs', dataAnijJS);
                    AniJS.run();

                    expect(AniJS.eventCollection[i]).not.toBeNull();
                }
            });
            //TODO: Memory leaks here
            it("hundred times", function() {
                for (var i = 1; i < 100; i++) {
                    var dataAnijJS = 'if: click, do: bounce, to: body',
                        targetNode;

                    targetNode = Y.one('#testzone .test');

                    targetNode.setAttribute('data-anijs', dataAnijJS);

                     AniJS.run();

                    expect(AniJS.eventCollection[i]).not.toBeNull();
                }
            });

            //TODO:
            it("//TODO", function() {

            });
        });

        //---------------------------------------------------------------------
        // animationEnd and transitionEnd normalization.
        //---------------------------------------------------------------------
        describe("animationEnd and transitionEnd normalization", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
            });
            //TODO:
            it("//TODO", function() {

            });
        });

        //---------------------------------------------------------------------
        // Attach events from window and document objects
        //---------------------------------------------------------------------
        describe("Attach events from window and document objects", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
            });
            //TODO:
            it("//TODO", function() {

            });
        });


    });
});




