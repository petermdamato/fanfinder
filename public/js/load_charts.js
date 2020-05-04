var base_url = "https://nacci-movie-fanfinder.glitch.me/";

const moviesList = ["Hannibal Rising", "L.a. Confidential", "Memento", "Perfect Stranger", "Police Story 2", "The Fan", "The General", "The Prestige", "The Sixth Sense", "V For Vendetta", "7 Days In Entebbe", "A Simple Favor", "Bad Samaritan", "Bad Times At The El Royale", "Beirut", "Chappaquiddick", "Dogman", "Greta", "Hotel Artemis", "Hunter Killer", "Peppermint", "Proud Mary", "Ready Player One", "Red Sparrow", "Replicas", "Searching", "The Commuter", "The Darkest Minds", "The Girl In The Spiders Web", "The Hummingbird Project", "The Hurricane Heist", "The Meg", "The Wedding Guest", "Tyler Perrys Acrimony", "Upgrade", "Winchester", "Wind River", "Woman At War", "Angel Has Fallen", "Badla", "Crawl", "John Wick: Chapter 3", "Junglee", "Midsommar", "Pet Sematary", "Stuber", "The Intruder", "Triple Threat", "Bad Santa", "Bridget Joness Diary", "Bridget Jones: The Edge Of Reason", "My Big Fat Greek Wedding", "Paul Blart: Mall Cop", "Pirates Of The Caribbean: At Worlds End", "Pirates Of The Caribbean: Dead Mans Chest", "Super Troopers", "The Big Lebowski", "Vacation", "Zoolander", "A Bad Moms Christmas", "A Dogs Purpose", "A Hologram For The King", "A La Mala", "Absolutely Fabulous: The Movie", "American Ultra", "Bad Moms", "Bad Santa 2", "Barbershop: The Next Cut", "Battle Of The Sexes", "Baywatch", "Beatriz At Dinner", "Boo! A Madea Halloween", "Bridget Joness Baby", "Central Intelligence", "Daddys Home", "Daddys Home 2", "Danny Collins", "Diary Of A Wimpy Kid: The Long Haul", "Dirty Grandpa", "Do It Like An Hombre", "Dope", "Entourage", "Everybody Loves Somebody", "Everybody Wants Some!!", "Fist Fight", "Focus", "Get Hard", "Ghostbusters", "Girls Trip", "Going In Style", "Hail, Caesar!", "Home Again", "Hot Pursuit", "Hot Tub Time Machine 2", "How To Be A Latin Lover", "How To Be Single", "Just Getting Started", "Keeping Up With The Joneses", "Kevin Hart: What Now?", "Ladrones"]

let movie; 

//// DROPDOWN LIST AUTOCOMPLETE
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("div");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}

// POPULATE DRODOWN LIST
function fillDropdown(callback) {
    URL = base_url + "get_film_list";
    $.get("http://127.0.0.1:5000/", function(data) {
      return data;
    }).done(function(result) {
      /* do something with the result here */
      callback(moviesList); // invokes the callback function passed as parameter
    });

    // Ignore until production
    // URL = base_url + "get_film_list";
    // $.get(URL, function(data) {
    //   return data;
    // }).done(function(result) {
    //   /* do something with the result here */
    //   callback(result); // invokes the callback function passed as parameter
    // });

}

fillDropdown(function(result) {
  autocomplete(document.getElementById("myInput"), result);
});
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/

