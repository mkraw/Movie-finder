
$(document).ready(function(){

    var searchGenre;
$(".genre").click(function(){
   searchGenre= $(this).attr("value");
    $(".genre").removeClass("activeBtn");
   $(this).addClass("activeBtn");
});

    
    var comedyTitles=["Moscow Belgium", "The Chorus","Welcome to the Sticks", "The Intouchables", "The Valet"];
    var actionTitles= ["Headhunters", "King of Devil's Island", "District 13", "Empire of the Wolves", "Ruby & Quentin"];
    var dramaTitles = ["The lives of others","The pianist", "Good bye Lenin", "Blue is the Warmest Color"];
    
    // AIzaSyDbD7DGviScdnihUMSzlspK3gXfmUJ2EeM
    
    
    
    var title;
    var trailerId;
    var rating;
    var country;
    var plot;
    
    $("#submit").on('click', function(){
        
        $("#paragraph").addClass("inactive");
        $(".intro").addClass("inactive");
        $("#submit").html("Try Again");
        
        if(searchGenre=== "comedy") {
        title= comedyTitles;
   
   }
        else if(searchGenre==="action"){
        title = actionTitles;
        
        }
        else {
        title= dramaTitles;
        }
        
        
        var filmTitle= title[Math.floor(Math.random()*title.length)];
        console.log(filmTitle);

        
        
  $.getJSON("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +filmTitle +  "trailer&type=video&key=AIzaSyDbD7DGviScdnihUMSzlspK3gXfmUJ2EeM", function(data){
       trailerId = data.items[0].id.videoId;
  console.log(trailerId);
      
      
      $('#player').attr('src', 'https://www.youtube.com/embed/'+ trailerId+'?autoplay=1');
      $("#ytplayer").removeClass("inactive");
  
  
  }).done( $.getJSON(" https://www.omdbapi.com/?t=" + filmTitle, function(info) {
   console.log(info);
   rating= info.imdbRating;
   country = info.Country;
       
    plot = info.Plot;   
     $("#movieTitle").html(filmTitle); 
     $(".countryinfo").html(info.Year + ", "+ country);    
     $("#description").html('<p class="plot">'+plot + '</p>' +'<p id="imbdinfo"><a target="_blank" href="http://www.imdb.com/title/'+info.imdbID  +'">Check it out on imbd</a>');   
       
       //button styling
       $("#submit").appendTo(".btnGroup");
       $("#submit").removeClass("btntryagain");
       $("#submit").addClass("submitted");
       $(".btnGroup .genre").removeClass("btn-lg");
       $("footer").removeClass("extrapadding");
       
       
   })).fail(function(){
        $("#error").append("<h2>Can't generate a trailer, try again later!</h2>");
  
  
  }); 
  


});
    
    
    
});

























