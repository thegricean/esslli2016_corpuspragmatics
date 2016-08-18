var utils = {
	showSlide: function(slidename) {
			$(".slide").hide();
			$(".fullslide").hide();
			$("#" + slidename).show();
	},

	get_exp_length: function() {
		if (exp.structure && exp.slides) {
				var length = 0;
				for (var i=0; i<exp.structure.length; i++) {
						var a_slide = exp.slides[exp.structure[i]];
						if (a_slide.present) {
								length += a_slide.present.length;
						} else {
								length ++;
						}
				}
				return length - 1; //don't count the last slide
		}
	},

	/* eq_el_height and match_row_height adapted from:
	 * http://stackoverflow.com/questions/15397966/how-to-get-table-cells-to-have-equal-height
	 */
	eq_el_height: function(els, min_or_max) {
			els.each(function() {
					$(this).height('auto');
			});

			var m = $(els[0]).height();

			els.each(function() {
					var h = $(this).height();

					if (min_or_max === "max") {
							m = h > m ? h : m;
					} else {
							m = h < m ? h : m;
					}
			});

			els.each(function() {
					$(this).height(m);
			});
	},

	match_row_height: function(label, sublabel) {
		$(label).each(function() {
			utils.eq_el_height($(this).find(sublabel/*'tr'*/), "max");
		});
	},

	make_slider: function(label, response_callback, orientation) {
		var orientation = (orientation == null) ? "horizontal" : orientation;
		$(label).empty();
		$(label).slider({
			range : "min",
			min : 0,
			max : 1,
			step: 0.01,
			value : 0.5,
			slide : response_callback,
			change : response_callback,
			orientation : orientation
		});
		$(label + ' .ui-slider-handle').hide();
		$(label).mousedown(function(){
			$(label + ' .ui-slider-handle').show();
			$(label).css({"background":"#99D6EB"});
			$(label + ' .ui-slider-handle').css({
				"background":"#667D94",
				"border-color": "#001F29"
			});
		});
		$(label).css({"background":"#eee"});
	}
}
