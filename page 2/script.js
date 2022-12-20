(function($) { // Begin jQuery
  $(function() { // DOM ready
    // If a link has a dropdown, add sub menu toggle.
    $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      // Close one dropdown when selecting another
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    // Hamburger to X toggle
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
  }); // end DOM ready
})(jQuery); // end jQuery

//to export as excel//
function html_table_to_excel(type)
    {
        var data = document.getElementById('claimdata');

        var file = XLSX.utils.table_to_book(data, {sheet: "sheet1"});

        XLSX.write(file, { bookType: type, bookSST: true, type: 'base64' });

        XLSX.writeFile(file, 'file.' + type);
    }

    const export_button = document.getElementById('export_button');

    export_button.addEventListener('click', () =>  {
        html_table_to_excel('xlsx');
    });


    // to export as pdf//
function Export() {
  html2canvas(document.getElementById('claimdata'), {
      onrendered: function (canvas) {
          var data = canvas.toDataURL();
          var docDefinition = {
              content: [{
                  image: data,
                  width: 500
              }]
          };
          pdfMake.createPdf(docDefinition).download("Table.pdf");
      }
  });
}

//clear table//
function DeleteRows() {
  var rowCount = claimdata.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
      claimdata.deleteRow(i);
  }
}


//  date picker  //
webshim.setOptions('forms', {
  lazyCustomMessages: true,
  addValidators: true
});
webshim.setOptions('forms-ext', {
  replaceUI: 'auto',
  types: 'date',
  date: {
      startView: 2,
      size: 2,
      classes: 'hide-spinbtns'
  }
});

//start polyfilling
webshim.polyfill('forms forms-ext');

//initial max/min attributes should be done serverside.
$(function(){
  $('#date-from, #date-to').prop('min', function(){
      return new Date().toJSON().split('T')[0];
  });
});