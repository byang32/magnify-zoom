(function($, window, undefined) {

    // Constructor function $imageContainer
    $.MagnifyZoom = function(options, selectedDOMElement) {

            this.$imageContainer = $(selectedDOMElement);
            this._init(options)

    };
    //Assign an object literal containing the default
    // options values to a property of our $.MagnifyZoom
    // object named defaults.
    $.MagnifyZoom.defaults = {

        width: 300,
        height: 300,
        cornerRounding: '50%',
    };
    // Create an Image object named imageObject whose
    // source file will be the file being refereced in the
    // img.small element.
    $.MagnifyZoom.prototype = {

        _init: function(options) {

            var imageObject = new Image();

            imageObject.src = $('img.small').attr('src');
            
            this.options = $.extend($.MagnifyZoom.defaults, options);

            this.nativeWidth = imageObject.width;

            this.nativeHeight = imageObject.height;

            this.$glass = $('.large');

            this.$smallImage = $('.small');

            this._getLocation();

        },
        // Will handle any mouse movement events on our
        // div.magnify that contains the image on the page.
        _getLocation: function() {

            var self = this;

            // Set up a mouse movement event handeler using jQuery
            // on the div.magnify tag.
            $('div.magnify').mousemove(function(e) {
                
                // Use jQuery method on $target and store in
                // a variable named magnifyOffset
                var $target = $('div.magnify');
                var magnifyOffset = $target.offset();
                
                // Get the actual mouse cursor's x and y postion values
                // by subtracting the left and top offset values.
                // Store x and y values in new object named mouseX and mouseY.
                $target.mouseX = e.pageX - magnifyOffset.left;
                $target.mouseY = e.pageY - magnifyOffset.top;

                
                // Call your new object’s _zoom() method passing
                // it $target which will magnify the
                // part of the image that is under the glass.
                self._zoom($target);
            });


        },
        // Magnify the part of the image that is currently
        // under the magnifying glass.
        _zoom: function($target) {
            var smallImageWidth = this.$smallImage.width();
            var smallImageHeight = this.$smallImage.height();
            
            // Using jQuery methods, fade in the magnifying glass(4glass property) if
            // the mouse cursor is inside div.magnify and foud out when the mouse leaves
            // div.magnify. This sounds like an if-else.
            if ($target.mouseX < 0 || $target.mouseX > this.$smallImage.width()) {
              this.$glass.stop(true, true).fadeOut(100);
              this.$glass.isVisible = false;
            } else if ($target.mouseY < 0 || $target.mouseY > this.$smallImage.height()) {
              this.$glass.stop(true, true).fadeOut(100);
              this.$glass.isVisible = false;
            } else {
              this.$glass.stop(true, true).fadeIn(100);
              this.$glass.isVisible = true;
            }
            
            // If $glass isVisible then show the magnifying glass.
            if (this.$glass.isVisible) {
              var glassWidth = this.$glass.width();
              var glassHeight = this.$glass.height();
              
            // Determine the left and top positioning values you will use for
            // for the magnifying glass storing them in variables posX posY.
              var posX = $target.mouseX - glassWidth/2;
              var posY = $target.mouseY - glassHeight/2;
            
            // Determine the x and y positions values for the background image
            // of the magnifying glass storing them in variable rx and ry.
              var rx = Math.round($target.mouseX / smallImageWidth * this.nativeWidth - glassWidth/2) * -1;
              var ry = Math.round($target.mouseY / smallImageHeight * this.nativeHeight - glassHeight/2) * -1;
              
              // Use jQuery css() method to apply the new values you have
              // to the magnifying glass and its background.
              this.$glass.css({
                  width: $.MagnifyZoom.defaults.width,
                  height: $.MagnifyZoom.defaults.height,
                  borderRadius: $.MagnifyZoom.defaults.cornerRounding,
                  top: posY,
                  left: posX,
                  backgroundPosition: rx + "px " + ry + "px ",
              });


            }
        },

    };

    // Define plugin method(function)
    $.fn.magnifyZoom = function(options) {
        if (typeof options === 'string') {

        } else {
            this.each(function() {
                var instance = $.data(this, 'magnifyZoom');

                if (instance) {
                    instance._init();

                } else {

                    instance = $.data(this, 'magnifyZoom', new $.MagnifyZoom(options, this));
                }
            }
            );
        }

        return this;
    };



})(jQuery, window);
