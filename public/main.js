const myForm = document.getElementById('reservationForm');
myForm.addEventListener('submit', submitReservation);

$(function() {
  $('#datetimepicker1').datetimepicker({
    format: 'YYYY-MM-DD HH:mm',
    stepping: 30,
    inline: true,
    sideBySide: true,
  });
});

async function submitReservation(evt) {
  evt.preventDefault();
  let data = new FormData(myForm);
  let name = data.get('name');
  let slot = data.get('slot');
  data = {
    name,
    slot,
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  };
  fetch('/reservations', options).then(function(response) {
    return response.json();
  });
}
