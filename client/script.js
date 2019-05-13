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
    // loadData();
    
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
                var tr = '<tr><td>'+data[i]['date']+'</td><td>'+data[i]['location']+'</td><td>'+data[i]['height']+'</td><td>'+data[i]['rating']+'</td><td><button type="button" class="btn cancel red delete">Delete</button></td></tr>';
                $('tbody').append(tr);
            }

        }

    });

// var deleteButton = $('.delete').click(()=> {
    
// });

// var sessions = 

var button = $('<button>', {
    class: "btn cancel"
})

var sizeValidation = $('.size-val').keypress(function (evt) {
    evt.preventDefault();
});

var ratingValidation = $('.rating-val').keypress(function (evt) {
    evt.preventDefault();
});
