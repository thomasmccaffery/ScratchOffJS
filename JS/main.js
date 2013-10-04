/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */
(function() {

/**
 * Returns true if this browser supports canvas
 *
 * From http://diveintohtml5.info/
 */
function supportsCanvas() {
	return !!document.createElement('canvas').getContext;
};

/**
 * Handle scratch event on a scratcher
 */
 showAlert=true;
 
function scratcher1Changed(ev) {
	// Test every pixel. Very accurate, but might be slow on large
	// canvases on underpowered devices:
	//var pct = (scratcher.fullAmount() * 100)|0;

	// Only test every 32nd pixel. 32x faster, but might lead to
	// inaccuracy:
	var pct = (this.fullAmount(32) * 100)|0;
	
	// Alert user if they have won (Add checking feature with php)
	if(pct > 80) { 
		if (showAlert==true)
		{
			if(WinCheck=="True"){ alert("Winner!!!"); }
			else{ alert("Sorry not a winner, Try Again!"); }
		   showAlert = false;
		}
	}
	
	$('#scratcher1Pct').html('' + pct + '%');
};

/**
 * Reset all scratchers
 */
function onResetClicked(scratchers) {
	var i;

	for (i = 0; i < scratchers.length; i++) {
		scratchers[i].reset();
	}

	return false;
};

/**
 * Assuming canvas works here, do all initial page setup
 */
function initPage() {
	var scratcherLoadedCount = 0;
	var scratchers = [];
	var i, i1;

	// called each time a scratcher loads
	function onScratcherLoaded(ev) {
		scratcherLoadedCount++;

		if (scratcherLoadedCount == scratchers.length) {
			// all scratchers loaded!

			// bind the reset button to reset all scratchers
			$('#resetbutton').on('click', function() {
					onResetClicked(scratchers);
				});

			// hide loading text, show instructions text
			$('#loading-text').hide();
			$('#inst-text').show();
		}
	};

	// create new scratchers
	var scratchers = new Array(1);

	for (i = 0; i < scratchers.length; i++) {
		i1 = i + 1;
		scratchers[i] = new Scratcher('scratcher' + i1);

		// set up this listener before calling setImages():
		scratchers[i].addEventListener('imagesloaded', onScratcherLoaded);
		
		scratchers[i].setImages('IMG/Lotto_BOTTOM.gif',
			'IMG/Lotto_TOP.gif');

		/* Old way with an array for multipe scratchers
		scratchers[i].setImages('IMG/s' + i1 + 'bg.jpg',
			'IMG/s' + i1 + 'fg.png');
		*/
	}

	// get notifications of this scratcher changing
	// (These aren't "real" event listeners; they're implemented on top
	// of Scratcher.)
	scratchers[0].addEventListener('reset', scratcher1Changed);
	scratchers[0].addEventListener('scratch', scratcher1Changed);

	// Or if you didn't want to do it every scratch (to save CPU), you
	// can just do it on 'scratchesended' instead of 'scratch':
	//scratchers[2].addEventListener('scratchesended', scratcher3Changed);
};

/**
 * Handle page load
 */
$(function() {
	if (supportsCanvas()) {
		initPage();
	} else {
		$('#scratcher-box').hide();
		$('#lamebrowser').show();
	}
});

})();
