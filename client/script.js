$(()=>{
    $('.datepicker').datepicker({format: 'yyyy-mm-dd'});
    $('.parallax').parallax();
    $('.tooltipped').tooltip();
    sizeValidation;
    ratingValidation;
    addButton;
    clearButton;
    loadData;
});

var $date = $('input#date');
var $location = $('input#location');
var $size = $('input#size');
var $rating = $('input#rating');

var addButton = $('#submittion').click(()=>{
    var addSession = {
        "async": true,
        "crossDomain": true,
        "url": "/add-session",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",  
          "cache-control": "no-cache"
        },
        "data": {
          "date": $date.val(),
          "location": $location.val(),
          "height": $size.val(),
          "rating": $rating.val()
        }
      }
      
      $.ajax(addSession).done(function (response) {
        console.log(response);
      });
    dataClear();
    window.location.reload(true);
    
});

var clearButton = $('#cancelation').click( () => {
    dataClear();
});

var dataClear = () => {
    $('#date').val("");
    $('#location').val("");
    $('#size').val("");
    $('#rating').val("");
};

var loadData = $.ajax({
        url: 'surf-data/',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log("ajax success: you're node backend says what up", data);
            for(var i=0; i<data.length; i++) {
                var client_id = data[i].id;
                var tr = $('<tr>');
                var date = $('<td>').text(data[i]['date']);
                var location = $('<td>').text(data[i]['location']);
                var height = $('<td>').text(data[i]['height']);
                var rating = $('<td>').text(data[i]['rating']);
                var operations = $('<td>');
                var deleteButton = $('<button>', {
                  class: 'btn cancel red delete',
                  text: 'Delete',
                  'data-id': client_id
                });
                
                operations.append(deleteButton);
                tr.append(date, location, height, rating, operations)
                $('tbody').append(tr);                      
            }
        }
    });

$('tbody').on("click", "button", ()=>{
  // var client_id = $(this).attr("data-id");
  // console.log(client_id);
  console.log("Event delegation works for button created dynamically");
})

// var delete_entry = $('.delete').click(()=> {
//   var client_id = this.data.id;
//   console.log(client_id);
//   var deleteSession = {
//     "async": true,
//     "crossDomain": true,
//     "url": "delete-session/",
//     "method": "DELETE",
//     "headers": {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "cache-control": "no-cache"
//     },
//     "data": {
//       "id": client_id
//     }
//   }
  
//   $.ajax(deleteSession).done(function (response) {
//     console.log(response);
//   });
// });

var update_entry = null;

var sizeValidation = $('.size-val').keypress(function (evt) {
    evt.preventDefault();
});

var ratingValidation = $('.rating-val').keypress(function (evt) {
    evt.preventDefault();
});
