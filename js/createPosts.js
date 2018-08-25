

    function makePostApplications(image, fName,lName, content, elementID,numLikes,numReplies,numShares ,time){
        /* ----- generate posts --- */
        $('#wall-dataF').append('<div class="panel-body wallPosts" id="Post'+elementID+'"><div class="media"><a class="pull-left" href="#"><img style="height:40px;" id="img'+elementID+'" class="media-object img-rounded" src=""></a><div class="dropdown pull-right"><a class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span><span class="caret"></span></a><ul class="dropdown-menu" style="min-width: 0px !important; padding:0px !important;"><li><a class="dropdown-item editEntry" data-toggle="modal" data-target="#edit-modal'+elementID+'"><H6>Edit</H6></a></li><li><a class="dropdown-item deleteEntry" data-toggle="modal" data-target="#delete-modal'+elementID+'"><H6>Delete</H6></a></li></ul></div><div class="media-body"><h6 class="post-time pull-right text-muted time" style="padding-right:4px;">'+timeSince(time)+'</h6><h5 class="post-name mt-0" style="color:cadetblue;"><a href="#">'+fName+" "+lName+'</a></h5><p class="post-message" id= "post-msg'+elementID+'" style="word-spacing: 0px;">'+readRuneArrayThatWorks(content)+'</p></div><ul><li><a class="btn btn-sm like-btn" id =like-btn'+elementID+'><img class="like-btn-ico" src="/ustart_front/ico/like.png">  <p class="mt-0" style="color:cadetblue; display:inline;">'+numLikes+'</p></a></li><li><a class="btn btn-sm comment-btn" id="'+elementID+'" data-toggle="modal" data-target="#main-modal'+elementID+'"><img class="coment-btn-ico" src="/ustart_front/ico/no comment.png">  <p class="mt-0" id ="num-replies'+elementID+'" style="color:cadetblue; margin-left:1px; display:inline;">'+ numReplies+'</p></a></li><li><a class="btn btn-sm share-btn" data-toggle="modal" data-target="#share-modal'+elementID+'"><span><img class="share-btn-ico" src="/ustart_front/ico/not share.png"><p class="mt-0" style="margin-left:1px; color:cadetblue; display:inline;">'+numShares+'</p></span></a></li></ul></div>');
        $("#img"+elementID).attr("src", image);
        /* ----- end generate posts --- */
        /* ----- append share modals --- */ 
        $('#shareModals').append('<div class="modal fade" id="share-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Share On Your Profil1</h4></div><div class="modal-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-rounded" id="share-img'+elementID+'"src=""></a><div class="media-body"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><h5 class="mt-0" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p></div></div><br><div class="form-group"><textarea class="form-control" id="shared-content'+elementID+'" style="resize: none;" placeholder="Say Something about this..."></textarea></div></div><div class="modal-footer"><button id="share-btn'+elementID+'" class="btn btn-primary pull-right share-postSubmit">Post</button></div></div></div></div>');
            $("#share-img"+elementID).attr("src", image);
        /* ----- end append share modals --- */
        /* ----- append edit modals --- */
        $('#editModals').append('<div class="modal fade" id="edit-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Edit Post</h4></div><div class="modal-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-rounded" id="edit-img'+elementID+'" src=""></a><div class="media-body"><div class="form-group"><textarea id="content'+elementID+'" class="form-control" style="resize:none;" placeholder="">'+readRuneArrayThatWorks(content)+'</textarea></div></div></div></div><div class="modal-footer"><button id="edit-btn'+elementID+'" class="btn btn-primary pull-right edit-postSubmit">Post</button></div></div></div></div>');
        $("#edit-img"+elementID).attr("src", image);
        /* ----- end append edit modals --- */
         /* ----- append delete modals --- */
         $('#deleteModals').append('<div class="modal fade" id="delete-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><span style="font-size:20px;">Confirm Deletion</span></div><div class="modal-body"><span style="font-size:15px;">Are you sure you want to delete this post?</span></div> <div class="modal-footer"><button class="btn btn-danger btn-ok deletePost" id="delete-btn'+elementID+'" type="submit">Delete</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div></div>');
         /* ----- end append delete modals --- */
        /*--- append main modal ---- */
        $('#commentModals').append('<div class="modal fade" id="main-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><div class="media"> <a class="pull-left" href="#"><img class="media-object img-rounded" id="comment-img'+elementID+'" src=""> </a><div class="media-body"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><h5 class="mt-0" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p></div></div></div><div class="modal-body"><div class="input-group"><input class="form-control" id="commentContent'+elementID+'" name="commentz" placeholder="Add a comment"><span class="input-group-addon new-comment-submit" id="'+elementID+'"><i class="fa fa-edit"></i></span></div><br><div class ="comment-lists" id="comments-list'+elementID+'"></div>');
        
        $("#comment-img"+elementID).attr("src", image);
         /* ----- end append main modals --- */
        $("#commentContent"+elementID).keydown(function(event) {
            if (event.keyCode === 13) {
               $(this).siblings('.new-comment-submit').click();
                console.log("doing");
            }
        }); 
    }

    function makeBasicPostApplications(image, fName,lName, content, elementID,numLikes,numReplies,numShares,time){
        /* ----- generate posts --- */
        $('#wall-dataF').append('<div class="panel-body wallPosts" id="Post'+elementID+'"><div class="media"><a class="pull-left" href="#"><img style="height:40px;" id="img'+elementID+'" class="media-object img-rounded" src=""></a><div class="media-body"><h6 class="post-time pull-right text-muted time" style="padding-right:4px;">'+timeSince(time)+'</h6><h5 class="post-name mt-0" style="color:cadetblue;"><a href="#">'+fName+" "+lName+'</a></h5><p class="post-message" id= "post-msg'+elementID+'" style="word-spacing: 0px;">'+readRuneArrayThatWorks(content)+'</p></div><ul><li><a class="btn btn-sm like-btn" id =like-btn'+elementID+'><img class="like-btn-ico" src="/ustart_front/ico/like.png">  <p class="mt-0" style="color:cadetblue; display:inline;">'+numLikes+'</p></a></li><li><a class="btn btn-sm comment-btn" id="'+elementID+'" data-toggle="modal" data-target="#main-modal'+elementID+'"><img class="coment-btn-ico" src="/ustart_front/ico/no comment.png">  <p class="mt-0" id ="num-replies'+elementID+'" style="color:cadetblue; margin-left:1px; display:inline;">'+ numReplies+'</p></a></li><li><a class="btn btn-sm share-btn" data-toggle="modal" data-target="#share-modal'+elementID+'"><span><img class="share-btn-ico" src="/ustart_front/ico/not share.png"><p class="mt-0" style="margin-left:1px; color:cadetblue; display:inline;">'+numShares+'</p></span></a></li></ul></div>');
        $("#img"+elementID).attr("src", image);   
                  
        /* ----- end generate posts --- */
        /* ----- append share modals --- */
        $('#shareModals').append('<div class="modal fade" id="share-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Share On Your Profile2</h4></div><div class="modal-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-rounded" id="share-img'+elementID+'"src=""></a><div class="media-body"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><h5 class="mt-0" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p></div></div><br><div class="form-group"><textarea class="form-control" id="shared-content'+elementID+'" style="resize: none;" placeholder="Say Something about this..."></textarea></div></div><div class="modal-footer"><button id="share-btn'+elementID+'" class="btn btn-primary pull-right share-postSubmit">Post</button></div></div></div></div>');
        $("#share-img"+elementID).attr("src", image);
        /* ----- end append share modals --- */
        /*--- append main modal ---- */
        $('#commentModals').append('<div class="modal fade" id="main-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><div class="media"> <a class="pull-left" href="#"><img class="media-object img-rounded" id="comment-img'+elementID+'" src=""> </a><div class="media-body"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><h5 class="mt-0" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p></div></div></div><div class="modal-body"><div class="input-group"><input class="form-control" id="commentContent'+elementID+'" name="commentz" placeholder="Add a comment"><span class="input-group-addon new-comment-submit" id="'+elementID+'"><i class="fa fa-edit"></i></span></div><br><div class ="comment-lists" id="comments-list'+elementID+'"></div>');
        
        $("#comment-img"+elementID).attr("src", image);
        $("#commentContent"+elementID).keydown(function(event) {
         if (event.keyCode === 13) {
            $(this).siblings('.new-comment-submit').click();
         }
         }); 
         /* ----- end append main modals --- */
    }
    function makeNewPostApplications(image, fName,lName, content, elementID,numLikes,numReplies,numShares, time){
        /* ----- generate posts --- */
        $('#wall-dataF').prepend('<div class="panel-body wallPosts" id="Post'+elementID+'"><div class="media"><a class="pull-left" href="#"><img style="height:40px;" id="img'+elementID+'" class="media-object img-rounded" src=""></a><div class="dropdown pull-right"><a class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span><span class="caret"></span></a><ul class="dropdown-menu" style="min-width: 0px !important; padding:0px !important;"><li><a class="dropdown-item editEntry" data-toggle="modal" data-target="#edit-modal'+elementID+'"><H6>Edit</H6></a></li><li><a class="dropdown-item deleteEntry" data-toggle="modal" data-target="#delete-modal'+elementID+'"><H6>Delete</H6></a></li></ul></div><div class="media-body"><h6 class="post-time pull-right text-muted time" style="padding-right:4px;">'+timeSince(time)+'</h6><h5 class="post-name mt-0" style="color:cadetblue;"><a href="#">'+fName+" "+lName+'</a></h5><p class="post-message"  id= "post-msg'+elementID+'"style="word-spacing: 0px;">'+readRuneArrayThatWorks(content)+'</p></div><ul><li><a class="btn btn-sm like-btn" id =like-btn'+elementID+'><img class="like-btn-ico" src="/ustart_front/ico/like.png">  <p class="mt-0" style="color:cadetblue; display:inline;">'+numLikes+'</p></a></li><li><a class="btn btn-sm comment-btn" id="'+elementID+'" data-toggle="modal" data-target="#main-modal'+elementID+'"><img class="coment-btn-ico" src="/ustart_front/ico/no comment.png">  <p class="mt-0" id ="num-replies'+elementID+'" style="color:cadetblue; margin-left:1px; display:inline;">'+ numReplies+'</p></a></li><li><a class="btn btn-sm share-btn" data-toggle="modal" data-target="#share-modal'+elementID+'"><span><img class="share-btn-ico" src="/ustart_front/ico/not share.png"><p class="mt-0" style="margin-left:1px; color:cadetblue; display:inline;">'+numShares+'</p></span></a></li></ul></div>');
        $("#img"+elementID).attr("src", image);        
        /* ----- end generate posts --- */
        /* ----- append share modals --- */
        $('#shareModals').append('<div class="modal fade" id="share-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Share On Your Profile</h4></div><div class="modal-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-rounded" id="share-img'+elementID+'"src=""></a><div class="media-body"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><h5 class="mt-0" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p></div></div><br><div class="form-group"><textarea class="form-control" id="shared-content'+elementID+'" style="resize: none;" placeholder="Say Something about this..."></textarea></div></div><div class="modal-footer"><button id="share-btn'+elementID+'" class="btn btn-primary pull-right share-postSubmit">Post</button></div></div></div></div>');
        $("#share-img"+elementID).attr("src", image);
        /* ----- end append share modals --- */
        /* ----- append edit modals --- */
         $('#editModals').append('<div class="modal fade" id="edit-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Edit Post</h4></div><div class="modal-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-rounded" id="edit-img'+elementID+'" src=""></a><div class="media-body"><div class="form-group"><textarea id="content'+elementID+'" class="form-control" style="resize:none;" placeholder="">'+readRuneArrayThatWorks(content)+'</textarea></div></div></div></div><div class="modal-footer"><button id="edit-btn'+elementID+'" class="btn btn-primary pull-right edit-postSubmit">Post</button></div></div></div></div>');
        $("#edit-img"+elementID).attr("src", image);
        /* ----- end append edit modals --- */
         /* ----- append delete modals --- */
        $('#deleteModals').append('<div class="modal fade" id="delete-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><span style="font-size:20px;">Confirm Deletion</span></div><div class="modal-body"><span style="font-size:15px;">Are you sure you want to delete this post?</span></div> <div class="modal-footer"><button class="btn btn-danger btn-ok deletePost" id="delete-btn'+elementID+'" type="submit">Delete</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div></div>');
         /* ----- end append delete modals --- */
        /*--- append main modal ---- */
        $('#commentModals').append('<div class="modal fade" id="main-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><div class="media"> <a class="pull-left" href="#"><img class="media-object img-rounded" id="comment-img'+elementID+'" src=""> </a><div class="media-body"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><h5 class="mt-0" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p></div></div></div><div class="modal-body"><div class="input-group"><input style="resize: none;" class="form-control" id="commentContent'+elementID+'" name="commentz" placeholder="Add a comment"><span class="input-group-addon new-comment-submit" id="'+elementID+'"><i class="fa fa-edit"></i></span></div><br><div class ="comment-lists" id="comments-list'+elementID+'"></div>');
        $("#comment-img"+elementID).attr("src", image);
        $("#commentContent"+elementID).keydown(function(event) {
            if (event.keyCode === 13) {
               $(this).siblings('.new-comment-submit').click();
            }
        }); 
         /* ----- end append main modals --- */
    }
     function makeCommentApplications(parentID, image, fName,lName, content, postID,numReplies,time){
          $('#comments-list'+parentID).append('<div class="media standard-comment" id="comment-media'+postID+'"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><a class="media-left" href="#"><img style="height:40px;" id="comment-element'+postID+'" class="img-rounded" src=""></a><div class="media-body"><h5 class="media-heading user_name" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p><p><small><a class="remove-comment" id="removeComment'+postID+'">Remove</a></small></p><p><small><a class="view-replies" name="replies" myvalue="'+postID+'" id="openReplies'+postID+'">View '+numReplies+' Replies</a></small></p><div class="commentOfComment" id="replies'+postID+'" data-replycount="'+numReplies+'"></div><div class="input-group"><input class="form-control" placeholder="Add a reply" type="text" id="comment2Content'+postID+'" name="body"><span class="input-group-addon new-comment-o-comment-submit" placeholder="Add a comment" id="'+postID+'"><i class="fa fa-edit"></i></span></div></div></div>');
         if(numReplies <= 0){
             $("#openReplies"+postID).hide();
         }                               
         $("#comment-element"+postID).attr("src", image);
         $("#comment2Content"+postID).keydown(function(event) {
             if (event.keyCode === 13) {
                $(this).siblings('.new-comment-o-comment-submit').click();
             }
         }); 
     }
    
     function makeBasicCommentApplications(parentID, image, fName,lName, content, postID,numReplies,time){
          $('#comments-list'+parentID).append('<div class="media standard-comment" id="comment-media'+postID+'"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><a class="media-left" href="#"><img style="height:40px;" id="comment-element'+postID+'" class="img-rounded" src=""></a><div class="media-body"><h5 class="media-heading user_name" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p><p><small><a class="view-replies" name="replies" myvalue="'+postID+'" id="openReplies'+postID+'">View '+numReplies+' Replies</a></small></p><div class="commentOfComment" id="replies'+postID+'" data-replycount="'+numReplies+'"></div><div class="input-group"><input class="form-control" placeholder="Add a reply" type="text" id="comment2Content'+postID+'" name="body"><span class="input-group-addon new-comment-o-comment-submit" placeholder="Add a comment" id="'+postID+'"><i class="fa fa-edit"></i></span></div></div></div>');
         if(numReplies <= 0){
             $("#openReplies"+postID).hide();
         }                               
         $("#comment-element"+postID).attr("src", image);
         $("#comment2Content"+postID).keydown(function(event) {
             if (event.keyCode === 13) {
                $(this).siblings('.new-comment-o-comment-submit').click();
             }
         }); 
     }
    

     function makeNewCommentApplications(parentID, image, fName,lName, content, postID,numReplies,time){
        $('#comments-list'+parentID).prepend('<div class="media standard-comment" id="comment-media'+postID+'"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><a class="media-left" href="#"><img style="height:40px;" id="comment-element'+postID+'" class="img-rounded" src=""></a><div class="media-body"><h5 class="media-heading user_name" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p><p><small><a class="remove-comment" id="removeComment'+postID+'">Remove</a></small></p><p><small><a class="view-replies" name="replies" myvalue="'+postID+'" id="openReplies'+postID+'">View '+numReplies+' Replies</a></small></p><div class="commentOfComment" id="replies'+postID+'" data-replycount="'+numReplies+'"></div><div class="input-group"><input class="form-control" placeholder="Add a reply" type="text" id="comment2Content'+postID+'" name="body"><span class="input-group-addon new-comment-o-comment-submit" placeholder="Add a comment" id="'+postID+'"><i class="fa fa-edit"></i></span></div></div></div>');
         if(numReplies <= 0){
            $("#openReplies"+postID).hide();
         }                               
         $("#comment-element"+postID).attr("src", image);
         $("#comment2Content"+postID).keydown(function(event) {
             if (event.keyCode === 13) {
                $(this).siblings('.new-comment-o-comment-submit').click();
             }
         }); 
     }


    function makeCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){
        $('#replies'+parentID).append('<div class="media" id="commentOComment-media'+postID+'"><h6 class="post-time pull-right text-muted time" style="padding-right:4px;">'+timeSince(time)+'</h6><a class="media-left" href="#"><img class="media-object img-rounded" id="comment-o-comment-element'+postID+'"src=""></a><div class="media-body"><h5 class="media-heading user_name" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p><p><small><a class="remove-comment-o-comment" id="removecomment2'+postID+'">Remove</a></small></p></div></div>');
         $("#comment-o-comment-element"+postID).attr("src", image);
               
    }

    function makeBasicCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){
        $('#replies'+parentID).append('<div class="media" id="commentOComment-media'+postID+'"><h6 class="post-time pull-right text-muted time" style="padding-right:4px;">'+timeSince(time)+'</h6><a class="media-left" href="#"><img class="media-object img-rounded" id="comment-o-comment-element'+postID+'"src=""></a><div class="media-body"><h5 class="media-heading user_name" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p></div></div>');
         $("#comment-o-comment-element"+postID).attr("src", image);
               
    }

     function makeNewCommentOfCommentsApplications(parentID, image, fName,lName, content, postID,time){
        $('#replies'+parentID).prepend('<div class="media" id="commentOComment-media'+postID+'"><h6 class="post-time pull-right text-muted time" style="padding-right:4px;">'+timeSince(time)+'</h6><a class="media-left" href="#"><img class="media-object img-rounded" id="comment-o-comment-element'+postID+'"src=""></a><div class="media-body"><h5 class="media-heading user_name" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p><p><small><a class="remove-comment-o-comment" id="removecomment2'+postID+'">Remove</a></small></p><p></div></div>');
         $("#comment-o-comment-element"+postID).attr("src", image);
               
    }

    function createSharedPost(image, fName,lName,elementID, content, sharedContent, posterFname, posterLname,numLikes,numReplies,originaltime, time){
         $('#wall-dataF').append('<div class="panel-body wallPosts" id="Post'+elementID+'">\
          <div class="dropdown pull-right">\
            <a class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span><span class="caret"></span></a>\
            <ul class="dropdown-menu" style="min-width: 0px !important; padding:0px !important;"><li><a class="dropdown-item editEntry" data-toggle="modal" data-target="#edit-modal'+elementID+'"><H6>Edit</H6></a></li><li><a class="dropdown-item deleteEntry" data-toggle="modal" data-target="#delete-modal'+elementID+'"><H6>Delete</H6></a></li></ul></div>\
        <h6 class="pull-right text-muted time" style="padding-right:4px;">'+timeSince(time)+'</h6>\
        <h5 class="mt-0" style="color:cadetblue">'+fName+" "+lName+' shared a post:</h5>\
        <p style="margin-left:2em">'+readRuneArrayThatWorks(sharedContent)+'</p>\
        <div class="media">\
        <div class="panel panel-default">\
            <div class="panel-body">\
                <div class="media">\
                <a class="pull-left" href="#"><img style="height:40px;" id="img'+elementID+'" class="media-object img-rounded" src=""></a>\
                <div class="media-body">\
                    <h6 class="pull-right text-muted time">'+timeSince(originaltime)+'</h6>\
                    <h5 class="mt-0"style="color:cadetblue;">'+posterFname+" "+posterLname+'</h5>\
                    <p>'+readRuneArrayThatWorks(sharedContent)+'</p>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <ul>\
        <li><a class="btn btn-sm like-btn" id ="like-btn'+elementID+'"><img class="like-btn-ico" src="/ustart_front/ico/like.png">  <p class="mt-0" style="color:cadetblue; display:inline;">'+numLikes+'</p></a></li>\
        <li><a class="btn btn-sm comment-btn" id="'+elementID+'" data-toggle="modal" data-target="#main-modal'+elementID+'"><img class="coment-btn-ico" src="/ustart_front/ico/no comment.png">  <p class="mt-0" id ="num-replies'+elementID+'" style="color:cadetblue; margin-left:1px; display:inline;">'+ numReplies+'</p></a></li>\
        </ul>\
        </div>\
        </div>');
        $("#img"+elementID).attr("src", image);  
        /* ----- append edit modals --- */
        $('#editModals').append('<div class="modal fade" id="edit-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Edit Post</h4></div><div class="modal-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-rounded" id="edit-img'+elementID+'" src=""></a><div class="media-body"><div class="form-group"><textarea id="content'+elementID+'" class="form-control" style="resize:none;" placeholder="">'+readRuneArrayThatWorks(content)+'</textarea></div></div></div></div><div class="modal-footer"><button id="edit-btn'+elementID+'" class="btn btn-primary pull-right edit-postSubmit">Post</button></div></div></div></div>');
        $("#edit-img"+elementID).attr("src", image);
        /* ----- end append edit modals --- */
         /* ----- append delete modals --- */
         $('#deleteModals').append('<div class="modal fade" id="delete-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><span style="font-size:20px;">Confirm Deletion</span></div><div class="modal-body"><span style="font-size:15px;">Are you sure you want to delete this post?</span></div> <div class="modal-footer"><button class="btn btn-danger btn-ok deletePost" id="delete-btn'+elementID+'" type="submit">Delete</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div></div>');
         /* ----- end append delete modals --- */
        /*--- append main modal ---- */
        $('#commentModals').append('<div class="modal fade" id="main-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><div class="media"> <a class="pull-left" href="#"><img class="media-object img-rounded" id="comment-img'+elementID+'" src=""> </a><div class="media-body"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><h5 class="mt-0" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p></div></div></div><div class="modal-body"><div class="input-group"><input class="form-control" id="commentContent'+elementID+'" name="commentz" placeholder="Add a comment" ><span class="input-group-addon new-comment-submit" id="'+elementID+'"><i class="fa fa-edit"></i></span></div><br><div class ="comment-lists" id="comments-list'+elementID+'"></div>');
        $("#comment-img"+elementID).attr("src", image);  
        $("#commentContent"+elementID).keydown(function(event) {
            if (event.keyCode === 13) {
               $(this).siblings('.new-comment-submit').click();
            }
        }); 
        }

    function createBasicSharedPost(image, fName,lName,elementID, content, sharedContent, posterFname, posterLname,numLikes,numReplies,originaltime, time){
         $('#wall-dataF').append('<div class="panel-body wallPosts" id="Post'+elementID+'">\
        <h6 class="pull-right text-muted time" style="padding-right:4px;">'+timeSince(time)+'</h6>\
        <h5 class="mt-0" style="color:cadetblue">'+fName+" "+lName+' shared a post:</h5>\
        <p style="margin-left:2em">'+readRuneArrayThatWorks(sharedContent)+'</p>\
        <div class="media">\
        <div class="panel panel-default">\
            <div class="panel-body">\
                <div class="media">\
                <a class="pull-left" href="#"><img style="height:40px;" id="img'+elementID+'" class="media-object img-rounded" src=""></a>\
                <div class="media-body">\
                    <h6 class="pull-right text-muted time">'+timeSince(originaltime)+'</h6>\
                    <h5 class="mt-0"style="color:cadetblue;">'+posterFname+" "+posterLname+'</h5>\
                    <p>'+readRuneArrayThatWorks(sharedContent)+'</p>\
                    </div>\
                </div>\
            </div>\
        </div>\
        <ul>\
        <li><a class="btn btn-sm like-btn" id ="like-btn'+elementID+'"><img class="like-btn-ico" src="/ustart_front/ico/like.png">  <p class="mt-0" style="color:cadetblue; display:inline;">'+numLikes+'</p></a></li>\
        <li><a class="btn btn-sm comment-btn" id="'+elementID+'" data-toggle="modal" data-target="#main-modal'+elementID+'"><img class="coment-btn-ico" src="/ustart_front/ico/no comment.png">  <p class="mt-0" id ="num-replies'+elementID+'" style="color:cadetblue; margin-left:1px; display:inline;">'+ numReplies+'</p></a></li>\
        </ul>\
        </div>\
        </div>');
        $("#img"+elementID).attr("src", image);  
        /*--- append main modal ---- */
        $('#commentModals').append('<div class="modal fade" id="main-modal'+elementID+'" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><div class="media"> <a class="pull-left" href="#"><img class="media-object img-rounded" id="comment-img'+elementID+'" src=""> </a><div class="media-body"><h6 class="pull-right text-muted time">'+timeSince(time)+'</h6><h5 class="mt-0" style="color:cadetblue;">'+fName+" "+lName+'</h5><p>'+readRuneArrayThatWorks(content)+'</p></div></div></div><div class="modal-body"><div class="input-group"><input class="form-control" id="commentContent'+elementID+'" name="commentz" placeholder="Add a comment"><span class="input-group-addon new-comment-submit" id="'+elementID+'"><i class="fa fa-edit"></i></span></div><br><div class ="comment-lists" id="comments-list'+elementID+'"></div>');
        $("#comment-img"+elementID).attr("src", image);  
        $("#commentContent"+elementID).keydown(function(event) {
            if (event.keyCode === 13) {
               $(this).siblings('.new-comment-submit').click();
            }
        }); 
        }
    
