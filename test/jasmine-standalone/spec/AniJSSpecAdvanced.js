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








		// describe("when song has been paused", function() {
		// 	beforeEach(function() {
		// 		player.play(song);
		// 		player.pause();
		// 	});

		// 	it("should indicate that the song is currently paused", function() {
		// 		expect(player.isPlaying).toBeFalsy();

		// 		// demonstrates use of 'not' with a custom matcher
		// 		expect(player).not.toBePlaying(song);
		// 	});

		// 	it("should be possible to resume", function() {
		// 		player.resume();
		// 		expect(player.isPlaying).toBeTruthy();
		// 		expect(player.currentlyPlayingSong).toEqual(song);
		// 	});
		// });

		// // demonstrates use of spies to intercept and test method calls
		// it("tells the current song if the user has made it a favorite", function() {
		// 	spyOn(song, 'persistFavoriteStatus');

		// 	player.play(song);
		// 	player.makeFavorite();

		// 	expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
		// });

		// //demonstrates use of expected exceptions
		// describe("#resume", function() {
		// 	it("should throw an exception if song is already playing", function() {
		// 		player.play(song);
		// 		expect(function() {
		// 			player.resume();
		// 			}).toThrowError("song is already playing");
		// 		});
		// 	});
		// });
});




