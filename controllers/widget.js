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
    setValue(args.value || 0);
}

exports.getValue = function() {
    return args.value;
};

function setValue(value) {
    value = parseInt(value, 10);
    if (validateData(value)) {
        args.value = value;
        $.value.text = value;
        validateUI();
    }
}
exports.setValue = setValue;

function validateData(value) {
    if (args.minimum && value < args.minimum) { return false; }
    if (args.maximum && value > args.maximum) { return false; }
    return true;
}

function validateUI() {
	if (args.minimum) {
	    var decrementStyle;
	    if (args.value - 1 >= args.minimum) {
	        decrementStyle = _.extend($.createStyle({ classes: 'button-enabled' }), args.ButtonEnabled);
	    } else {
	        decrementStyle = _.extend($.createStyle({ classes: 'button-disabled' }), args.ButtonDisabled);
	    }
	    $.buttonDecrement.applyProperties(decrementStyle);
	}

	if (args.maximum) {
	    var incrementStyle;
	    if (args.value + 1 >= args.maximum) {
	        incrementStyle = _.extend($.createStyle({ classes: 'button-enabled' }), args.ButtonEnabled);
	    } else {
	        incrementStyle = _.extend($.createStyle({ classes: 'button-disabled' }), args.ButtonDisabled);
	    }
	    $.buttonIncrement.applyProperties(incrementStyle);
	}
}

function buttonDecrementClick(e) {
    setValue(args.value - 1);
}

function buttonIncrementClick(e) {
    setValue(args.value + 1);
}
