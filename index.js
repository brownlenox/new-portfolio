
        // Wait for the DOM to be ready
        $(document).ready(function () {
            // Get the current URL path
            var path = window.location.pathname;
    
            // Check each link in the navbar
            $('.navbar-nav a').each(function () {
                // Compare the link's href attribute with the current path
                if ($(this).attr('href') === path) {
                    // Add the "active" class to the matching link
                    $(this).addClass('active');
                } else {
                    // Remove the "active" class from other links
                    $(this).removeClass('active');
                }
            });
        });


        function toggleReadMore() {
            var intro = document.getElementById("intro");
            var details = document.getElementById("details");
            var readMoreBtn = document.getElementById("read-more-btn");
    
            if (details.style.display === "none") {
                details.style.display = "block";
                readMoreBtn.innerText = "Read Less...";
            } else {
                details.style.display = "none";
                readMoreBtn.innerText = "Read More...";
            }
        }


        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });