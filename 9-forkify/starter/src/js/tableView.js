const tableContainer = document.querySelector('.tableBody');

export const renderTable = (movie) => {
    const markup = `<tr>
    <th scope="row">${movie.title}</th>
    <td>${movie.genre.name}</td>
    <td>${movie.numberInStock}</td>
    <td>${movie.dailyRentalRate}</td>
  </tr>`;

    tableContainer.insertAdjacentHTML('beforeend', markup);
}