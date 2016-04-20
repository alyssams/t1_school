$(document).ready(function() {
	$('body').css('visibility','visible');
	// hide content until after title animation
	$('#content-wrapper').css('display','none');
	// lettering.js to split up letters for animation
	$('#title-line1').lettering();
	$('#title-line2').lettering();
	$('#title-line3').lettering();
	// TimelineLite for title animation, then start up superscrollorama when complete
	(new TimelineLite({onComplete:initScrollAnimations}))
		.from( $('#title-line1 span'), .4, {delay: 1, css:{right:'1000px'}, ease:Back.easeOut})
		.from( $('#title-line2'), .4, {css:{top:'1000px',opacity:'0'}, ease:Expo.easeOut})
		.append([
			TweenMax.from( $('#title-line3 .char1'), .25+Math.random(), {css:{top: '-200px', right:'1000px'}, ease:Elastic.easeOut}),
			TweenMax.from( $('#title-line3 .char2'), .25+Math.random(), {css:{top: '300px', right:'1000px'}, ease:Elastic.easeOut}),
			TweenMax.from( $('#title-line3 .char3'), .25+Math.random(), {css:{top: '-400px', right:'1000px'}, ease:Elastic.easeOut}),
			TweenMax.from( $('#title-line3 .char4'), .25+Math.random(), {css:{top: '-200px', left:'1000px'}, ease:Elastic.easeOut}),
			TweenMax.from( $('#title-line3 .char5'), .25+Math.random(), {css:{top: '200px', left:'1000px'}, ease:Elastic.easeOut})
		])
		.to( $('#title-info'), .5, {css:{opacity:.99, 'margin-top':0}, delay:-1, ease:Quad.easeOut});
	function initScrollAnimations() {
		$('#content-wrapper').css('display','block');
		var controller = $.superscrollorama();
		// title tweens
		$('.title-line span').each(function() {
			controller.addTween(10, TweenMax.to(this, .5, {css:{top: Math.random()*-200-600, left: (Math.random()*1000)-500, rotation:Math.random()*720-360, 'font-size': Math.random()*300+150}, ease:Quad.easeOut}),200);
		});
		controller.addTween(10, TweenMax.to($('#title-line1'), .75, {css:{top: 600}, ease:Quad.easeOut}),200);
		controller.addTween(10, TweenMax.to($('#title-line2'), .75, {css:{top: 200}, ease:Quad.easeOut}),200);
		controller.addTween(10, TweenMax.to($('#title-line3'), .75, {css:{top: -100}, ease:Quad.easeOut},200));
		// showcase tweens
		controller.addTween('#showcase h1', TweenMax.from( $('#showcase h1'), .75, {css:{letterSpacing:20,opacity:0}, ease:Quad.easeOut}));
		controller.addTween('#showcase p', TweenMax.from( $('#showcase p'), 1, {css:{opacity:0}, ease:Quad.easeOut}));
		$('#showcase .gallery figure').css('position','relative').each(function() {
			controller.addTween('#showcase .gallery', TweenMax.from( $(this), 1, {delay:Math.random()*.2,css:{left:Math.random()*200-100,top:Math.random()*200-100,opacity:0}, ease:Back.easeOut}));
		});
		controller.addTween('#hire p', TweenMax.from( $('#hire p'), .5, {css:{opacity:0}}));
		// set duration, in pixels scrolled, for pinned element
		var pinDur = 4000;
		// create animation timeline for pinned element
		var pinAnimations = new TimelineLite();
		pinAnimations
			.append(TweenMax.from($('#pin-frame-pin h2'), .5, {css:{marginTop:0}, ease: Quad.easeInOut}))
			.append([
				TweenMax.to($('#pin-frame-slide'), 1, {css:{marginLeft:0}}),
				TweenMax.to($('#pin-frame-pin'), 1, {css:{marginLeft:'100%'}})
			], .5)
			.append([
				TweenMax.to($('#pin-frame-wipe'), .5, {css:{top:0}}),
				TweenMax.from($('#pin-frame-wipe h2'), .5, {css:{marginTop:'-600px'}})
			], .5)
			.append(TweenMax.from($('#pin-frame-color'), .25, {css:{opacity:0}}), .5)
			.append([
				TweenMax.to($('#pin-frame-color'), .25, {css:{backgroundColor:'blue'}}),
				TweenMax.to($('#pin-frame-color h2'), .25, {css:{color:'orange'}})
			])
			.append([
				TweenMax.to($('#pin-frame-color'), .25, {css:{backgroundColor:'green'}}),
				TweenMax.to($('#pin-frame-color h2'), .25, {css:{color:'red'}})
			])
			.append([
				TweenMax.to($('#pin-frame-color'), .25, {css:{backgroundColor:'yellow'}}),
				TweenMax.to($('#pin-frame-color h2'), .25, {css:{color:'purple'}})
			])
			.append([
				TweenMax.to($('#pin-frame-color'), .25, {css:{backgroundColor:'orange'}}),
				TweenMax.to($('#pin-frame-color h2'), .25, {css:{color:'blue'}})
			])
			.append([
				TweenMax.to($('#pin-frame-color'), .25, {css:{backgroundColor:'red'}}),
				TweenMax.to($('#pin-frame-color h2'), .25, {css:{color:'green'}})
			])
			.append([
				TweenMax.to($('#pin-frame-color'), .25, {css:{backgroundColor:'#222438'}}),
				TweenMax.to($('#pin-frame-color h2'), .25, {css:{color:'#FFB000'}})
			])
			.append(TweenMax.to($('#pin-frame-unpin'), .5, {css:{top:'100px'}}));
		// pin element, use onPin and onUnpin to adjust the height of the element
		controller.pin($('#examples-pin'), pinDur, {
			anim:pinAnimations, 
			onPin: function() {
				$('#examples-pin').css('height','100%');
			}, 
			onUnpin: function() {
				$('#examples-pin').css('height','600px');
			}
		});
	}
});