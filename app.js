$(function() {
    $('#test').click(function() {
        var programa1 = new Program($('#programa1').val());
        var programa2 = new Program($('#programa2').val());

        if (programa1.isValid() && programa2.isValid()) {
            console.log('Os dois programas são válidos');

            if (programa1.compareTo(programa2)) {
                console.log('Os dois programas são equivalentes');
            }
            else {
                console.log('Programas não são equivalentes');
            }
        }
        else {
            console.log('Programas são inválidos');
        }

    });
});
