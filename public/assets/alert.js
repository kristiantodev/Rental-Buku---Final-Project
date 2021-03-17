const flashData = $('.flash-data').data('flashdata');

if(flashData){
	swal({
        title: 'Sukses !!',
        text: '' + flashData,
        type: 'success'
	});
}
