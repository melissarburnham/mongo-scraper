$(document).ready(function () {



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

  $('#modalScraped').on('hidden.bs.modal', e => {
    window.location.href = '/';
  });

  $(document).on('click', '#saveArticle', e => {
    let articleId = $(this).data('id');
    $.ajax({
      url: '/articles/save/'+ articleId,
      type: 'GET'})
      .then(response =>
        window.location.href = '/'
      )
  });



// $(document).on('click', '#', function (){
// })


// $(document).on('click', '#', function (){
// })










})