//Hover fn, highlights button upon hover
$('.toggleButton').hover(function() {
    $(this).addClass('highlightedButton');
}, function() {
    $(this).removeClass('highlightedButton');
});
//Click fn, change color of clicked button
$('.toggleButton').click(function() {
    $(this).toggleClass('active');
    $(this).removeClass('highlightedButton');
    //toggle panels
    var panel = $(this).attr("id");
    panel = panel.split("tb")[1].toLowerCase() + "Panel";
    $("#" + panel).toggleClass("hidden");
    //change width of panels based on noofactivePanel
    var activePanelsCount = 4 - $(".hidden").length;
    $('.panel').width(($(window).width() / activePanelsCount) - 10);
});

//panel height, width
$('.panel').height($(window).height() - ($('#header').height() + 15));
$('.panel').width(($(window).width() / 2) - 10);

//iframe changes when change occurs in htmlPanel
$("document").ready(function() {
    updateOutput();
});
$("#htmlPanel, #cssPanel, #javascriptPanel").on('change keyup paste', function() {
    updateOutput();
});

function updateOutput() {
    var htmlContent = $('#htmlPanel').val();
    var cssContent = $("#cssPanel").val();
    var pageContent = "<html><head><style type='text/css'> " + cssContent + "</style></head><body>" + htmlContent + "</body></html>";
    var jsContent = $("#javascriptPanel").val();
    $("iframe").contents().find("html").html(pageContent);
    document.getElementById('outputPanel').contentWindow.eval(jsContent);
}