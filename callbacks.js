var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("myBtn").click();
  }
});

$('.search-button').on('click', function() {
    $.ajax({
        url: 'https://www.omdbapi.com/?apikey=1aaf6ab3&s=' + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(m => {
                cards += showCards(m);
            });
            $('.movie-container').html(cards);
    
            //ketika tombol detail di-klik
            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: 'https://www.omdbapi.com/?apikey=1aaf6ab3&i=' + $(this).data('imdbid'),
                    success: m => {
                        movieDetail = showMovieDetail(m);
                    $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
                console.log($(this).data('imdbid'));
            })
    
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
    
});


function showCards(m) {
    return `<div class="col-md-4 my-3">
    <div class="card">
        <img class="card-img-top" src="${m.Poster}" alt="">
        <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" 
        data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
        </div>
    </div>
</div>`
}

function showMovieDetail(m) {
    return `
    <div class="container-fluid">
    <div class="row">
    <div class="col-md-3">
    <img src="${m.Poster}" class="img-fluid">
    </div>
    <div class="col-md">
    <ul class="list-group">
    <li class="list-group-item"><h4>${m.Title}</h4></li>
    <li class="list-group-item"><strong>Director: </strong>${m.Director}</li>
    <li class="list-group-item"><strong>Actors: </strong>${m.Actors}</li>
    <li class="list-group-item"><strong>Writer: </strong>${m.Writer}</li>
    <li class="list-group-item"><strong>Plot:</strong><br>${m.Plot}</li>
    </ul>
    </div>
    </div>
    </div>`
}
