import Domo from 'dom-object';

let posts = new Domo(document.getElementById('feed')).get('section.post');
console.log(posts);

posts.forEach((domo) => {
  if (!domo.classes.includes('unsubmitted')) {
    domo.get('header').html.addEventListener('click', toggleVisible);
  }
});

function toggleVisible (e) {
  console.log(e.currentTarget);
  new Domo(e.currentTarget.parentElement).toggleClass('hide').toggleClass('show');
}
