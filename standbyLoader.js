/**
 * CUSTOMIZED STANDBY WIDGET FOR JQUERY
 * 
 * Created by 
 * ----------
 * Name 	- SANDEEP KANANGATT 
 * Email 	- sandeepsuvit@gmail.com 
 * Website 	- www.dotedlabs.com
 * 
 * This widget is a customized Standby widget with a loader image. This also
 * helps the user to display text content dynamically when they want to show the
 * loader for any particular event.
 * 
 * This standby loader can be invoked in the following ways.
 * 
 * Note: The loader has been default set to work on the "body" on the html
 * pages.
 * 
 * ----------------------------------------------------------------------------
 * How to use this widget:
 * ----------------------------------------------------------------------------
 * 1. standbyLoader.show(); -> Displays the loader with the default text "Please
 * wait...".
 * 
 * 2. standbyLoader.show({text: "my message"}); -> Displays the loader with the
 * parameterized string.
 * 
 * 3. standbyLoader.hide(); -> Hides the loader and defaults the loader text to
 * "Please wait...".
 * 
 */

// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

// Path for the image to show on the loader
var standbyLoader_image_path = "ajaxLoader.gif";

// Default text to show on the loader
var standbyLoader_default_text = "Please wait...";

// Globally set variables
var standbyLoader = new Object();

// Utility functions for string operations
var StringUtilsFunctions = {
	// Check if the string is empty
	isEmpty : function(param) {
		if (param === undefined) {
			return true;
		} else {
			if (param == null)
				return true;
			if (param.length < 0)
				return true;
			if (param.length == 0)
				return true;
			return false;
		}
	},

	// Capitalizes the first letter of a string
	capitaliseFirstLetter : function(param) {
		return param.charAt(0).toUpperCase() + param.slice(1);
	}
};

$(document).ready(
		function() {

			// Appending the loader widget
			standbyLoader = {

				// Loader text reference
				loaderText : standbyLoader_default_text,

				// Loader image reference
				loaderImage : standbyLoader_image_path,

				// Show the overlay
				show : function(param) {
					// If the overlay is already present, remove it before
					// showing the overlay again.
					if ($("#standbyLoader-overlay").size() > 0) {
						// Remove the overlay
						this.hide();
					}

					// Check if the text parameter is passed
					if (param === undefined) {
						// Set all to its default values
						this.revertToDefaultText();

						// Show the widget
						$(this.getContentToDisplay()).appendTo('body')
								.slideDown();
					} else {
						// Check for loader text
						if (!StringUtilsFunctions.isEmpty(param.text)) {
							this.loaderText = param.text;
							this.changeText(this.loaderText);
						} else {
							this.revertToDefaultText();
						}

						// Show the widget
						$(this.getContentToDisplay()).appendTo('body')
								.slideDown();
					}

				},

				// Remove the overlay
				hide : function() {
					this.revertToDefaultText();

					// Hide the image
					$("#standbyLoader-loading").fadeOut();

					// Hide the text
					$("#standbyLoader-loading-text").fadeOut();

					// Check If the overlay is already presents
					if ($("#standbyLoader-overlay").size() != 0) {
						$("#standbyLoader-overlay").slideUp(function() {
							$("#standbyLoader-overlay").remove();
						});
					}
				},

				// Change the default message to custom message
				changeText : function(param) {
					if (!StringUtilsFunctions.isEmpty(param)) {
						this.loaderText = StringUtilsFunctions
								.capitaliseFirstLetter(param);
					} else {
						this.revertToDefaultText();
					}
				},

				// Revert back the custom message to the default message
				revertToDefaultText : function() {
					this.loaderText = standbyLoader_default_text;
				},

				// Content to display on the loader
				getContentToDisplay : function() {
					// Show the image
					$("#standbyLoader-loading").fadeIn();

					// Show the text
					$("#standbyLoader-loading-text").fadeIn();

					return '<div id="standbyLoader-overlay">'
							+ "<img id='standbyLoader-loading' src='"
							+ this.loaderImage + "'>"
							+ "<div id='standbyLoader-loading-text'>"
							+ this.loaderText + "</div>" + '</div>';
				}
			};

		});
