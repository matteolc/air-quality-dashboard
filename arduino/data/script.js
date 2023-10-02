function init() {
    $('#config').hide();
    $('#nextstep').hide();
    $('#alert-text-box').hide();

    $('#networks-list-select').attr('disabled', true);
    $('#local_pass').attr('disabled', true);
    $('#name').attr('disabled', true);

    $.getJSON('/credentials', function (json) {
        $('#config').show();
        configure(json);
    });
}

function configure(json) {
    console.log(json);

    $('#save-button').click(onSaveButtonClicked);
    $('#local_pass').keypress(onKeyPressed);
    $('#name').keypress(onKeyPressed);

    $('[id="local-scad-code"]').text(formatScadCode(json.local_mac));

    populateNetworksList(json.local_ssid);
}

function formatScadCode(code) {
    return(code.slice(0, 4) + ' ' + code.slice(4));
}

function onKeyPressed(event) {
    if (event.keyCode == 13) {
        onSaveButtonClicked(event);
    }
}

function populateNetworksList(selectedNetwork) {
    let networks = $('#networks-list-select');

    $.getJSON('/scan', function (json) {
        networks.empty();
        $.each(json, function (key, entry) {
            let network = $('<option></option>');

            network.attr('value', entry.SSID).text(entry.SSID);
            if(entry.SSID == selectedNetwork) network.attr('selected', true);

            networks.append(network);
        });

        $('#networks-list-select').attr('disabled', false);
        $('#local_pass').attr('disabled', false);
        $('#name').attr('disabled', false);
    });
}

function onSaveButtonClicked(event) {
    event.preventDefault();

    var data = {
        local_ssid: $('#networks-list-select').children("option:selected").val(),
        local_pass: $('#local_pass').val(),
        name: $('#name').val(),
    };

    //NB dataType is 'text' otherwise json validation fails on Safari
    $.ajax({
        type: "POST",
        url: "/credentials",
        data: JSON.stringify(data),
        dataType: 'text',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        timeout: 15000,
        async: false,
        success: function(response, textStatus, jqXHR) {
            console.log(response);
            $('#config').hide();
            $('#alert-text-box').show();
            $('#alert-text').removeClass('bg-red-700');
            $('#alert-text').addClass('bg-green-700');
            $('#alert-text').text('Saved');
            $('#nextstep').show();

            reboot(10000);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            $('#alert-text-box').show();
            $('#alert-text').addClass('bg-red-700');
            $('#alert-text').text('Couldn\'t Save');
        }
    });
}

function reboot(t) {
    $.ajax({
        type: "POST",
        url: "/reboot",
        data: JSON.stringify({ delay: t }),
        dataType: 'text',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        timeout: 15000,
        async: false,
        success: function(response, textStatus, jqXHR) {
            console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
