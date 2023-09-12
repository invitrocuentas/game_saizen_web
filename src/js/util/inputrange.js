const cambiarVolumen = () => {
    if(document.querySelector('.range-container')){
        var rangeContainers = document.querySelectorAll(".range-container");

        rangeContainers.forEach(function(rangeContainer, index) {
            var rangeThumb = rangeContainer.querySelector(".range-thumb");
            var rangeFilled = rangeContainer.querySelector(".range-filled");
            var muteDivId = rangeThumb.getAttribute("data-mute");
            var muteDiv = document.getElementById(muteDivId);
            var isDragging = false;

            rangeThumb.addEventListener("mousedown", function(event) {
                isDragging = true;
            });

            rangeThumb.addEventListener("touchstart", function(event) {
                isDragging = true;
            });

            document.addEventListener("mousemove", function(event) {
                if (isDragging) {
                    var offsetX = event.clientX - rangeContainer.getBoundingClientRect().left;
                    var percentage = (offsetX / rangeContainer.offsetWidth) * 100;
                    updateRange(percentage);
                }
            });

            document.addEventListener("touchmove", function(event) {
                if (isDragging) {
                  var touch = event.touches[0];
                  var offsetX = touch.clientX - rangeContainer.getBoundingClientRect().left;
                  var percentage = (offsetX / rangeContainer.offsetWidth) * 100;
                  updateRange(percentage);
                }
            });
        
            document.addEventListener("mouseup", function() {
                isDragging = false;
            });
        
            document.addEventListener("touchend", function() {
                isDragging = false;
            });
        
            function updateRange(percentage) {
                if (percentage < 0) {
                    percentage = 0;
                } else if (percentage > 100) {
                    percentage = 100;
                }
            
                var clipPathValue = "inset(0 " + (100 - percentage) + "% 0 0)";
                rangeThumb.style.left = (percentage - 12) + "%";
                rangeFilled.style.clipPath = clipPathValue;
            
                if (percentage === 0) {
                    muteDiv.classList.remove("hidden");
                } else {
                    muteDiv.classList.add("hidden");
                }
            
                window.parent.postMessage({ type: "cambiarVolumen", volumen: percentage, tipo: muteDivId }, "*");
            }
        });
    }
};

export {
    cambiarVolumen
};