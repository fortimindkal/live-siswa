let id = null;

window.addEventListener('DOMContentLoaded', (event) => {
  const role = "admin";
  showButtons(role);
});

window.onload = function() {
  loadStudents();
}

function exportToCsv(filename, rows) {
  var processRow = function (row) {
    var finalVal = '';
    for (var j = 0; j < row.length-1; j++) {
      var innerValue = row[j] === null ? '' : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      };
      var result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0)
        result = '"' + result + '"';
      if (j > 0)
        finalVal += ',';
      finalVal += result;
    }
    return finalVal + '\n';
  };

  var csvFile = '';
  for (var i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = window.URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    else
    {
      window.URL = window.URL || window.webkitURL;
      window.URL.revokeObjectURL(blob);
      FileSaver.saveAs(blob, filename);
    }
  }
}

function exportTableToCsv(filename) {
  var rows = document.querySelectorAll("table tr");
  var data = [];
  for (var i = 0; i < rows.length; i++) {
    var row = [];
    var cols = rows[i].querySelectorAll("td, th");
    for (var j = 0; j < cols.length; j++) {
      row.push(cols[j].textContent.trim());
    }
    data.push(row);
  }
  exportToCsv(filename, data);
}

function showButtons(role) {
  // Dapatkan semua button edit dan delete
  let editButtons = document.getElementsByClassName("edit-siswa");
  let deleteButtons = document.getElementsByClassName("delete-siswa");
  let action = document.getElementById("action");
  
  // Jika role pengguna adalah "admin", tampilkan semua button edit dan delete
  if (role == "admin") {
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].style.display = "block";
    }
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].style.display = "block";
    }
    action.style.display = 'block';
  } else { // Jika role pengguna bukan "admin", sembunyikan semua button edit dan delete
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].style.display = "none";
    }
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].style.display = "none";
    }
    action.style.display = 'none';
  }
}

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

function resetForm() {
  document.getElementById("add-nama").value = "";
  document.getElementById("add-tgl-lahir").value = "";
  document.getElementById("add-jk").value = "Jenis Kelamin";
  document.getElementById("add-kelas").value = "";
  document.getElementById("add-nilai").value = "";
  document.getElementById("add-status").value = "";

  console.log("Reseted!");
}

function addStudent() {
  // Dapatkan data siswa dari form tambah siswa
  let siswaNama = document.getElementById("add-nama").value;
  let siswaTglLahir = document.getElementById("add-tgl-lahir").value;
  let siswaJK = document.getElementById("add-jk").value;
  let siswaKelas = document.getElementById("add-kelas").value;
  let siswaNilai = document.getElementById("add-nilai").value;
  let siswaStatus = document.getElementById("add-status").value;

  // Buat elemen baris tabel baru untuk siswa yang baru ditambahkan
  let row = document.createElement("tr");

  // Buat elemen tabel baru untuk setiap data siswa
  let siswaNamaCol = document.createElement("td");
  let siswaTglLahirCol = document.createElement("td");
  let siswaJKCol = document.createElement("td");
  let siswaKelasCol = document.createElement("td");
  let siswaNilaiCol = document.createElement("td");
  let siswaStatusCol = document.createElement("td");
  let siswaAksiCol = document.createElement("td");

  // Tambahkan data siswa ke elemen tabel
  siswaNamaCol.textContent = siswaNama;
  siswaTglLahirCol.textContent = siswaTglLahir;
  siswaJKCol.textContent = siswaJK;
  siswaKelasCol.textContent = siswaKelas;
  siswaNilaiCol.textContent = siswaNilai;
  siswaStatusCol.textContent = siswaStatus;

  // Buat tombol edit dan hapus untuk siswa yang baru ditambahkan
  let siswaEditBtn = document.createElement("button");
  siswaEditBtn.classList.add("custom-btn");
  siswaEditBtn.textContent = "Edit";
  siswaEditBtn.setAttribute("data-bs-toggle", "modal");
  siswaEditBtn.setAttribute("data-bs-target", "#editSiswa");
  siswaEditBtn.onclick = function() {
    showEditForm(this);
  };

  let siswaDeleteBtn = document.createElement("button");
  siswaDeleteBtn.classList.add("delete-siswa", "custom-btn");
  siswaDeleteBtn.textContent = "Hapus";
  siswaDeleteBtn.onclick = function() {
    deleteStudent(this);
  };

  // Tambahkan tombol edit dan hapus ke elemen tabel aksi
  siswaAksiCol.appendChild(siswaEditBtn);
  siswaAksiCol.appendChild(siswaDeleteBtn);

  // Tambahkan elemen tabel siswa ke baris tabel
  row.appendChild(siswaNamaCol);
  row.appendChild(siswaTglLahirCol);
  row.appendChild(siswaJKCol);
  row.appendChild(siswaKelasCol);
  row.appendChild(siswaNilaiCol);
  row.appendChild(siswaStatusCol);
  row.appendChild(siswaAksiCol);

  // Tambahkan baris tabel baru ke tabel siswa
  let studentTable = document.getElementById("student-table");
  studentTable.appendChild(row);

  addAlert();
  saveStudents();
}

