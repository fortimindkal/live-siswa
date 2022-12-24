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