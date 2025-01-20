$(document).ready(function () {
    // Get the next inauguration moment (Epoch set at noon on 01/20/2021 in D.C.)
    mGone = moment.unix('1863622800');

    // Update the countdown string
    updateCountdown();
});

var timeout;

function updateCountdown() {
    var trumpIsGone = Math.round((1863622800000 - Date.now()) / 1000) <= 0;

    if (trumpIsGone) {
        clearTimeout(timeout);

        $('#gone').show();
        $('#countdown').hide();

        $('.unit .value').html(0);
        $('#s .label').html('Seconds');

        $('.the-clock').addClass('dim');

        return;
    }

    $('#countdown').show();

    // List the units we'll loop over later, with their index in the regex match array
    timeUnits = {
        y: 1,
        n: 2,
        w: 3,
        d: 4,
        h: 5,
        m: 6,
        s: 7,
    };

    timeLabels = {
        y: 'Year',
        n: 'Month',
        w: 'Week',
        d: 'Day',
        h: 'Hour',
        m: 'Minute',
        s: 'Second',
    };

    diff = moment()
        .countdown(
            mGone,
            countdown.YEARS |
                countdown.MONTHS |
                countdown.WEEKS |
                countdown.DAYS |
                countdown.HOURS |
                countdown.MINUTES |
                countdown.SECONDS
        )
        .toString();

    diffPieces = diff.match(
        /(?:([\d]+) years?)?(?:, | and )?(?:([\d]+) months?)?(?:, | and )?(?:([\d]+) weeks?)?(?:, | and )?(?:([\d]+) days?)?(?:, | and )?(?:([\d]+) hours?)?(?:, | and )?(?:([\d]+) minutes?)?(?:, | and )?(?:([\d]+) seconds?)?/
    );

    var str = [];
    $.each(timeUnits, function (k, v) {
        var val = typeof diffPieces[v] == 'undefined' ? 0 : diffPieces[v];
        var lab = timeLabels[k] + (diffPieces[v] == 1 ? '' : 's');
        str.push(val + ' ' + lab);
        $('#' + k + ' .value').html(
            typeof diffPieces[v] == 'undefined' ? 0 : diffPieces[v]
        );
        $('#' + k + ' .label').html(
            timeLabels[k] + (diffPieces[v] == 1 ? '' : 's')
        );
    });

    // Set it to loop
    timeout = setTimeout(updateCountdown, 50);
}
