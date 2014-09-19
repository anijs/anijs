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
    describe("when execute before or after functions with parameters", function() {
        //Aqui se pueden poner variables para tener acceso globalmente


        describe("and the type of function is (before)", function() {
            var paramsN, paramsArray = [];
            beforeEach(function() {
                var paramsLength = Math.round( Math.random(10) * 100 )
                paramsN = "";
                while(paramsLength-- > 1) {
                    paramsN += "test"+ paramsLength + " | ";
                }
                paramsN += "test"+ paramsLength;

                var paramsArrayTmp = paramsN.split("|");
                paramsLength = paramsArrayTmp.length;

                 while(paramsLength-- > 0) {
                    paramsArray[paramsLength] = paramsArrayTmp[paramsLength].trim();
                 }
            });
            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
                Y.one('body').removeClass('animated');
                paramsN = "";
                paramsArray = [];
            });
            describe("when the before helper function no execute the context run", function() {
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
                it("then the interaction will do not occours", function() {
                    expect(Y.one('body').hasClass('bounce') === false).toBeTruthy();
                });
            });
            describe("and the before function is setting without params", function() {
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
                it("entonces la funcion no recibe parametros al ser invocada", function() {
                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.beforeFunction).toHaveBeenCalled();

                    //Permite chequear con que argumentos se ha llamado la funcion
                    //Es un array
                    expect(AniJSDefaultHelper.beforeFunction.calls.argsFor(0)[2].length).toEqual(0);
                });
            });
            describe("and the before function is setting with (1 param) cuyo valor es (test)", function() {
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce, to: body, before: $beforeFunction test',
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
                it("entonces la funcion es invocada con un parametro cuyo valor es test", function() {
                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.beforeFunction).toHaveBeenCalled();

                    //Chequeamos con cuantos argumentos fue llamada la funcion
                    expect(AniJSDefaultHelper.beforeFunction.calls.argsFor(0)[2].length).toEqual(1);

                    //Chequeamos que el argumento sea == test
                    expect(AniJSDefaultHelper.beforeFunction.calls.argsFor(0)[2][0]).toEqual("test");
                });
            });
            describe("and the before function is setting with (2 param) cuyos valores son (test) | (test2)", function() {
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, do: bounce, to: body, before: $beforeFunction test | test2',
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
                it("entonces la funcion es invocada con (2) parametros cuyos valores son test y test2", function() {
                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.beforeFunction).toHaveBeenCalled();

                    //Chequeamos con cuantos argumentos fue llamada la funcion
                    expect(AniJSDefaultHelper.beforeFunction.calls.argsFor(0)[2].length).toEqual(2);

                    //Chequeamos que el argumento sea == test
                    expect(AniJSDefaultHelper.beforeFunction.calls.argsFor(0)[2][0]).toEqual("test");
                    expect(AniJSDefaultHelper.beforeFunction.calls.argsFor(0)[2][1]).toEqual("test2");
                });
            });
            describe("and the before function is setting with (N params)", function() {
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, do: bounce, to: body, before: $beforeFunction ' + paramsN,
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
                it("entonces la funcion es invocada con (n) parametros", function() {

                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.beforeFunction).toHaveBeenCalled();

                    var params = AniJSDefaultHelper.beforeFunction.calls.argsFor(0)[2];

                    //Chequeamos con cuantos argumentos fue llamada la funcion
                    expect(params.length).toEqual(params.length);

                    expect(params.length == paramsArray.length).toBeTruthy();
                    var i = paramsArray.length;
                    while(i-- > 0) {
                        expect(params[i] ===  paramsArray[i]).toBeTruthy();
                    }
                });
            });
        });

        describe("and the type of function is (after)", function() {
            var paramsN, paramsArray = [];
            beforeEach(function() {
                var paramsLength = Math.round( Math.random(10) * 100 )
                paramsN = "";
                while(paramsLength-- > 1) {
                    paramsN += "test"+ paramsLength + " | ";
                }
                paramsN += "test"+ paramsLength;

                var paramsArrayTmp = paramsN.split("|");
                paramsLength = paramsArrayTmp.length;

                 while(paramsLength-- > 0) {
                    paramsArray[paramsLength] = paramsArrayTmp[paramsLength].trim();
                 }
            });
            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
                Y.one('body').removeClass('animated');
                paramsN = "";
                paramsArray = [];
            });
            describe("and the after function is setting without params", function() {
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce animated 0param, to: body, after: $afterFunction',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    //Se agrega una funcion after
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
                it("entonces la funcion no recibe parametros al ser invocada", function() {
                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();

                    //Permite chequear con que argumentos se ha llamado la funcion
                    //Es un array
                    expect(AniJSDefaultHelper.afterFunction.calls.argsFor(0)[2].length).toEqual(0);
                });
            });
            describe("and the after function is setting with (1 param) cuyo valor es (test)", function() {
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce animated 1param, to: body, after: $afterFunction test',
                        targetNode,
                        AniJSDefaultHelper;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    //Se agrega una funcion after
                    AniJSDefaultHelper.afterFunction = function(e, animationContext){
                        //Permite seguir con las pruebas
                        done();
                    };

                    // Ponemos un spy a dicha funcion para saber cuando se llama
                    // y con que parametros etc
                    // http://jasmine.github.io/2.0/introduction.html#section-Spies
                    // callThrough luego ejecuta el comportamiento por defecto
                    spyOn(AniJSDefaultHelper, 'afterFunction').and.callThrough();

                    AniJS.run();


                    //Simulamos el evento click
                    targetNode.simulate("click");
                });
                it("entonces la funcion es invocada con un parametro cuyo valor es test", function() {
                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();

                    //Chequeamos con cuantos argumentos fue llamada la funcion
                    expect(AniJSDefaultHelper.afterFunction.calls.argsFor(0)[2].length).toEqual(1);

                    //Chequeamos que el argumento sea == test
                    expect(AniJSDefaultHelper.afterFunction.calls.argsFor(0)[2][0]).toEqual("test");
                });
            });
            describe("and the after function is setting with (2 param) cuyos valores son (test) | (test2)", function() {
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, do: bounce animated 2param, to: body, after: $afterFunction test | test2',
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    //Se agrega una funcion after
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
                it("entonces la funcion es invocada con (2) parametros cuyos valores son test y test2", function() {
                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();

                    //Chequeamos con cuantos argumentos fue llamada la funcion
                    expect(AniJSDefaultHelper.afterFunction.calls.argsFor(0)[2].length).toEqual(2);

                    //Chequeamos que el argumento sea == test
                    expect(AniJSDefaultHelper.afterFunction.calls.argsFor(0)[2][0]).toEqual("test");
                    expect(AniJSDefaultHelper.afterFunction.calls.argsFor(0)[2][1]).toEqual("test2");
                });
            });
            describe("and the after function is setting with (N params)", function() {
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                var dataAnijJS = 'if: click, do: bounce animated, to: body, after: $afterFunction ' + paramsN,
                    targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    //Se agrega una funcion after
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
                it("entonces la funcion es invocada con (n) parametros", function() {

                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();

                    var params = AniJSDefaultHelper.afterFunction.calls.argsFor(0)[2];

                    //Chequeamos con cuantos argumentos fue llamada la funcion
                    expect(params.length).toEqual(paramsArray.length);

                    var i = paramsArray.length;
                    while(i-- > 0) {
                        expect(params[i] ===  paramsArray[i]).toBeTruthy();
                    }
                });
            });
        });

        //---------------------------------------------------------------------
        // Execute a function after with params
        //---------------------------------------------------------------------
        describe("and are execute the (before) function and (after) function", function() {
            var paramsN, paramsArray = [];
            beforeEach(function() {
                var paramsLength = Math.round( Math.random(10) * 100 )
                paramsN = "";
                while(paramsLength-- > 1) {
                    paramsN += "test"+ paramsLength + " | ";
                }
                paramsN += "test"+ paramsLength;

                var paramsArrayTmp = paramsN.split("|");
                paramsLength = paramsArrayTmp.length;

                 while(paramsLength-- > 0) {
                    paramsArray[paramsLength] = paramsArrayTmp[paramsLength].trim();
                 }
            });
            afterEach(function() {
                Y.one('#testzone .test').remove();
                Y.one('body').removeClass('bounce');
                Y.one('body').removeClass('animated');
                paramsN = "";
                paramsArray = [];
            });

            describe("cuando las funciones son configuradas con (0) parametros", function() {
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce animated, to: body, after: $afterFunction, before: $beforeFunction',
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    AniJS.getHelper().afterFunction = function(e, animationContext, params) {
                        done();
                    };

                    AniJS.getHelper().beforeFunction = function(e, animationContext, params) {
                        animationContext.run();
                    };

                    // Ponemos un spy a dicha funcion para saber cuando se llama
                    // y con que parametros etc
                    // http://jasmine.github.io/2.0/introduction.html#section-Spies
                    // callThrough luego ejecuta el comportamiento por defecto
                    spyOn(AniJSDefaultHelper, 'beforeFunction').and.callThrough();
                    spyOn(AniJSDefaultHelper, 'afterFunction').and.callThrough();

                    //corremos AniJS
                    AniJS.run();

                    //Simulamos el evento click
                    targetNode.simulate("click");
                });
                it("entonces la funcion es invocada con (0) parametros", function() {
                    var params;

                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.beforeFunction).toHaveBeenCalled();
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();

                    params = AniJSDefaultHelper.beforeFunction.calls.argsFor(0)[2];
                    //Chequeamos con cuantos argumentos fue llamada la funcion
                    expect(params.length).toEqual(0);

                    params = AniJSDefaultHelper.afterFunction.calls.argsFor(0)[2];
                    //Chequeamos con cuantos argumentos fue llamada la funcion
                    expect(params.length).toEqual(0);
                });
            });

            describe("cuando las funciones son configuradas con (n) parametros", function() {
                beforeEach(function(done) {
                    //Se configuran las precondiciones para la prueba
                    var dataAnijJS = 'if: click, do: bounce animated, to: body, after: $afterFunction '
                                        + paramsN + ', before: $beforeFunction ' + paramsN ,
                        targetNode;

                    targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                    //Se obtiene el helper por defecto
                    AniJSDefaultHelper = AniJS.getHelper();

                    AniJS.getHelper().afterFunction = function(e, animationContext, params) {
                        done();
                    };

                    AniJS.getHelper().beforeFunction = function(e, animationContext, params) {
                        animationContext.run();
                    };

                    // Ponemos un spy a dicha funcion para saber cuando se llama
                    // y con que parametros etc
                    // http://jasmine.github.io/2.0/introduction.html#section-Spies
                    // callThrough luego ejecuta el comportamiento por defecto
                    spyOn(AniJSDefaultHelper, 'beforeFunction').and.callThrough();
                    spyOn(AniJSDefaultHelper, 'afterFunction').and.callThrough();

                    //corremos AniJS
                    AniJS.run();

                    //Simulamos el evento click
                    targetNode.simulate("click");
                });
                it("entonces la funcion es invocada con (n) parametros", function() {
                    var params;

                    //Permite comprobar que la funcion se ha llamado correctamente
                    expect(AniJSDefaultHelper.beforeFunction).toHaveBeenCalled();
                    expect(AniJSDefaultHelper.afterFunction).toHaveBeenCalled();

                    params = AniJSDefaultHelper.beforeFunction.calls.argsFor(0)[2];

                    //Chequeamos con cuantos argumentos fue llamada la funcion
                    expect(params.length).toEqual(paramsArray.length);

                    var i = paramsArray.length;
                    while(i-- > 0) {
                        expect(params[i] ===  paramsArray[i]).toBeTruthy();
                    }

                    params = AniJSDefaultHelper.afterFunction.calls.argsFor(0)[2];
                    //Chequeamos con cuantos argumentos fue llamada la funcion
                    expect(params.length).toEqual(paramsArray.length);

                    i = paramsArray.length;
                    while(i-- > 0) {
                        expect(params[i] ===  paramsArray[i]).toBeTruthy();
                    }
                });
            });
        });

    });
});




