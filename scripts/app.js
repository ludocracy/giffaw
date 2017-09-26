$(function(){
  $('.form-inline').submit(updateSearch);
  $('#loadMore').click(loadMoreResults);
});

let resultOffset = 0;
const GIPHYURL = 'https://api.giphy.com/v1/gifs/search';
const RESULTS_PER_LOAD = 25;

function updateSearch(e) {
  e.preventDefault();
  clearResults();
  $.ajax({
    method: 'GET',
    url: GIPHYURL,
    data: getFormData({limit: RESULTS_PER_LOAD}),
    dataType: 'json',
    success: onSuccess
  });
}

function clearResults() {
  $('.gif-gallery').empty();
}

function onSuccess(response) {
  console.log(response);
  response.data.forEach(gif => {
    let url = gif.images.fixed_height.url;
    $('.gif-gallery').append(`<img id="${gif.id}" src="${url}"></img>`);
  });
}

function loadMoreResults() {
  resultOffset += RESULTS_PER_LOAD;
  $.ajax({
    method: 'GET',
    url: GIPHYURL,
    data: getFormData({offset: resultOffset}),
    dataType: 'json',
    success: onSuccess
  })
}

// pass in obj to add extra parameters
function getFormData(obj={}) {
  let serializedData = $('.form-inline').serialize();
  for(key in obj) {
    serializedData += `&${key}=${obj[key]}`;
  }
  return serializedData;
}
