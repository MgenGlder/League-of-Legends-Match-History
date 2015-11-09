//url https://na.api.pvp.net/api/lol/{region}/v1.2/champion
//api key: 8f6c2a08-97f3-4a9e-8318-0f9ca238bcb8
$.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/mgenglder?api_key=8f6c2a08-97f3-4a9e-8318-0f9ca238bcb8", function(data) {
  //get user data (mgenglder)
  var id = data.mgenglder.id;
  console.log(data);
  $.get("https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/" + id + "/recent?api_key=8f6c2a08-97f3-4a9e-8318-0f9ca238bcb8", function(data) {
    //get recent games
    console.log(data);
    var champId = data.games[0].championId;




    //get champ id of first game in list.
    $.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=8f6c2a08-97f3-4a9e-8318-0f9ca238bcb8", function(data) {
      //get the static data of the champions
      console.log(data);
      var champName;
      //search for the champion that fits the id that we have
      $.each(data.data, function(key, value) {
        if (value.id == champId) {
          champName = value.name;
          return false;
          //return false to get out of it
        }
      });
      //append the image to the page using the champion name. Capitalize the first letter
      console.log(champName);
      $("#gameCard").append("<div class='item item-text-wrap text-center col-md-3 pull-left'><img class='img-circle' src='http://ddragon.leagueoflegends.com/cdn/5.22.1/img/champion/" + champName[0].toUpperCase() + champName.slice(1) + ".png' />" + "<p>" + champName + "</p></div>");
    });
    //    $.each(data.games,function(key,value){
    var newDiv = $("<div class='col-md-6'></div>");
    $.each(data.games[0].stats, function(key, value) {
      reg = /item[0-9]{1}/;
      if (reg.test(key)) {

        var pic = '<div class=""><img src="http://ddragon.leagueoflegends.com/cdn/5.22.1/img/item/' + value + '.png"/></div>';
        newDiv.append(pic);
        console.log(data);
        console.log(pic);

        //$("#info").append(value + "<br/>");
      }
    });
    $("#gameCard").append(newDiv);
    //    });
  });
});


// $.get("https://na.api.pvp.net/api/lol/na/v2.2/match/1?api_key=8f6c2a08-97f3-4a9e-8318-0f9ca238bcb8", function (data) {
//   console.log(data);
// })
