function followUser(userId, followStatus, successFunc, failureFunc) {
    $.ajax({
        type: 'GET',  
        url: location.protocol + "//" + location.hostname + ":" + location.port +'/callme/',
        contentType: "application/json; charset=utf-8",
        data: {userID: userId, Following: followStatus},
        success: successFunc,
        error: failureFunc
    });
}