YUI().use('node', 'node-event-simulate', function (Y) {
    var AniJSTest = {
        Utils:{}
    };
    describe("AniJS", function() {

        //Aqui se pueden poner variables para tener acceso globalmente


        //Funcion que se ejecuta antes de empezar
        beforeEach(function() {

        });

        afterEach(function() {

        });

        //---------------------------------------------------------------------
        // Define a trigger event for the animation
        //---------------------------------------------------------------------
        describe("Define a trigger event for the animation", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
            });

            it("sin la sentencia", function() {
                var dataAnijJS = 'do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                },this, true);

                targetNode.simulate("click");
            });

            it("con el evento vacio", function() {
                var dataAnijJS = 'if: , do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                },this, true);

                targetNode.simulate("click");
            });

            it("con eventos que no existan", function() {
                var dataAnijJS = 'if: pepe, do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                },this, true);

                targetNode.simulate("click");
            });

            it("con eventos reales", function() {
                var dataAnijJS = 'if: click, do: bounce, to: body',
                    targetNode;

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
        // Define the event emiter element
        //---------------------------------------------------------------------
        describe("Define the event emiter element", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });
            it("sin la sentencia", function() {
                var dataAnijJS = 'if: click, do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });

            it("with empty selector", function() {
                var dataAnijJS = 'if: click, on: , do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });

            it("con selectores que no existan", function() {
                var dataAnijJS = 'if: click, on: .ghostnode, do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                },this, true);

                targetNode.simulate("click");
            });

            it("con ugly selectores", function() {
                var dataAnijJS = 'if: click, on: $/03wew, do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e) {
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                },this, true);

                targetNode.simulate("click");
            });

            it("con selectores reales", function() {
                var dataAnijJS = 'if: click, on: .test, do: bounce, to: body',
                    targetNode;

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
        // Animation behavior definition
        //---------------------------------------------------------------------
        describe("Animation behavior definition", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            it("with empty behavior", function() {
                var dataAnijJS = 'if: click, on: , do: , to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                },this, true);

                targetNode.simulate("click");
            });

            it("with existed behavior", function() {
                var dataAnijJS = 'if: click, on: , do: flipIn, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(Y.one('body').hasClass('flipIn')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });

        });

        //---------------------------------------------------------------------
        // Animation elements target definition
        //---------------------------------------------------------------------
        describe("Animation elements target definition", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            it("sin la sentencia", function() {
                var dataAnijJS = 'if: click, do: bounce',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(targetNode.hasClass('bounce')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });

            it("with empty selector", function() {
                var dataAnijJS = 'if: click, do: bounce, to: ',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(targetNode.hasClass('bounce')).toBeTruthy();
                },this, true);

                targetNode.simulate("click");
            });

            it("con selectores que no existan", function() {
                var dataAnijJS = 'if: click, do: bounce, to: unkonowk',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(targetNode.hasClass('bounce')).toBeFalsy();
                },this, true);

                targetNode.simulate("click");
            });

            it("con ugly selectores", function() {
                var dataAnijJS = 'if: click, do: bounce, to: $/03wew',
                    targetNode;

                targetNode = Y.one('#testzone .test');

                targetNode.setAttribute('data-anijs', dataAnijJS);

                AniJS.run();

                targetNode.on('click', function(e){
                    expect(targetNode.hasClass('bounce')).toBeFalsy();
                },this, true);

                targetNode.simulate("click");
            });

            it("con selectores reales", function() {
                var dataAnijJS = 'if: click, on: .test, do: bounce, to: body',
                    targetNode;

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
            describe('the function has', function(){
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce, to: body, before: $beforeFunction paramA',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    //Se agrega una funcion before
                    AniJSDefaultHelper.beforeFunction = function(e, animationContext){
                        animationContext.run();
                        //Permite seguir con las pruebas
                        done();
                    };

                    // Ponemos un spy a dicha funcion para saber cuando se llama
                    // y con que parametros etc
                    // http://jasmine.github.io/2.0/introduction.html#section-Spies
                    // callThrough luego ejecuta el comportamiento por defecto
                    spyOn(AniJSDefaultHelper, 'beforeFunction').and.callThrough();

                    //corremos AniJS
                    AniJS.run();

                    //Simulamos el evento click
                    targetNode.simulate("click");
                });
                it("one param", function() {
                    // Tip: Dentro de los it solamente deberian ir expect sino es que hay algo mal

                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.beforeFunction).toHaveBeenCalled();

                    //Permite chequear con que argumentos se ha llamado la funcion
                    //[2] Indica que es el 3 argumento
                    expect(AniJSDefaultHelper.beforeFunction.calls.argsFor(0)[2]).toEqual(['paramA']);
                });
            });

        });

        //---------------------------------------------------------------------
        // Animation execution management before running it
        //---------------------------------------------------------------------
        describe("Animation execution management before running it.", function() {

            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            describe('when stop the animation execution', function(){
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce, to: body, before: $beforeFunction',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    //Se agrega una funcion before
                    AniJSDefaultHelper.beforeFunction = function(e, animationContext){
                        //Permite seguir con las pruebas
                        done();
                    };

                    // Ponemos un spy a dicha funcion para saber cuando se llama
                    // y con que parametros etc
                    // http://jasmine.github.io/2.0/introduction.html#section-Spies
                    // callThrough luego ejecuta el comportamiento por defecto
                    spyOn(AniJSDefaultHelper, 'beforeFunction').and.callThrough();

                    //corremos AniJS
                    AniJS.run();

                    //Simulamos el evento click
                    targetNode.simulate("click");
                });

                it("then the animation it's not executed", function() {
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                });
            });

            describe('when run the animation execution', function(){
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce, to: body, before: $beforeFunction',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    //Se agrega una funcion before
                    AniJSDefaultHelper.beforeFunction = function(e, animationContext){
                        animationContext.run();
                        //Permite seguir con las pruebas
                        done();
                    };

                    // Ponemos un spy a dicha funcion para saber cuando se llama
                    // y con que parametros etc
                    // http://jasmine.github.io/2.0/introduction.html#section-Spies
                    // callThrough luego ejecuta el comportamiento por defecto
                    spyOn(AniJSDefaultHelper, 'beforeFunction').and.callThrough();

                    //corremos AniJS
                    AniJS.run();

                    //Simulamos el evento click
                    targetNode.simulate("click");
                });

                it("then the animation is executed", function() {
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                });
            });
        });

        //---------------------------------------------------------------------
        // Execute a function after animation run
        //---------------------------------------------------------------------
        describe("Execute a function after animation run", function() {
            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            describe("and it's empty", function() {
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce animated, to: body, after: $afterFunction',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    //Se agrega una funcion before
                    AniJSDefaultHelper.afterFunction = function(e, animationContext){
                        //Permite seguir con las pruebas
                        done();
                    };

                    // Ponemos un spy a dicha funcion para saber cuando se llama
                    // y con que parametros etc
                    // http://jasmine.github.io/2.0/introduction.html#section-Spies
                    // callThrough luego ejecuta el comportamiento por defecto
                    spyOn(AniJSDefaultHelper, 'afterFunction').and.callThrough();

                    //corremos AniJS
                    AniJS.run();

                    //Simulamos el evento click
                    targetNode.simulate("click");
                });

                it("then the function is executed", function() {
                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                });
            });

            describe("and the function is non registered ", function() {
                beforeEach(function(done){
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce animated, to: body, after: $afterNonRegistered',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    //corremos AniJS
                    AniJS.run();

                    targetNode.on('click', function(e){
                        done();
                    },this, true);

                    //Simulamos el evento click
                    targetNode.simulate("click");
                });
                //Se espera que no cree la funcion
                it("then the function not to be created", function() {
                    expect(AniJS.getHelper['afterNonRegistered']).toBeFalsy();
                });
            });

        });

        //---------------------------------------------------------------------
        // Helpers instance definition.
        //---------------------------------------------------------------------
        describe("Helpers instance definition.", function() {
            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            describe("when the helper it's empty", function() {
                beforeEach(function(done){
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce, to: body, before: $beforeFunction, helper: emptyHelper',
                        targetNode,
                        emptyHelper = '';

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Registramos un helper vacio
                    AniJS.registerHelper('emptyHelper', emptyHelper);

                    //corremos AniJS
                    AniJS.run();

                    targetNode.on('click', function(e){
                        done();
                    },this, true);

                    //Simulamos el evento click
                    targetNode.simulate("click");
                });
                //Se espera que no cree la funcion
                it("then a new helper could not be created", function() {
                    expect(AniJS.getHelper['emptyHelper']).toBeUndefined();
                });
            });

            describe("when the helper is a function", function() {
                beforeEach(function(done){
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce, to: body, before: $beforeFunction, helper: emptyHelper',
                        targetNode,
                        emptyHelper;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);


                    emptyHelper = function(){};

                    //Registramos un helper vacio
                    AniJS.registerHelper('emptyHelper', emptyHelper);

                    //corremos AniJS
                    AniJS.run();

                    targetNode.on('click', function(e){
                        done();
                    },this, true);

                    //Simulamos el evento click
                    targetNode.simulate("click");
                });
                //Se espera que no cree la funcion
                it("then a new helper could not be created", function() {
                    expect(AniJS.getHelper['emptyHelper']).toBeUndefined();
                });
            });
        });
    });

    AniJSTest.Utils.settingEnviroment = function(dataAnijJS){
        var htmlNode = '<div class="test">Test</div>',
            targetNode;

        //Ponemos el nodo en la zona de pruebas
        Y.one('#testzone').appendChild(htmlNode);
        targetNode = Y.one('#testzone .test');
        targetNode.setAttribute('data-anijs', dataAnijJS);
        return targetNode;
    };
});




