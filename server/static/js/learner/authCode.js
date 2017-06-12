var code = document.getElementById('code').value;

if (window.opener) {
  window.opener.focus();
  window.opener.location.href = '/learner/authToken/?code=' + code;
}

window.close();
