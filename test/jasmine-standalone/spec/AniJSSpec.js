YUI().use('node', 'node-event-simulate', function (Y) {
	console.log('Hello World');
	describe("AniJS", function() {

		//Aqui se pueden poner variables para tener acceso globalmente
		

		//Funcion que se ejecuta antes de empezar
		beforeEach(function() {

		});

		afterEach(function() {

		});


		describe("Define a trigger event for the animation", function() {
			beforeEach(function() {
	            //Aqui creo el nodo
	            var htmlNode = '<div class="test">Test</div>';
	            Y.one('#testzone').appendChild(htmlNode);
			});

			afterEach(function() {
				Y.one('#testzone .test').remove();
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




