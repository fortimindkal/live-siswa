document.querySelector(".delete-siswa").addEventListener("click", function() {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
});

document.querySelector(".delete-siswa2").addEventListener("click", function() {
  Swal.fire({
    title: "Do you want to delete this student?",
    type: "info",
    showCancelButton: true,
    confirmButtonText: "Delete It",
    confirmButtonColor: "#ff0055",
    cancelButtonColor: "#999999",
    reverseButtons: true,
    focusConfirm: false,
    focusCancel: true
  });
});

// Menampilkan form edit siswa saat tombol edit diklik
document.querySelectorAll('.edit-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const studentRow = event.target.closest('tr');
      const studentId = studentRow.dataset.studentId;
      const name = studentRow.querySelector('.name').textContent;
      const dob = studentRow.querySelector('.dob').textContent;
      const className = studentRow.querySelector('.class').textContent;
      const grade = studentRow.querySelector('.grade').textContent;
      const status = studentRow.querySelector('.status').textContent;
  
      document.querySelector('#edit-student-form').dataset.studentId = studentId;
      document.querySelector('#edit-name').value = name;
      document.querySelector('#edit-dob').value = dob;
      document.querySelector('#edit-class').value = className;
      document.querySelector('#edit-grade').value = grade;
      document.querySelector('#edit-status').value = status;
  
      const modal = document.querySelector('#edit-student-modal');
      modal.style.display = 'block';
    });
  });
  
// Menampilkan form delete siswa saat tombol delete diklik
document.querySelectorAll('.delete-btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    const studentRow = event.target.closest('tr');
    const studentId = studentRow.dataset.studentId;

    document.querySelector('#delete-student-form').dataset.studentId = studentId;

    const modal = document.querySelector('#delete-student-modal');
    modal.style.display = 'block';
  });
});

function searchStudents() {
  // Ambil input dari form pencarian
  let input = document.getElementById("search-input").value;
  // Konversi input menjadi huruf kecil semua
  input = input.toLowerCase();

  // Dapatkan semua baris tabel siswa
  let rows = document.getElementsByClassName("siswa-row");

  // Lakukan looping untuk setiap baris tabel siswa
  for (let i = 0; i < rows.length; i++) {
    // Dapatkan nama siswa dari baris tabel yang sedang dicari
    let siswaNama = rows[i].getElementsByTagName("td")[0];
    // Konversi nama siswa menjadi huruf kecil semua
    siswaNama = siswaNama.textContent.toLowerCase();

    // Bandingkan nama siswa dengan input pencarian
    if (siswaNama.indexOf(input) > -1) {
      // Tampilkan baris tabel jika nama siswa cocok dengan input pencarian
      rows[i].style.display = "";
    } else {
      // Sembunyikan baris tabel jika nama siswa tidak cocok dengan input pencarian
      rows[i].style.display = "none";
    }
  }
}

// Fungsi untuk menghapus siswa
function deleteStudent(btn) {

  // Dapatkan baris tabel siswa yang akan dihapus
  let row = btn.parentNode.parentNode;

  // Menampilkan alert ketika menghapus
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      row.parentNode.removeChild(row);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}