$(function () {
    var buttonsDiv = $("#buttonsDiv");
    var gifsHere = $("#gifs-appear-here");
    var searchBar = $("#searchBar");
    var submit = $("#submit");

    var buttons = ["Donuts", "Dark Chocolate", "Gummy Worms", "Cakes", "Dessert Pie",
        "Peanutbutter Cookies", "Icecream", "Macarons"
    ];

    function makeButtons() {

        buttonsDiv.empty();

        for (var i = 0; i < buttons.length; i++) {
            var button = $("<button>");
            button.attr("data-name", buttons[i]);
            button.addClass("divButtons mx-2 mt-2 btn btn-light");
            button.text(buttons[i]);
            buttonsDiv.append(button);
        }
    }

    makeButtons();

    $(document.body).on("click", ".divButtons", function () {
        //$("button").on("click", function () {
        var sweets = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sweets +
            "&api_key=ezL53Dd8XRSFHcc4MKPI0gyNSVbbaZQW&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            //event.preventDefault();

            var results = response.data;


            for (var j = 0; j < results.length; j++) {
                var gifDiv = `
                    <div id="${"entiregif" + j}" class="mx-2 mt-3">
                        <div>Rating: ${results[j].rating}</div>
                        <img 
                            src="${results[j].images.fixed_height_still.url}" 
                            class="gif col-12"
                            data-still="${results[j].images.fixed_height_still.url}"
                            data-animate="${results[j].images.fixed_height.url}"
                            data-state="still"    
                        />
                        <div><i id="fav" class="fas fa-heart"></i></div>
                    </div>
                `;
                /*var gifDiv = $("<div>").addClass("mx-2 mt-3").attr("id",  "entiregif" + j);
                var p = $("<div>").text("Rating: " + results[j].rating); //can always change this back to <p>
                var gif = $("<img>").attr("src", results[j].images.fixed_height_still.url); //might need to get rid of _still
                gif.attr("data-still", results[j].images.fixed_height_still.url);
                gif.attr("data-animate", results[j].images.fixed_height.url);
                gif.attr("data-state", "still");
                gif.addClass("gif col-12");
                var heart = $("<div><i class='fas fa-heart' id='fav'></i></div"); //can change this to button
                */
                // gifDiv.append(p);
                // gifDiv.append(gif);
                // gifDiv.append(heart);
                gifsHere.prepend(gifDiv);
            }
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                console.log(state);

                if (state == "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })
        });
    });

    submit.on("click", function (event) {
        event.preventDefault();
        var newItem = $("#searchBar").val().trim()
        console.log(newItem);
        buttons.push(newItem);
        console.log(buttons);
        makeButtons();
    })


    $(document.body).on("click", "#fav", function (event) {
        event.preventDefault();
        var gifMove = $(this).parent().parent().attr('id');
        //var gifMove = $(this).parent().siblings().attr('id');
        //var gifMove = $(this).parent().parent().closest('img').attr('id');
        console.log("HEY", gifMove);

         //$("#recent-favs").append(gifMove);
         //gifMove.clone().appendTo("#recent-favs");
         $("#" + gifMove).clone().prependTo("#recent-favs");
         //$(this).clone().appendTo("#recent-favs");
         localStorage.clear();

         localStorage.setItem("favGif", "#" + gifMove);

    })

    $(localStorage.getItem("favGif")).clone().prependTo("#recent-favs");

   // $("#recent-favs").prepend().clone(localStorage.getItem("favGif"));




});