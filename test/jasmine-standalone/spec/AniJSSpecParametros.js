YUI().use('node', 'node-event-simulate', function (Y) {
    describe("AniJS", function() {

        //Aqui se pueden poner variables para tener acceso globalmente


        //Funcion que se ejecuta antes de empezar
        beforeEach(function() {

        });

        afterEach(function() {

        });

        // Execute a function before animation run
        //---------------------------------------------------------------------
        describe("Execute a function before animation run", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            it("empty function", function() {
                var dataAnijJS = 'if: click, do: bounce, to: body, before: beforeFunction',
                    targetNode;

                AniJS.getHelper().beforeFunction = function(){
                    expect(true).toBeTruthy();
                };

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                },this, true);

                targetNode.simulate("click");
            });

            //Se espera que no cree la funcion
            it("non registered function", function() {
                var dataAnijJS = 'if: click, do: bounce, to: body, before: beforeNonRegistered',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                expect(AniJS.getHelper['beforeNonRegistered']).toBeFalsy();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });

            //Registered var with same function name
            it("registered var with same function name", function() {
                var dataAnijJS = 'if: click, do: bounce, to: body, before: beforeVarSameName',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.getHelper().beforeVarSameName = '23';

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });
        });

        //---------------------------------------------------------------------
        // Animation execution management before running it
        //---------------------------------------------------------------------
        describe("Animation execution management before running it.", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            it("stop animation execution", function() {
                var dataAnijJS = 'if: click, do: bounce, to: body, before: beforeFunction',
                    targetNode;

                AniJS.getHelper().beforeFunction = function(e, animationContext){
                    expect(true).toBeTruthy();

                    //animationContext.run();
                };

                targetNode = Y.one('#testzone .test');
                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                },this, true);

                targetNode.simulate("click");
            });

            it("run animation execution", function() {
                var dataAnijJS = 'if: click, do: bounce, to: body, before: beforeFunction',
                    targetNode;

                AniJS.getHelper().beforeFunction = function(e, animationContext){
                    expect(true).toBeTruthy();
                    animationContext.run();
                };

                targetNode = Y.one('#testzone .test');
                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });
        });

        //---------------------------------------------------------------------
        // Execute a function after animation run
        //---------------------------------------------------------------------
        describe("Execute a function after animation run", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            it("empty function", function() {
                var dataAnijJS = 'if: click, do: bounce, to: body, after: afterFunction',
                    targetNode;

                AniJS.getHelper().afterFunction = function(){
                    console.log('haciendo after function');
                };

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });

            //Se espera que no cree la funcion
            it("non registered function", function() {
                var dataAnijJS = 'if: click, do: bounce, to: body, after: afterNonRegistered',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                expect(AniJS.getHelper['afterNonRegistered']).toBeFalsy();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });

            //Registered var with same function name
            it("registered var with same function name", function() {
                var dataAnijJS = 'if: click, do: bounce, to: body, after: afterVarSameName',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.getHelper().afterVarSameName = '23';

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });
        });

    });
});




