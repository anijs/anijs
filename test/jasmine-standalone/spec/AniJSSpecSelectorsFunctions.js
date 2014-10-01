YUI().use('node', 'node-event-simulate', function (Y) {
    var AniJSTest = {
        Utils:{}
    };
    AniJSTest.Utils.settingAfterFunctionSpy = function(callback, count){
        //Se obtiene el helper por defecto
        AniJSDefaultHelper = AniJS.getHelper();

        //Se agrega una funcion before
        AniJSDefaultHelper.afterFunction = function(e, animationContext){
            //Permite seguir con las pruebas
            if(count && count > 1){
                count--;
            } else{
                callback();
            }
        };

        // Ponemos un spy a dicha funcion para saber cuando se ejecuta la animacion
        spyOn(AniJSDefaultHelper, 'afterFunction').and.callThrough();
    };

    AniJSTest.Utils.settingHelperFunctionSpy = function(name){
        //Se obtiene el helper por defecto
        AniJSDefaultHelper = AniJS.getHelper();

        // Ponemos un spy a dicha funcion para saber cuando se ejecuta la animacion
        spyOn(AniJSDefaultHelper, name).and.callThrough();
    };



    AniJSTest.Utils.settingEnviroment = function(dataAnijJS, targetNodeSelector){
        var htmlNode = '<div class="test">' +
                            '<div class="a">' +
                                'a' +
                                '<div class="a-1" id="contenedor">' +
                                    'a-1' +
                                    '<ul id="a-1-2">' +
                                        '<li class="a-1-2-3">' +
                                            'a-1-2-3' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                        '</div>',
            targetNode,
            selector = targetNodeSelector || '.a-1-2-3';

        //Ponemos el nodo en la zona de pruebas
        Y.one('#testzone').appendChild(htmlNode);

        targetNode = Y.one('#testzone ' + selector);
        targetNode.setAttribute('data-anijs', dataAnijJS);
        return targetNode;
    };

    describe("AniJS", function() {
        afterEach(function() {
            AniJS.purgeAll();
            Y.one('#testzone .test').remove();
            Y.one('body').removeClass('bounce');
            Y.all(".testingBehavior").removeClass('testingBehavior');
        });
        describe('cuando se usan como selectores (to) [selectores CSS]', function(){
            beforeEach(function(done){
                var dataAnijJS = 'if: click, do: bounce animated, to: .a-1-2-3, after: $afterFunction',
                    targetNode;

                targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                AniJSTest.Utils.settingAfterFunctionSpy(done);

                //corremos AniJS
                AniJS.run();

                //Simulamos el evento click
                targetNode.simulate("click");
            });
            it('entonces son seleccionados los elementos que matcheen con dicho selector', function(){
                var animationContext = AniJSDefaultHelper.afterFunction.calls.argsFor(0)[1];
                expect(animationContext.behaviorTargetList.length).toEqual(1);
                expect(Y.one(animationContext.behaviorTargetList[0]).hasClass('a-1-2-3')).toBeTruthy();
            });
        });
        describe('cuando se usan como selectores (to) [funciones ayudante]', function(){
            describe('y esa funcion es de tipo $parent', function(){
                describe('cuando no recibe parametros', function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, do: $addClass testingBehavior, to: $parent, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                        AniJSTest.Utils.settingAfterFunctionSpy(done);

                        AniJSTest.Utils.settingHelperFunctionSpy('parent');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        targetNode.simulate("click");
                    });
                    it('entonces se devuelve el padre del elemento que es propietario de la' +
                        'definicion data-anijs', function(){
                        expect(AniJSDefaultHelper.parent).toHaveBeenCalled();
                        expect(Y.one("#a-1-2").hasClass('testingBehavior')).toBeTruthy();

                    });
                });
                describe('cuando recibe 1 parametro cuyo valor es "target"', function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, on: #contenedor,do: $addClass testingBehavior, to: $parent target, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                        AniJSTest.Utils.settingAfterFunctionSpy(done);

                        AniJSTest.Utils.settingHelperFunctionSpy('parent');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        Y.one('#contenedor').simulate("click");
                    });
                    it('entonces se devuelve el padre del elemento que dispara el evento', function(){
                        expect(AniJSDefaultHelper.parent).toHaveBeenCalled();
                        expect(Y.one('div.a').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
                describe('cuando recibe 1 parametro cuyo valor es algun "selector CSS"', function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, on: #contenedor,do: $addClass testingBehavior, to: $parent #a-1-2, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                        AniJSTest.Utils.settingAfterFunctionSpy(done, 1);

                        AniJSTest.Utils.settingHelperFunctionSpy('parent');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        Y.one('#contenedor').simulate("click");
                    });
                    it('entonces se devuelve los padres de todos los elementos que matchen con' +
                        'dicho selector', function(){
                        expect(AniJSDefaultHelper.parent).toHaveBeenCalled();
                        expect(Y.one('.a-1').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
            });
            describe('y esa funcion es de tipo $closest', function(){
                describe('cuando no recibe parametros', function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, do: $addClass testingBehavior, to: $closest, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                        AniJSTest.Utils.settingAfterFunctionSpy(done);

                        AniJSTest.Utils.settingHelperFunctionSpy('closest');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        targetNode.simulate("click");
                    });
                    it('entonces se devuelve "el ancestro mas cercano" del elemento que es propietario de la' +
                        'definicion data-anijs', function(){
                        expect(AniJSDefaultHelper.closest).toHaveBeenCalled();
                        expect(Y.one('#a-1-2').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
                describe('cuando recibe 1 parametro cuyo valor es un selector CSS', function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, on:#contenedor, do: $addClass testingBehavior, to: $closest .a, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS, '#contenedor');

                        AniJSTest.Utils.settingAfterFunctionSpy(done);

                        AniJSTest.Utils.settingHelperFunctionSpy('closest');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        Y.one('#contenedor').simulate("click");
                    });
                    it('entonces se devuelve "el ancestro mas cercano" de los elementos que matcheen con ' +
                        'dicho selector',
                    function(){
                        expect(AniJSDefaultHelper.closest).toHaveBeenCalled();
                        expect(Y.one('.test').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
                describe('cuando se reciben 2 parametros cuyos valores son "target" | selector CSS',
                    function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, on: ul,do: $addClass testingBehavior, to: $closest target | .a, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                        AniJSTest.Utils.settingAfterFunctionSpy(done);

                        AniJSTest.Utils.settingHelperFunctionSpy('closest');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        Y.one('ul').simulate("click");
                    });

                    it('entonces se devuelve "el ancestro mas cercano" que matchee con el selector" ' +
                       'del elemento que dispara el evento',
                    function(){
                        expect(AniJSDefaultHelper.closest).toHaveBeenCalled();
                        expect(Y.one('div.a').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
                describe('cuando se reciben 2 parametros cuyos valores son "selector CSS" | selector CSS', function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, on: ul,do: $addClass testingBehavior, to: $closest ul | .a, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS);

                        AniJSTest.Utils.settingAfterFunctionSpy(done);

                        AniJSTest.Utils.settingHelperFunctionSpy('closest');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        Y.one('ul').simulate("click");
                    });
                    it('entonces se devuelve "el ancestro mas cercano que matcheen con el selector" ' +
                       'de los elementos que matcheen con el selector CSS',
                    function(){
                        expect(AniJSDefaultHelper.closest).toHaveBeenCalled();
                        expect(Y.one('div.a').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
            });
            describe('y esa funcion es de tipo $find', function(){
                describe('cuando no recibe parametros', function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, do: $addClass testingBehavior, to: $find, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS, '#a-1-2');

                        AniJSTest.Utils.settingAfterFunctionSpy(done, 1);

                        AniJSTest.Utils.settingHelperFunctionSpy('find');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        targetNode.simulate("click");
                    });
                    it('entonces se devuelve "TODOS los elementos descendientes" del elemento que es propietario de la' +
                        'definicion data-anijs', function(){
                        expect(AniJSDefaultHelper.find).toHaveBeenCalled();
                        expect(Y.one('li').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
                describe('cuando recibe 1 parametro cuyo valor es "target"', function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, on:#a-1-2, do: $addClass testingBehavior, to: $find target, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS, '#a-1-2');

                        AniJSTest.Utils.settingAfterFunctionSpy(done, 1);

                        AniJSTest.Utils.settingHelperFunctionSpy('find');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        Y.one('#a-1-2').simulate("click");
                    });
                    it('entonces se devuelve "los elementos descendientes" del elemento que dispara el evento',
                    function(){
                        expect(AniJSDefaultHelper.find).toHaveBeenCalled();
                        expect(Y.one('.a-1-2-3').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
                describe('cuando recibe 1 parametro cuyo valor es algun "selector CSS"', function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, on: #contenedor,do: $addClass testingBehavior, to: $find #a-1-2, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS, '.a');

                        AniJSTest.Utils.settingAfterFunctionSpy(done, 1);

                        AniJSTest.Utils.settingHelperFunctionSpy('find');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        Y.one('#contenedor').simulate("click");
                    });
                    it('entonces se devuelve "los elementos descendientes" de los elementos ' +
                        'que matchen con dicho selector', function(){
                        expect(AniJSDefaultHelper.find).toHaveBeenCalled();
                        expect(Y.one('.a-1-2-3').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
                describe('cuando se reciben 2 parametros cuyos valores son "target" | selector CSS',
                    function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, on: .test,do: $addClass testingBehavior, to: $find target | .a, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS, '.a');

                        AniJSTest.Utils.settingAfterFunctionSpy(done);

                        AniJSTest.Utils.settingHelperFunctionSpy('find');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        Y.one('.test').simulate("click");
                    });

                    it('entonces se devuelve "los elementos descendientes" que matchee con el selector" ' +
                       'del elemento que dispara el evento',
                    function(){
                        expect(AniJSDefaultHelper.find).toHaveBeenCalled();
                        expect(Y.one('div.a').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
                describe('cuando se reciben 2 parametros cuyos valores son "selector CSS" | selector CSS', function(){
                    beforeEach(function(done){
                        var dataAnijJS = 'if: click, on: ul,do: $addClass testingBehavior, to: $find .a | ul, after: $afterFunction',
                            targetNode;

                        targetNode = AniJSTest.Utils.settingEnviroment(dataAnijJS, '.a');

                        AniJSTest.Utils.settingAfterFunctionSpy(done);

                        AniJSTest.Utils.settingHelperFunctionSpy('find');

                        //corremos AniJS
                        AniJS.run();

                        //Simulamos el evento click
                        Y.one('ul').simulate("click");
                    });
                    it('entonces se devuelve "los elementos descendientes que matcheen con el selector" ' +
                       'de los elementos que matcheen con el selector CSS',
                    function(){
                        expect(AniJSDefaultHelper.find).toHaveBeenCalled();
                        expect(Y.one('ul').hasClass('testingBehavior')).toBeTruthy();
                    });
                });
            });
        });
    });
});




