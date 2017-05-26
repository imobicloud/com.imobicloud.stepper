var args = $.args;

init();
function init() {
	var exclude = [
        'id', 'children',
        'minimum', 'maximum', 'value',
        'Button', 'ButtonDisabled', 'ButtonEnabled', 'ButtonDecrement', 'ButtonIncrement', 'Value'
    ];
	$.container.applyProperties(_.omit(args, exclude));
    $.value.applyProperties( args.Value );
    $.buttonDecrement.applyProperties( _.extend(args.ButtonDecrement, args.Button) );
    $.buttonIncrement.applyProperties( _.extend(args.ButtonIncrement, args.Button) );

    args.minimum && (args.minimum = parseInt(args.minimum, 10));
    args.maximum && (args.maximum = parseInt(args.maximum, 10));
    setValue(args.value || args.minimum || 0);
}

exports.getValue = function() {
    return args.value;
};

function setValue(value) {
    value = parseInt(value, 10);
    if (validateData(value)) {
        args.value = value;
        $.value.value = value;
        validateUI();
    }
}
exports.setValue = setValue;

exports.blur = function() {
	$.value.blur();
};

function valueChange(e) {
	var value = this.value;
	if (isNaN(value)) {
		this.value = args.value;
	} else {
		value = parseInt(value, 10);
		if (!validateData(value)) {
			this.value = args.value;
		} else {
			this.value = value;
		}
	}
}

function validateData(value) {
    if (args.minimum != null && value < args.minimum) { return false; }
    if (args.maximum != null && value > args.maximum) { return false; }
    return true;
}

function validateUI() {
	if (args.minimum != null) {
	    var decrementStyle;
	    if (args.value - 1 >= args.minimum) {
	        decrementStyle = _.extend($.createStyle({ classes: 'button-enabled' }), args.ButtonEnabled);
	    } else {
	        decrementStyle = _.extend($.createStyle({ classes: 'button-disabled' }), args.ButtonDisabled);
	    }
	    $.buttonDecrement.applyProperties(decrementStyle);
	}

	if (args.maximum != null) {
	    var incrementStyle;
	    if (args.value + 1 <= args.maximum) {
	        incrementStyle = _.extend($.createStyle({ classes: 'button-enabled' }), args.ButtonEnabled);
	    } else {
	        incrementStyle = _.extend($.createStyle({ classes: 'button-disabled' }), args.ButtonDisabled);
	    }
	    $.buttonIncrement.applyProperties(incrementStyle);
	}
}

function buttonDecrementClick(e) {
    setValue(args.value - 1);
    $.trigger('change', { value : args.value });
}

function buttonIncrementClick(e) {
    setValue(args.value + 1);
    $.trigger('change', { value : args.value });
}
