function toggleButton() {
    const button = document.getElementById('action-button');
    if (button.textContent === 'Candidatar-se') {
      button.textContent = 'Cancelar';
    } else {
      button.textContent = 'Candidatar-se';
    }
  }