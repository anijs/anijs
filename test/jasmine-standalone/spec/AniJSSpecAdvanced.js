YUI().use('node', 'node-event-simulate', function (Y) {


    describe("AniJS Advanced", function() {

        //Aqui se pueden poner variables para tener acceso globalmente
        var timerCallback = null;

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

                    expect(AniJS.EventSystem.eventCollection[i]).not.toBeNull();
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

                    expect(AniJS.EventSystem.eventCollection[i]).not.toBeNull();
                }
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
        });

        //---------------------------------------------------------------------
        // Listen for custom events
        //---------------------------------------------------------------------
        describe("Listen for custom events", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);

                jasmine.clock().install();

            });

            afterEach(function() {
                Y.one('#testzone .test').remove();
                //Hay que unregister todos los eventsProvides sino hay test que van a fallar
                jasmine.clock().uninstall();
            });
            it("Simple Custom Event Creation", function() {
                var dataAnijJS = 'if: customevent, on: $customEventProvider, do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');
                targetNode.setAttribute('data-anijs', dataAnijJS);
                AniJS.run();

                expect(AniJS.getNotifier('customEventProvider') !== undefined).toBeTruthy();

                var customEventProvider = AniJS.getNotifier('customEventProvider');
                customEventProvider.dispatchEvent('customevent');

                jasmine.clock().tick(101);
                expect(Y.one('body').hasClass('bounce')).toBeTruthy();
            });

            it("Unregister Event", function() {
                var dataAnijJS = 'if: customevent, on: $customEventProvider, do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');
                targetNode.setAttribute('data-anijs', dataAnijJS);
                AniJS.run();


                expect(AniJS.getNotifier('customEventProvider') !== undefined).toBeTruthy();

                var customEventProvider = AniJS.getNotifier('customEventProvider');

                customEventProvider.dispatchEvent('customevent');

                expect(Y.one('body').hasClass('bounce')).toBeTruthy();

                Y.one('body').removeClass('bounce');

                customEventProvider.removeEventListener('customevent');

                AniJS.purgeEventTarget(customEventProvider);

                customEventProvider.dispatchEvent('customevent');

                expect(Y.one('body').hasClass('bounce')).toBeFalsy();


            });

            describe("Two Custom Event Creation", function() {
                beforeEach(function() {
                    //Aqui creo el nodo
                    var htmlNode = '<div class="test">Test</div>';
                    Y.one('#testzone').appendChild(htmlNode);

                    //Creating the second element
                    var htmlNode = '<div class="test2">Test2</div>';
                    Y.one('#testzone').appendChild(htmlNode);

                    jasmine.clock().install();
                });

                afterEach(function() {
                    Y.one('#testzone .test').remove();

                    Y.one('#testzone .test2').remove();

                    Y.one('body').removeClass('bounce');
                    Y.one('body').removeClass('hinge');
                    jasmine.clock().uninstall();

                    //Hay que unregister todos los eventsProvides sino hay test que van a fallar
                });

                it("with same notifier", function() {
                    var dataAnijJS = 'if: customevent, on: $customEventProvider, do: bounce, to: body',
                        targetNode;

                    //Setting the first node (It's created in beforeEach test function)
                    targetNode = Y.one('#testzone .test');
                    targetNode.setAttribute('data-anijs', dataAnijJS);

                    dataAnijJS = 'if: customevent, on: $customEventProvider, do: hinge, to: body';
                    targetNode = Y.one('#testzone .test2');
                    targetNode.setAttribute('data-anijs', dataAnijJS);

                    AniJS.run();

                    expect(AniJS.getNotifier('customEventProvider') !== undefined).toBeTruthy();

                    var customEventProvider = AniJS.getNotifier('customEventProvider');

                    customEventProvider.dispatchEvent('customevent');

                    jasmine.clock().tick(101);
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                    expect(Y.one('body').hasClass('hinge')).toBeTruthy();
                });

                it("with same notifier differents events", function() {
                    var dataAnijJS = 'if: customevent, on: $customEventProvider, do: bounce, to: body',
                        targetNode;

                    //Setting the first node (It's created in beforeEach test function)
                    targetNode = Y.one('#testzone .test');
                    targetNode.setAttribute('data-anijs', dataAnijJS);


                    //Creating the second element
                    var htmlNode = '<div class="test2">Test2</div>';
                    Y.one('#testzone').appendChild(htmlNode);

                    dataAnijJS = 'if: customevent2, on: $customEventProvider, do: hinge, to: body';
                    targetNode = Y.one('#testzone .test2');
                    targetNode.setAttribute('data-anijs', dataAnijJS);

                    AniJS.run();

                    expect(AniJS.getNotifier('customEventProvider') !== undefined).toBeTruthy();

                    var customEventProvider = AniJS.getNotifier('customEventProvider');

                    customEventProvider.dispatchEvent('customevent');

                    jasmine.clock().tick(101);
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                    expect(Y.one('body').hasClass('hinge')).toBeFalsy();

                    // customEventProvider.dispatchEvent('customevent2');
                    // expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                    // expect(Y.one('body').hasClass('hinge')).toBeTruthy();
                });

                it("with differents notifier", function() {
                    var dataAnijJS = 'if: customevent, on: $customEventProvider, do: bounce, to: body',
                        targetNode;

                    //Setting the first node (It's created in beforeEach test function)
                    targetNode = Y.one('#testzone .test');
                    targetNode.setAttribute('data-anijs', dataAnijJS);

                    dataAnijJS = 'if: customevent, on: $customEventProvider2, do: hinge, to: body';
                    targetNode = Y.one('#testzone .test2');
                    targetNode.setAttribute('data-anijs', dataAnijJS);

                    AniJS.run();

                    expect(AniJS.getNotifier('customEventProvider')).not.toBeUndefined();
                    expect(AniJS.getNotifier('customEventProvider2')).not.toBeUndefined();

                    var customEventProvider = AniJS.getNotifier('customEventProvider');

                    customEventProvider.dispatchEvent('customevent');

                    jasmine.clock().tick(101);
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();

                    var customEventProvider2 = AniJS.getNotifier('customEventProvider2');

                    customEventProvider2.dispatchEvent('customevent');

                    jasmine.clock().tick(101);
                    expect(Y.one('body').hasClass('hinge')).toBeTruthy();
                });
            });

            describe("Creating Event Provider Using Javascript", function() {
                beforeEach(function() {
                    jasmine.clock().install();
                });

                afterEach(function() {
                    Y.one('body').removeClass('bounce');
                    Y.one('body').removeClass('hinge');
                    AniJS.notifierCollection['customEventProvider'] = null;
                    delete AniJS.notifierCollection['customEventProvider'];
                    jasmine.clock().uninstall();
                });

                it("with string", function() {
                    var dataAnijJS = 'if: customevent, on: $customEventProvider, do: bounce, to: body',
                        targetNode;

                    AniJS.createAnimation([{
                        event: 'customevent',
                        eventTarget: '$customEventProvider',
                        behaviorTarget: 'body',
                        behavior: 'bounce',
                        before: function(e, animationContext){
                            if( 1 ){
                                //Run the animation
                                animationContext.run()
                            }
                        }
                    }]);

                    expect(AniJS.getNotifier('customEventProvider')).not.toBeUndefined();

                    var customEventProvider = AniJS.getNotifier('customEventProvider');

                    customEventProvider.dispatchEvent('customevent');
                    jasmine.clock().tick(101);
                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                });

                it("with EventProviderObject", function() {
                    var dataAnijJS = 'if: customevent, on: $customEventProvider, do: bounce, to: body',
                        targetNode;

                    var notifier = {
                        id: 'customEventProvider',
                        value: AniJS.EventSystem.createEventTarget()
                    }

                    AniJS.createAnimation([{
                        event: 'customevent',
                        eventTarget: notifier,
                        behaviorTarget: 'body',
                        behavior: 'bounce',
                        before: function(e, animationContext){
                            if( 1 ){
                                //Run the animation
                                animationContext.run()
                            }
                        }
                    }]);

                    expect(AniJS.getNotifier('customEventProvider')).not.toBeUndefined();

                    var customEventProvider = AniJS.getNotifier('customEventProvider');

                    customEventProvider.dispatchEvent('customevent');

                    jasmine.clock().tick(101);

                    expect(Y.one('body').hasClass('bounce')).toBeTruthy();
                });

                it("with Non EventProviderObject", function() {
                    var dataAnijJS = 'if: customevent, on: $customEventProvider, do: bounce, to: body',
                        targetNode;

                    var notifier = {
                        id: 'customEventProvider',
                        value: {}
                    }

                    AniJS.createAnimation([{
                        event: 'customevent',
                        eventTarget: notifier,
                        behaviorTarget: 'body',
                        behavior: 'bounce',
                        before: function(e, animationContext){
                            if( 1 ){
                                //Run the animation
                                animationContext.run()
                            }
                        }
                    }]);

                    expect(AniJS.notifierCollection['customEventProvider']).toBeUndefined();

                    expect(AniJS.getNotifier('customEventProvider')).toBeUndefined();
                });
            });
        });
    });
});




