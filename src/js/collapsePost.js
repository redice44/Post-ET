/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

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
