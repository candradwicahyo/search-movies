window.onload = () => {
  
  const input = document.querySelector('.search-input');
  const button = document.querySelector('.search-button');
  button.addEventListener('click', async function() {
    try {
      const value = input.value.toLowerCase();
      const data = await getDataAndDetailMovies('s', value);
      updateMovies(data);
    } catch(err) {
      sweetalert(err);
    }
  });
  
  function updateMovies(data) {
    let string = '';
    data.forEach(movie => string += cards(movie));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = string;
  }
  
  function getDataAndDetailMovies(parameter, value) {
    return fetch(`https://omdbapi.com/?apikey=feefac6f&${parameter}=${value}`)
      .then(response => {
        if (!response.ok) throw new Error(responss.statusText);
        return response.json();
      })
      .then(response => {
        if (response.Response == "False") throw new Error(response.Error);
        return (parameter == 's') ? response.Search : response;
      });
  }
  
  // event binding
  window.addEventListener('click', async function(event) {
    if (event.target.classList.contains('button-detail')) {
      try {
        const imdbId = event.target.dataset.id;
        const movie = await getDataAndDetailMovies('i', imdbId);
        updateModalDetail(movie);
      } catch (err) {
        sweetalert(err);
      }
    }
  });
  
  function updateModalDetail(movie) {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.innerHTML = modalDetail(movie);
  }
  
  function sweetalert(text) {
    swal.fire ({
      icon: 'error',
      title: 'Error!',
      text: text,
      position: 'center'
    });
  }
  
  function cards({imdbID,Poster,Title,Type,Year}) {
    return `
    <div class="col-md-4 mx-auto">
      <div class="card m-1">
        <img src="${Poster}" alt="image" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${Title} (${Year})</h5>
          <h6 class="card-subtitle text-muted mb-3">Type : ${Type}</h6>
          <button class="btn btn-primary button-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${imdbID}">See Detail</button>
        </div>
      </div>
    </div>
    `;
  }
  
  function modalDetail(data) {
    return `
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Detail Movie</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-4">
            <div class="d-flex justify-content-center align-items-center">
              <img src="${data.Poster}" alt="image" class="img-fluid rounded my-3">
            </div>
          </div>
          <div class="col-md">
            <ul class="list-group">
              <li class="list-group-item d-flex bg-light justify-content-between align-items-center">
                <span>${data.Title}</span>
                <span class="badge bg-primary rounded p-2">${data.Year}</span>
              </li>
              <li class="list-group-item">
                <span class="fw-bold">Genre : </span>
                <span>${data.Genre}</span>
              </li>
              <li class="list-group-item">
                <span class="fw-bold">Rating : </span>
                <span>${data.imdbRating}</span>
              </li>
              <li class="list-group-item">
                <span class="fw-bold">Actors : </span>
                <span>${data.Actors}</span>
              </li>
              <li class="list-group-item">
                <span class="fw-bold">Director : </span>
                <span>${data.Director}</span>
              </li>
              <li class="list-group-item">
                <span class="fw-bold">Plot : </span>
                <span>${data.Plot}</span>
              </li>
              <li class="list-group-item">
                <span class="fw-bold">Language : </span>
                <span>${data.Language}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    `;
  }
  
}
