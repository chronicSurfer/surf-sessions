$(()=>{
    $('.datepicker').datepicker();
    $('.parallax').parallax();
    $('.tooltipped').tooltip();
    //add button
    addButton;
    clearButton;
});

var addButton = $('#submittion').click(()=>{
    var date = $('input#date').val();
    var location = $('input#location').val();
    var size = $('input#size').val();
    var rating = $('input#rating').val();
    var tr = '<tr><td>'+date+'</td><td>'+location+'</td><td>'+size+'</td><td>'+rating+'</td><td><button type="button" class="btn cancel red delete">Delete</button></td></tr>';
    console.log(tr);
    $('tbody').append(tr);
    dataClear();
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

// var deleteButton = $('.delete').click(()=> {
    
// });

// var sessions = 

var button = $('<button>', {
    class: "btn cancel"
})