function createNewNotifItem(notifID, link, message, timestamp, unreadStatus){
    var notifPanel = $('<div></div>').addClass('panel panel-default').attr("notifid",notifID);
    var notifAnchor = $('<a></a>').attr("href", link);
    var notifPanelBody = $('<div></div>').addClass('panel-body');
    if (!unreadStatus) {
         var notifNewLabel = $('<span></span>').addClass('label-new label label-info notif-msg-label').text("new");
    }
    else{
        var notifNewLabel = $('<span></span>').addClass('label label-info notif-msg-label');
    }
    var notifPanelContent = $('<div></div>').addClass('notif-page-msg').text(message);
    var notifPanelTime = $('<div></div>').addClass('notif-page-timestamp text-muted').text(timestamp);
    
     var notifPanelUl = $('<ul></ul>').addClass('notif-control').append('<li> <strong><span class="notif-close"aria-label="close">×</span></strong></li>');
    
    notifPanel.append(notifAnchor.append(notifPanelBody.append(notifNewLabel, notifPanelContent,notifPanelTime)), notifPanelUl); 
    $('#notif-posts').append(notifPanel);
}
    