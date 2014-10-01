YUI().use('node', 'node-event-simulate', function (Y) {
    var AniJSTest = {
        Utils:{}
    };

    AniJSTest.Utils.settingEnviroment = function(dataAnijJS){
        var htmlNode = '<div class="test">Test</div>',
            targetNode;

        //Ponemos el nodo en la zona de pruebas
        Y.one('#testzone').appendChild(htmlNode);
        targetNode = Y.one('#testzone .test');
        targetNode.setAttribute('data-anijs', dataAnijJS);
        return targetNode;
    };

    describe("AniJS", function() {

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
                    var dataAnijJS = 'if: click, do: bounce, to: body, before: $beforeFunction, after: $afterFunction',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    //Se agrega una funcion before
                    AniJSDefaultHelper.beforeFunction = function(e, animationContext, params){
                        animationContext.run();
                    };

                    AniJSDefaultHelper.afterFunction = function(e, animationContext, params){
                        done();
                    };

                    spyOn(AniJSDefaultHelper, 'beforeFunction').and.callThrough();
                    spyOn(AniJSDefaultHelper, 'afterFunction').and.callThrough();

                    //corremos AniJS
                    AniJS.run();

                    //Simulamos el evento click
                    targetNode.simulate("click");
                });

                it("then the animation is executed", function() {
                    expect(AniJSDefaultHelper.beforeFunction).toHaveBeenCalled();
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
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
});




