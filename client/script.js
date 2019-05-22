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

var sessions = [];

var loadData = $.ajax({
        url: 'surf-data/',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log("ajax success: you're node backend says what up", data);
            sessions.push(data);
            for(var i=0; i<data.length; i++) {
                var client_id = data[i].id;
                var tr = $('<tr>');
                var date = $('<td>', {
                  text: data[i]['date'],
                  'data-id': client_id,
                  'contenteditable': "false"
                });
                var location = $('<td>', {
                  text: data[i]['location'],
                  'data-id': client_id,
                  'contenteditable': "false"
                });
                var height = $('<td>', {
                  text: data[i]['height'],
                  'data-id': client_id,
                  'contenteditable': "false"
                });
                var rating = $('<td>', {
                  text: data[i]['rating'],
                  'data-id': client_id,
                  'contenteditable': "false"
                });
                var operations = $('<td>');
                var deleteButton = $('<button>', {
                  class: 'btn cancel red delete',
                  text: 'Delete',
                  'data-id': client_id
                });
                operations.append(deleteButton);
                var updateButton = $('<button>', {
                  class: 'btn update yellow',
                  text: 'Update',
                  'data-id': client_id
                });
                operations.append(updateButton);
                tr.append(date, location, height, rating, operations)
                $('tbody').append(tr);                      
            }
        }
    }); 

$('tbody').on("click", ".delete", (e)=>{
  var client_id = $(e.target).data('id');
  var deleteSession = {
  "async": true,
  "crossDomain": true,
  "url": "delete-session/",
  "method": "DELETE",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache"
  },
  "data": {
    "id": client_id
  }
}

$.ajax(deleteSession).done(function (response) {
  console.log(response);
    });
  window.location.reload(true);
  });




  $('tbody').on("click", ".update", (e, data) => {
    var client_id = $(e.target).data('id');
    console.log(client_id);
    var row = $(this).parent(data);

    // $.each(client_id, ()=>{
    //  if($(this).attr('contenteditable', false)) {
    //     $(this).attr('contenteditable', true);
    //   } else if($(this).attr('contenteditable', false)){
    //     $(this).attr('contenteditable', true);
    //   }
    // })
  
    


  //       if ($(this).html() == 'Update') {                  
  //           $.each(currentTD, ()=> {
  //               $(this).prop('contenteditable', true)
  //           });
  //       } else {
  //          $.each(currentTD, ()=> {
  //               $(this).prop('contenteditable', false)
  //           });
  //       }

  //       $(this).html($(this).html() == 'Update' ? 'Save' : 'Update')

    });

  // $('tbody').on("click", ".update", (e)=>{
  //   var client_id = $(e.target).data('id');
  //   console.log(client_id);
  //   var update_session = {
  //     "async": true,
  //     "crossDomain": true,
  //     "url": "update-session/",
  //     "method": "POST",
  //     "headers": {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "cache-control": "no-cache"
  //     },
  //     "data": {
  //       "date": $date.val(),
  //       "location": $location.val(),
  //       "height": $height.val(),
  //       "rating": $rating.val(),
  //       "id": client_id
  //     }
  //   }

  //     $.ajax(update_session).done(function (response) {
  //       console.log(response);
  //         });
  //   window.location.reload(true);
  //   });


//dynamic css


var sizeValidation = $('.size-val').keypress(function (evt) {
    evt.preventDefault();
});

var ratingValidation = $('.rating-val').keypress(function (evt) {
    evt.preventDefault();
});
