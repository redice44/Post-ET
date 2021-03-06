/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/

import $ from 'jquery';
import datePicker from '@fengyuanchen/datepicker';

console.log($('[data-toggle="datepicker"]').data('date'));

let options = {};
let dueDate = $('[data-toggle="datepicker"]').data('date');
options.format = 'mm-dd-yyyy';

if (dueDate) {
  options.date = new Date(dueDate);
}

$('[data-toggle="datepicker"]').datepicker(options);
$('[data-toggle="datepicker"]').datepicker('pick');