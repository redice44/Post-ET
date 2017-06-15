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