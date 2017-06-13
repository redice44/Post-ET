import Domo from 'dom-object';

let posts = new Domo(document.getElementById('feed')).get('section.post');
console.log(posts);

posts.forEach((domo) => {
  if (!domo.classes.includes('unsubmitted')) {
    domo.html.addEventListener('click', toggleVisible);
  }
});

function toggleVisible (e) {
  console.log(e.currentTarget);
  new Domo(e.currentTarget).toggleClass('hide').toggleClass('show');
}
