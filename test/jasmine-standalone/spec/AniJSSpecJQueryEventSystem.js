YUI().use('node', 'node-event-simulate', function (Y) {

        //---------------------------------------------------------------------
        // Listen for custom events
        //---------------------------------------------------------------------
        describe("JQuery Event System", function() {
            beforeEach(function() {
                //Aqui creo el nodo
                var htmlNode = '<div class="test">Test</div>';
                Y.one('#testzone').appendChild(htmlNode);
            });

            afterEach(function() {
                Y.one('#testzone .test').remove();

                //Hay que unregister todos los eventsProvides sino hay test que van a fallar
            });

            it("Simple Custom Event Creation JQuery", function() {
                var dataAnijJS = 'if: customevent, on: $customEventProvider, do: bounce, to: body',
                    targetNode;

                targetNode = Y.one('#testzone .test');
                targetNode.setAttribute('data-anijs', dataAnijJS);
                AniJS.run();

                console.log(AniJS);

               

                expect(AniJS.getEventProvider('customEventProvider') !== undefined).toBeTruthy();

                var customEventProvider = AniJS.getEventProvider('customEventProvider');

                
                customEventProvider.trigger('customevent');

                expect(Y.one('body').hasClass('bounce')).toBeTruthy();
            });
        });
});




