$(()=>{
    $('.datepicker').datepicker();
    $('.parallax').parallax();
    $('.tooltipped').tooltip();
    //add button
    addButton;
});

var addButton = $('#submittion').click(()=>{
    var date = $('input#date').val();
    var location = $('input#location').val();
    var size = $('input#size').val();
    var rating = $('input#rating').val();
    var deleteButton = $('<button/>', {
        type: 'button',
        name: 'deleteButton',
        class: 'btn cancel red',
        id: 'deleteButton'
    });
    var tr = '<tr><td>'+date+'</td><td>'+location+'</td><td>'+size+'</td><td>'+rating+'</td><td>'+deleteButton+'</td></tr>';
    $('tbody').append(tr);
});

var clearButton;