function addAlert() {
  Swal.fire({
    icon: 'success',
    title: 'Added!',
    text: 'Student has been added!',
  })
}

function saveStudents() {
  // Dapatkan data siswa dari tabel
  let studentTable = document.getElementById("student-table");
  let students = [];
  for (let i = 1; i < studentTable.rows.length; i++) {
    let row = studentTable.rows[i];
    let student = {
      nama: row.cells[0].textContent,
      tglLahir: row.cells[1].textContent,
      jk: row.cells[2].textContent,
      kelas: row.cells[3].textContent,
      nilai: row.cells[4].textContent,
      status: row.cells[5].textContent
    };
    students.push(student);
  }

  // Simpan data siswa ke local storage
  localStorage.setItem("students", JSON.stringify(students));
}

function loadStudents() {
  // Dapatkan data siswa dari local storage
  let students = JSON.parse(localStorage.getItem("students"));

  // Jika data siswa tidak ditemukan di local storage, keluar dari fungsi
  if (students === null) return;

  // Kosongkan tabel siswa
  let studentTable = document.getElementById("student-table");
  while (studentTable.rows.length > 1) {
    studentTable.deleteRow(1);
  }

  // Muat data siswa ke tabel
  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    let row = document.createElement("tr");

    // Buat elemen tabel baru untuk setiap data siswa
    let siswaNamaCol = document.createElement("td");
    let siswaTglLahirCol = document.createElement("td");
    let siswaJKCol = document.createElement("td");
    let siswaKelasCol = document.createElement("td");
    let siswaNilaiCol = document.createElement("td");
    let siswaStatusCol = document.createElement("td");
    let siswaAksiCol = document.createElement("td");

    // Tambahkan data siswa ke elemen tabel
    siswaNamaCol.textContent = student.nama;
    siswaTglLahirCol.textContent = student.tglLahir;
    siswaJKCol.textContent = student.jk;
    siswaKelasCol.textContent = student.kelas;
    siswaNilaiCol.textContent = student.nilai;
    siswaStatusCol.textContent = student.status;

    // Buat tombol edit dan hapus untuk siswa yang baru ditambahkan
    let siswaEditBtn = document.createElement("button");
    siswaEditBtn.classList.add("custom-btn");
    siswaEditBtn.setAttribute("data-bs-toggle", "modal");
    siswaEditBtn.setAttribute("data-bs-target", "#editSiswa");
    siswaEditBtn.textContent = "Edit";

    let siswaDeleteBtn = document.createElement("button");
    siswaDeleteBtn.classList.add("delete-siswa", "custom-btn");
    siswaDeleteBtn.textContent = "Hapus";
    siswaDeleteBtn.onclick = function() {
      deleteStudent(this);
    };

    // Tambahkan tombol edit dan hapus ke elemen tabel aksi
    siswaAksiCol.appendChild(siswaEditBtn);
    siswaAksiCol.appendChild(siswaDeleteBtn);

    // Tambahkan elemen tabel siswa ke baris tabel
    row.appendChild(siswaNamaCol);
    row.appendChild(siswaTglLahirCol);
    row.appendChild(siswaJKCol);
    row.appendChild(siswaKelasCol);
    row.appendChild(siswaNilaiCol);
    row.appendChild(siswaStatusCol);
    row.appendChild(siswaAksiCol);

    // Tambahkan baris tabel baru ke tabel siswa
    studentTable.appendChild(row);
  }
}