var getMovieData = function() {
  movie = document.getElementById("myInput").value;
  $('.movie-content').removeClass("invisible")
  $('.front-page-filler').addClass("invisible")
  $('.movie-title').text(movie)
  getAttitudesData(movie);
}
var getAttitudesData = function(movie) {
  $('.similar-movies-bottom span').text(movie)
  $('#defining-attitudes-title span').text(movie)
  $('#attitude-explanatory span').text(movie)

  URL = base_url + "attitudes?movie=" + movie.toLowerCase();
  
  $.get(URL, function(data) {
    const similar = data['similar_movies']['movies'];
    for (let similar_movie of similar) {
      const sim = '<li>'+similar_movie+'</li>'
      $('.similar-movies-inner').append(sim)
    }

    // Insert the icons array here
    const group_top = data['group_attitudes']['top']
    const group_bot = data['group_attitudes']['bot']
    const fan_top = data['single_attitudes']['top']
    const fan_bot = data['single_attitudes']['bot']

  for (let attitude of fan_top) {
    const att = '<li><div class="favorable-list-item">'+attitude['a']+'</div><div class="figure">'+ Math.round(attitude['v']*100) +'</div></li>'
      $('#fan-favorable').append(att)
    }
      for (let attitude of fan_bot) {
    const att = '<li><div class="unfavorable favorable-list-item">'+attitude['a']+'</div><div class="figure">'+ Math.round(attitude['v']*100) +'</div></li>'
      $('#fan-favorable').append(att)
    }
      for (let attitude of group_top) {
    const att = '<li><div class="favorable-list-item">'+attitude['a']+'</div><div class="figure">'+ Math.round(attitude['v']*100) +'</div></li>'
      $('#group-favorable').append(att)
    }
      for (let attitude of group_bot) {
    const att = '<li><div class="unfavorable favorable-list-item">'+attitude['a']+'</div><div class="figure">'+ Math.round(attitude['v']*100) +'</div></li>'
      $('#group-favorable').append(att)
    }
  });
  for (let concept of data['concepts']) {
    const conc = '<li class="conceptual-links-item"><div class="concept-hed">'+Object.keys(concept)+'</div><div class="concept-icon">'+ '<i class="fas fa-film"></i>' +'</div><div class="concept-words">' + concept[Object.keys(concept)]['words'].join(', ') +'</div></li>'
    $('.conceptual-links-inner').append(conc)
  }

  $('.conceptual-links-item').on('mouseover', function(e){
      let dis = e.target;
      $(dis).toggleClass('visible')
    })
    $('.conceptual-links-item').on('mouseout', function(e){
      let dis = e.target;

      $(dis).toggleClass('visible')
    })

}
// FILL DATA
var getBrandData = function(movie) {
  $('.brand-list-hed span').text(movie)
  //BRAND SECTION
  brand_list = [
    "Clothing",
    "Skincare",
    "Dining",
    "Specialty store",
    "Beverage",
    "Grocery store",
    "Department store",
    "Spirit",
    "Food",
    "Hair care",
    "TV networks",
    "Beer",
    "News websites"
  ];

  for (b in brand_list) {
    URL = base_url + "brands?movie=" + movie.toLowerCase() + "&brand_cat=" + brand_list[b];
    let targeter = "#" + brand_list[b].replace(" ", "-") + " > .brand-list-item"

    $.get(URL, function(data) {
      let text = [];
      for (let i in data["b_list"]) {
        text.push(Object.keys(data["b_list"][i])[0])
      }
      $(targeter).text(text.join(", "))
    });
  }
};

var makeMap = function(movie) {
  $('.map-explanation span').text(movie)

  // DMA MAP CALL
  URL = base_url + "map?movie=" + movie.toLowerCase();
  $.get(URL, function(data) {
    chloropleth(data["chart_data"], "#map");
  });
}

var getDemoData = function(movie) {
  $('#demographics-explanatory span').text(movie)

  // EDUCATION CALL
  URL = base_url + "demo?movie=" + movie + "&demo_type=ed";
  $.get(URL, function(data) {
    dotPlot(data["chart_data"], "#demo-education");
  });

  // AGE CALL
  URL = base_url + "demo?movie=" + movie + "&demo_type=age";
  $.get(URL, function(data) {
    dotPlot(data["chart_data"], "#demo-age");
  });
  
  // INCOME CALL
  URL = base_url + "demo?movie=" + movie + "&demo_type=income";
  $.get(URL, function(data) {
    dotPlot(
      data["chart_data"],
      "#demo-income"
    );
  });

  // GENDER CALL
  URL = base_url + "demo?movie=" + movie + "&demo_type=gender";
  $.get(URL, function(data) {
    dotPlot(
      data["chart_data"],
      "#demo-gender"
    );
  });
}

var getAdvertising = function(movie) {
  $('#advertising-explanatory span').text(movie)

   ad_media_list = [
    "Advertising channels that grab your attention",
    "Types of advertising seen regularly",
    "Social networks - member of",
    "Activities done regularly"
  ];

  for (let b in ad_media_list) {
    URL = base_url + "ad_media?movie=" + movie + "&brand_cat=" + ad_media_list[b];
    let target = "#advertising-" + ad_media_list[b].split(" ")[0].toLowerCase();
    $.get(URL, function(data) {
      scatterPlot(data["chart_data"], target);
    });
  }
}