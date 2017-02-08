# Titanium UI - HTML

Stepper widget for Titanium

tss

".price-control": {
	width: 114, height: 56, right: 0,
	minimum: 0, maximum: 1000, value: 5,
	Button: { width: 56, height: '100%' },
	// ButtonDisabled: { opacity: 0.3 },
	// ButtonEnabled: { opacity: 1 },
	ButtonDecrement: { left: 0, title: '-', color: '#082e3d' },
	ButtonIncrement: { right: 0, title: '+', color: '#082e3d' },
	Value: { color: '#082e3d', font: { fontSize: 18, fontFamily: 'Lato-Italic' } }
	}

xml

	<Widget id="price" class="price-control" src="com.imobicloud.stepper" onChange="priceChange"/>

js

	function priceChange(e) {
		// e.value
	}

	$.price.setValue(2);
	$.price.getValue(); // ==> 2

Changes log:
