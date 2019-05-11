$(()=>{
    $('.datepicker').datepicker({format: 'yyyy-mm-dd'});
    $('.parallax').parallax();
    $('.tooltipped').tooltip();
    sizeValidation;
    ratingValidation;
    addButton;
    clearButton;
    fetch;
    loadData;
});

// var addButton = $('#submittion').click(()=>{
//     var date = $('input#date').val();
//     var location = $('input#location').val();
//     var size = $('input#size').val();
//     var rating = $('input#rating').val();
//     var tr = '<tr><td>'+date+'</td><td>'+location+'</td><td>'+size+'</td><td>'+rating+'</td><td><button type="button" class="btn cancel red delete">Delete</button></td></tr>';
//     console.log(tr);
//     $('tbody').append(tr);
//     dataClear();
// });

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
