var AniJS = ( function(config){
	var instance = this;

	instance.initializer = function(){

		//ATTRS inicialization
		instance.rootNode = config.rootNode || 'body';

		instance.helperCollection = config.helperCollection || [];

		instance.parser = instance.createParser();
	}

	instance.createParser = function(){
		return new Parser();
	}



	//Parser Class
	var Parser = ( function(){

		var parserInstance = this;

		parserInstance.parse = function(aniJSDeclaration){

			return parserInstance._parseDeclaration(aniJSDeclaration);

		}

		//Declaration = (Sentence)*
		//Ejemp "when: click, how: bounceOutLeft; when: hover, how: bounceIn"
		parserInstance._parseDeclaration = function(declaration){
			var parsedDeclaration = [],
				sentenceCollection,
				parsedSentence;

			sentenceCollection = declaration.split(';');

			$( sentenceCollection ).each(function( index ){
				parsedSentence = aniParse._parseSentence(sentenceCollection[index]);
				parsedDeclaration.push(parsedSentence);
			});

			return parsedDeclaration;
		}

		//Sentence = Event | Behavior | Target
		//Ejemp "when: click, how: bounceOutLeft"
		parserInstance._parseSentence = function(sentence){
			var parsedSentence = {},
				definitionCollection,
				parsedDefinition;

			definitionCollection = sentence.split(',');

			$( definitionCollection ).each(function( index ){
				parsedDefinition = aniParse._parseDefinition(definitionCollection[index]);
				parsedSentence[parsedDefinition.key] = parsedDefinition.value;
			});

			return parsedSentence;
		},

		parserInstance._parseDefinition = function(definition){
			var parsedDefinition = {},
				definitionBody,
				definitionKey,
				definitionValue;

			definitionBody = definition.split(':');

			if(definitionBody.length > 1){
				definitionKey = $.trim(definitionBody[0]);
				definitionValue = $.trim(definitionBody[1]);
				parsedDefinition.key = definitionKey;
				parsedDefinition.value = definitionValue;
			}

			return parsedDefinition;
		}
	} ); 


	instance.initializer();
	
} );

AniJS.setupParser = function(){

}

var MyAniJS = new AniJS({});

console.log(MyAniJS);
