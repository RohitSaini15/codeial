{
    let new_post_form=$("#new-post-form")
    let post_section=$("#post-section")

    let delete_post_button=$(".delete-post-button")
    let delete_comment_button=$(".delete-comment-button")
    let new_comment_form=$(".new-comment-form")

    let successNoty=(success_text)=>{
        new Noty({
            theme: 'sunset',
            text: success_text,
            type:"success",
            layout:"topRight",
            timeout:1500
        }).show();
    }

    let failureNoty=(failure_text)=>{
        new Noty({
            theme: 'sunset',
            text: failure_text,
            type:"success",
            layout:"topRight",
            timeout:1500
        }).show();
    }

    let createPost=function(){
        new_post_form.submit(function(e){
            e.preventDefault()
            $.ajax({
                type:"post",
                url:"/post/create",
                data:new_post_form.serialize(),//creates a text string in standard URL-encoded notation
                success:function(data){
                    let newPost=newPostDom(data.data.post)
                    post_section.prepend(newPost)
                    deletePost($(" .delete-post-button",newPost))
                    createComment($(" .new-comment-form",newPost))
                    successNoty("Post created !")
                },
                error:function(err){
                    console.log(err)
                }
            })
        })
    }

    let newPostDom=function(post){
        return $(`
                    <li id="post-${post._id}">
                        <a href="/post/delete/${post._id}" class="delete-post-button"><i class="fa-solid fa-trash"></i></a>
                        ${post.content}<br>
                        <small>${post.user.name}</small>

                        <div id="comments">
                            <p>Comments</p>
                            <ul type="none" id="comment-list-${post._id}">
                                
                            </ul>
                        </div>
                
                        <form action="/comment/create?post_id=${post._id}" method="Post" class="new-comment-form">
                            <textarea name="content" rows="3" cols="30" placeholder="Enter the Comment"></textarea>
                            <input type="submit" value="Comment">
                        </form>

                        <br><br>
                    </li>
                `)
    }

    let deletePost=function(element){
        element.click(function(e){
            e.preventDefault()
            $.ajax({
                type:"get",
                url:element.prop("href"),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove()
                    successNoty("Post deleted !")
                },
                error:function(err){
                    console.log(err.responseText)
                }
            })
        })
    }

    let createComment=function(new_comment_form){
        new_comment_form.submit(function(e){
            e.preventDefault()
            $.ajax({
                type:"post",
                url:new_comment_form.prop("action"),
                data:new_comment_form.serialize(),
                success:function(data){
                    let newComment=newCommentDom(data.data.comment)
                    $(`#comment-list-${data.data.comment.post}`).prepend(newComment)
                    deleteComment($(" .delete-comment-button",newComment))
                    successNoty("Comment created !")
                },
                error:function(err){
                    console.log(err.responseText)
                }
            })
        })
    }

    let newCommentDom=function(comment){
        return $(`<li id="comment-${comment._id}">
                        <a href="/comment/delete/${comment._id}" class="delete-comment-button"><i class="fa-solid fa-trash"></i></a>
                        ${ comment.content }
                        <br>
                        ${ comment.user.name }
                        <br><br>
                    </li>
                `)
    }

    let deleteComment=function(element){
        element.click(function(e){
            e.preventDefault()
            $.ajax({
                type:"get",
                url:element.prop("href"),
                success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove()
                    successNoty("Comment deleted !")
                },
                error:function(err){
                    console.log(err.responseText)
                }
            })
        })
    }

    function init(){
        for(element of delete_post_button){
            deletePost($(element))
        }
    
        for(element of delete_comment_button){
            deleteComment($(element))
        }
    
        for(element of new_comment_form){
            createComment($(element))
        }
    }

    createPost()
    init();
}