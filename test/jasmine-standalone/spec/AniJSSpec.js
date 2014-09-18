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
            afterEach(function() {
                Y.one('#testzone .test').remove();
            });

            describe('y no se pone la sentencia (if) en la definicion', function(){
                beforeEach(function() {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'do: bounce, to: body',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //corremos AniJS
                    AniJS.run();
                });

                it("entonces NO es registrado al manejador de eventos", function() {
                    expect(AniJS.EventSystem.eventIdCounter).toBe(0);
                });
            });

            describe('la sentencia (if) en la definicion se pone con un evento vacio', function(){
                beforeEach(function() {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: ,do: bounce, to: body',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //corremos AniJS
                    AniJS.run();
                });

                it("entonces NO es registrado al manejador de eventos", function() {
                    expect(AniJS.EventSystem.eventIdCounter).toBe(0);
                });
            });

            describe('la sentencia (if) en la definicion se pone con un evento que no existe de acuerdo al standar', function(){
                beforeEach(function() {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: notExist, do: bounce, to: body',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //corremos AniJS
                    AniJS.run();
                });

                it("entonces SI es registrado al manejador de eventos", function() {
                    expect(AniJS.EventSystem.eventIdCounter).toBe(1);
                });
            });

            describe('la sentencia (if) en la definicion se pone con un evento real', function(){
                beforeEach(function() {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce, to: body',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //corremos AniJS
                    AniJS.run();
                });

                it("entonces SI es registrado al manejador de eventos", function() {
                    expect(AniJS.EventSystem.eventIdCounter).toBe(2);
                });
            });
        });

        //---------------------------------------------------------------------
        // Define the event emiter element
        //---------------------------------------------------------------------
        describe("Define the event emiter element", function() {
            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            describe('y no se pone la sentencia (on) en la definicion', function(){
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, do: bounce animated, to: body, after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy(done);

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion es ejecutada cuando cuando el evento es disparado por el propio nodo", function() {
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                });
            });

            describe('y se pone la sentencia (on) con un selector vacio', function(){
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, on: ,do: bounce animated, to: body, after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy(done);

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion es ejecutada cuando cuando el evento es disparado por el propio nodo", function() {
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                });
            });

            describe('y se pone la sentencia (on) con selectores que no existan', function(){
                beforeEach(function() {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, on: .ghostnode, do: bounce animated, to: body, after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy();

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion NO ejecutada", function() {
                    expect(AniJSDefaultHelper.afterFunction.calls.count()).toEqual(0);
                });
            });

            describe('y se pone la sentencia (on) con selectores Uglys', function(){
                beforeEach(function() {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, on: $/03wew, do: bounce animated, to: body, after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy();

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion NO ejecutada", function() {
                    expect(AniJSDefaultHelper.afterFunction.calls.count()).toEqual(0);
                });
            });

            describe('y se pone la sentencia (on) con selectores Reales', function(){
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, on: .test, do: bounce animated, to: body, after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy(done);

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion SI es ejecutada", function() {
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                });
            });
        });

        // //---------------------------------------------------------------------
        // // Animation behavior definition
        // //---------------------------------------------------------------------
        describe("Animation behavior definition", function() {
            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            describe('y se pone la sentencia (do) con un comportamiento vacio', function(){
                beforeEach(function() {
                //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, on: , do: , to: body',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy();

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion No es ejecutada", function() {
                    expect(AniJSDefaultHelper.afterFunction.calls.count()).toEqual(0);
                    expect(Y.one('body').hasClass('bounce')).toBeFalsy();
                });
            });

            describe('y se pone la sentencia (do) con un comportamiento que esta definido', function(){
                beforeEach(function(done) {
                //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, do: bounce animated, to: body, after:$afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy(done);

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion SI es ejecutada", function() {
                    expect(AniJSDefaultHelper.afterFunction.calls.count()).toEqual(1);
                });
            });
        });

        // //---------------------------------------------------------------------
        // // Animation elements target definition
        // //---------------------------------------------------------------------
        describe("Animation elements target definition", function() {
            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
            });

            describe('y no se pone la sentencia (to) en la definicion', function(){
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, do: bounce, after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy(done);

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion es ejecutada sobre el propio nodo que dispara el evento", function() {
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                    //TODO: Falta chequear que verdaderamente se haga sobre ese nodo
                });
            });
            describe('y se pone la sentencia (to) con un selector vacio', function(){
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, do: bounce animated, to: , after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy(done);

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion es ejecutada sobre el propio nodo que dispara el evento", function() {
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                });
            });

            describe('y se pone la sentencia (to) con selectores que no existan', function(){
                beforeEach(function() {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, do: bounce animated, to: unkonowk, after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy();

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion NO ejecutada", function() {
                    expect(AniJSDefaultHelper.afterFunction.calls.count()).toEqual(0);
                });
            });

            describe('y se pone la sentencia (to) con selectores Uglys', function(){
                beforeEach(function() {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, do: bounce animated, to: $/03wew, after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy();

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion NO ejecutada", function() {
                    expect(AniJSDefaultHelper.afterFunction.calls.count()).toEqual(0);
                });
            });

            describe('y se pone la sentencia (to) con selectores Reales', function(){
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, on: .test, do: bounce animated, to: body, after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSTest.Utils.settingAfterFunctionSpy(done);

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces la interaccion SI es ejecutada", function() {
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
                });
            });
            describe('y se pone la sentencia (to) con una funcion ayudante de tipo parent', function(){
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, on: .test, do: bounce animated, to: $testFunction .test, after: $afterFunction',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    AniJSDefaultHelper = AniJS.getHelper();
                    AniJSDefaultHelper.testFunction = function(e, animationContext, params) {
                        return [e.target];
                    };


                    AniJSTest.Utils.settingAfterFunctionSpy(done);

                    //corremos AniJS
                    AniJS.run();

                    targetNode.simulate("click");
                });

                it("entonces los nodos incluidos en behaviorTarget list son los devueltos por dicha funcion", function() {
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();
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

    AniJSTest.Utils.settingAfterFunctionSpy = function(callback){
        //Se obtiene el helper por defecto
        AniJSDefaultHelper = AniJS.getHelper();

        //Se agrega una funcion before
        AniJSDefaultHelper.afterFunction = function(e, animationContext){
            //Permite seguir con las pruebas
            if(callback){
                callback();
            }
        };

        // Ponemos un spy a dicha funcion para saber cuando se ejecuta la animacion
        spyOn(AniJSDefaultHelper, 'afterFunction').and.callThrough();
    };
});




