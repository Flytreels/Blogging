document.getElementById('avatar').src = config.theme_config.avatar;
document.getElementById('intro-text-title').innerHTML = config.theme_config.author + "'s Blog";
document.getElementById('intro-text-intro').innerHTML = "—— " + config.theme_config.introduction;

async function init_post_container() {
    let post_container = "";
    for(let x=0;x<config.post.length;x++){
        const post = {};
        post.url = settings.post+config.post[x].url+".md";
        await fetch(post.url)
        .then(response => response.text())
        .then(content => {
            post.preview = {
                response: content,
            };
            post.preview.mdcontent = marked(content);
            return marked(content);
        })
        .then(content => {
            document.getElementsByClassName("none")[0].innerHTML = content;
        }).then(function(){
            post.preview.title=document.getElementsByClassName("none")[0].getElementsByTagName("h1")[0].innerText;
            post.preview.intro=config.post[x].introduction;
        })
        .then(function(){
            post.container = '<div class="post-container"><h1>'+post.preview.title+'</h1><p class="post-intro">'+post.preview.intro+'</p><p><a href="/?p='+config.post[x].url+'">Reading<i class="material-icons arrow_forward"></i></a></p></div>';
            post_container = post_container+post.container;
        });
    }
    return post_container;
}
if (window.location.search==="?page=home"){
    init_post_container().then(content => {
        document.getElementById("post").innerHTML = content;
    });
}