// Fungsi untuk menampilkan data siswa di form edit siswa
function showEditForm(btn) {
  // Dapatkan baris tabel siswa yang akan diedit
  let row = btn.parentNode.parentNode;

  // Dapatkan data siswa dari baris tabel yang akan diedit
  let siswaNama = row.getElementsByTagName("td")[0].textContent;
  let siswaTglLahir = row.getElementsByTagName("td")[1].textContent;
  let siswaJK = row.getElementsByTagName("td")[2].textContent;
  let siswaKelas = row.getElementsByTagName("td")[3].textContent;
  let siswaNilai = row.getElementsByTagName("td")[4].textContent;
  let siswaStatus = row.getElementsByTagName("td")[5].textContent;

  // Tampilkan data siswa di form edit siswa
  document.getElementById("edit-nama").value = siswaNama;
  document.getElementById("edit-tgl-lahir").value = siswaTglLahir;
  document.getElementById("edit-jk").value = siswaJK;
  document.getElementById("edit-kelas").value = siswaKelas;
  document.getElementById("edit-nilai").value = siswaNilai;
  document.getElementById("edit-status").value = siswaStatus;

  id = btn.parentNode.parentNode;
  console.log(id);
}

function saveEdit() {
  // Dapatkan data siswa yang telah diedit dari form edit siswa
  let siswaNama = document.getElementById("edit-nama").value;
  let siswaTglLahir = document.getElementById("edit-tgl-lahir").value;
  let siswaJK = document.getElementById("edit-jk").value;
  let siswaKelas = document.getElementById("edit-kelas").value;
  let siswaNilai = document.getElementById("edit-nilai").value;
  let siswaStatus = document.getElementById("edit-status").value;

  // Dapatkan baris tabel siswa yang akan diedit
  let row = id;

  // Update data siswa di baris tabel
  row.getElementsByTagName("td")[0].textContent = siswaNama;
  row.getElementsByTagName("td")[1].textContent = siswaTglLahir;
  row.getElementsByTagName("td")[2].textContent = siswaJK;
  row.getElementsByTagName("td")[3].textContent = siswaKelas;
  row.getElementsByTagName("td")[4].textContent = siswaNilai;
  row.getElementsByTagName("td")[5].textContent = siswaStatus;

  saveAlert();
  saveStudents();
}

function saveAlert() {
  Swal.fire({
    icon: 'success',
    title: 'Saved!',
    text: 'Student has been updated!',
  })
}

// Fungsi untuk menghapus siswa
function deleteStudent(btn) {

  // Dapatkan baris tabel siswa yang akan dihapus
  let row = btn.parentNode.parentNode;
  let siswaNama = row.getElementsByTagName("td")[0].textContent;
  console.log(siswaNama);


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
      // Dapatkan nama siswa dari elemen tabel
      

      // Hapus siswa dari local storage
      deleteStudentLocalStorage(siswaNama);

      // Hapus siswa dari tabel HTML
      row.remove();
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
  saveStudents();
}

// Fungsi untuk menghapus siswa dari local storage
function deleteStudentLocalStorage(namaSiswa) {
  // Dapatkan data siswa dari local storage
  let students = JSON.parse(localStorage.getItem("students"));

  // Cari indeks siswa yang ingin dihapus
  let index = -1;
  for (let i = 0; i < students.length; i++) {
    if (students[i].nama === namaSiswa) {
      index = i;
      break;
    }
  }

  // Jika siswa tidak ditemukan, keluar dari fungsi
  if (index === -1) return;

  // Hapus siswa dari array
  students.splice(index, 1);

  // Simpan array yang telah dihapus siswa ke local storage
  localStorage.setItem("students", JSON.stringify(students));
}