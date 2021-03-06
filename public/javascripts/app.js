$(document).ready(function () {
  // Scrapes articles
  $(document).on('click', '#scrape', e => {
    e.preventDefault();
    $.ajax({
      url: '/scrape',
      type: 'GET'
    })
    .then(response => {
      console.log(response)
      console.log(response.length)
      $('#numArticles').text(response.length);
      $('#modalScraped').modal('show');
    })
  })

  // when user exits modal, stay on the page
  $('#modalScraped').on('hidden.bs.modal', e => {
    window.location.href = '/';
  });

  // saves the article
  $(document).on('click', '#saveArticle', function(e) {
    let articleId = $(this).data('id');
    console.log(articleId)
    $.ajax({
      url: '/articles/save/'+ articleId,
      type: 'GET'})
    .then(response =>
        window.location.href = '/'
      )
  });

  // deletes article
   $('.deletearticles').on('click', function (e){
    e.preventDefault();
    let id = $(this).data('id');
    $.ajax({
      url: '/articles/deleteArticle/' + id,
      type: 'DELETE'})
    .then( response => window.location.href = '/articles/viewSaved')
  });

  // $('#modalNote').on('hidden.bs.modal', '.modal', function () {
  //   $(this).removeData('bs.modal');
  // });

 // submits note to be display
  $('#submitNote').on('click', function (e){
    e.preventDefault();
    let articleId = $(this).data('id');
    let body = $('#noteInput').val().trim()
    let noteObj = {
      articleId,
      body
    }
    if (!$("#noteInput").val()) {
      $('.modal-body').append('\n' + 'Please enter a note to save!')
    } else {
      $.ajax({
        url: '/notes/post/' + articleId,
        type: 'POST',
        data: noteObj})
      .then( response => window.location.href = '/articles/viewSaved')
    }  
  });

  //function that displays note in noteModal
  function displayNote(element, articleId){
    // element.preventDefault()
    // if (notes != val()){
      let $deleteButton = $('<button>')
      .text('X')
      .addClass('deleteNote');
    let $note = $('<div>')
      .text(element.body) 
      .append($deleteButton)
      .attr('data-note-id', element._id)
      .attr('data-article-id', articleId)
      .addClass('note')
      .appendTo('#noteArea')
    // }
  }

  // displays and saves note in modal
  $(document).on('click', '.addNote', function (e){
    e.preventDefault();
    $('#noteInput').val('');
    let id = $(this).data('id');
    $('#submitNote, #noteInput').attr('data-id', id)
    $.ajax({
      url: '/notes/getNotes/' + id,
      type: 'GET'})
      .then(data => {
        $('#noteArea').empty();        
        $.each(data.notes, function (i, item){
          displayNote(item, id)
        });
        $('#noteModal').modal('show');
      })
    });

   //deletes note from modal
  $(document).on('click', '.deleteNote', function (event){
    let item = $(this);
    let ids= {
      noteId: $(this).parent().data('note-id'),
      articleId: $(this).parent().data('article-id')
    };
    $.ajax({
      url: '/notes/deleteNote',
      type: 'POST',
      data: ids})
      .then(response => {
        item.parent().remove();
    });
  });
})